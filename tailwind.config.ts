/**
 * Tailwind CSS v4 - CSS-first configuration
 *
 * Design tokens are defined in src/app/globals.css using @theme directive.
 * This file exists for tooling compatibility and to document the theme tokens.
 *
 * If you need v3-style config, add `@config "./tailwind.config.ts"` to globals.css.
 *
 * Primary color:  #2563eb  (--color-primary)
 * Accent color:   #dc2626  (--color-accent)
 * Fonts:          Inter, Noto Sans JP
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
        },
        accent: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#ef4444',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans-jp)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
