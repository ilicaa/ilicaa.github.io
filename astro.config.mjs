// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import contentGuard from './scripts/content-guard.mjs';

const fontDir = './src/assets/fonts';
const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'.split(', ');
const LATIN_EXT = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'.split(', ');

/** One @font-face per subset so browsers only fetch Latin Extended when a page needs it (e.g. "ş", "ğ"). */
const subsets = (/** @type {string} */ file, /** @type {Record<string, any>} */ extra = {}) => [
  { src: [`${fontDir}/${file}-latin.woff2`], unicodeRange: LATIN, ...extra },
  { src: [`${fontDir}/${file}-latin-ext.woff2`], unicodeRange: LATIN_EXT, ...extra },
];

export default defineConfig({
  site: 'https://ilicaa.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [contentGuard(), sitemap()],
  image: {
    // Responsive srcset + width/height on every <Image>/<Picture> by default.
    layout: 'constrained',
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'serif'],
      options: { variants: subsets('fraunces', { weight: '300 700', style: 'normal', display: 'swap' }) },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-body',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          ...subsets('plex-sans', { weight: '400 600', style: 'normal', display: 'swap' }),
          ...subsets('plex-sans-italic', { weight: '400', style: 'italic', display: 'swap' }),
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      fallbacks: ['Courier New', 'monospace'],
      options: {
        variants: [
          ...subsets('plex-mono-400', { weight: '400', style: 'normal', display: 'swap' }),
          ...subsets('plex-mono-500', { weight: '500', style: 'normal', display: 'swap' }),
        ],
      },
    },
  ],
});
