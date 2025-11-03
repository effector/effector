import type { LText } from "./languages";
import type { LSidebarItem } from "./navigation";
import VueIcon from "@icons/Vue.astro";
import ReactIcon from "@icons/React.astro";
import SolidIcon from "@icons/Solid.astro";
import NextJsIcon from "@icons/NextJs.astro";

export interface LSidebarGroup {
  text: LText;
  items: LSidebarItem[];
  collapsed?: boolean;
}

export const learning: LSidebarGroup[] = [
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
          en: "Dynamic models",
          ru: "Динамические модели",
          uz: "Dinamik modellar",
        },
        link: "/essentials/dynamic-models",
      },
    ],
  },
  {
    text: {
      en: "Goodies",
      ru: "Будет полезно!",
      uz: "Mumkin bo'lgan!",
    },
    items: [
      {
        text: {
          en: "Most popular API",
          ru: "Наиболее популярные API",
          uz: "Eng ko'p foydalaniladigan API",
        },
        link: "/api",
      },
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
          en: "Mindset in effector",
          uz: "Effectordan foydalanish",
          ru: "Как мыслить в парадигме effector",
        },
        link: "/resources/mindset",
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
          en: "Isolated scopes",
          ru: "Изолированные контексты",
          uz: "Izolatsiya qilingan kontekstlar",
        },
        link: "/advanced/work-with-scope",
      },
      {
        text: {
          en: "Debug Traces mode",
          ru: "Debug Traces mode",
          uz: "Debug Traces mode",
        },
        link: "/api/effector/enable_debug_traces",
      },
    ],
  },
];

// temp var
// remove later when mobile navigation will finished
export const recipeItems: LSidebarGroup[] = [
  {
    collapsed: true,
    text: { en: "Common", uz: "Umumiy" },
    items: [
      {
        text: { en: "Countdown Timer", uz: "Hisob taymeri" },
        link: "/recipes/common/countdown",
      },
    ],
  },
  {
    collapsed: true,
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
    collapsed: true,
    text: { en: "React Native" },
    items: [
      {
        text: { en: "AsyncStorage Counter" },
        link: "/recipes/react-native/asyncstorage-counter",
      },
    ],
  },
];

export const guidesAndRecipes: LSidebarGroup[] = [
  {
    text: { en: "Guides", ru: "Руководства", uz: "Qo'llanmalar" },
    items: [
      {
        text: {
          en: "Troubleshooting",
          ru: "Исправление ошибок",
          uz: "Xatolarni o'zgartirish",
        },
        link: "/guides/troubleshooting",
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
          en: "Scope loss",
          ru: "Потеря скоупа",
          uz: "Scope to'plamasi",
        },
        link: "/guides/scope-loss",
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
    ],
  },
  {
    text: { en: "Resources", ru: "Ресурсы", uz: "Resurslar" },
    items: [
      {
        text: { en: "Store SID", ru: "Сторы и их SID", uz: "Store SID" },
        link: "/explanation/sids",
      },
      {
        text: {
          en: "Static initialization",
          ru: "Инициализация юнитов",
          uz: "Hisoblash ustuvorligi",
        },
        link: "/resources/static-initialization",
      },
      {
        text: { en: "Ecosystem", ru: "Экосистема effector", uz: "Effector ekosistemasi" },
        link: "/introduction/ecosystem",
      },
      {
        text: {
          en: "Computation Priority",
          ru: "Приоритет вычислений",
          uz: "Hisoblash ustuvorligi",
        },
        link: "/explanation/computation-priority",
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
        text: { en: "Releases policy", ru: "Политика релизов", uz: "Relizlar siyosati" },
        link: "/resources/releases",
      },
      {
        text: { en: "FAQ", ru: "Частые вопросы", uz: "Tezt-tez soraladigan savollar" },
        link: "/FAQ",
      },
    ],
  },
];

export const effectorReact: LSidebarGroup[] = [
  {
    text: { en: "Overview", ru: "Обзор" },
    items: [
      {
        link: "/api/effector-react",
        text: {
          en: "API reference",
          ru: "Справочник API",
          uz: "API taqdimati",
        },
      },
      {
        text: {
          en: "Usage with effector-react",
          ru: "Использование с effector-react",
          uz: "effector-react dan foydalaning",
        },
        link: "/typescript/usage-with-effector-react",
      },
    ],
  },
  {
    text: { en: "Hooks", ru: "Хуки" },
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
    text: { en: "Components", ru: "Компоненты", uz: "Komponentlar" },
    items: [
      {
        text: { en: "Provider", ru: "Provider", uz: "Provider" },
        link: "/api/effector-react/Provider",
        tags: ["useful"],
      },
    ],
  },
  {
    text: { en: "Gates", ru: "Гейты" },
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
    text: { en: "Import map", ru: "Подпакеты" },
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
    text: { en: "Low-level API", ru: "Низкоуровневое API" },
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

export const effectorSolid: LSidebarGroup[] = [
  {
    text: { en: "Overview", ru: "Обзор" },
    items: [
      {
        link: "/api/effector-solid",
        text: {
          en: "API reference",
          ru: "Справочник API",
          uz: "API taqdimati",
        },
      },
    ],
  },
  {
    text: { en: "Hooks", ru: "Хуки" },
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
    text: { en: "Gates", ru: "Гейты" },
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
    text: { en: "Import map", ru: "Подпакеты" },
    items: [
      {
        text: { en: "effector-solid/scope" },
        link: "/api/effector-solid/module/scope",
      },
    ],
  },
];

export const effectorVue: LSidebarGroup[] = [
  {
    text: { en: "Overview", ru: "Обзор" },
    items: [
      {
        link: "/api/effector-vue",
        text: {
          en: "API reference",
          ru: "Справочник API",
          uz: "API taqdimati",
        },
      },
    ],
  },
  {
    text: { en: "Common methods", ru: "Базовые методы" },
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
    text: { en: "Gates", ru: "Гейты" },
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
    text: { en: "Import map", ru: "Подпакеты" },
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

export const effector: LSidebarGroup[] = [
  {
    text: { en: "Overview", ru: "Обзор", uz: "Batafsil" },
    items: [
      {
        link: "/api/effector",
        text: {
          en: "API reference",
          ru: "Справочник API",
          uz: "API taqdimati",
        },
      },
    ],
  },
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
    text: { en: "Creators", ru: "Создание юнитов" },
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
        text: { en: "attach" },
        link: "/api/effector/attach",
        tags: ["useful"],
      },
      {
        text: { en: "merge" },
        link: "/api/effector/merge",
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
    text: { en: "Low-level API", ru: "Низкоуровневое API" },
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
    text: { en: "Import map", ru: "Подпакеты" },
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
    text: { en: "Compiler Plugins", ru: "Плагины для сборки" },
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

export const nextJsRecipes: LSidebarItem[] = [
  {
    text: {
      en: "Integrate Next.js with effector",
      ru: "Интеграция Next.js с effector",
      uz: "Next.js effector bilan integratsiyasi",
    },
    link: "/recipes/nextjs/integrate",
  },
  {
    text: {
      en: "Integrate with Next.js router",
      ru: "Использование Next.js router в effector",
      uz: "Next.js router bilan integratsiyasi",
    },
    link: "/recipes/nextjs/router",
  },
  {
    text: {
      en: "Use scopeBind in Next.js",
      ru: "scopeBind в Next.js",
      uz: "Next.js da scopeBind dan foydalaning",
    },
    link: "/recipes/nextjs/scope-bind",
  },
];

export const effectorNext: LSidebarGroup[] = [
  {
    text: {
      en: "Overview",
      uz: "Batafsil ma'lumot",
      ru: "Обзор",
    },
    items: nextJsRecipes,
  },
];

export type TabPanelItems = {
  id: string;
  Icon?: typeof ReactIcon;
  text: LText;
  items: LSidebarGroup[];
};

export const PANEL_FRAMEWORK_ITEMS: TabPanelItems[] = [
  {
    id: "react",
    Icon: ReactIcon,
    text: {
      en: "React",
    },
    items: effectorReact,
  },
  {
    id: "vue",
    Icon: VueIcon,
    text: {
      en: "Vue",
    },
    items: effectorVue,
  },
  {
    id: "solid",
    Icon: SolidIcon,
    text: {
      en: "Solid",
    },
    items: effectorSolid,
  },
  {
    id: "next",
    Icon: NextJsIcon,
    text: {
      en: "Next.js",
    },
    items: effectorNext,
  },
];

export const PANEL_ITEMS: TabPanelItems[] = [
  {
    id: "learning",
    text: {
      en: "Learning",
      ru: "Изучение",
    },
    items: learning,
  },
  {
    id: "guides",
    text: {
      en: "Guides & Resources",
      ru: "Руководства и ресурсы",
    },
    items: [...guidesAndRecipes, ...recipeItems],
  },
  {
    id: "api",
    text: {
      en: "API effector",
      ru: "API effector",
    },
    items: effector,
  },
];
