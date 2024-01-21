import { map } from "unist-util-map";
import type { Root } from "mdast";

// TODO: Add svg icons

export function admonitions({ types = ["tip", "info", "warning"] } = {}) {
  return (tree: Root) => {
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
          ]);
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

function h(name: string, props = {}, children: unknown[] = []) {
  return node("element", name, props, { children });
}
