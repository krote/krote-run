import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { join } from 'path';
import { homedir } from 'os';

// ネットワークドライブ上の SQLite は WAL モードが動作しないため、
// wrangler のローカル状態をユーザーのホームディレクトリに保持する
initOpenNextCloudflareForDev({
  persist: { path: join(homedir(), '.wrangler', 'states', 'krote-run', 'v3') },
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages では next/image の組み込み最適化は使用できないため unoptimized に設定
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
