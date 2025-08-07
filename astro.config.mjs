import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import { seoConfig } from "./src/utils/seoConfig";
import react from '@astrojs/react';

import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import moon from './public/moon.json' with { type: 'json' };

const options = {
  theme: moon,
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
  integrations: [icon(), mdx({
    remarkPlugins: [],
    rehypePlugins: [],
  }), react()],
  output: "server",
  adapter: vercel(),
  site: seoConfig.baseURL,
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});
