import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";

import { visit } from "unist-util-visit";
import directive from "remark-directive";
import github from "remark-github";
import breaks from "remark-breaks";
import { map } from "unist-util-map";
import remarkHeadingId from "remark-heading-id";

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

function admonitions() {
  const ALLOWED_NAMES = ["tip", "info", "warning"];
  return (tree) => {
    return map(tree, (node) => {
      if (node.type === "containerDirective" || node.type === "textDirective" || node.type === "leafDirective") {
        if (ALLOWED_NAMES.includes(node.name)) {
          console.log(node);
          const children = node.children;
          delete node.children;

          return h("div", { className: `admonition admonition-${node.name}` }, [
            h("div", { className: "admonition-heading" }, [
              h("span", { className: "admonition-title" }, [text(node.attributes.title ?? node.name)]),
            ]),
            h("div", { className: "admonition-content" }, children),
          ]);

          return {
            type: "element",
            data: {
              hName: "strong",
              hProperties: {
                className: "admonition admonition-" + node.name,
              },
            },
            children: [
              {
                type: "element",
                data: {
                  hName: "span",
                  hProperties: {
                    id: null,
                  },
                },
                children: [{ type: "text", value: node.attributes.title }],
              },
              {
                type: "element",
                data: {
                  hName: "div",
                  hProperties: {
                    className: "admonition-content",
                  },
                },
                children,
              },
            ],
          };
        }
      }
      return node;
    });
  };
}

function node(type, name, props = {}, rest = {}) {
  return {
    type,
    data: {
      hName: name,
      hProperties: props,
    },
    ...rest,
  };
}

function text(value) {
  return { type: "text", value };
}

function h(name, props = {}, children = []) {
  return node("element", name, props, { children });
}
