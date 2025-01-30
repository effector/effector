import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { map } from "unist-util-map";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import directive from "remark-directive";
import remarkStringify from "remark-stringify";
import { unified, type Plugin } from "unified";
import type { Root, Link, Text, Heading } from "mdast";

import { KNOWN_LANGUAGE_CODES } from "src/languages";

export async function getStaticPaths() {
  return Object.values(KNOWN_LANGUAGE_CODES).map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
  const originalDocs = await getCollection(
    "docs",
    (doc) => doc.slug.startsWith(`en/`) || doc.data.lang === "en",
  );

  // non localized slug -> astro doc entry
  const uniqueDocs = new Map(originalDocs.map((doc) => [doc.slug.replace("en/", ""), doc]));

  // Show original articles if no translation available
  if (params.lang !== "en") {
    const localizedDocs = await getCollection(
      "docs",
      // Some articles does not set lang frontmatter parameter
      (doc) => doc.slug.startsWith(`${params.lang}/`) || doc.data.lang === params.lang,
    );

    localizedDocs.forEach((doc) => {
      const nonLocalizedSlug = doc.slug.replace(`${params.lang}/`, "");
      // Just replace original article if translation available
      uniqueDocs.set(nonLocalizedSlug, doc);
    });
  }

  // Simplify markdown, to reduce tokens count (135K tokens to 114K)
  const processedDocs = await Promise.all(
    uniqueDocs.values().map(async (doc) => {
      const processedBody = await processMarkdown(doc.body);
      return `# ${doc.data.title}\n\n${processedBody}\n\n`;
    }),
  );

  const localeDocs = processedDocs.join("");

  return new Response(`Effector.dev Documentation\n---\n\n${localeDocs}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

/** Parse markdown, transform into more clean */
async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(directive)
    .use(removeLinks)
    .use(replaceCustomBlocks)
    .use(removeHeadingIds)
    .use(remarkStringify)
    .process(content);

  return String(result);
}

// No reason to have internal links, while full documentation content is printed
const removeLinks: Plugin<[], Root> = function () {
  return (tree) => {
    visit(tree, "link", (node: Link) => {
      const textNode = node.children[0] as Text;

      // External links have to be left as is
      if (isRelativeUrl(node.url) || node.url.startsWith("https://share.effector.dev/")) {
        (node as unknown as Text).type = "text";
        (node as unknown as Text).value = textNode.value;
        delete (node as any).children;
        delete (node as any).url;
        delete (node as any).title;
      }
    });
  };
};

function isRelativeUrl(url: string) {
  return url.startsWith(".") || url.startsWith("/") || url.startsWith("#");
}

/**
 * Blocks like:
 * :::info{title="Example"}
 * content
 * :::
 *
 * replaced with:
 * > INFO Example:
 * > content
 */
const replaceCustomBlocks: Plugin<[], Root> = function () {
  return (tree) => {
    map(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "textDirective" ||
        node.type === "leafDirective"
      ) {
        const subtitle = node.attributes?.title;
        const infoType = node.name.toUpperCase();
        const text = subtitle ? `${infoType} ${subtitle}: ` : `${infoType}: `;
        node.children.unshift({ type: "text", value: text } as any);

        (node as any).type = "blockquote";
        delete (node as any).attributes;
      }
      return node;
    });
  };
};

/**
 * Replaces custom heading IDS:
 * ## Some header (#some-header-id)
 * into:
 * ## Some header
 */
const removeHeadingIds: Plugin<[], Root> = function () {
  return (tree) => {
    visit(tree, "heading", (node: Heading) => {
      const lastChild = node.children[node.children.length - 1] as Text;
      if (lastChild?.type === "text" && lastChild.value.includes("(#")) {
        // Remove the ID portion from the heading
        lastChild.value = lastChild.value.replace(/\s*\(#[\w-]+\)$/, "");
      }
    });
  };
};
