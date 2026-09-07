'use strict';
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'races');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
let withAddr = 0, withLat = 0;
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f)));
  if (d.venue_address) withAddr++;
  if (d.start_lat) withLat++;
}
console.log('venue_address 設定済み:', withAddr, '/', files.length);
console.log('start_lat 設定済み:', withLat, '/', files.length);
