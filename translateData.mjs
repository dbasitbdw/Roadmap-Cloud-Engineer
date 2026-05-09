import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const translateText = async (text) => {
  if (!text || typeof text !== 'string') return text;
  try {
    const res = await translate(text, { from: 'id', to: 'en' });
    return res.text;
  } catch (err) {
    console.error('Translation error for:', text, err);
    return text; // fallback
  }
};

const main = async () => {
  const dataRaw = fs.readFileSync('src/data.json', 'utf8');
  let idData;
  try {
    const parsed = JSON.parse(dataRaw);
    idData = parsed.id ? parsed.id : parsed;
  } catch(e) {
    console.error(e);
    return;
  }
  
  const enData = JSON.parse(JSON.stringify(idData));

  const translateObj = async (obj) => {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        await translateObj(obj[i]);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key of Object.keys(obj)) {
        if (['title', 'description', 'meta', 'name', 'desc', 'label', 'msg'].includes(key) && typeof obj[key] === 'string') {
          obj[key] = await translateText(obj[key]);
          // wait slightly to avoid rate limit
          await new Promise(r => setTimeout(r, 100));
        } else {
          await translateObj(obj[key]);
        }
      }
    }
  };

  console.log('Starting translation... This might take a minute.');
  await translateObj(enData);
  console.log('Translation complete.');

  const finalData = {
    en: enData,
    id: idData
  };

  fs.writeFileSync('src/data.json', JSON.stringify(finalData, null, 2));
  console.log('Saved bilingual data to src/data.json');
};

main();
