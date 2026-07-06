'use strict';
const fs = require('fs');
const path = require('path');

function readJson(fp) {
  const raw = fs.readFileSync(fp, 'utf-8');
  // Strip BOM if present
  return JSON.parse(raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw);
}

function writeJson(fp, obj) {
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
}

const dir = path.join(__dirname, '../src/data/races');

// Fix mito-komon: world-athletics → WA
const f1 = path.join(dir, 'mito-komon-manyu-marathon-2026.json');
const r1 = readJson(f1);
r1.course_info.certification = r1.course_info.certification.map(c => c === 'world-athletics' ? 'WA' : c);
writeJson(f1, r1);
console.log('Fixed mito-komon certification');

// Fix sapporo: entry_start_date = earliest entry_periods.start_date
const f2 = path.join(dir, 'sapporo-marathon-2026.json');
const r2 = readJson(f2);
const earliest = r2.entry_periods.map(p => p.start_date).filter(Boolean).sort()[0];
r2.entry_start_date = earliest;
writeJson(f2, r2);
console.log('Fixed sapporo entry_start_date =>', earliest);
