import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    // コンポーネントテストは jsdom、ユニットテストは node（ファイルごとに @vitest-environment で上書き可能）
    environment: 'node',
    exclude: ['node_modules/**', 'tools/**', 'scripts/**'],
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/lib/**/*.ts',
        'src/app/**/*.ts',
        'src/app/**/*.tsx',
        'src/components/**/*.tsx',
      ],
      exclude: [
        'src/lib/db/schema.ts',
        'src/lib/types.ts',
        'src/**/__tests__/**',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
      ],
      reporter: ['text', 'lcov'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
