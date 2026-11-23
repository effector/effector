import { getCollection } from "astro:content";
import { nanoid } from "nanoid";
import { LINKS, SITE } from "./consts";
import { type LText, createLink, getTextLocalized, isExternal } from "./languages";
import IconGithub from "@icons/Github.astro";
import IconTelegram from "@icons/Telegram.astro";
import {
  learning,
  effector,
  effectorReact,
  effectorSolid,
  effectorVue,
  PANEL_FRAMEWORK_ITEMS,
  PANEL_ITEMS,
  guidesAndRecipes,
  type LSidebarGroup,
  recipeItems,
  nextJsRecipes,
} from "./sidebar-config";
import { normalizeUrlPath } from "./libs/path";
import IconVue from "@icons/Vue.astro";
import IconReact from "@icons/React.astro";
import IconSolid from "@icons/Solid.astro";
import IconEffector from "@icons/Effector.astro";
import IconNextJs from "@icons/NextJs.astro";

export type MostUsefulItem = {
  text: LText;
  icon: (props: { size?: number | number; class?: string }) => any;
  description: LText;
  items: LSidebarGroup[];
};

export function filterSidebarGroups(tags: ItemTag[], groups: LSidebarGroup[]) {
  return groups
    .map((group) => ({ ...group, items: filterSidebarItems(tags, group.items) }))
    .filter((group) => group.items.length > 0);
}

export function filterSidebarItems(tags: ItemTag[], items: LSidebarItem[]) {
  return items.filter((item) => item.tags?.some((tag) => tags.includes(tag)));
}

export const DOCS_VERSIONS = [
  { text: { en: "v23.x (actual)", ru: "v23.x (актуальная)", uz: "v23.x (dolzarb)" }, link: "/" },
  { text: { en: "v22.8.8" }, link: "https://v22.effector.dev" },
  { text: { en: "v21.8.12" }, link: "https://v21.effector.dev" },
  { text: { en: "v20.17.2" }, link: "https://v20.effector.dev" },
];

export type SocialLink = {
  text: LText;
  icon: (props: { size?: number }) => any;
  link: string;
};

export function getSocialLinks(lang: string): SocialLink[] {
  return [
    { text: { en: "GitHub" }, icon: IconGithub, link: LINKS.github },
    {
      text: { en: "Telegram" },
      icon: IconTelegram,
      link: lang === "ru" ? LINKS.telegramRU : LINKS.telegramEN,
    },
  ];
}

const apiPackages = [
  { text: { en: "effector" }, link: "/api/effector", icon: IconEffector, items: effector },
  { text: { en: "effector-react" }, link: "/api/effector-react", icon: IconReact, items: effectorReact },
  { text: { en: "effector-solid" }, link: "/api/effector-solid", icon: IconSolid, items: effectorSolid },
  { text: { en: "effector-vue" }, link: "/api/effector-vue", icon: IconVue, items: effectorVue },
  { text: { en: "@effector/next" }, link: "https://github.com/effector/next", icon: IconNextJs },
];

const blogLink = { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog };
const playgroundLink = { text: { en: "Playground", ru: "Песочница", uz: "Playground" }, link: LINKS.repl };
const changelogLink = { text: { en: "Changelog", ru: "Изменения", uz: "O'zgarishlar" }, link: LINKS.changelog };

export const DESKTOP_NAVIGATION: (LSidebarItem & Partial<LSidebarGroup>)[] = [
  { text: { en: "Learn", ru: "Изучение", uz: "O'rganish" }, link: "/introduction/get-started" },
  { text: { en: "Guides", ru: "Гайды", uz: "Qo'llanmalar" }, link: "/essentials/typescript" },
  {
    text: { en: "API" },
    link: "/api",
    items: [
      { text: { en: "Overview", ru: "Обзор" }, link: "/api" },
      ...apiPackages.map(({ text, link, icon }) => ({ text, link, icon })),
    ],
  },
  { text: { en: "Ecosystem", ru: "Экосистема", uz: "Ekotizim" }, link: "/introduction/ecosystem" },
  blogLink,
];

export const MOBILE_NAVIGATION = createMobileNavigation([
  {
    text: { en: "Documentation", ru: "Документация", uz: "Hujjat" },
    items: [...learning, ...guidesAndRecipes],
  },
  {
    text: { en: "API" },
    link: "/api",
    items: apiPackages.map(({ icon, ...pkg }) => pkg),
  },
  {
    text: { en: "Recipes", ru: "Рецепты", uz: "Retseptlar" },
    items: [
      ...recipeItems,
      {
        items: nextJsRecipes,
        text: {
          en: "Next.js",
        },
      },
    ],
  },
  blogLink,
  playgroundLink,
  changelogLink,
] satisfies LMobileNavItem[]);

export type LMobileNavItem = LMobileNavLink | LMobileNavGroup | LMobileNavLinkGroup;

type LMobileNavLink = {
  text: LText;
  link: string;
  id?: string;
  active?: boolean;
};

export function isNavLink(item: LMobileNavItem): item is LMobileNavLink {
  return "link" in item && !("items" in item);
}

type LMobileNavGroup = {
  text: LText;
  items: LMobileNavItem[];
  id?: string;
  active?: boolean;
};

export function isNavGroup(item: LMobileNavItem): item is LMobileNavGroup {
  return !("link" in item) && "items" in item;
}

type LMobileNavLinkGroup = {
  text: LText;
  link: string;
  items: LMobileNavItem[];
  id?: string;
  active?: boolean;
};

export function isNavLinkGroup(item: LMobileNavItem): item is LMobileNavLinkGroup {
  return "link" in item && "items" in item;
}

interface LSidebar {
  [path: string]: LSidebarGroup[];
}

export function isSidebarGroup(item: LSidebarGroup | LSidebarItem): item is LSidebarGroup {
  return "items" in item && "text" in item;
}

export type ItemTag = "useful";

export type ItemStatus = "new" | "deprecated";

export type LSidebarItem = {
  text: LText;
  link: string;
  tags?: ItemTag[];
  status?: ItemStatus;
};

type LSidebarIconItem = LSidebarItem & { icon?: (opts: { size?: number }) => any };

export function isSidebarIconItem(item: LSidebarItem): item is LSidebarIconItem {
  return "icon" in item;
}

const findActiveSidebarBySlug = (sidebar: LSidebarGroup[], slug: string) => {
  return sidebar.find(({ items }) => items.some(({ link }) => link === slug));
};

export function getActiveTabSidebar(slug: string) {
  const path = normalizeUrlPath(slug);
  const activePanel = [...PANEL_ITEMS, ...PANEL_FRAMEWORK_ITEMS].find((panel) =>
    findActiveSidebarBySlug(panel.items, path),
  );

  return activePanel?.id;
}

export type TabPanelSidebarItems = {
  sidebarItems: LSidebarGroup[];
  panelId: string;
};

export async function getLocalizedPanelSidebar(slug: string, lang: string) {
  const sidebar = [...PANEL_ITEMS, ...PANEL_FRAMEWORK_ITEMS];

  const slugs = await getSlugs();

  const localizedSidebars = sidebar.map(({ items, id }) => {
    const sidebarItems = items.map((group) => {
      const groupTitle = getTextLocalized(group, lang);
      return {
        title: groupTitle,
        collapsed: group.collapsed,
        items: group.items.map((item) => {
          const itemTitle = getTextLocalized(item, lang);

          if (isExternal(item)) {
            return {
              title: itemTitle,
              link: item.link,
              status: item.status,
            };
          }

          const link = createLink(item, lang);

          // Translated page exists
          if (slugs.has(link.toLowerCase())) {
            return {
              title: itemTitle,
              link,
              status: item.status,
            };
          }

          // If original page exists
          const originalLink = createLink(item, SITE.defaultLanguage);
          if (slugs.has(originalLink.toLowerCase())) {
            return {
              title: `${itemTitle}`,
              link,
              isFallback: true,
              status: item.status,
            };
          }

          // If no original page exists, may be link is wrong?
          return {
            title: `${itemTitle} (404)`,
            link: item.link,
            status: item.status,
          };
        }),
      };
    });

    return {
      sidebarItems,
      panelId: id,
    };
  });

  return localizedSidebars;
}

function getSlugs() {
  return getCollection("docs").then((docs) => new Set(docs.map((doc) => `/${doc.slug}`)));
}

function createMobileNavigation(nav: LMobileNavItem[]) {
  return nav.map((item): LMobileNavItem => {
    if ("items" in item) {
      return {
        ...item,
        id: nanoid(6),
        items: createMobileNavigation(item.items),
        active: false,
      };
    }
    return {
      ...item,
      id: nanoid(6),
      active: false,
    };
  });
}

export function markActiveNavigation(link: string, navigation: LMobileNavItem[]) {
  // We want to mutate the array and items inside.
  // Immutable will be awful for dev perf (on each reload immutable recreate deep array)
  const nav = structuredClone(navigation);

  function findActive(group: LMobileNavItem) {
    // If user on the page that exactly matches link
    // When user on the `effector-react` API page we want only highlight the group-link, not all the childs
    if (isNavLink(group) || isNavLinkGroup(group)) {
      if (link === group.link) {
        group.active = true;
        return true;
      }
    }

    // If we found an active element, early return
    if (isNavGroup(group) || isNavLinkGroup(group)) {
      for (const item of group.items) {
        item.active = findActive(item);
        if (item.active) {
          return true;
        }
      }
    }

    return false;
  }

  for (const item of nav) {
    if (findActive(item)) {
      item.active = true;
      break;
    }
  }

  return nav;
}

export const MOST_USEFUL_EFFECTOR: MostUsefulItem = {
  text: { en: "effector" },
  icon: IconEffector,
  description: {
    en: "The core library forms the foundation for most written code.",
    ru: "Фундамент основного кода логики в приложениях.",
  },
  items: filterSidebarGroups(["useful"], effector),
};
export const MOST_USEFUL_REACT: MostUsefulItem = {
  text: { en: "effector-react" },
  icon: IconReact,
  description: {
    en: "Specialized hooks and gates, designed to seamlessly integrate with React.",
    ru: "Хуки для компактной и удобной интеграции с React компонентами.",
  },
  items: filterSidebarGroups(["useful"], effectorReact),
};
export const MOST_USEFUL_SOLID: MostUsefulItem = {
  text: { en: "effector-solid" },
  icon: IconSolid,
  description: {
    en: "Bindings for performant reactivity framework",
    ru: "Интеграция с сигналами фреймворка Solid.",
  },
  items: filterSidebarGroups(["useful"], effectorSolid),
};
export const MOST_USEFUL_VUE: MostUsefulItem = {
  text: { en: "effector-vue" },
  icon: IconVue,
  description: {
    en: "Bindings for progressive framework",
    ru: "Хуки, методы, плагины для работы в рамках Vue.",
  },
  items: filterSidebarGroups(["useful"], effectorVue),
};

export const MOST_USEFUL = [
  MOST_USEFUL_EFFECTOR,
  MOST_USEFUL_REACT,
  MOST_USEFUL_SOLID,
  MOST_USEFUL_VUE,
];
