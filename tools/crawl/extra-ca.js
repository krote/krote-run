'use strict';

/**
 * tools/crawl/extra-ca.js
 * 中間証明書を送ってこないサイトを取得できるよう、不足している中間 CA を補う（#209）。
 *
 * NODE_EXTRA_CA_CERTS はプロセス起動時にしか読まれない（Node 22 には実行中に CA を
 * 追加する API がなく、--env-file 経由でも効かない）。そのため未設定なら、
 * 同じ引数・環境変数を足した子プロセスとして自分を起動し直す。
 * 証明書検証そのものは無効化しない。
 */

const path = require('path');
const { spawnSync } = require('child_process');

const EXTRA_CA_FILE = path.join(__dirname, 'extra-ca.pem');

/**
 * 自分を起動し直す必要があるか。
 * 既に設定済み（再起動後の子プロセス、または利用者が独自の PEM を指定）なら不要。
 * @param {Record<string, string|undefined>} env
 */
function shouldRelaunchWithExtraCa(env) {
  if (env.CRAWL_NO_EXTRA_CA === '1') return false;
  return !env.NODE_EXTRA_CA_CERTS;
}

function buildRelaunchEnv(env, caFile = EXTRA_CA_FILE) {
  return { ...env, NODE_EXTRA_CA_CERTS: caFile };
}

/**
 * NODE_EXTRA_CA_CERTS を付けて同じスクリプトを起動し直し、終了コードを返す
 * @returns {number}
 */
function relaunchWithExtraCa({
  execPath = process.execPath,
  argv = process.argv,
  env = process.env,
  spawnSyncFn = spawnSync,
} = {}) {
  const result = spawnSyncFn(execPath, argv.slice(1), {
    stdio: 'inherit',
    env: buildRelaunchEnv(env),
  });
  if (result.error || result.status === null) return 1;
  return result.status;
}

module.exports = { EXTRA_CA_FILE, shouldRelaunchWithExtraCa, buildRelaunchEnv, relaunchWithExtraCa };
