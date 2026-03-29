import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// 開発時のみ: ネットワークドライブ上の SQLite WAL問題を回避するため
// wrangler のローカル状態をホームディレクトリに保持する
// 本番ビルド時は呼ばないこと（Workerが存在しないローカルパスを参照して全ルート404になる）
if (process.env.NODE_ENV === 'development') {
  const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');
  const { join } = require('path');
  const { homedir } = require('os');
  initOpenNextCloudflareForDev({
    persist: { path: join(homedir(), '.wrangler', 'states', 'krote-run', 'v3') },
  });
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages では next/image の組み込み最適化は使用できないため unoptimized に設定
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
