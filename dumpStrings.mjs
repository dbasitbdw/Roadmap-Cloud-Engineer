import fs from 'fs';

const file = 'src/data.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const stringsToTranslate = new Set();
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
fs.writeFileSync('untranslated.json', JSON.stringify(uniqueStrings, null, 2));
console.log('Saved ' + uniqueStrings.length + ' strings to untranslated.json');
