import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import esToolkitPlugin from "vite-plugin-es-toolkit";
import transformerDirectives from "@unocss/transformer-directives";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";

import UnoCSS from "unocss/astro";
import unocssInline from "unocss-inline";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkIns from "remark-ins";
import remarkDirective from "remark-directive";
import remarkRubyDirective from "remark-ruby-directive";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import remarkEmoji from "remark-emoji";
import remarkExtendedTable from "remark-extended-table";

import Font from "vite-plugin-font";

// https://astro.build/config
export default defineConfig({
  site: "https://preview.astro.kaitaku.xyz",
  // trailingSlash: 'always',

  prefetch: true,

  integrations: [
    UnoCSS({
      injectReset: true,
      transformers: [transformerDirectives()],
    }),
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],

  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).toString(),
      },
    },
    plugins: [
      Font.vite({
        scanFiles: ["src/**/*.{svelte,ts,tsx,js,jsx,md}"],
      }),
      esToolkitPlugin(),
      unocssInline(),
    ],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      transformers: [transformerColorizedBrackets()],
    },
    remarkPlugins: [
      remarkMath,
      remarkRubyDirective,
      remarkIns,
      remarkDirective,
      remarkGfm,
      remarkEmoji,
      remarkExtendedTable,
    ],
    rehypePlugins: [rehypeKatex, rehypeAutoLinkHeadings],
  },
});
