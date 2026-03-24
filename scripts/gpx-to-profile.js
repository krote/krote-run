#!/usr/bin/env node
/**
 * gpx-to-profile.js
 *
 * public/gpx/*.gpx を読み込み、コースプロフィールJSONを生成して
 * public/course-profiles/*.json へ出力する。
 *
 * - GPX内に <ele> がある場合はそれを使用
 * - <ele> がない場合は国土地理院 標高APIから取得
 * - 累積距離は Haversine 公式で算出
 *
 * 使い方: node scripts/gpx-to-profile.js [race-id]
 *   race-id を省略すると public/gpx/ 以下のすべてを処理する
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GPX_DIR = path.join(__dirname, '../public/gpx');
const OUTPUT_DIR = path.join(__dirname, '../public/course-profiles');

// --- Haversine ---
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// --- GPX パーサー ---
function parseGpx(xml) {
  const points = [];
  // trkpt と wpt 両方に対応
  const regex = /<(?:trkpt|wpt)\s+lat="([^"]+)"\s+lon="([^"]+)"[^>]*>([\s\S]*?)<\/(?:trkpt|wpt)>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    const inner = match[3];
    const eleMatch = inner.match(/<ele>([\d.+-]+)<\/ele>/);
    const ele = eleMatch ? parseFloat(eleMatch[1]) : null;
    if (!isNaN(lat) && !isNaN(lng)) {
      points.push({ lat, lng, ele });
    }
  }
  return points;
}

// --- 国土地理院 標高API ---
function fetchElevation(lat, lng) {
  return new Promise((resolve) => {
    const url = `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lng}&lat=${lat}&outtype=JSON`;
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(typeof json.elevation === 'number' ? json.elevation : 0);
          } catch {
            resolve(0);
          }
        });
      })
      .on('error', () => resolve(0));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- 標高を全ポイントに付与 ---
async function attachElevations(points) {
  const needsApi = points.filter((p) => p.ele === null);
  if (needsApi.length === 0) return;

  console.log(`  標高APIから ${needsApi.length} 件取得中...`);
  for (const p of needsApi) {
    p.ele = await fetchElevation(p.lat, p.lng);
    await sleep(150); // レートリミット対策
  }
}

// --- ポイント数を間引く（最大 N 点に削減してファイルサイズ削減） ---
function downsample(points, maxPoints = 300) {
  if (points.length <= maxPoints) return points;
  const step = points.length / maxPoints;
  const result = [];
  for (let i = 0; i < maxPoints; i++) {
    result.push(points[Math.round(i * step)]);
  }
  // 必ず最後のポイントを含める
  result[result.length - 1] = points[points.length - 1];
  return result;
}

// --- メイン処理 ---
async function processGpxFile(gpxPath) {
  const filename = path.basename(gpxPath, '.gpx'); // e.g. "nagano-marathon-2026"
  const outputPath = path.join(OUTPUT_DIR, `${filename}.json`);

  console.log(`\n処理中: ${filename}`);

  const xml = fs.readFileSync(gpxPath, 'utf-8');
  let points = parseGpx(xml);

  if (points.length === 0) {
    console.log('  ⚠ トラックポイントが見つかりませんでした。スキップします。');
    return;
  }

  console.log(`  トラックポイント: ${points.length} 件`);

  // 間引き
  points = downsample(points, 300);

  // 標高付与
  await attachElevations(points);

  // 累積距離・獲得標高を計算
  let distKm = 0;
  let elevGain = 0;
  let elevLoss = 0;

  const profilePoints = points.map((p, i) => {
    if (i > 0) {
      const prev = points[i - 1];
      distKm += haversine(prev.lat, prev.lng, p.lat, p.lng);
      const diff = (p.ele ?? 0) - (prev.ele ?? 0);
      if (diff > 0) elevGain += diff;
      else elevLoss += Math.abs(diff);
    }
    return {
      lat: Math.round(p.lat * 1e6) / 1e6,
      lng: Math.round(p.lng * 1e6) / 1e6,
      ele: Math.round((p.ele ?? 0) * 10) / 10,
      dist_km: Math.round(distKm * 1000) / 1000,
    };
  });

  const profile = {
    race_id: filename,
    distance_km: Math.round(distKm * 1000) / 1000,
    total_elevation_gain_m: Math.round(elevGain),
    total_elevation_loss_m: Math.round(elevLoss),
    points: profilePoints,
  };

  fs.writeFileSync(outputPath, JSON.stringify(profile), 'utf-8');
  console.log(`  ✅ 出力: ${outputPath}`);
  console.log(`  距離: ${profile.distance_km}km  獲得標高: +${profile.total_elevation_gain_m}m / -${profile.total_elevation_loss_m}m`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const targetId = process.argv[2]; // 例: "nagano-marathon-2026"

  let gpxFiles;
  if (targetId) {
    const target = path.join(GPX_DIR, `${targetId}.gpx`);
    if (!fs.existsSync(target)) {
      console.error(`エラー: ${target} が見つかりません`);
      process.exit(1);
    }
    gpxFiles = [target];
  } else {
    gpxFiles = fs
      .readdirSync(GPX_DIR)
      .filter((f) => f.endsWith('.gpx'))
      .map((f) => path.join(GPX_DIR, f));
  }

  if (gpxFiles.length === 0) {
    console.log('GPXファイルが見つかりません。');
    return;
  }

  for (const file of gpxFiles) {
    await processGpxFile(file);
  }

  console.log('\n完了');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
