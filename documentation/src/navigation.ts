import { getCollection } from "astro:content";
import { nanoid } from "nanoid";
import { SITE, LINKS } from "./consts";
import { getTextLocalized, createLink, type LText, isExternal } from "./languages";

import IconEffector from "@icons/Effector.astro";
import IconReact from "@icons/React.astro";
import IconVue from "@icons/Vue.astro";
import IconSolid from "@icons/Solid.astro";
import IconNextJs from "@icons/NextJs.astro";
import IconGithub from "@icons/Github.astro";
import IconTelegram from "@icons/Telegram.astro";

const defaultSidebar: LSidebarGroup[] = [
  {
    text: { en: "Quick start", ru: "Быстрый старт", uz: "Qayta boshlash" },
    items: [
      {
        text: { en: "Get started", ru: "Начало работы", uz: "Ishni boshlash" },
        link: "/introduction/get-started",
      },
      {
        text: { en: "Core concepts", ru: "Основные концепции", uz: "Asosiy tamoyillar" },
        link: "/introduction/core-concepts",
      },
      {
        text: { en: "Installation", ru: "Установка", uz: "O'rnatma" },
        link: "/introduction/installation",
      },
      {
        text: { en: "Motivation", ru: "Мотивация", uz: "Motivatsiya" },
        link: "/introduction/motivation",
      },
      {
        text: { en: "Examples", ru: "Примеры", uz: "Namunalar" },
        link: "/introduction/examples",
      },
    ],
  },
  {
    text: {
      en: "Essentials",
      ru: "Основы",
      uz: "Asosiy",
    },
    items: [
      {
        text: {
          en: "Manage states",
          ru: "Управление состоянием",
          uz: "Holatni o'zgartirish",
        },
        link: "/essentials/manage-states",
      },
      {
        text: {
          en: "Events",
          ru: "События",
          uz: "O'zgaruvchilar",
        },
        link: "/essentials/events",
      },
      {
        text: {
          en: "Work with async",
          ru: "Работа с асинхронностью",
          uz: "Asinkronlik bilan ishlash",
        },
        link: "/essentials/work-with-async",
      },
      {
        text: {
          en: "Unit composition",
          ru: "Композиция юнитов",
          uz: "Unit kompozitsiyasi",
        },
        link: "/essentials/unit-composition",
      },
      {
        text: {
          en: "Reactivity",
          ru: "Реактивность",
          uz: "Reaktivlik",
        },
        link: "/essentials/reactivity",
      },
    ],
  },
  {
    text: { en: "Advanced", ru: "Продвинутые темы", uz: "O'zgaruvchilar" },
    items: [
      {
        text: {
          en: "Flow splitting",
          ru: "Разделение потока данных",
          uz: "Flow to'plamasi",
        },
        link: "/essentials/flow-split",
      },
      {
        text: {
          en: "Scope: Working with Isolated Contexts",
          ru: "Scope: Работа с изолированными контекстами",
          uz: "Scope: Isolatli kontekstlar bilan ishlash",
        },
        link: "/advanced/work-with-scope",
      },
      {
        text: { en: "Store SID", ru: "Хранилища и их SID", uz: "Store SID" },
        link: "/explanation/sids",
      },
      {
        text: {
          en: "Computation Priority",
          ru: "Приоритет вычислений",
          uz: "Hisoblash ustuvorligi",
        },
        link: "/explanation/computation-priority",
      },
    ],
  },
  {
    text: { en: "Guides", ru: "Руководства", uz: "Qo'llanmalar" },
    items: [
      {
        text: {
          en: "Best practices",
          ru: "Лучшие практики",
          uz: "To'g'ri usullar",
        },
        link: "/guides/best-practices",
      },
      {
        text: {
          en: "Typescript",
          ru: "Типизация",
          uz: "Typescript",
        },
        link: "/essentials/typescript",
      },
      {
        text: {
          en: "Testing",
          ru: "Тестирование",
          uz: "Testlash",
        },
        link: "/guides/testing",
      },
      {
        text: {
          en: "Server Side Rendering",
          ru: "Работа с SSR",
        },
        link: "/guides/server-side-rendering",
      },
      {
        text: {
          ru: "Использование с Websocket",
          en: "Websockets",
          uz: "Websocket bilan bog'lanish",
        },
        link: "/guides/websocket-integration",
      },
      {
        text: {
          en: "Migration guide",
          ru: "Миграция с v23",
        },
        link: "/guides/migration-guide-v23",
      },
      {
        text: {
          en: "Migrating from Redux",
          ru: "Миграция с Redux",
        },
        link: "https://withease.effector.dev/magazine/migration_from_redux.html",
      },
      {
        text: {
          en: "Usage with `effector-react`",
          ru: "Использование с `effector-react`",
          uz: "`effector-react` dan foydalaning",
        },
        link: "/typescript/usage-with-effector-react",
      },
    ],
  },
  {
    text: { en: "Resources", ru: "Ресурсы", uz: "Resurslar" },
    items: [
      {
        text: { en: "Ecosystem", ru: "Экосистема effector", uz: "Effector ekosistemasi" },
        link: "/introduction/ecosystem",
      },
      {
        text: { en: "Community", ru: "Сообщество", uz: "Jamiyat" },
        link: "/introduction/community",
      },
      {
        text: { en: "Glossary", ru: "Глоссарий", uz: "Lug'at" },
        link: "/explanation/glossary",
      },
      {
        text: { en: "Prior Art", ru: "Вдохновение", uz: "Taqdim etilganlar" },
        link: "/explanation/prior-art",
      },
      {
        text: { en: "For developers", ru: "Для разработчиков" },
        link: "/ecosystem-development/unit-shape-protocol",
      },
      {
        text: { en: "FAQ", ru: "Частые вопросы", uz: "Tezt-tez soraladigan savollar" },
        link: "/FAQ",
      },
    ],
  },
];

const recipes: LSidebarGroup[] = [
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

const effectorReact: LSidebarGroup[] = [
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useUnit", ru: "useUnit", uz: "useUnit" },
        link: "/api/effector-react/useUnit",
        tags: ["useful"],
      },
      {
        text: { en: "useList", ru: "useList", uz: "useList" },
        link: "/api/effector-react/useList",
        tags: ["useful"],
      },
      {
        text: { en: "useStoreMap", ru: "useStoreMap", uz: "useStoreMap" },
        link: "/api/effector-react/useStoreMap",
        tags: ["useful"],
      },
      {
        text: { en: "useStore ⚠️", ru: "useStore ⚠️", uz: "useStore ⚠️" },
        link: "/api/effector-react/useStore",
      },
      {
        text: { en: "useEvent ⚠️", ru: "useEvent ⚠️", uz: "useEvent ⚠️" },
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
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-react/Gate",
        tags: ["useful"],
      },
      {
        text: { en: "createGate", uz: "createGate" },
        link: "/api/effector-react/createGate",
        tags: ["useful"],
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

const effectorSolid: LSidebarGroup[] = [
  {
    text: { en: "Hooks" },
    items: [
      {
        text: { en: "useUnit" },
        link: "/api/effector-solid/useUnit",
        tags: ["useful"],
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-solid/useStoreMap",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-solid/Gate",
        tags: ["useful"],
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-solid/createGate",
        tags: ["useful"],
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-solid/useGate",
        tags: ["useful"],
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

const effectorVue: LSidebarGroup[] = [
  {
    text: { en: "Common methods" },
    items: [
      {
        text: { en: "EffectorScopePlugin" },
        link: "/api/effector-vue/EffectorScopePlugin",
        tags: ["useful"],
      },
      {
        text: { en: "createComponent" },
        link: "/api/effector-vue/createComponent",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Gates" },
    items: [
      {
        text: { en: "Gate" },
        link: "/api/effector-vue/Gate",
        tags: ["useful"],
      },
      {
        text: { en: "createGate" },
        link: "/api/effector-vue/createGate",
        tags: ["useful"],
      },
      {
        text: { en: "useGate" },
        link: "/api/effector-vue/useGate",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Composition API" },
    items: [
      {
        text: { en: "useUnit" },
        link: "/api/effector-vue/useUnit",
        tags: ["useful"],
      },
      {
        text: { en: "useStore" },
        link: "/api/effector-vue/useStore",
      },
      {
        text: { en: "useStoreMap" },
        link: "/api/effector-vue/useStoreMap",
        tags: ["useful"],
      },
      {
        text: { en: "useVModel" },
        link: "/api/effector-vue/useVModel",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Options API" },
    items: [
      {
        text: { en: "VueEffector" },
        link: "/api/effector-vue/VueEffector",
        tags: ["useful"],
      },
      {
        text: { en: "VueEffector (Vue2)" },
        link: "/api/effector-vue/VueEffectorVue2",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Options and properties", uz: "Variantlar va xususiyatlar" },
    items: [
      {
        text: { en: "ComponentOptions (Vue2)" },
        link: "/api/effector-vue/ComponentOptions",
        tags: ["useful"],
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

const effector: LSidebarGroup[] = [
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
        // TODO: change to tags: ['actual', 'creators'], then in any place filter out by these tags
        tags: ["useful"],
      },
      {
        text: { en: "createStore" },
        link: "/api/effector/createStore",
        tags: ["useful"],
      },
      {
        text: { en: "createEffect" },
        link: "/api/effector/createEffect",
        tags: ["useful"],
      },
      {
        text: { en: "createDomain" },
        link: "/api/effector/createDomain",
      },
      {
        text: { en: "attach" },
        link: "/api/effector/attach",
        tags: ["useful"],
      },
      {
        text: { en: "merge" },
        link: "/api/effector/merge",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Methods", ru: "Методы", uz: "Usullar" },
    items: [
      {
        text: { en: "sample" },
        link: "/api/effector/sample",
        tags: ["useful"],
      },
      {
        text: { en: "combine" },
        link: "/api/effector/combine",
        tags: ["useful"],
      },
      {
        text: { en: "split" },
        link: "/api/effector/split",
        tags: ["useful"],
      },
      {
        text: { en: "createApi" },
        link: "/api/effector/createApi",
        tags: ["useful"],
      },
      {
        text: { en: "restore" },
        link: "/api/effector/restore",
        tags: ["useful"],
      },
      {
        text: { en: "forward ⚠️" },
        link: "/api/effector/forward",
      },
      {
        text: { en: "guard ⚠️" },
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
        tags: ["useful"],
      },
      {
        text: { en: "serialize" },
        link: "/api/effector/serialize",
        tags: ["useful"],
      },
      {
        text: { en: "allSettled" },
        link: "/api/effector/allSettled",
        tags: ["useful"],
      },
      {
        text: { en: "scopeBind" },
        link: "/api/effector/scopeBind",
        tags: ["useful"],
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
        link: "/api/effector/swc-plugin",
      },
    ],
  },
];

const apiPackages: LSidebarIconItem[] = [
  { text: { en: "effector" }, link: "/api/effector", icon: IconEffector },
  { text: { en: "effector-react" }, link: "/api/effector-react", icon: IconReact },
  { text: { en: "effector-solid" }, link: "/api/effector-solid", icon: IconSolid },
  { text: { en: "effector-vue" }, link: "/api/effector-vue", icon: IconVue },
  { text: { en: "@effector/next" }, link: "https://github.com/effector/next", icon: IconNextJs },
];

const externalPackages: LSidebarItem[] = [
  { text: { en: "effector patronum" }, link: "https://patronum.effector.dev" },
  { text: { en: "effector with ease" }, link: "https://withease.effector.dev" },
  { text: { en: "@effector/reflect" }, link: "https://reflect.effector.dev" },
  { text: { en: "atomic router" }, link: "https://atomic-router.github.io/" },
  { text: { en: "farfetched" }, link: "https://ff.effector.dev" },
];

const api: LSidebarGroup[] = [
  {
    text: { en: "Packages", ru: "Пакеты", uz: "Paketlar" },
    items: apiPackages,
  },
  {
    text: { en: "Official Ecosystem", ru: "Экосистема" },
    items: externalPackages,
  },
];

// {
//   effector: {
//     link: "/api/effector",
//     groups: navigationToQuickMenu(effector),
//   },
//   "effector-react": {
//     link: "/api/effector-react",
//     groups: navigationToQuickMenu(effectorReact),
//   },
//   "effector-solid": {
//     link: "/api/effector-solid",
//     groups: navigationToQuickMenu(effectorSolid),
//   },
//   "effector-vue": {
//     link: "/api/effector-vue",
//     groups: navigationToQuickMenu(effectorVue),
//   },
// };

export type MostUsefulItem = {
  text: LText;
  icon: (props: { size?: number | number; class?: string }) => any;
  description: LText;
  items: LSidebarGroup[];
};

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

export function filterSidebarGroups(tags: ItemTag[], groups: LSidebarGroup[]) {
  return groups
    .map((group) => ({ ...group, items: filterSidebarItems(tags, group.items) }))
    .filter((group) => group.items.length > 0);
}

export function filterSidebarItems(tags: ItemTag[], items: LSidebarItem[]) {
  return items.filter((item) => item.tags?.some((tag) => tags.includes(tag)));
}

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

export const SOCIAL_LINKS: {
  text: LText;
  icon: (props: { size?: number }) => any;
  link: string;
}[] = [
  { text: { en: "GitHub" }, icon: IconGithub, link: LINKS.github },
  { text: { en: "Telegram" }, icon: IconTelegram, link: LINKS.telegramRU },
];

export const DESKTOP_NAVIGATION: (LSidebarItem & Partial<LSidebarGroup>)[] = [
  { text: { en: "Learn", ru: "Изучение", uz: "O'rganish" }, link: "/introduction/motivation" },
  {
    text: { en: "API" },
    link: "/api",
    items: [{ text: { en: "Overview", ru: "Обзор" }, link: "/api" }, ...apiPackages],
  },
  { text: { en: "Recipes", ru: "Рецепты", uz: "Retseptlar" }, link: "/recipes" },
  { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog },
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
      { text: { en: "API Reference", ru: "Справочник API", uz: "API Havolasi" }, link: "/api" },
      {
        text: { en: "Writings tests", ru: "Тестирование кода", uz: "Kodni testlash" },
        link: "/guides/testing",
      },
      {
        text: { en: "Release policy", ru: "Политика релизов", uz: "Relizlar siyosati" },
        link: "/core-principles/releases",
      },
      { text: { en: "What's new", ru: "Что нового", uz: "Yangiliklar" }, link: LINKS.changelog },
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
      { text: { en: "ChatGPT" }, link: "https://chat.openai.com/g/g-thabaCJlt-effector-assistant" },
      { text: { en: "Blog", ru: "Блог", uz: "Blog" }, link: LINKS.blog },
      { text: { en: "Changelog", ru: "Изменения", uz: "O'zgarishlar" }, link: LINKS.changelog },
      { text: { en: "Playground", ru: "Песочница", uz: "Playground" }, link: LINKS.repl },
      { text: { en: "Docs powered by Astro" }, link: "https://astro.build" },
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

export function isSidebarGroup(item: LSidebarGroup | LSidebarItem): item is LSidebarGroup {
  return "items" in item && "text" in item;
}

export type ItemTag = "useful";

type LSidebarItem = {
  text: LText;
  link: string;
  tags?: ItemTag[];
};

type LSidebarIconItem = LSidebarItem & { icon?: (opts: { size?: number }) => any };

export function isSidebarIconItem(item: LSidebarItem): item is LSidebarIconItem {
  return "icon" in item;
}

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

        if (isExternal(item)) {
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

export const getPrevNext = (
  sidebar: Awaited<ReturnType<typeof getLocalizedSidebar>>,
  currentPath: string,
) => {
  const flatItems = sidebar.flatMap((group) => group.items);
  const currentIndex = flatItems.findIndex((item) => item.link === currentPath);

  const prevPage = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextPage = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return { prevPage, nextPage };
};

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

export function trimTrailingSlash(link: string) {
  return link.endsWith("/") ? link.slice(0, -1) : link;
}
