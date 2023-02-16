import { map } from "unist-util-map";

// TODO: Add svg icons

export function admonitions({ types = ["tip", "info", "warning"] }) {
  return (tree) => {
    return map(tree, (node) => {
      if (node.type === "containerDirective" || node.type === "textDirective" || node.type === "leafDirective") {
        if (types.includes(node.name)) {
          const children = node.children;
          delete node.children;

          return h("div", { className: `admonition admonition-${node.name}` }, [
            h("div", { className: "admonition-heading" }, [
              h("span", { className: "admonition-title" }, [text(node.attributes.title ?? node.name)]),
            ]),
            h("div", { className: "admonition-content" }, children),
          ]);
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
