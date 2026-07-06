'use strict';
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/races');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
let fixed = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  const race = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  let changed = false;
  for (const p of (race.entry_periods ?? [])) {
    if (p.label_ja === '') { p.label_ja = '一般エントリー'; changed = true; }
    if (p.label_en === '') { p.label_en = 'General Entry'; changed = true; }
  }
  if (changed) {
    fs.writeFileSync(fp, JSON.stringify(race, null, 2) + '\n', 'utf-8');
    console.log('Fixed:', file);
    fixed++;
  }
}
console.log('Total fixed:', fixed);
