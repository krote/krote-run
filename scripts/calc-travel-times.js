'use strict';

/**
 * Google Maps Routes API を使って主要都市→会場の移動時間を計算し、
 * race JSON の travel_times フィールドを更新するスクリプト。
 *
 * 使い方:
 *   GOOGLE_MAPS_API_KEY=xxx node scripts/calc-travel-times.js [race-id]
 *
 * race-id を省略すると start_lat/start_lng が設定済みの全レースを処理する。
 */

const fs = require('fs');
const path = require('path');

// ── 定数 ────────────────────────────────────────────────────────────────

const HUBS = {
  sapporo:   { id: 'sapporo',   lat: 43.0642, lng: 141.3469 },
  sendai:    { id: 'sendai',    lat: 38.2682, lng: 140.8694 },
  tokyo:     { id: 'tokyo',     lat: 35.6812, lng: 139.7671 },
  nagoya:    { id: 'nagoya',    lat: 35.1709, lng: 136.8815 },
  osaka:     { id: 'osaka',     lat: 34.6937, lng: 135.5023 },
  kyoto:     { id: 'kyoto',     lat: 35.0116, lng: 135.7681 },
  hiroshima: { id: 'hiroshima', lat: 34.3853, lng: 132.4553 },
  fukuoka:   { id: 'fukuoka',   lat: 33.5904, lng: 130.4017 },
};

const RACES_DIR = path.join(__dirname, '..', 'src', 'data', 'races');

// ── ユーティリティ ───────────────────────────────────────────────────────

/**
 * Google Maps Routes API の URL を生成する。
 * @param {{ lat: number, lng: number }} origin
 * @param {{ lat: number, lng: number }} destination
 * @param {string} arrivalTime ISO 8601 形式 (例: "2026-10-01T08:00:00+09:00")
 * @returns {string}
 */
function buildRoutesApiUrl(origin, destination, arrivalTime) {
  const base = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const params = new URLSearchParams({
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    arrivalTime,
    travelMode: 'TRANSIT',
  });
  return `${base}?${params.toString()}`;
}

/**
 * Google Routes API のレスポンス duration フィールド（例: "3600s"）を秒数に変換する。
 * @param {string} durationStr
 * @returns {number}
 */
function parseDurationSeconds(durationStr) {
  return parseFloat(durationStr);
}

/**
 * 秒を分に変換する（切り上げ）。
 * @param {number} seconds
 * @returns {number}
 */
function secondsToMinutes(seconds) {
  return Math.ceil(seconds / 60);
}

// ── API 呼び出し ─────────────────────────────────────────────────────────

/**
 * Google Maps Routes API を呼び出して移動時間（分）を返す。
 * @param {{ lat: number, lng: number }} origin
 * @param {{ lat: number, lng: number }} destination
 * @param {string} arrivalTime ISO 8601
 * @param {string} apiKey
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<number | null>} 移動時間（分）、取得できない場合は null
 */
async function fetchTravelMinutes(origin, destination, arrivalTime, apiKey, fetchFn = fetch) {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const body = {
    origin: {
      location: { latLng: { latitude: origin.lat, longitude: origin.lng } },
    },
    destination: {
      location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
    },
    travelMode: 'TRANSIT',
    arrivalTime,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  let res;
  try {
    res = await fetchFn(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.duration',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Routes API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const route = data.routes?.[0];
  if (!route?.duration) return null;

  const seconds = parseDurationSeconds(route.duration);
  return secondsToMinutes(seconds);
}

// ── メイン処理 ───────────────────────────────────────────────────────────

/**
 * レース JSON の travel_times を計算して更新する。
 * @param {string} raceId
 * @param {string} apiKey
 * @param {typeof fetch} [fetchFn]
 */
async function calcTravelTimesForRace(raceId, apiKey, fetchFn = fetch) {
  const filePath = path.join(RACES_DIR, `${raceId}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const race = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!race.start_lat || !race.start_lng) {
    console.log(`[${raceId}] start_lat/start_lng が未設定のためスキップ`);
    return;
  }

  const destination = { lat: race.start_lat, lng: race.start_lng };

  // 大会の最も早いスタート時刻から arrival time を設定（デフォルト 08:00）
  const startTimes = (race.categories ?? []).map((c) => c.start_time).filter(Boolean);
  const earliestStart = startTimes.length > 0
    ? startTimes.reduce((a, b) => (a <= b ? a : b))
    : '08:00';
  const arrivalTime = `${race.date}T${earliestStart}:00+09:00`;

  const travelTimes = [];
  let id = 1;

  for (const hub of Object.values(HUBS)) {
    process.stdout.write(`  ${hub.id} → ${raceId} ... `);
    try {
      const minutes = await fetchTravelMinutes(hub, destination, arrivalTime, apiKey, fetchFn);
      if (minutes === null) {
        console.log('ルートなし');
        continue;
      }
      travelTimes.push({
        id: id++,
        race_id: raceId,
        hub_id: hub.id,
        duration_minutes: minutes,
        departure_time: null,
        calculated_at: new Date().toISOString(),
      });
      console.log(`${minutes}分`);
    } catch (err) {
      console.log(`エラー: ${err.message}`);
    }
    // レート制限対策
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  race.travel_times = travelTimes;
  fs.writeFileSync(filePath, JSON.stringify(race, null, 2) + '\n', 'utf-8');
  console.log(`[${raceId}] travel_times を更新しました (${travelTimes.length}件)`);
}

async function main() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_MAPS_API_KEY 環境変数が設定されていません');
    process.exit(1);
  }

  const targetId = process.argv[2];

  if (targetId) {
    await calcTravelTimesForRace(targetId, apiKey);
    return;
  }

  // 全レースを処理
  const files = fs.readdirSync(RACES_DIR).filter((f) => f.endsWith('.json') && f !== 'index.json');
  for (const file of files) {
    const raceId = file.replace('.json', '');
    await calcTravelTimesForRace(raceId, apiKey);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildRoutesApiUrl, parseDurationSeconds, secondsToMinutes, fetchTravelMinutes };
