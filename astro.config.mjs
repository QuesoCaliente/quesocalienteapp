import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import { seoConfig } from "./src/utils/seoConfig";

import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import moon from './public/moon.json' with { type: 'json' };

const options = {
  theme: moon,
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), mdx()],
  output: "server",
  adapter: vercel(),
  site: seoConfig.baseURL,
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});
