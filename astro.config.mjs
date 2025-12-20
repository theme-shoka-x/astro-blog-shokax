import svelte from '@astrojs/svelte'
// @ts-check
import { defineConfig } from 'astro/config'
import esToolkitPlugin from 'vite-plugin-es-toolkit';

import UnoCSS from 'unocss/astro'

import Font from 'vite-plugin-font'

// https://astro.build/config
export default defineConfig({
  site: 'https://preview.astro.kaitaku.xyz',
  // trailingSlash: 'always',

  prefetch: true,

  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ],
  
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url),
      },
    },
    plugins: [
      Font.vite({
        scanFiles: ['src/**/*.{svelte,ts,tsx,js,jsx,md}']
      }),
      esToolkitPlugin(),
    ]
  },
  markdown: {
    shikiConfig: {
      theme: 'vitesse-light'
    }
  }
})
