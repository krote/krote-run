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

// ── HTTPサーバー ──────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST',
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
        .filter((f) => f.endsWith('.json'))
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
        return jsonRes(res, { ok: true });
      }
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
});
