import { parse } from "node-html-parser";
import { getId } from "./get-id";

export const initTabs = (html: string) => {
  const root = parse(html);

  const tabs = root.querySelectorAll("[role=tab]").map((tab) => {
    return {
      id: getId(),
      label: tab.getAttribute("data-label"),
      tab,
    };
  });

  const content = tabs.map(({ tab, id }, i) => {
    const content = tab.querySelector("div");

    if (!content) {
      return;
    }

    if (i !== 0) {
      content.setAttribute("hidden", "");
    }

    content.setAttribute("id", `tab-panel-${id}`);
    content.setAttribute("role", `tabpanel`);
    content.setAttribute("aria-labelledby", `tab-${id}`);

    return content;
  });

  return { tabs, content };
};
