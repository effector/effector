import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";

import directive from "remark-directive";
import github from "remark-github";
import breaks from "remark-breaks";
import remarkHeadingId from "remark-heading-id";

import { admonitions } from "./plugins/admonitions.mjs";

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === "development" ? "https://localhost:3000" : `https://beta.effector.dev`,
  integrations: [preact(), react(), mdx(), prefetch(), compress()],
  base: "/",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [[directive, {}], admonitions, remarkHeadingId],
    rehypePlugins: [],
  },
});
