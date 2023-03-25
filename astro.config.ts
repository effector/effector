import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import directive from "remark-directive";
import github from "remark-github";
import breaks from "remark-breaks";
import remarkHeadingId from "remark-heading-id";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { admonitions } from "./plugins/admonitions";
import { remarkFallbackLang } from "./plugins/remark-fallback-lang";

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://effector-beta.sova.dev`,
  integrations: [tailwind(), preact(), react(), mdx(), prefetch(), compress()],
  base: "/",
  build: {
    assets: "assets",
  },
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [directive, admonitions, github, remarkHeadingId],
    rehypePlugins: [[rehypeAutolinkHeadings, { behavior: "prepend" }]],
  },
});
