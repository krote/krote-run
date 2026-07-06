'use strict';

/**
 * scripts/validate-races.js
 * レースJSONデータのデータ品質チェック
 *
 * Usage:
 *   node scripts/validate-races.js              # 全ファイルをチェック
 *   node scripts/validate-races.js --errors-only # エラーのみ表示
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

// 日本の bounding box
const JAPAN_LAT_MIN = 20;
const JAPAN_LAT_MAX = 46;
const JAPAN_LNG_MIN = 122;
const JAPAN_LNG_MAX = 154;

// 当日受付を示すキーワード
const RACE_DAY_KEYWORDS = ['当日受付', '当日 受付', '当日(', '当日（'];

/**
 * reception_note_ja に当日受付を示すキーワードが含まれるか判定
 * 「前日・当日受付」のような記述も検知する
 * @param {string} note
 * @returns {boolean}
 */
function noteHasRaceDayReception(note) {
  if (!note) return false;
  // 「当日7:00」「当日受付」「前日・当日」のような表現を検知
  // ただし「当日消印有効」「当日キャンセル不可」等の誤検知を避けるため
  // 「当日」の後に時刻・受付・(・（ が続くか、直前に「・」「前日」等がある場合のみ
  const patterns = [
    /当日受付/,
    /当日\s*\d+[:：]\d+/,   // 当日 7:00 のような時刻
    /[・前]当日/,            // 前日・当日 または ・当日
    /当日[（(]/,
  ];
  return patterns.some(p => p.test(note));
}

/**
 * レースJSONの品質チェックを行い、問題リストを返す
 * @param {object} race
 * @returns {{ rule: string, level: 'error'|'warning', message: string }[]}
 */
function validateRace(race) {
  const issues = [];

  // ── Rule 1: entry_periods label_ja / label_en 空文字禁止 ────────────
  for (let i = 0; i < (race.entry_periods ?? []).length; i++) {
    const p = race.entry_periods[i];
    if (p.label_ja === '') {
      issues.push({
        rule: 'entry_period_label_empty',
        level: 'error',
        message: `entry_periods[${i}].label_ja が空文字です。"一般エントリー" などのデフォルト値を設定してください`,
      });
    }
    if (p.label_en === '') {
      issues.push({
        rule: 'entry_period_label_empty',
        level: 'error',
        message: `entry_periods[${i}].label_en が空文字です。"General Entry" などのデフォルト値を設定してください`,
      });
    }
  }

  // ── Rule 2: certification 大文字統一 ────────────────────────────────
  const certification = race.course_info?.certification ?? [];
  for (const cert of certification) {
    if (cert !== cert.toUpperCase()) {
      issues.push({
        rule: 'certification_case',
        level: 'error',
        message: `course_info.certification に小文字の値 "${cert}" があります。"${cert.toUpperCase()}" に修正してください`,
      });
    }
  }

  // ── Rule 3: entry_periods start_date null 禁止 ────────────────────
  for (let i = 0; i < (race.entry_periods ?? []).length; i++) {
    const p = race.entry_periods[i];
    if (p.start_date == null) {
      issues.push({
        rule: 'entry_period_start_date_null',
        level: 'error',
        message: `entry_periods[${i}].start_date が null です。entry_start_date と同じ日付を設定してください`,
      });
    }
  }

  // ── Rule 4: entry_start_date = 全 entry_periods の最早 start_date ──
  if (race.entry_start_date != null && (race.entry_periods ?? []).length > 0) {
    const validDates = race.entry_periods
      .map(p => p.start_date)
      .filter(d => d != null);
    if (validDates.length > 0) {
      const earliest = validDates.slice().sort()[0];
      if (race.entry_start_date > earliest) {
        issues.push({
          rule: 'entry_start_date_mismatch',
          level: 'error',
          message: `entry_start_date (${race.entry_start_date}) が最早 entry_periods.start_date (${earliest}) より後です`,
        });
      }
    }
  }

  // ── Rule 5: reception_type 矛盾検知 ─────────────────────────────────
  if (race.reception_type === 'pre_day') {
    const noteJa = race.reception_note_ja ?? '';
    const noteEn = race.reception_note_en ?? '';
    if (noteHasRaceDayReception(noteJa) || noteHasRaceDayReception(noteEn)) {
      issues.push({
        rule: 'reception_type_mismatch',
        level: 'warning',
        message: `reception_type が "pre_day" ですが reception_note に当日受付の記述があります。"both" への変更を検討してください`,
      });
    }
  }

  // ── Rule 6: 座標が日本国内範囲 ─────────────────────────────────────
  if (race.start_lat != null && race.start_lng != null) {
    const lat = race.start_lat;
    const lng = race.start_lng;
    if (lat < JAPAN_LAT_MIN || lat > JAPAN_LAT_MAX || lng < JAPAN_LNG_MIN || lng > JAPAN_LNG_MAX) {
      issues.push({
        rule: 'coords_out_of_japan',
        level: 'error',
        message: `start_lat/lng (${lat}, ${lng}) が日本国内範囲外です (lat: ${JAPAN_LAT_MIN}〜${JAPAN_LAT_MAX}, lng: ${JAPAN_LNG_MIN}〜${JAPAN_LNG_MAX})`,
      });
    }
  }

  return issues;
}

// ── CLI 実行 ─────────────────────────────────────────────────────────

function main() {
  const errorsOnly = process.argv.includes('--errors-only');

  const files = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();

  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithIssues = 0;

  for (const file of files) {
    let race;
    try {
      race = JSON.parse(fs.readFileSync(path.join(RACES_DIR, file), 'utf-8'));
    } catch (e) {
      console.error(`[ERROR] ${file}: JSONパースエラー - ${e.message}`);
      totalErrors++;
      filesWithIssues++;
      continue;
    }

    const issues = validateRace(race);
    const filtered = errorsOnly ? issues.filter(i => i.level === 'error') : issues;

    if (filtered.length > 0) {
      filesWithIssues++;
      console.log(`\n${file}`);
      for (const issue of filtered) {
        const tag = issue.level === 'error' ? '[ERROR]' : '[WARN] ';
        console.log(`  ${tag} ${issue.message}`);
        if (issue.level === 'error') totalErrors++;
        else totalWarnings++;
      }
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`${files.length} ファイル検査、${filesWithIssues} ファイルに問題あり`);
  console.log(`エラー: ${totalErrors}  警告: ${totalWarnings}`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateRace, noteHasRaceDayReception };
