#!/usr/bin/env node
/**
 * HASHIRU Admin Server
 * Usage: node tools/admin-server.js  (or: npm run admin)
 * Access: http://localhost:4000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execSync } = require('child_process');

const PORT = 4000;
const ROOT = path.join(__dirname, '..');
const RACES_DIR = path.join(ROOT, 'src/data/races');
const IMAGES_DIR = path.join(ROOT, 'public/images/races');
const ADMIN_DIR = path.join(__dirname, 'admin');

// ── .env.local からAPIキーを読み込む ──────────────────────────────
function loadEnv() {
  try {
    const content = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf-8');
    for (const line of content.split('\n')) {
      const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
      if (m) {
        const key = m[1].trim();
        const val = m[2].trim().replace(/^["'](.*)["']$/, '$1');
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch { /* .env.local がなければスキップ */ }
}
loadEnv();

// ── ユーティリティ ────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => resolve(body));
  });
}

function jsonRes(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(data));
}

function serveStatic(res, filePath) {
  try {
    const ext = path.extname(filePath);
    const mime = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
    };
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

// ── Claude API で翻訳 ─────────────────────────────────────────────
async function translateWithClaude(text, field) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY が設定されていません。.env.local に追加してください。');

  const prompt = field === 'description'
    ? `Translate the following Japanese marathon race description to natural, concise English suitable for a race information website. Return only the translated text, no explanation:\n\n${text}`
    : `Translate the following Japanese text to natural English for a Japanese marathon race website. Return only the translated text, no explanation:\n\n${text}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

// ── Bedrock で情報抽出 ────────────────────────────────────────────
async function callBedrock(prompt) {
  const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

  const region = process.env.AWS_REGION || 'ap-northeast-1';
  const modelId = process.env.AWS_BEDROCK_MODEL_ID || 'anthropic.claude-3-5-haiku-20241022-v1:0';

  const clientConfig = { region };
  if (process.env.AWS_ACCESS_KEY_ID) {
    clientConfig.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      ...(process.env.AWS_SESSION_TOKEN ? { sessionToken: process.env.AWS_SESSION_TOKEN } : {}),
    };
  }

  const client = new BedrockRuntimeClient(clientConfig);
  const command = new InvokeModelCommand({
    modelId,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const response = await client.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  return result.content[0].text;
}

// ── HTML ユーティリティ ────────────────────────────────────────────
const OVERVIEW_KEYWORDS = ['概要', '要項', '開催', '規程', 'outline', 'overview', 'gaiyou', 'kaisai', 'youkou', 'info'];

/** HTMLをプレーンテキストに変換してトークンを削減 */
function cleanHtml(html, maxChars = 10000) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxChars);
}

/** HTMLから同一ドメインの「開催概要」系リンクを抽出 */
function extractOverviewLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const links = [];
  const seen = new Set([baseUrl]);

  const regex = /<a[^>]+href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const href = m[1].trim();
    const rawText = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    try {
      const full = new URL(href, base).href;
      if (new URL(full).hostname !== base.hostname) continue;
      if (seen.has(full)) continue;
      seen.add(full);

      const haystack = rawText + ' ' + full.toLowerCase();
      if (OVERVIEW_KEYWORDS.some(k => haystack.includes(k))) {
        links.push({ href: full, text: rawText });
      }
    } catch { /* ignore */ }
  }
  return links;
}

/** 公式URLをフェッチして概要ページ候補も含めてテキストを収集 */
async function fetchOfficialContent(officialUrl) {
  const FETCH_OPTS = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; HASHIRUBot/1.0)',
      'Accept-Language': 'ja,en;q=0.9',
    },
    signal: AbortSignal.timeout(15000),
  };

  // メインページ取得
  const mainRes = await fetch(officialUrl, FETCH_OPTS);
  if (!mainRes.ok) throw new Error(`HTTPエラー: ${mainRes.status} ${officialUrl}`);
  const mainHtml = await mainRes.text();

  const pages = [{ url: officialUrl, text: cleanHtml(mainHtml) }];

  // 開催概要系リンクを最大2件追加取得
  const overviewLinks = extractOverviewLinks(mainHtml, officialUrl).slice(0, 2);
  for (const link of overviewLinks) {
    try {
      const res = await fetch(link.href, FETCH_OPTS);
      if (res.ok) {
        const html = await res.text();
        pages.push({ url: link.href, text: cleanHtml(html) });
      }
    } catch { /* 取得失敗は無視 */ }
  }

  return pages;
}

/** Bedrockで大会情報を構造化抽出 */
async function extractRaceInfo(pages) {
  const content = pages
    .map(p => `=== ページ: ${p.url} ===\n${p.text}`)
    .join('\n\n---\n\n');

  const prompt = `以下のWebページ（マラソン大会の公式サイト）のテキストから、大会情報を抽出してください。

必ず以下のJSON形式のみを返してください（説明文・前置き・マークダウン記法不要）:
{
  "date": "YYYY-MM-DD",
  "name_ja": "大会名（日本語）",
  "entry_start_date": "YYYY-MM-DD",
  "entry_end_date": "YYYY-MM-DD",
  "entry_fee": 数値,
  "entry_capacity": 数値,
  "confidence": "high" または "medium" または "low",
  "notes": "特記事項"
}

【注意事項】
- 日付はYYYY-MM-DD形式（例: 2027-02-21）
- 不明・未記載の項目はnullを返す
- entry_feeはフルマラソン（またはメイン種目）の一般参加費（円、数値のみ）
- entry_capacityは定員（人数）
- 年が明記されていない場合は文脈から推定（次回開催年など）
- JSONのみ返すこと（\`\`\`等の記法なし）

---ページ内容---
${content}`;

  const raw = await callBedrock(prompt);

  // JSONブロックを除去して解析
  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AIからJSONレスポンスが得られませんでした');
  return JSON.parse(jsonMatch[0]);
}

// ── ローカルDB同期 ────────────────────────────────────────────────
function syncLocalDb() {
  const persistPath = path.join(
    process.env.USERPROFILE || process.env.HOME || '',
    '.wrangler', 'states', 'krote-run'
  );
  try {
    console.log('[DB同期] シードSQL生成中...');
    execSync('node scripts/generate-seed-races.js', { cwd: ROOT, stdio: 'pipe' });
    console.log('[DB同期] ローカルDBに反映中...');
    execSync(
      `npx wrangler d1 execute krote-run-db --local --file=./migrations/seed-races.sql --persist-to "${persistPath}"`,
      { cwd: ROOT, stdio: 'pipe' }
    );
    console.log('[DB同期] 完了');
    return { ok: true };
  } catch (err) {
    console.error('[DB同期] エラー:', err.stderr?.toString() || err.message);
    return { ok: false, error: err.message };
  }
}

// ── シリーズユーティリティ ────────────────────────────────────────
function toSeriesId(raceId) {
  return raceId.replace(/-\d{4}$/, '');
}

/** JSON一覧からシリーズ別最新大会を取得 */
function buildSeriesList() {
  const files = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();

  const map = {};
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(RACES_DIR, file), 'utf-8'));
    const sid = toSeriesId(data.id);
    if (!map[sid]) {
      map[sid] = { id: sid, name_ja: data.name_ja, races: [] };
    }
    map[sid].races.push({ id: data.id, date: data.date, official_url: data.official_url || '' });
  }

  return Object.values(map).map(s => {
    const sorted = s.races.sort((a, b) => b.date.localeCompare(a.date));
    return { id: s.id, name_ja: s.name_ja, latestRace: sorted[0] };
  }).sort((a, b) => a.name_ja.localeCompare(b.name_ja, 'ja'));
}

/** 開催日の差分ステータスを判定 */
function determineDateStatus(registeredDate, extractedDate) {
  if (!extractedDate) return 'unknown';
  if (registeredDate === extractedDate) return 'same';
  const today = new Date().toISOString().split('T')[0];
  if (registeredDate <= today) return 'next_race';
  return 'ambiguous';
}

/** 2つの大会データを比較してdiffを生成 */
function buildDiff(current, extracted) {
  const FIELDS = [
    { key: 'date',              label: '開催日' },
    { key: 'name_ja',           label: '大会名（日本語）' },
    { key: 'entry_start_date',  label: '申込開始日' },
    { key: 'entry_end_date',    label: '申込締切日' },
    { key: 'entry_fee',         label: '参加費（円）' },
    { key: 'entry_capacity',    label: '定員（人）' },
  ];

  return FIELDS
    .filter(f => extracted[f.key] !== null && extracted[f.key] !== undefined)
    .map(f => ({
      key: f.key,
      label: f.label,
      current: current[f.key] ?? null,
      extracted: extracted[f.key],
      changed: String(current[f.key] ?? '') !== String(extracted[f.key] ?? ''),
    }));
}

// ── HTTPサーバー ──────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  try {
    // ── 静的ファイル ──
    if (method === 'GET' && pathname === '/') return serveStatic(res, path.join(ADMIN_DIR, 'index.html'));
    if (method === 'GET' && pathname === '/app.js') return serveStatic(res, path.join(ADMIN_DIR, 'app.js'));
    if (method === 'GET' && pathname === '/style.css') return serveStatic(res, path.join(ADMIN_DIR, 'style.css'));

    // ── 大会画像の配信 ──
    if (method === 'GET' && pathname.startsWith('/images/')) {
      return serveStatic(res, path.join(ROOT, 'public', pathname));
    }

    // ── API: 大会一覧 ──
    if (method === 'GET' && pathname === '/api/races') {
      const files = fs.readdirSync(RACES_DIR)
        .filter((f) => f.endsWith('.json') && f !== 'index.json')
        .sort();
      const races = files.map((f) => {
        const d = JSON.parse(fs.readFileSync(path.join(RACES_DIR, f), 'utf-8'));
        const hasImage = fs.existsSync(path.join(IMAGES_DIR, `${d.id}.jpg`)) ||
                         fs.existsSync(path.join(IMAGES_DIR, `${d.id}.png`)) ||
                         fs.existsSync(path.join(IMAGES_DIR, `${d.id}.webp`));
        return { id: d.id, name_ja: d.name_ja, full_name_ja: d.full_name_ja ?? null, date: d.date, hasImage };
      });
      return jsonRes(res, races);
    }

    // ── API: 大会1件取得 / 保存 ──
    const raceMatch = pathname.match(/^\/api\/races\/([^/]+)$/);
    if (raceMatch) {
      const id = raceMatch[1];
      const filePath = path.join(RACES_DIR, `${id}.json`);

      if (method === 'GET') {
        if (!fs.existsSync(filePath)) return jsonRes(res, { error: 'Not found' }, 404);
        return jsonRes(res, JSON.parse(fs.readFileSync(filePath, 'utf-8')));
      }

      if (method === 'PUT') {
        const body = await readBody(req);
        const data = JSON.parse(body);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
        console.log(`[保存] ${id}`);
        const sync = syncLocalDb();
        return jsonRes(res, { ok: true, dbSync: sync });
      }

      if (method === 'DELETE') {
        if (!fs.existsSync(filePath)) return jsonRes(res, { error: 'Not found' }, 404);
        fs.unlinkSync(filePath);
        console.log(`[削除] ${id}`);
        const sync = syncLocalDb();
        return jsonRes(res, { ok: true, dbSync: sync });
      }
    }

    // ── API: 大会新規作成 ──
    if (method === 'POST' && pathname === '/api/races') {
      const { mode, seriesId, year, name_ja, name_en, date, prefecture } = JSON.parse(await readBody(req));
      if (!seriesId || !year) return jsonRes(res, { error: 'seriesId, year が必要です' }, 400);
      const now = new Date().toISOString();
      const raceId = `${seriesId}-${year}`;
      const destPath = path.join(RACES_DIR, `${raceId}.json`);
      if (fs.existsSync(destPath)) return jsonRes(res, { error: `${raceId}.json は既に存在します` }, 409);

      if (mode === 'from-series') {
        // 既存シリーズの最新大会をコピーして新規作成
        const files = fs.readdirSync(RACES_DIR)
          .filter(f => f.endsWith('.json') && f !== 'index.json' && f.startsWith(seriesId + '-'))
          .sort();
        if (files.length === 0) return jsonRes(res, { error: 'シリーズのJSONが見つかりません' }, 404);
        const latest = JSON.parse(fs.readFileSync(path.join(RACES_DIR, files[files.length - 1]), 'utf-8'));
        const newRace = {
          ...latest,
          id: raceId,
          date: `${year}-01-01`,
          entry_start_date: null,
          entry_end_date: null,
          result: null,
          created_at: now,
          updated_at: now,
        };
        fs.writeFileSync(destPath, JSON.stringify(newRace, null, 2) + '\n', 'utf-8');
        console.log(`[新規作成(既存シリーズ)] ${raceId}`);
        const sync1 = syncLocalDb();
        return jsonRes(res, { ok: true, id: raceId, dbSync: sync1 });

      } else if (mode === 'new-series') {
        if (!name_ja) return jsonRes(res, { error: 'name_ja が必要です' }, 400);
        const newRace = {
          id: raceId,
          name_ja,
          name_en: name_en || '',
          full_name_ja: null,
          full_name_en: null,
          edition: null,
          date: date || `${year}-01-01`,
          prefecture: prefecture || '13',
          city_ja: '',
          city_en: '',
          description_ja: '',
          description_en: '',
          official_url: null,
          entry_fee: 0,
          entry_fee_by_category: true,
          entry_capacity: 0,
          entry_start_date: null,
          entry_end_date: null,
          reception_type: 'pre_day',
          reception_note_ja: '',
          reception_note_en: '',
          tags: [],
          course_gpx_file: null,
          course_info: {
            max_elevation_m: null, min_elevation_m: null, elevation_diff_m: null,
            surface: 'road', certification: [],
            highlights_ja: '', highlights_en: '', notes_ja: '', notes_en: '',
          },
          categories: [],
          aid_stations: [],
          checkpoints: [],
          access_points: [],
          nearby_spots: [],
          result: null,
          created_at: now,
          updated_at: now,
        };
        fs.writeFileSync(destPath, JSON.stringify(newRace, null, 2) + '\n', 'utf-8');
        console.log(`[新規作成(新シリーズ)] ${raceId}`);
        const sync2 = syncLocalDb();
        return jsonRes(res, { ok: true, id: raceId, dbSync: sync2 });
      }

      return jsonRes(res, { error: '不正なmode' }, 400);
    }

    // ── API: 翻訳 ──
    if (method === 'POST' && pathname === '/api/translate') {
      const { text, field } = JSON.parse(await readBody(req));
      if (!text?.trim()) return jsonRes(res, { error: '翻訳するテキストがありません' }, 400);
      const translated = await translateWithClaude(text, field);
      return jsonRes(res, { translated });
    }

    // ── API: 画像アップロード ──
    const uploadMatch = pathname.match(/^\/api\/upload\/([^/]+)$/);
    if (method === 'POST' && uploadMatch) {
      const { base64, ext } = JSON.parse(await readBody(req));
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
      const buffer = Buffer.from(base64.split(',')[1], 'base64');
      const filename = `${uploadMatch[1]}${ext || '.jpg'}`;
      fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer);
      console.log(`[画像] ${filename}`);
      return jsonRes(res, { ok: true, url: `/images/races/${filename}` });
    }

    // ── API: シリーズ一覧 ──
    if (method === 'GET' && pathname === '/api/series') {
      return jsonRes(res, buildSeriesList());
    }

    // ── API: シリーズ更新チェック ──
    if (method === 'POST' && pathname === '/api/series-check') {
      const { seriesId } = JSON.parse(await readBody(req));
      if (!seriesId) return jsonRes(res, { error: 'seriesId が必要です' }, 400);

      const series = buildSeriesList();
      const target = series.find(s => s.id === seriesId);
      if (!target) return jsonRes(res, { error: 'シリーズが見つかりません' }, 404);

      const { latestRace } = target;
      if (!latestRace.official_url) {
        return jsonRes(res, { error: '公式URLが設定されていません' }, 400);
      }

      // 公式サイトをフェッチ
      console.log(`[チェック] ${seriesId}: ${latestRace.official_url}`);
      const pages = await fetchOfficialContent(latestRace.official_url);
      console.log(`[チェック] ${pages.length}ページ取得: ${pages.map(p => p.url).join(', ')}`);

      // Bedrockで情報抽出
      const extracted = await extractRaceInfo(pages);
      console.log(`[チェック] 抽出結果:`, extracted);

      // 現在のデータを取得
      const currentData = JSON.parse(
        fs.readFileSync(path.join(RACES_DIR, `${latestRace.id}.json`), 'utf-8')
      );

      // 差分を計算
      const diff = buildDiff(currentData, extracted);
      const dateStatus = determineDateStatus(currentData.date, extracted.date);

      // 新規追加の場合の候補ID
      let newRaceId = null;
      if (extracted.date && dateStatus !== 'same') {
        const year = extracted.date.slice(0, 4);
        newRaceId = `${seriesId}-${year}`;
      }

      return jsonRes(res, {
        seriesId,
        seriesName: target.name_ja,
        currentRaceId: latestRace.id,
        currentDate: currentData.date,
        sourceUrls: pages.map(p => p.url),
        extracted,
        diff,
        dateStatus,
        newRaceId,
      });
    }

    // ── API: シリーズ変更を適用 ──
    if (method === 'POST' && pathname === '/api/series-apply') {
      const { raceId, updates, mode, newRaceId } = JSON.parse(await readBody(req));
      if (!raceId || !updates) return jsonRes(res, { error: 'raceId, updates が必要です' }, 400);

      const srcPath = path.join(RACES_DIR, `${raceId}.json`);
      if (!fs.existsSync(srcPath)) return jsonRes(res, { error: 'ファイルが見つかりません' }, 404);

      const current = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
      const now = new Date().toISOString();

      if (mode === 'update') {
        // 既存ファイルを更新
        const updated = {
          ...current,
          ...updates,
          updated_at: now,
          _metadata: {
            ...current._metadata,
            last_verified: now.slice(0, 10),
          },
        };
        fs.writeFileSync(srcPath, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
        console.log(`[更新] ${raceId}`);
        const syncU = syncLocalDb();
        return jsonRes(res, { ok: true, id: raceId, mode: 'update', dbSync: syncU });

      } else if (mode === 'new') {
        // 新規ファイルを作成
        const targetId = newRaceId || `${toSeriesId(raceId)}-${(updates.date || '').slice(0, 4)}`;
        const destPath = path.join(RACES_DIR, `${targetId}.json`);
        if (fs.existsSync(destPath)) {
          return jsonRes(res, { error: `${targetId}.json は既に存在します` }, 409);
        }
        const newRace = {
          ...current,
          id: targetId,
          ...updates,
          // エントリー期間はリセット（新大会のため）
          entry_start_date: updates.entry_start_date ?? null,
          entry_end_date: updates.entry_end_date ?? null,
          // 結果・実績はリセット
          result: null,
          created_at: now,
          updated_at: now,
          _metadata: {
            ...current._metadata,
            last_verified: now.slice(0, 10),
            data_accuracy_notes: ['公式サイトから自動取得。要確認。'],
          },
        };
        fs.writeFileSync(destPath, JSON.stringify(newRace, null, 2) + '\n', 'utf-8');
        console.log(`[新規作成] ${targetId}`);
        const syncN = syncLocalDb();
        return jsonRes(res, { ok: true, id: targetId, mode: 'new', dbSync: syncN });
      }

      return jsonRes(res, { error: '不正なmode' }, 400);
    }

    res.writeHead(404);
    res.end('Not found');
  } catch (err) {
    console.error(err);
    jsonRes(res, { error: err.message }, 500);
  }
});

server.listen(PORT, () => {
  console.log('\n🏃 HASHIRU Admin Server');
  console.log(`   http://localhost:${PORT}`);
  console.log('   Ctrl+C で終了\n');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('⚠️  ANTHROPIC_API_KEY が未設定です。翻訳機能は使えません。');
    console.log('   .env.local に ANTHROPIC_API_KEY=sk-ant-... を追加してください。\n');
  }
  const hasAwsCreds = process.env.AWS_ACCESS_KEY_ID || process.env.AWS_PROFILE;
  if (!hasAwsCreds) {
    console.log('⚠️  AWS認証情報が未設定です。更新チェック機能は使えません。');
    console.log('   .env.local に AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_REGION を追加してください。\n');
  }
});
