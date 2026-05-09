import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const translateText = async (text) => {
  if (!text || typeof text !== 'string') return text;
  try {
    const res = await translate(text, { from: 'id', to: 'en' });
    return res.text;
  } catch (err) {
    console.error('Translation error for:', text, err);
    return text;
  }
};

const main = async () => {
  const dataRaw = fs.readFileSync('src/data.json', 'utf8');
  let data = JSON.parse(dataRaw);
  
  // 1. Fix missing spaces for prefixes in BOTH id and en
  const prefixes = ['FREE', 'GCP', 'AWS', 'AZURE', 'K8S'];
  const fixString = (str) => {
    if (typeof str !== 'string') return str;
    for (let p of prefixes) {
      if (str.startsWith(p) && !str.startsWith(p + ' ')) {
        return p + ' ' + str.substring(p.length);
      }
    }
    return str;
  };

  const walkAndFixSpaces = (obj) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'string') {
          obj[i] = fixString(obj[i]);
        } else {
          walkAndFixSpaces(obj[i]);
        }
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = fixString(obj[key]);
        } else {
          walkAndFixSpaces(obj[key]);
        }
      }
    }
  };

  walkAndFixSpaces(data);

  // 2. Translate missing keys in 'en'
  const translateMissingObj = async (obj, isEn) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'string' && isEn) {
          obj[i] = await translateText(obj[i]);
          await new Promise(r => setTimeout(r, 50));
        } else {
          await translateMissingObj(obj[i], isEn);
        }
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key of Object.keys(obj)) {
        if (['sub'].includes(key) && typeof obj[key] === 'string' && isEn) {
          obj[key] = await translateText(obj[key]);
          await new Promise(r => setTimeout(r, 50));
        } else {
          await translateMissingObj(obj[key], isEn);
        }
      }
    }
  };

  console.log('Translating missing fields for EN...');
  await translateMissingObj(data.en, true);
  console.log('Translation complete.');

  fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
  console.log('Saved to src/data.json');
};

main();
