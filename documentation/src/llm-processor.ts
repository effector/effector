import { map } from "unist-util-map";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import directive from "remark-directive";
import remarkStringify from "remark-stringify";
import { unified, type Plugin } from "unified";
import type { Root, Link, Text, Heading } from "mdast";

/** Parse markdown, transform into more clean */
export async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(directive)
    .use(removeLinks)
    .use(replaceCustomBlocks)
    .use(increaseHeadingLevel)
    .use(removeHeadingIds)
    .use(remarkStringify)
    .process(content);

  return String(result);
}

const increaseHeadingLevel: Plugin<[], Root> = function () {
  return (tree) => {
    visit(tree, "heading", (node: Heading) => {
      node.depth++;
    });
  };
};

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
