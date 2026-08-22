#!/usr/bin/env node
/**
 * クロスプラットフォーム対応の cf:build ラッパー。
 * Windows では NODE_OPTIONS に patch-symlink-win32.cjs を注入して
 * pnpm symlink → junction 変換を有効にする。
 */
const { execSync } = require('child_process');
const path = require('path');

const env = { ...process.env };

if (process.platform === 'win32') {
  // NODE_OPTIONS のパスはフォワードスラッシュを使う（バックスラッシュはエスケープ問題あり）
  const patchFile = path.resolve(__dirname, 'patch-symlink-win32.cjs').replace(/\\/g, '/');
  const existing = env.NODE_OPTIONS || '';
  env.NODE_OPTIONS = `${existing} --require "${patchFile}"`.trim();
}

execSync('npx opennextjs-cloudflare build', { stdio: 'inherit', env });
