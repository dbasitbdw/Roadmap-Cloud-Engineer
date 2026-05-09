import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const file = 'src/data.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// 1. Gather all strings in `data.en` that are identical to `data.id`
const untranslatedMap = new Map(); // original -> translated
const stringsToTranslate = new Set();

// Words to ignore translating
const ignoreList = ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Multi-Cloud', 'Docker', 'Terraform', 'Linux'];

const traverseAndCollect = (en, id) => {
  if (typeof en === 'string' && typeof id === 'string') {
    if (en === id && en.length > 2 && !ignoreList.includes(en)) {
      stringsToTranslate.add(en);
    }
  } else if (Array.isArray(en) && Array.isArray(id)) {
    for (let i = 0; i < en.length; i++) {
      traverseAndCollect(en[i], id[i]);
    }
  } else if (typeof en === 'object' && en !== null && id !== null) {
    for (const key of Object.keys(en)) {
      if (id[key] !== undefined) {
        traverseAndCollect(en[key], id[key]);
      }
    }
  }
};

traverseAndCollect(data.en, data.id);

const uniqueStrings = Array.from(stringsToTranslate);
console.log(`Found ${uniqueStrings.length} unique untranslated strings.`);

const DELIMITER = '\n|||\n';

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const translateChunks = async () => {
  const chunks = chunkArray(uniqueStrings, 10);
  console.log(`Translating in ${chunks.length} chunks...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const textToTranslate = chunk.join(DELIMITER);
    
    try {
      const res = await translate(textToTranslate, { from: 'id', to: 'en' });
      const translatedParts = res.text.split(/\|\|\|/g).map(s => s.trim());
      
      for (let j = 0; j < chunk.length; j++) {
        const original = chunk[j];
        let translated = translatedParts[j] || original;
        
        // Clean up any remaining delimiter artifacts
        translated = translated.replace(/^\|+/, '').replace(/\|+$/, '').trim();
        
        untranslatedMap.set(original, translated);
      }
      console.log(`Chunk ${i + 1}/${chunks.length} translated successfully.`);
    } catch (err) {
      console.error(`Error translating chunk ${i + 1}:`, err.message);
      // Fallback: keep original
      for (let j = 0; j < chunk.length; j++) {
        untranslatedMap.set(chunk[j], chunk[j]);
      }
    }

    // Delay 2 seconds between requests to avoid rate limits
    await new Promise(r => setTimeout(r, 2000));
  }
};

const traverseAndApply = (en) => {
  if (Array.isArray(en)) {
    for (let i = 0; i < en.length; i++) {
      if (typeof en[i] === 'string') {
        if (untranslatedMap.has(en[i])) {
          en[i] = untranslatedMap.get(en[i]);
        }
      } else {
        traverseAndApply(en[i]);
      }
    }
  } else if (typeof en === 'object' && en !== null) {
    for (const key of Object.keys(en)) {
      if (typeof en[key] === 'string') {
        if (untranslatedMap.has(en[key])) {
          en[key] = untranslatedMap.get(en[key]);
        }
      } else {
        traverseAndApply(en[key]);
      }
    }
  }
};

const main = async () => {
  if (uniqueStrings.length > 0) {
    await translateChunks();
    traverseAndApply(data.en);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Saved fully translated data to src/data.json');
  } else {
    console.log('No missing translations found.');
  }
};

main();
