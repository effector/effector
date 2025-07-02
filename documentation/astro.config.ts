import "dotenv/config";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import directive from "remark-directive";
import github from "remark-github";
import breaks from "remark-breaks";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { remarkHeadingId } from "@effector/remark-heading-id";

import { admonitions } from "./plugins/admonitions";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === "development" ? "http://localhost:4321" : `https://effector.dev`,
  compressHTML: true,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    preact({ compat: true }),
    expressiveCode({
      themes: ["github-light-default", "plastic"],
      themeCssRoot: "html",
      styleOverrides: {
        borderColor: "var(--theme-divider);",
        frames: {
          shadowColor: "transparent",
          tooltipSuccessBackground: "var(--theme-admonition-tip-border)",
        },
      },
      themeCssSelector: (theme) => {
        if (theme.name === "plastic") return ".theme-dark";
        if (theme.name === "github-light-default") return "";
        return false;
      },
      removeUnusedThemes: true,
      shiki: {
        bundledLangs: ["js", "ts", "tsx"],
      },
    }),
    mdx({ extendMarkdownConfig: true }),
  ],
  prefetch: true,
  base: "/",
  build: {
    assets: "assets",
  },
  scopedStyleStrategy: "where",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [directive, admonitions, github, remarkHeadingId],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { class: "href" },
        },
      ],
    ],
  },
  vite: {
    server: {
      proxy: {
        "/_pagefind": {
          target: "http://127.0.0.1:1414",
          rewrite: (path) => path.replace(/^\/dist/, ""),
        },
      },
    },
  },
  devToolbar: { enabled: false },
});
