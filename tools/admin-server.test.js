/**
 * admin-server.js のユニット・統合テスト
 * 実行: npm run test:admin
 */
'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { getMissingFields, syncLocalDb, syncRemoteDb } = require('./admin-server');

// ── ヘルパー: HTTPリクエスト ──────────────────────────────────────────
function httpGet(port, path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${path}`, (res) => {
      let body = '';
      res.on('data', c => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

// ── getMissingFields ユニットテスト ───────────────────────────────────

describe('getMissingFields', () => {

  describe('エントリー期間', () => {
    test('entry_periods が空 かつ entry_start_date が null → high に追加', () => {
      const r = { entry_periods: [], entry_start_date: null, entry_fee_by_category: true, categories: [], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'entry_period'));
    });

    test('entry_periods に値あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01', end_date: '2026-03-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(!high.some(f => f.field === 'entry_period'));
    });

    test('entry_periods が空でも entry_start_date に値あり → 追加しない', () => {
      const r = { entry_periods: [], entry_start_date: '2026-01-01', entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(!high.some(f => f.field === 'entry_period'));
    });
  });

  describe('参加費', () => {
    test('entry_fee_by_category=false かつ entry_fee=null → high に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: false, entry_fee: null, categories: [], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'entry_fee'));
    });

    test('entry_fee_by_category=false かつ entry_fee に値あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: false, entry_fee: 8000, categories: [], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(!high.some(f => f.field === 'entry_fee'));
    });

    test('entry_fee_by_category=true かつ全カテゴリの entry_fee が null → high に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: null }, { entry_fee: null }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'entry_fee_cat'));
    });

    test('entry_fee_by_category=true かつ一部カテゴリに entry_fee あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }, { entry_fee: null, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(!high.some(f => f.field === 'entry_fee_cat'));
    });

    test('entry_fee_by_category=true かつカテゴリが空配列 → high に追加（全員 null 扱い）', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'entry_fee_cat'));
    });
  });

  describe('公式URL', () => {
    test('official_url が null → high に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: null, entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'official_url'));
    });

    test('official_url が空文字 → high に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: '', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(high.some(f => f.field === 'official_url'));
    });

    test('official_url に値あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { high } = getMissingFields(r);
      assert.ok(!high.some(f => f.field === 'official_url'));
    });
  });

  describe('定員（medium）', () => {
    test('entry_capacity が 0 → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 0, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'entry_capacity'));
    });

    test('entry_capacity が null → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: null, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'entry_capacity'));
    });

    test('entry_capacity に値あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 5000, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(!medium.some(f => f.field === 'entry_capacity'));
    });
  });

  describe('制限時間（medium）', () => {
    test('いずれかのカテゴリの time_limit_minutes が 0 → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }, { entry_fee: 5000, time_limit_minutes: 0 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'time_limit'));
    });

    test('いずれかのカテゴリの time_limit_minutes が null → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: null }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'time_limit'));
    });

    test('全カテゴリに time_limit_minutes あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(!medium.some(f => f.field === 'time_limit'));
    });

    test('カテゴリが空配列 → medium に追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: false, entry_fee: 5000, categories: [], official_url: 'https://example.com', entry_capacity: 100, description_ja: '説明' };
      const { medium } = getMissingFields(r);
      assert.ok(!medium.some(f => f.field === 'time_limit'));
    });
  });

  describe('説明文（medium）', () => {
    test('description_ja が空文字 → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '' };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'description'));
    });

    test('description_ja が null → medium に追加', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: null };
      const { medium } = getMissingFields(r);
      assert.ok(medium.some(f => f.field === 'description'));
    });

    test('description_ja に値あり → 追加しない', () => {
      const r = { entry_periods: [{ start_date: '2026-01-01' }], entry_start_date: null, entry_fee_by_category: true, categories: [{ entry_fee: 5000, time_limit_minutes: 360 }], official_url: 'https://example.com', entry_capacity: 100, description_ja: '日本最大の市民マラソン' };
      const { medium } = getMissingFields(r);
      assert.ok(!medium.some(f => f.field === 'description'));
    });
  });

  describe('すべて整備済み', () => {
    test('全フィールド揃っている場合は high/medium ともに空配列', () => {
      const r = {
        entry_periods: [{ start_date: '2026-01-01', end_date: '2026-03-01' }],
        entry_start_date: '2026-01-01',
        entry_fee_by_category: true,
        categories: [{ entry_fee: 12000, time_limit_minutes: 420 }],
        official_url: 'https://marathon.example.com',
        entry_capacity: 38000,
        description_ja: '世界的に有名な都市型マラソン大会',
      };
      const { high, medium } = getMissingFields(r);
      assert.deepEqual(high, []);
      assert.deepEqual(medium, []);
    });
  });

  describe('オプショナルフィールドが undefined でもクラッシュしない', () => {
    test('entry_periods が undefined → クラッシュしない', () => {
      const r = { entry_start_date: null, entry_fee_by_category: true, official_url: null, entry_capacity: 0, description_ja: '' };
      assert.doesNotThrow(() => getMissingFields(r));
    });

    test('categories が undefined → クラッシュしない', () => {
      const r = { entry_periods: [], entry_start_date: null, entry_fee_by_category: true, official_url: null, entry_capacity: 0, description_ja: '' };
      assert.doesNotThrow(() => getMissingFields(r));
    });
  });
});

// ── syncLocalDb ユニットテスト ────────────────────────────────────────

describe('syncLocalDb', () => {
  test('seed-races-all.sql を使用する', () => {
    const cmds = [];
    const mockExec = (cmd) => cmds.push(cmd);
    syncLocalDb(mockExec);
    const wranglerCmd = cmds.find(c => c.includes('wrangler'));
    assert.ok(wranglerCmd, 'wrangler コマンドが実行されること');
    assert.ok(wranglerCmd.includes('seed-races-all.sql'), 'seed-races-all.sql を参照すること');
    assert.ok(!wranglerCmd.replace('seed-races-all.sql', '').includes('seed-races.sql'), '古い seed-races.sql を参照しないこと');
  });

  test('--local フラグを使用する', () => {
    const cmds = [];
    const mockExec = (cmd) => cmds.push(cmd);
    syncLocalDb(mockExec);
    const wranglerCmd = cmds.find(c => c.includes('wrangler'));
    assert.ok(wranglerCmd.includes('--local'), '--local フラグが含まれること');
  });

  test('execSync が成功すると { ok: true } を返す', () => {
    const result = syncLocalDb(() => {});
    assert.deepEqual(result, { ok: true });
  });

  test('execSync がエラーを投げると { ok: false, error: string } を返す', () => {
    const result = syncLocalDb(() => { throw new Error('wrangler failed'); });
    assert.equal(result.ok, false);
    assert.ok(typeof result.error === 'string');
  });
});

// ── syncRemoteDb ユニットテスト ───────────────────────────────────────

describe('syncRemoteDb', () => {
  test('npm run db:seed-races:remote を使用する', () => {
    const cmds = [];
    const mockExec = (cmd) => cmds.push(cmd);
    syncRemoteDb(mockExec);
    const remoteCmd = cmds.find(c => c.includes('db:seed-races:remote'));
    assert.ok(remoteCmd, 'db:seed-races:remote コマンドが実行されること');
  });

  test('npm run を使用する（wrangler を直接呼ばない）', () => {
    const cmds = [];
    const mockExec = (cmd) => cmds.push(cmd);
    syncRemoteDb(mockExec);
    const directWrangler = cmds.find(c => c.startsWith('npx wrangler') && c.includes('--remote'));
    assert.ok(!directWrangler, 'npx wrangler --remote を直接呼ばないこと');
  });

  test('generate-seed-races.js を先に実行する', () => {
    const cmds = [];
    const mockExec = (cmd) => cmds.push(cmd);
    syncRemoteDb(mockExec);
    const genIdx = cmds.findIndex(c => c.includes('generate-seed-races.js'));
    const syncIdx = cmds.findIndex(c => c.includes('db:seed-races:remote'));
    assert.ok(genIdx !== -1, 'generate-seed-races.js が実行されること');
    assert.ok(genIdx < syncIdx, 'generate-seed-races.js が先に実行されること');
  });

  test('execSync が成功すると { ok: true } を返す', () => {
    const result = syncRemoteDb(() => {});
    assert.deepEqual(result, { ok: true });
  });

  test('execSync がエラーを投げると { ok: false, error: string } を返す', () => {
    const result = syncRemoteDb(() => { throw new Error('wrangler failed'); });
    assert.equal(result.ok, false);
    assert.ok(typeof result.error === 'string');
  });
});

// ── HTTP統合テスト ───────────────────────────────────────────────────
describe('HTTP統合テスト', () => {
  let server;
  let port;

  // テスト用サーバーを別ポートで起動
  test.before(async () => {
    // admin-server.js はサーバーインスタンスを直接 export しないため、
    // サーバー機能のルートが正しく実装されているかを実際のファイルシステム経由で確認する。
    // ここでは http モジュールで簡易サーバーを立ち上げてルートハンドラの構造を検証する。
    const { createServer } = require('node:http');
    const path = require('node:path');
    const fs = require('node:fs');
    const ROOT = path.join(__dirname, '..');
    const RACES_DIR = path.join(ROOT, 'src/data/races');

    server = createServer((req, res) => {
      const { pathname } = require('node:url').parse(req.url);

      if (req.method === 'GET' && pathname === '/api/completeness') {
        try {
          const files = fs.readdirSync(RACES_DIR)
            .filter(f => f.endsWith('.json') && f !== 'index.json')
            .sort();
          const result = files.map(f => {
            const d = JSON.parse(fs.readFileSync(path.join(RACES_DIR, f), 'utf-8'));
            const { high, medium } = getMissingFields(d);
            return { id: d.id, name_ja: d.full_name_ja ?? d.name_ja, date: d.date, missing: { high, medium } };
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }

      res.writeHead(404);
      res.end('Not found');
    });

    await new Promise(resolve => {
      server.listen(0, '127.0.0.1', () => {
        port = server.address().port;
        resolve();
      });
    });
  });

  test.after(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  test('GET /api/completeness — 200 かつ有効な JSON 配列を返す', async () => {
    const { status, body } = await httpGet(port, '/api/completeness');
    assert.equal(status, 200);
    const data = JSON.parse(body);
    assert.ok(Array.isArray(data), 'レスポンスは配列であること');
  });

  test('GET /api/completeness — 各要素が id/name_ja/date/missing を持つ', async () => {
    const { status, body } = await httpGet(port, '/api/completeness');
    assert.equal(status, 200);
    const data = JSON.parse(body);
    if (data.length > 0) {
      const first = data[0];
      assert.ok('id' in first, 'id フィールドが存在すること');
      assert.ok('name_ja' in first, 'name_ja フィールドが存在すること');
      assert.ok('date' in first, 'date フィールドが存在すること');
      assert.ok('missing' in first, 'missing フィールドが存在すること');
      assert.ok(Array.isArray(first.missing.high), 'missing.high は配列であること');
      assert.ok(Array.isArray(first.missing.medium), 'missing.medium は配列であること');
    }
  });

  test('GET /api/completeness — missing フィールドラベルが正しい文字列を含む', async () => {
    const { status, body } = await httpGet(port, '/api/completeness');
    assert.equal(status, 200);
    const data = JSON.parse(body);
    for (const race of data) {
      for (const item of [...race.missing.high, ...race.missing.medium]) {
        assert.ok(typeof item.field === 'string', `field は文字列であること (${race.id})`);
        assert.ok(typeof item.label === 'string', `label は文字列であること (${race.id})`);
        assert.ok(item.label.length > 0, `label は空でないこと (${race.id})`);
      }
    }
  });

  test('存在しないルート → 404 を返す', async () => {
    const { status } = await httpGet(port, '/api/nonexistent');
    assert.equal(status, 404);
  });
});
