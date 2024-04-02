import { map } from "unist-util-map";
import "mdast-util-directive";
import type { Root, Node } from "mdast";
import type { VFile } from "vfile";
import type { TextDirective } from "mdast-util-directive";

// TODO: Add svg icons

export function admonitions({ types = ["tip", "info", "warning"] } = {}) {
  return (tree: Root, file: VFile) => {
    return map(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "textDirective" ||
        node.type === "leafDirective"
      ) {
        if (types.includes(node.name)) {
          const children = node.children;
          delete node.children;

          return h("div", { className: `admonition admonition-${node.name}` }, [
            h("div", { className: "admonition-heading" }, [
              h("span", { className: "admonition-title" }, [
                text(node.attributes!.title ?? node.name),
              ]),
            ]),
            h("div", { className: "admonition-content" }, children),
          ]) satisfies TextDirective;
        }
      }
      return node;
    });
  };
}

function node(type: string, name: string, props = {}, rest = {}) {
  return {
    type,
    data: {
      hName: name,
      hProperties: props,
    },
    ...rest,
  };
}

function text(value: string) {
  return { type: "text", value };
}

function h<T extends Node>(name: string, props = {}, children: unknown[] = []): T {
  return node("element", name, props, { children }) as T;
}
