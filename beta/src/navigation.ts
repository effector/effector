import { getCollection } from "astro:content";
import { nanoid } from "nanoid";
import { SITE, LINKS } from "./consts";
import { getTextLocalized, createLink, type LText } from "./languages";

const defaultSidebar: LSidebarGroup[] = [
  {
    text: { en: "Introduction", ru: "Начало работы" },
    items: [
      {
        text: { en: "Motivation", ru: "Мотивация" },
        link: "/introduction/motivation",
      },
      {
        text: { en: "Community", ru: "Сообщество" },
        link: "/introduction/community",
      },
      {
        text: { en: "Installation", ru: "Установка" },
        link: "/introduction/installation",
      },
      {
        text: { en: "Ecosystem", ru: "Экосистема effector" },
        link: "/introduction/ecosystem",
      },
      {
        text: { en: "Examples", ru: "Примеры" },
        link: "/introduction/examples",
      },
      {
        text: { en: "FAQ", ru: "Частые вопросы" },
        link: "/FAQ",
      },
    ],
  },
  {
    text: { en: "Conventions", ru: "Соглашения" },
    items: [
      {
        text: { en: "Naming", ru: "Именование" },
        link: "/conventions/naming",
      },
    ],
  },
  {
    text: { en: "TypeScript Guide", ru: "Использование с TypeScript" },
    items: [
      {
        text: { en: "Typing effector", ru: "Типизация effector" },
        link: "/typescript/typing-effector",
      },
      {
        text: { en: "Usage with `effector-react`" },
        link: "/typescript/usage-with-effector-react",
      },
      {
        text: { en: "Utility Types", ru: "Служебные типы" },
        link: "/typescript/utility-types",
      },
    ],
  },
  {
    text: { en: "Guides", ru: "Руководства" },
    items: [
      {
        text: { en: "Writing tests" },
        link: "/guides/testing",
      },
    ],
  },
  {
    text: { en: "Core principles", ru: "Основные принципы" },
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
    },
    items: [
      {
        text: { en: "Universal @@unitShape protocol" },
        link: "/ecosystem-development/unit-shape-protocol",
      },
    ],
  },
  {
    text: { en: "Explanation", ru: "Погружение" },
    items: [
      {
        text: { en: "Glossary", ru: "Глоссарий" },
        link: "/explanation/glossary",
      },
      {
        text: { en: "Events", ru: "События" },
        link: "/explanation/events",
      },
      {
        text: { en: "Computation Priority" },
        link: "/explanation/computation-priority",
      },
      {
        text: { en: "Prior Art", ru: "Prior Art" },
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
    text: { en: "Common" },
    items: [
      {
        text: { en: "Countdown Timer" },
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
        text: { en: "Dynamic Form Schema" },
        link: "/recipes/react/dynamic-form-schema",
      },
      {
        text: { en: "ToDo List with Validation" },
        link: "/recipes/react/todo-with-validation",
      },
      {
        text: { en: "Slots" },
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
        text: { en: "Integrate Next.js with effector" },
        link: "/recipes/nextjs/integrate",
      },
      {
        text: { en: "Integrate with Next.js router" },
        link: "/recipes/nextjs/router",
      },
      {
        text: { en: "Use scopeBind in Next.js" },
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
        text: { en: "useUnit", ru: "useUnit" },
        link: "/api/effector-react/useUnit",
      },
      {
        text: { en: "useList", ru: "useList" },
        link: "/api/effector-react/useList",
      },
      {
        text: { en: "useStoreMap", ru: "useStoreMap" },
        link: "/api/effector-react/useStoreMap",
      },
      {
        text: { en: "useStore", ru: "useStore" },
        link: "/api/effector-react/useStore",
      },
      {
        text: { en: "useEvent", ru: "useEvent" },
        link: "/api/effector-react/useEvent",
      },
    ],
  },
  {
    text: { en: "Components" },
    items: [
      {
        text: { en: "Provider" },
        link: "/api/effector-react/Provider",
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-react/Gate",
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-react/createGate",
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-react/useGate",
      },
    ],
  },
  {
    text: { en: "HOC-like APIs" },
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
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-solid/useStoreMap",
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-solid/Gate",
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-solid/createGate",
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-solid/useGate",
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
      },
      {
        text: { en: "createComponent" },
        link: "/api/effector-vue/createComponent",
      },
    ],
  },
  {
    text: { en: "Options and properties" },
    items: [
      {
        text: { en: "ComponentOptions" },
        link: "/api/effector-vue/ComponentOptions",
      },
      {
        text: { en: "Vue" },
        link: "/api/effector-vue/Vue",
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-vue/Gate",
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-vue/createGate",
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-vue/useGate",
      },
    ],
  },
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useStore" },
        link: "/api/effector-vue/useStore",
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-vue/useStoreMap",
      },
      {
        text: { en: "useVModel" },
        link: "/api/effector-vue/useVModel",
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
];

const effector = [
  {
    text: { en: "Unit Types", ru: "Юниты" },
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
    text: { en: "Methods", ru: "Методы" },
    items: [
      {
        text: { en: "createEvent" },
        link: "/api/effector/createEvent",
      },
      {
        text: { en: "createStore" },
        link: "/api/effector/createStore",
      },
      {
        text: { en: "createEffect" },
        link: "/api/effector/createEffect",
      },
      {
        text: { en: "createDomain" },
        link: "/api/effector/createDomain",
      },
      {
        text: { en: "attach" },
        link: "/api/effector/attach",
      },
      {
        text: { en: "sample" },
        link: "/api/effector/sample",
      },
      {
        text: { en: "combine" },
        link: "/api/effector/combine",
      },
      {
        text: { en: "merge" },
        link: "/api/effector/merge",
      },
      {
        text: { en: "split" },
        link: "/api/effector/split",
      },
      {
        text: { en: "createApi" },
        link: "/api/effector/createApi",
      },
      {
        text: { en: "restore" },
        link: "/api/effector/restore",
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
      },
      {
        text: { en: "serialize" },
        link: "/api/effector/serialize",
      },
      {
        text: { en: "allSettled" },
        link: "/api/effector/allSettled",
      },
      {
        text: { en: "scopeBind" },
        link: "/api/effector/scopeBind",
      },
      {
        text: { en: "hydrate" },
        link: "/api/effector/hydrate",
      },
    ],
  },
  {
    text: { en: "Utilities", ru: "Служебные функции" },
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
    text: { en: "Packages", ru: "Пакеты" },
    items: [
      { text: { en: "effector" }, link: "/api/effector" },
      { text: { en: "effector-react" }, link: "/api/effector-react" },
      { text: { en: "effector-solid" }, link: "/api/effector-solid" },
      { text: { en: "effector-vue" }, link: "/api/effector-vue" },
      { text: { en: "@effector/next" }, link: "https://github.com/effector/next" },
    ],
  },
];

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
  { text: { en: "v23.x (beta)", ru: "v23.x (бета)" }, link: "/" },
  { text: { en: "v22.x (actual)", ru: "v22.x (актуальная)" }, link: "https://effector.dev" },
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
  { text: { en: "Learn", ru: "Изучение" }, link: "/introduction/installation" },
  { text: { en: "API" }, link: "/api" },
  { text: { en: "Recipes", ru: "Рецепты" }, link: "/recipes" },
  { text: { en: "Blog", ru: "Блог" }, link: LINKS.blog },
  { text: { en: "Playground", ru: "Песочница" }, link: LINKS.repl },
  { text: { en: "Changelog", ru: "Изменения" }, link: LINKS.changelog },
];

export const MOBILE_NAVIGATION = createMobileNavigation([
  {
    text: { en: "Documentation", ru: "Документация" },
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
    text: { en: "Recipes", ru: "Рецепты" },
    link: "/recipes",
    items: recipes,
  },
  { text: { en: "Blog", ru: "Блог" }, link: LINKS.blog },
  { text: { en: "Playground", ru: "Песочница" }, link: LINKS.repl },
  { text: { en: "Changelog", ru: "Изменения" }, link: LINKS.changelog },
] satisfies LMobileNavItem[]);

export const FOOTER_LINKS = [
  {
    text: { en: "Docs", ru: "Документация" },
    items: [
      { text: { en: "Getting started", ru: "С чего начать" }, link: "/introduction/installation" },
      { text: { en: "API Reference" }, link: "/api" },
      { text: { en: "Writings tests", ru: "Тестирование кода" }, link: "/guides/testing" },
      { text: { en: "Release policy", ru: "Политика релизов" }, link: "/core-principles/releases" },
      { text: { en: "What's new", ru: "Что нового" }, link: LINKS.changelog },
      { text: { en: "Blog", ru: "Блог" }, link: LINKS.blog },
    ],
  },
  {
    text: { en: "Community", ru: "Сообщество" },
    items: [
      { text: { en: "Official", ru: "Официальное" }, link: LINKS.community },
      { text: { en: "Discord" }, link: LINKS.discord },
      { text: { en: "dev.to" }, link: LINKS.devTo },
      { text: { en: "Twitter" }, link: LINKS.twitter },
      { text: { en: "Telegram 🇷🇺" }, link: LINKS.telegramRU },
      { text: { en: "Telegram 🇺🇸" }, link: LINKS.telegramEN },
    ],
  },
  {
    text: { en: "More", ru: "Больше" },
    items: [
      { text: { en: "Github" }, link: LINKS.github },
      { text: { en: "Reddit" }, link: LINKS.reddit },
      { text: { en: "Youtube" }, link: LINKS.youtube },
      { text: { en: "Lines of Code" }, link: LINKS.linesOfCode },
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

type LSidebarItem = { text: LText; link: string };

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
