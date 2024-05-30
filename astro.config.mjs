import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import db from "@astrojs/db";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import { seoConfig } from "./src/utils/seoConfig";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), db(), auth(), mdx()],
  output: "server",
  adapter: vercel(),
  site: seoConfig.baseURL
});