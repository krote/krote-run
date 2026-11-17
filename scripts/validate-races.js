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

/** races テーブルの NOT NULL 列のうち、seed が JSON の値をそのまま入れるもの */
const DB_REQUIRED_KEYS = ['name_ja', 'name_en', 'date', 'prefecture', 'city_ja', 'city_en'];
/** race_categories テーブルの NOT NULL 列のうち、既定値の無いもの */
const DB_REQUIRED_CATEGORY_KEYS = ['distance_type', 'distance_km'];
/** race_id: 英小文字・数字のスラッグ + 4桁の年（例: tottori-marathon-2026） */
const RACE_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*-\d{4}$/;

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
 * 開催日が過去かを判定する（date 未設定は false）
 * @param {object} race
 * @param {Date} [now]
 * @returns {boolean}
 */
function isPast(race, now = new Date()) {
  if (!race.date) return false;
  return new Date(race.date) < now;
}

/**
 * レースJSONの品質チェックを行い、問題リストを返す
 * @param {object} race
 * @param {{ now?: Date }} [opts] - now: 開催済み判定の基準日時（既定は現在時刻）
 * @returns {{ rule: string, level: 'error'|'warning', message: string }[]}
 */
function validateRace(race, { now = new Date() } = {}) {
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

  // ── Rule 3b: 受付開始前の期間に途中終了（closed_early）は付かない ──
  // 前回大会の「受付終了」表示をクロールが読み違えた場合を想定し、保留にする
  const todayJst = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  for (let i = 0; i < (race.entry_periods ?? []).length; i++) {
    const p = race.entry_periods[i];
    if (p.closed_early && p.start_date != null && p.start_date > todayJst) {
      issues.push({
        rule: 'entry_period_closed_before_start',
        level: 'error',
        message: `entry_periods[${i}] は受付開始前（${p.start_date}）なのに closed_early が true です`,
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

  // ── Rule 7: 参加費がどこにも設定されていない ──────────────────────
  // entry_fee_by_category が true のとき entry_fee が null なのは設計どおりだが、
  // カテゴリ側にも入っていなければ利用者に参加費を出せない（Search Console の
  // offers.price 欠落の指摘もこれが原因）。開催済みの大会は補完対象外。
  if (!isPast(race, now)) {
    const hasTopFee = race.entry_fee != null;
    const hasCategoryFee = (race.categories ?? []).some(c => c.entry_fee != null);
    const hasPeriodFee = (race.entry_periods ?? []).some(p => p.entry_fee != null);
    if (!hasTopFee && !hasCategoryFee && !hasPeriodFee) {
      issues.push({
        rule: 'entry_fee_missing',
        level: 'warning',
        message: '参加費が entry_fee・categories[].entry_fee・entry_periods[].entry_fee のいずれにも設定されていません',
      });
    }
  }

  // ── Rule 8: DB の NOT NULL 列が null ───────────────────────────────
  // seed は null を NULL として INSERT するため、1件でも残ると seed 全体が失敗する。
  // 空文字は DB 上有効で既存データでも使っているので対象外。
  for (const key of DB_REQUIRED_KEYS) {
    if (race[key] == null) {
      issues.push({
        rule: 'db_required_null',
        level: 'error',
        message: `${key} が null です（DB の NOT NULL 制約で seed が失敗する）`,
      });
    }
  }
  for (let i = 0; i < (race.categories ?? []).length; i++) {
    for (const key of DB_REQUIRED_CATEGORY_KEYS) {
      if (race.categories[i][key] == null) {
        issues.push({
          rule: 'db_required_null',
          level: 'error',
          message: `categories[${i}].${key} が null です（DB の NOT NULL 制約で seed が失敗する）`,
        });
      }
    }
  }

  // ── Rule 9: race_id の形式 ─────────────────────────────────────────
  if (!RACE_ID_PATTERN.test(String(race.id ?? ''))) {
    issues.push({
      rule: 'race_id_format',
      level: 'error',
      message: `id "${race.id}" の形式が不正です（英小文字・数字のスラッグ + "-" + 4桁の年）`,
    });
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
