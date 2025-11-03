import { definePlugin } from "astro-expressive-code";

declare module "astro-expressive-code" {
  interface ExpressiveCodeBlockProps {
    dataAttributes?: Record<string, string>;
  }
}

export function dataAttributesPlugin() {
  return definePlugin({
    name: "Data Attributes Plugin",
    hooks: {
      preprocessMetadata({ codeBlock }) {
        const dataAttributes: Record<string, string> = {};
        codeBlock.metaOptions.list().forEach((item) => {
          if (item.key?.startsWith("data-")) {
            dataAttributes[item.key] = item.value as string;
          }
        });

        codeBlock.props.dataAttributes = dataAttributes;
      },
      postprocessRenderedBlock({ codeBlock, renderData }) {
        const dataAttributes = codeBlock.props.dataAttributes;
        const preTag = renderData.blockAst.children.find(
          (el) => el.type === "element" && el.tagName === "pre",
        );

        if (preTag?.type === "element") {
          preTag.properties = {
            ...preTag.properties,
            ...dataAttributes,
          };
        }
      },
    },
  });
}
