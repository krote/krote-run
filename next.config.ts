import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages では next/image の組み込み最適化は使用できないため unoptimized に設定
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
