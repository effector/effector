import { getCollection } from "astro:content";
import { nanoid } from "nanoid";
import { SITE, LINKS } from "./consts";
import { getTextLocalized, createLink, type LText } from "./languages";

const defaultSidebar: LSidebarGroup[] = [
  {
    text: { en: "Introduction", ru: "Начало работы", uz: "Kirish" },
    items: [
      {
        text: { en: "Motivation", ru: "Мотивация", uz: "Motivatsiya" },
        link: "/introduction/motivation",
      },
      {
        text: { en: "Community", ru: "Сообщество", uz: "Jamiyat" },
        link: "/introduction/community",
      },
      {
        text: { en: "Installation", ru: "Установка", uz: "O'rnatma" },
        link: "/introduction/installation",
      },
      {
        text: { en: "Ecosystem", ru: "Экосистема effector", uz: "Effector ekosistemasi" },
        link: "/introduction/ecosystem",
      },
      {
        text: { en: "Examples", ru: "Примеры", uz: "Namunalar" },
        link: "/introduction/examples",
      },
      {
        text: { en: "FAQ", ru: "Частые вопросы", uz: "Tezt-tez soraladigan savollar" },
        link: "/FAQ",
      },
    ],
  },
  {
    text: { en: "Conventions", ru: "Соглашения", uz: "Shartnomalar" },
    items: [
      {
        text: { en: "Naming", ru: "Именование", uz: "Nomlanmalar" },
        link: "/conventions/naming",
      },
    ],
  },
  {
    text: {
      en: "TypeScript Guide",
      ru: "Использование с TypeScript",
      uz: "Typescript bilan ishlash",
    },
    items: [
      {
        text: { en: "Typing effector", ru: "Типизация effector", uz: "Effector tipizatsiyasi" },
        link: "/typescript/typing-effector",
      },
      {
        text: { en: "Usage with `effector-react`", uz: "`effector-react` dan foydalaning" },
        link: "/typescript/usage-with-effector-react",
      },
      {
        text: { en: "Utility Types", ru: "Служебные типы", uz: "Utilit turlari" },
        link: "/typescript/utility-types",
      },
    ],
  },
  {
    text: { en: "Guides", ru: "Руководства", uz: "Qo'llanmalar" },
    items: [
      {
        text: { en: "Writing tests", uz: "Testlar yozish" },
        link: "/guides/testing",
      },
      {
        text: { en: "Server Side Rendering" },
        link: "/guides/server-side-rendering",
      },
      {
        text: { en: "Migration guide" },
        link: "/guides/migration-guide-v23",
      },
      {
        text: { en: "Migrating from Redux" },
        link: "https://withease.pages.dev/magazine/migration_from_redux.html",
      },
    ],
  },
  {
    text: { en: "Core principles", ru: "Основные принципы", uz: "Asosiy tamoyillar" },
    items: [
      {
        text: { en: "Releases policy" },
        link: "/core-principles/releases",
      },
      {
        text: { en: "Testing" },
        link: "/core-principles/testing",
      },
      {
        text: { en: "Typings" },
        link: "/core-principles/typings",
      },
    ],
  },
  {
    text: {
      en: "For library developers",
      uz: "Biblioteka dasturchilari uchun",
    },
    items: [
      {
        text: { en: "Universal @@unitShape protocol" },
        link: "/ecosystem-development/unit-shape-protocol",
      },
    ],
  },
  {
    text: { en: "Explanation", ru: "Погружение", uz: "Tushuntirish" },
    items: [
      {
        text: { en: "Glossary", ru: "Глоссарий", uz: "Lug'at" },
        link: "/explanation/glossary",
      },
      {
        text: { en: "Events", ru: "События", uz: "Events" },
        link: "/explanation/events",
      },
      {
        text: { en: "Computation Priority", uz: "Hisoblash ustuvorligi" },
        link: "/explanation/computation-priority",
      },
      {
        text: { en: "Prior Art", ru: "Prior Art", uz: "Prior Art" },
        link: "/explanation/prior-art",
      },
      {
        text: { en: "SIDs" },
        link: "/explanation/sids",
      },
    ],
  },
];

const recipes = [
  {
    text: { en: "Common", uz: "Umumiy" },
    items: [
      {
        text: { en: "Countdown Timer", uz: "Hisob taymeri" },
        link: "/recipes/common/countdown",
      },
    ],
  },
  {
    text: { en: "React" },
    items: [
      {
        text: { en: "Counter" },
        link: "/recipes/react/counter",
      },
      {
        text: { en: "Effects" },
        link: "/recipes/react/effects",
      },
      {
        text: { en: "Forms" },
        link: "/recipes/react/forms",
      },
      {
        text: { en: "Gate" },
        link: "/recipes/react/gate",
      },
      {
        text: { en: "ToDo Creator" },
        link: "/recipes/react/todo-creator",
      },
      {
        text: { en: "Dynamic Form Schema", uz: "Dinamik shakl sxemasi" },
        link: "/recipes/react/dynamic-form-schema",
      },
      {
        text: {
          en: "ToDo List with Validation",
          uz: "Validation bilan tasdiqlangan ishlar ro'yxati",
        },
        link: "/recipes/react/todo-with-validation",
      },
      {
        text: { en: "Slots", uz: "Slotlar" },
        link: "/recipes/react/slots",
      },
    ],
  },
  {
    text: { en: "React Native" },
    items: [
      {
        text: { en: "AsyncStorage Counter" },
        link: "/recipes/react-native/asyncstorage-counter",
      },
    ],
  },
  {
    text: { en: "Next.js" },
    items: [
      {
        text: {
          en: "Integrate Next.js with effector",
          uz: "Next.js effector bilan integratsiyasi",
        },
        link: "/recipes/nextjs/integrate",
      },
      {
        text: { en: "Integrate with Next.js router", uz: "Next.js router bilan integratsiyasi" },
        link: "/recipes/nextjs/router",
      },
      {
        text: { en: "Use scopeBind in Next.js", uz: "Next.js da scopeBind dan foydalaning" },
        link: "/recipes/nextjs/scope-bind",
      },
    ],
  },
];

const effectorReact = [
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useUnit", ru: "useUnit", uz: "useUnit" },
        link: "/api/effector-react/useUnit",
        quickMenu: true,
      },
      {
        text: { en: "useList", ru: "useList", uz: "useList" },
        link: "/api/effector-react/useList",
        quickMenu: true,
      },
      {
        text: { en: "useStoreMap", ru: "useStoreMap", uz: "useStoreMap" },
        link: "/api/effector-react/useStoreMap",
        quickMenu: true,
      },
      {
        text: { en: "useStore", ru: "useStore", uz: "useStore" },
        link: "/api/effector-react/useStore",
      },
      {
        text: { en: "useEvent", ru: "useEvent", uz: "useEvent" },
        link: "/api/effector-react/useEvent",
      },
    ],
  },
  {
    text: { en: "Components", uz: "Komponentlar" },
    items: [
      {
        text: { en: "Provider", ru: "Provider", uz: "Provider" },
        link: "/api/effector-react/Provider",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-react/Gate",
        quickMenu: true,
      },
      {
        text: { en: "createGate", uz: "createGate" },
        link: "/api/effector-react/createGate",
        quickMenu: true,
      },
      {
        text: { en: "useGate", uz: "useGate" },
        link: "/api/effector-react/useGate",
      },
    ],
  },
  {
    text: { en: "Import map" },
    items: [
      {
        text: { en: "effector-react/compat" },
        link: "/api/effector-react/module/сompat",
      },
      {
        text: { en: "effector-react/scope" },
        link: "/api/effector-react/module/scope",
      },
    ],
  },
  {
    text: { en: "Low-level API" },
    collapsed: true,
    items: [
      {
        text: { en: "useProvidedScope" },
        link: "/api/effector-react/useProvidedScope",
      },
    ],
  },
  {
    text: { en: "HOC-like APIs", uz: "HOCsimon APIlar" },
    collapsed: true,
    items: [
      {
        text: { en: "connect" },
        link: "/api/effector-react/connect",
      },
      {
        text: { en: "createComponent" },
        link: "/api/effector-react/createComponent",
      },
      {
        text: { en: "createStoreConsumer" },
        link: "/api/effector-react/createStoreConsumer",
      },
    ],
  },
];

const effectorSolid = [
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useUnit" },
        link: "/api/effector-solid/useUnit",
        quickMenu: true,
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-solid/useStoreMap",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-solid/Gate",
        quickMenu: true,
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-solid/createGate",
        quickMenu: true,
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-solid/useGate",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Import map" },
    items: [
      {
        text: { en: "effector-solid/scope" },
        link: "/api/effector-solid/module/scope",
      },
    ],
  },
];

const effectorVue = [
  {
    text: { en: "Common methods" },
    items: [
      {
        text: { en: "VueEffector" },
        link: "/api/effector-vue/VueEffector",
        quickMenu: true,
      },
      {
        text: { en: "EffectorScopePlugin" },
        link: "/api/effector-vue/EffectorScopePlugin",
        quickMenu: true,
      },
      {
        text: { en: "createComponent" },
        link: "/api/effector-vue/createComponent",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Options and properties", uz: "Variantlar va xususiyatlar" },
    items: [
      {
        text: { en: "ComponentOptions" },
        link: "/api/effector-vue/ComponentOptions",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-vue/Gate",
        quickMenu: true,
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-vue/createGate",
        quickMenu: true,
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-vue/useGate",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useUnit" },
        link: "/api/effector-vue/useUnit",
        quickMenu: true,
      },
      {
        text: { en: "useStore" },
        link: "/api/effector-vue/useStore",
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-vue/useStoreMap",
        quickMenu: true,
      },
      {
        text: { en: "useVModel" },
        link: "/api/effector-vue/useVModel",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Scoped API" },
    items: [
      {
        text: { en: "useEvent" },
        link: "/api/effector-vue/useEvent",
      },
      {
        text: { en: "VueSSRPlugin" },
        link: "/api/effector-vue/VueSSRPlugin",
      },
    ],
  },
  {
    text: { en: "Import map" },
    items: [
      {
        text: { en: "effector-vue/composition" },
        link: "/api/effector-vue/module/composition",
      },
      {
        text: { en: "effector-vue/ssr" },
        link: "/api/effector-vue/module/ssr",
      },
    ],
  },
];

const effector = [
  {
    text: { en: "Unit Types", ru: "Юниты", uz: "Yunitlar" },
    items: [
      {
        text: { en: "Event" },
        link: "/api/effector/Event",
      },
      {
        text: { en: "Store" },
        link: "/api/effector/Store",
      },
      {
        text: { en: "Effect" },
        link: "/api/effector/Effect",
      },
      {
        text: { en: "Domain" },
        link: "/api/effector/Domain",
      },
      {
        text: { en: "Scope" },
        link: "/api/effector/Scope",
      },
    ],
  },
  {
    text: { en: "Creators", ru: "Создатели" },
    items: [
      {
        text: { en: "createEvent" },
        link: "/api/effector/createEvent",
        quickMenu: true,
      },
      {
        text: { en: "createStore" },
        link: "/api/effector/createStore",
        quickMenu: true,
      },
      {
        text: { en: "createEffect" },
        link: "/api/effector/createEffect",
        quickMenu: true,
      },
      {
        text: { en: "createDomain" },
        link: "/api/effector/createDomain",
      },
      {
        text: { en: "attach" },
        link: "/api/effector/attach",
        quickMenu: true,
      },
      {
        text: { en: "merge" },
        link: "/api/effector/merge",
        quickMenu: true,
      },
    ],
  },
  {
    text: { en: "Methods", ru: "Методы", uz: "Usullar" },
    items: [
      {
        text: { en: "sample" },
        link: "/api/effector/sample",
        quickMenu: true,
      },
      {
        text: { en: "combine" },
        link: "/api/effector/combine",
        quickMenu: true,
      },
      {
        text: { en: "split" },
        link: "/api/effector/split",
        quickMenu: true,
      },
      {
        text: { en: "createApi" },
        link: "/api/effector/createApi",
        quickMenu: true,
      },
      {
        text: { en: "restore" },
        link: "/api/effector/restore",
        quickMenu: true,
      },
      {
        text: { en: "forward" },
        link: "/api/effector/forward",
      },
      {
        text: { en: "guard" },
        link: "/api/effector/guard",
      },
    ],
  },
  {
    text: { en: "Fork API" },
    collapsed: true,
    items: [
      {
        text: { en: "fork" },
        link: "/api/effector/fork",
        quickMenu: true,
      },
      {
        text: { en: "serialize" },
        link: "/api/effector/serialize",
        quickMenu: true,
      },
      {
        text: { en: "allSettled" },
        link: "/api/effector/allSettled",
        quickMenu: true,
      },
      {
        text: { en: "scopeBind" },
        link: "/api/effector/scopeBind",
        quickMenu: true,
      },
      {
        text: { en: "hydrate" },
        link: "/api/effector/hydrate",
      },
    ],
  },
  {
    text: { en: "Utilities", ru: "Служебные функции", uz: "Utility funktsiyalari" },
    collapsed: true,
    items: [
      {
        text: { en: "is" },
        link: "/api/effector/is",
      },
      {
        text: { en: "fromObservable" },
        link: "/api/effector/fromObservable",
      },
    ],
  },
  {
    text: { en: "Low-level API" },
    collapsed: true,
    items: [
      {
        text: { en: "createWatch" },
        link: "/api/effector/createWatch",
      },
      {
        text: { en: "clearNode" },
        link: "/api/effector/clearNode",
      },
      {
        text: { en: "withRegion" },
        link: "/api/effector/withRegion",
      },
      {
        text: { en: "launch" },
        link: "/api/effector/launch",
      },
      {
        text: { en: "inspect" },
        link: "/api/effector/inspect",
      },
    ],
  },
  {
    text: { en: "Import map" },
    items: [
      {
        text: { en: "effector/compat" },
        link: "/api/effector/module/сompat",
      },
      {
        text: { en: "effector/inspect" },
        link: "/api/effector/module/inspect",
      },
      {
        text: { en: "effector/babel-plugin" },
        link: "/api/effector/module/babel-plugin",
      },
    ],
  },
  {
    text: { en: "Compiler Plugins" },
    items: [
      {
        text: { en: "Babel plugin" },
        link: "/api/effector/babel-plugin",
      },
      {
        text: { en: "SWC plugin" },
        link: "https://github.com/effector/swc-plugin",
      },
    ],
  },
];

const api = [
  {
    text: { en: "Packages", ru: "Пакеты", uz: "Paketlar" },
    items: [
      { text: { en: "effector" }, link: "/api/effector" },
      { text: { en: "effector-react" }, link: "/api/effector-react" },
      { text: { en: "effector-solid" }, link: "/api/effector-solid" },
      { text: { en: "effector-vue" }, link: "/api/effector-vue" },
      { text: { en: "@effector/next" }, link: "https://github.com/effector/next" },
    ],
  },
];

interface QuickMenuItem {
  link: string;
  groups: LSidebarItem[][];
}

export const QUICK_MENU: Record<string, QuickMenuItem> = {
  effector: {
    link: "/api/effector",
    groups: navigationToQuickMenu(effector),
  },
  "effector-react": {
    link: "/api/effector-react",
    groups: navigationToQuickMenu(effectorReact),
  },
  "effector-solid": {
    link: "/api/effector-solid",
    groups: navigationToQuickMenu(effectorSolid),
  },
  "effector-vue": {
    link: "/api/effector-vue",
    groups: navigationToQuickMenu(effectorVue),
  },
};

// Be careful: order of the items is important.
// Sidebar searches for the first matches.
export const SIDEBARS: LSidebar = {
  "/api/effector-react": effectorReact,
  "/api/effector-solid": effectorSolid,
  "/api/effector-vue": effectorVue,
  "/api/effector": effector,
  "/api": api,
  "/recipes": recipes,
  "/": defaultSidebar,
};
const sidebarEntries = Object.entries(SIDEBARS);

export const DOCS_VERSIONS = [
  { text: { en: "v23.x (actual)", ru: "v23.x (актуальная)", uz: "v23.x (dolzarb)" }, link: "/" },
  { text: { en: "v22.8.8" }, link: "https://v22.effector.dev" },
  { text: { en: "v21.8.12" }, link: "https://v21.effector.dev" },
  { text: { en: "v20.17.2" }, link: "https://v20.effector.dev" },
];

type SocialIcon = "github" | "twitter" | "discord" | "youtube";
export const SOCIAL_LINKS: { text: LText; icon: SocialIcon; link: string }[] = [
  { text: { en: "GitHub" }, icon: "github", link: LINKS.github },
  { text: { en: "Twitter" }, icon: "twitter", link: LINKS.twitter },
  { text: { en: "Discord" }, icon: "discord", link: LINKS.discord },
];

export const DESKTOP_NAVIGATION: LSidebarItem[] = [
  { text: { en: "Learn", ru: "Изучение", uz: "O'rganish" }, link: "/introduction/installation" },
  { text: { en: "API" }, link: "/api", features: ["API"] },
  { text: { en: "Recipes", ru: "Рецепты", uz: "Retseptlar" }, link: "/recipes" },
  { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog },
  { text: { en: "Playground", ru: "Песочница", uz: "Playground" }, link: LINKS.repl },
  { text: { en: "Changelog", ru: "Изменения", uz: "O'zgarishlar" }, link: LINKS.changelog },
];

export const MOBILE_NAVIGATION = createMobileNavigation([
  {
    text: { en: "Documentation", ru: "Документация", uz: "Hujjat" },
    items: defaultSidebar,
  },
  {
    text: { en: "API" },
    link: "/api",
    items: [
      { text: { en: "effector" }, link: "/api/effector", items: effector },
      { text: { en: "effector-react" }, link: "/api/effector-react", items: effectorReact },
      { text: { en: "effector-solid" }, link: "/api/effector-solid", items: effectorSolid },
      { text: { en: "effector-vue" }, link: "/api/effector-vue", items: effectorVue },
    ],
  },
  {
    text: { en: "Recipes", ru: "Рецепты", uz: "Retseptlar" },
    link: "/recipes",
    items: recipes,
  },
  { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog },
  { text: { en: "Playground", ru: "Песочница", uz: "Playground" }, link: LINKS.repl },
  { text: { en: "Changelog", ru: "Изменения", uz: "O'zgarishlar" }, link: LINKS.changelog },
] satisfies LMobileNavItem[]);

export const FOOTER_LINKS = [
  {
    text: { en: "Docs", ru: "Документация", uz: "Hujjatlar" },
    items: [
      {
        text: { en: "Getting started", ru: "С чего начать", uz: "Boshlash" },
        link: "/introduction/installation",
      },
      { text: { en: "API Reference", uz: "API Havolasi" }, link: "/api" },
      {
        text: { en: "Writings tests", ru: "Тестирование кода", uz: "Kodni testlash" },
        link: "/guides/testing",
      },
      {
        text: { en: "Release policy", ru: "Политика релизов", uz: "Relizlar siyosati" },
        link: "/core-principles/releases",
      },
      { text: { en: "What's new", ru: "Что нового", uz: "Yangiliklar" }, link: LINKS.changelog },
      { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog },
    ],
  },
  {
    text: { en: "Community", ru: "Сообщество", uz: "Jamiyat" },
    items: [
      { text: { en: "Official", ru: "Официальное", uz: "Rasmiy" }, link: LINKS.community },
      { text: { en: "Discord" }, link: LINKS.discord },
      { text: { en: "dev.to" }, link: LINKS.devTo },
      { text: { en: "Twitter" }, link: LINKS.twitter },
      { text: { en: "Telegram 🇷🇺" }, link: LINKS.telegramRU },
      { text: { en: "Telegram 🇺🇸" }, link: LINKS.telegramEN },
    ],
  },
  {
    text: { en: "More", ru: "Больше", uz: "Ko'proq" },
    items: [
      { text: { en: "Github" }, link: LINKS.github },
      { text: { en: "Reddit" }, link: LINKS.reddit },
      { text: { en: "Youtube" }, link: LINKS.youtube },
      { text: { en: "Lines of Code" }, link: LINKS.linesOfCode },
      { text: { en: "ChatGPT" }, link: "https://chat.openai.com/g/g-thabaCJlt-effector-assistant"  },
      { text: { en: "Made by Astro" }, link: "https://astro.build" },
    ],
  },
] satisfies FooterGroup[];

type FooterGroup = {
  text: LText;
  items: FooterItem[];
};

type FooterItem = {
  text: LText;
  link: string;
};

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

interface LSidebarGroup {
  text: LText;
  items: LSidebarItem[];
  collapsed?: boolean;
}

export type NavigationFeatures = "API";

type LSidebarItem = {
  text: LText;
  link: string;
  quickMenu?: boolean;
  features?: NavigationFeatures[];
};

export function getSidebarForSlug(slug: string): LSidebarGroup[] {
  const path = slug.startsWith("/") ? slug : `/${slug}`;
  return sidebarEntries.find(([prefix]) => path.startsWith(prefix))?.[1] ?? defaultSidebar;
}

export async function getLocalizedSidebar(slug: string, lang: string) {
  const sidebar = getSidebarForSlug(slug);
  const slugs = await getSlugs();

  return sidebar.map((group) => {
    const groupTitle = getTextLocalized(group, lang);
    return {
      title: groupTitle,
      collapsed: group.collapsed,
      items: group.items.map((item) => {
        const itemTitle = getTextLocalized(item, lang);

        if (isRemoteUrl(item.link)) {
          return {
            title: itemTitle,
            link: item.link,
          };
        }

        const link = createLink(item, lang);

        // Translated page exists
        if (slugs.has(link.toLowerCase())) {
          return {
            title: itemTitle,
            link,
          };
        }

        // If original page exists
        const originalLink = createLink(item, SITE.defaultLanguage);
        if (slugs.has(originalLink.toLowerCase())) {
          return {
            title: `${itemTitle} (${SITE.defaultLanguage.toUpperCase()})`,
            link,
          };
        }

        // If no original page exists, may be link is wrong?
        return {
          title: `${itemTitle} (404)`,
          link: item.link,
        };
      }),
    };
  });
}

function getSlugs() {
  return getCollection("docs").then((docs) => new Set(docs.map((doc) => `/${doc.slug}`)));
}

function isRemoteUrl(link: string) {
  return link.startsWith("https://") || link.startsWith("http://");
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

function navigationToQuickMenu(nav: LSidebarGroup[]) {
  return nav
    .map((element) => element.items.filter((item) => item.quickMenu))
    .filter((items) => items.length > 0);
}
