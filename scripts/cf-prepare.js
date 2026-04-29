#!/usr/bin/env node
/**
 * Cloudflare Pages デプロイ前準備スクリプト (Windows 対応)
 *
 * OpenNext は Windows でworker.jsをassets/_worker.jsに配置しないため手動で行う。
 * また Cloudflare Pages の advanced mode (_worker.js) では全リクエストが Worker 経由になるため、
 * /_next/static/ などの静的アセットを env.ASSETS 経由で配信するよう worker.js を修正する。
 */

const fs = require('fs');
const path = require('path');

const openNextDir = path.join(__dirname, '..', '.open-next');
const assetsDir = path.join(openNextDir, 'assets');
const workerSrc = path.join(openNextDir, 'worker.js');
const workerDst = path.join(openNextDir, '_worker.js');

// assets/ → .open-next/ にコピー（/_next/... 等が正しいURLで配信されるように）
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

console.log('Copying assets to .open-next root...');
copyDir(assetsDir, openNextDir);

// worker.js を読み込み、env.ASSETS による静的アセット配信を注入して _worker.js に保存
console.log('Patching worker.js with ASSETS handling...');
const workerCode = fs.readFileSync(workerSrc, 'utf-8');

// fetch ハンドラの先頭に env.ASSETS フォールバックを注入
const assetsCheck = `
        // Cloudflare Pages advanced mode: 静的アセットを env.ASSETS 経由で配信
        if (env.ASSETS) {
            const _url = new URL(request.url);
            const _p = _url.pathname;
            const isStaticAsset =
                _p.startsWith("/_next/static/") ||
                _p.startsWith("/_next/image/") ||
                _p.startsWith("/course-profiles/") ||
                _p.startsWith("/gpx/") ||
                /\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|otf|js\\.map|css\\.map)$/.test(_p);
            if (isStaticAsset) {
                const _assetResp = await env.ASSETS.fetch(request.clone());
                if (_assetResp.status !== 404) {
                    return _assetResp;
                }
            }
        }
`;

// `return runWithCloudflareRequestContext` の直前に注入
const insertionPoint = '        return runWithCloudflareRequestContext(request, env, ctx, async () => {';
if (!workerCode.includes(insertionPoint)) {
  console.error('ERROR: Could not find injection point in worker.js. Patch may not work.');
  process.exit(1);
}

const patched = workerCode.replace(
  insertionPoint,
  assetsCheck + '\n' + insertionPoint
);

fs.writeFileSync(workerDst, patched, 'utf-8');
console.log('Done.');
