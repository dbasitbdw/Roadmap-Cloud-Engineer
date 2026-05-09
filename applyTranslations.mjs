import fs from 'fs';
import { translations } from './translationMap.mjs';

const file = 'src/data.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Apply mapping recursively on data.en
const traverseAndApply = (en) => {
  if (Array.isArray(en)) {
    for (let i = 0; i < en.length; i++) {
      if (typeof en[i] === 'string') {
        const trimmed = en[i].trim();
        if (translations[trimmed]) {
          en[i] = en[i].replace(trimmed, translations[trimmed]);
        } else if (translations[en[i]]) {
          en[i] = translations[en[i]];
        }
      } else {
        traverseAndApply(en[i]);
      }
    }
  } else if (typeof en === 'object' && en !== null) {
    for (const key of Object.keys(en)) {
      if (typeof en[key] === 'string') {
        const trimmed = en[key].trim();
        if (translations[trimmed]) {
          en[key] = en[key].replace(trimmed, translations[trimmed]);
        } else if (translations[en[key]]) {
          en[key] = translations[en[key]];
        }
      } else {
        traverseAndApply(en[key]);
      }
    }
  }
};

traverseAndApply(data.en);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Translations applied successfully!');
