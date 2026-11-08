'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const crypto = require('crypto');
const { EXTRA_CA_FILE, shouldRelaunchWithExtraCa, buildRelaunchEnv, relaunchWithExtraCa } = require('./extra-ca');

describe('EXTRA_CA_FILE（#209）', () => {
  test('同梱の PEM は有効な証明書だけを含む', () => {
    const pem = fs.readFileSync(EXTRA_CA_FILE, 'utf-8');
    const blocks = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) ?? [];
    assert.ok(blocks.length >= 2);
    for (const block of blocks) {
      const cert = new crypto.X509Certificate(block);
      assert.equal(cert.ca, true, `${cert.subject} は CA 証明書であること`);
    }
  });
});

describe('shouldRelaunchWithExtraCa', () => {
  test('NODE_EXTRA_CA_CERTS 未設定なら再起動する', () => {
    assert.equal(shouldRelaunchWithExtraCa({}), true);
  });

  test('設定済み（自分で再起動した子プロセス・利用者の指定）なら再起動しない', () => {
    assert.equal(shouldRelaunchWithExtraCa({ NODE_EXTRA_CA_CERTS: '/x.pem' }), false);
  });

  test('CRAWL_NO_EXTRA_CA=1 なら再起動しない', () => {
    assert.equal(shouldRelaunchWithExtraCa({ CRAWL_NO_EXTRA_CA: '1' }), false);
  });
});

describe('buildRelaunchEnv', () => {
  test('元の env を変更せず NODE_EXTRA_CA_CERTS を足す', () => {
    const env = { PATH: '/bin' };
    const next = buildRelaunchEnv(env, '/ca.pem');
    assert.deepEqual(next, { PATH: '/bin', NODE_EXTRA_CA_CERTS: '/ca.pem' });
    assert.deepEqual(env, { PATH: '/bin' });
  });
});

describe('relaunchWithExtraCa', () => {
  test('同じ node・同じ引数で子プロセスを起動し終了コードを返す', () => {
    const calls = [];
    const spawnSyncFn = (cmd, args, opts) => { calls.push({ cmd, args, opts }); return { status: 3 }; };
    const status = relaunchWithExtraCa({
      execPath: '/node', argv: ['/node', 'index.js', '--dry-run'], env: {}, spawnSyncFn,
    });
    assert.equal(status, 3);
    assert.equal(calls[0].cmd, '/node');
    assert.deepEqual(calls[0].args, ['index.js', '--dry-run']);
    assert.equal(calls[0].opts.stdio, 'inherit');
    assert.equal(calls[0].opts.env.NODE_EXTRA_CA_CERTS, EXTRA_CA_FILE);
  });

  test('起動に失敗したら 1 を返す', () => {
    const status = relaunchWithExtraCa({
      execPath: '/node', argv: ['/node', 'x.js'], env: {}, spawnSyncFn: () => ({ status: null, error: new Error('x') }),
    });
    assert.equal(status, 1);
  });
});
