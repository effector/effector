import {DefaultTheme} from 'vitepress'

const commonSidebars: LSidebar = {
  '/api/effector-react': [
    {
      text: {en: 'Hooks'},
      items: [
        {
          text: {en: 'useUnit', ru: 'useUnit'},
          link: '/api/effector-react/useUnit',
        },
        {
          text: {en: 'useList', ru: 'useList'},
          link: '/api/effector-react/useList',
        },
        {
          text: {en: 'useStoreMap', ru: 'useStoreMap'},
          link: '/api/effector-react/useStoreMap',
        },
        {
          text: {en: 'useStore', ru: 'useStore'},
          link: '/api/effector-react/useStore',
        },
        {
          text: {en: 'useEvent', ru: 'useEvent'},
          link: '/api/effector-react/useEvent',
        },
      ],
    },
    {
      text: {en: 'Gates'},
      items: [
        {
          text: {en: 'Gate'},
          link: '/api/effector-react/Gate',
        },
        {
          text: {en: 'createGate'},
          link: '/api/effector-react/createGate',
        },
        {
          text: {en: 'useGate'},
          link: '/api/effector-react/useGate',
        },
      ],
    },
    {
      text: {en: 'HOC-like APIs'},
      collapsed: true,
      items: [
        {
          text: {en: 'connect'},
          link: '/api/effector-react/connect',
        },
        {
          text: {en: 'createComponent'},
          link: '/api/effector-react/createComponent',
        },
        {
          text: {en: 'createStoreConsumer'},
          link: '/api/effector-react/createStoreConsumer',
        },
      ],
    },
  ],

  '/api/effector-solid': [
    {
      text: {en: 'Hooks'},
      items: [
        {
          text: {en: 'useUnit'},
          link: '/api/effector-solid/useUnit',
        },
        {
          text: {en: 'useStoreMap'},
          link: '/api/effector-solid/useStoreMap',
        },
      ],
    },
    {
      text: {en: 'Gates'},
      items: [
        {
          text: {en: 'Gate'},
          link: '/api/effector-solid/Gate',
        },
        {
          text: {en: 'createGate'},
          link: '/api/effector-solid/createGate',
        },
        {
          text: {en: 'useGate'},
          link: '/api/effector-solid/useGate',
        },
      ],
    },
  ],

  '/api/effector-vue': [
    {
      text: {en: 'Common methods'},
      items: [
        {
          text: {en: 'VueEffector'},
          link: '/api/effector-vue/VueEffector',
        },
        {
          text: {en: 'createComponent'},
          link: '/api/effector-vue/createComponent',
        },
      ],
    },
    {
      text: {en: 'Options and properties'},
      items: [
        {
          text: {en: 'ComponentOptions'},
          link: '/api/effector-vue/ComponentOptions',
        },
        {
          text: {en: 'Vue'},
          link: '/api/effector-vue/Vue',
        },
      ],
    },
    {
      text: {en: 'Gates'},
      items: [
        {
          text: {en: 'Gate'},
          link: '/api/effector-vue/Gate',
        },
        {
          text: {en: 'createGate'},
          link: '/api/effector-vue/createGate',
        },
        {
          text: {en: 'useGate'},
          link: '/api/effector-vue/useGate',
        },
      ],
    },
    {
      text: {en: 'Hooks'},
      items: [
        {
          text: {en: 'useStore'},
          link: '/api/effector-vue/useStore',
        },
        {
          text: {en: 'useStoreMap'},
          link: '/api/effector-vue/useStoreMap',
        },
        {
          text: {en: 'useVModel'},
          link: '/api/effector-vue/useVModel',
        },
      ],
    },
    {
      text: {en: 'Scoped API'},
      items: [
        {
          text: {en: 'useEvent'},
          link: '/api/effector-vue/useEvent',
        },
        {
          text: {en: 'VueSSRPlugin'},
          link: '/api/effector-vue/VueSSRPlugin',
        },
      ],
    },
  ],

  '/api/effector': [
    {
      text: {en: 'Unit Types', ru: 'Юниты'},
      items: [
        {
          text: {en: 'Event', ru: 'Event'},
          link: '/api/effector/Event',
        },
        {
          text: {en: 'Store', ru: 'Store'},
          link: '/api/effector/Store',
        },
        {
          text: {en: 'Effect', ru: 'Effect'},
          link: '/api/effector/Effect',
        },
        {
          text: {en: 'Domain'},
          link: '/api/effector/Domain',
        },
        {
          text: {en: 'Scope', ru: 'Scope'},
          link: '/api/effector/Scope',
        },
      ],
    },
    {
      text: {en: 'Methods', ru: 'Методы'},
      items: [
        {
          text: {en: 'createStore', ru: 'createStore'},
          link: '/api/effector/createStore',
        },
        {
          text: {en: 'createEvent', ru: 'createEvent'},
          link: '/api/effector/createEvent',
        },
        {
          text: {en: 'createEffect', ru: 'createEffect'},
          link: '/api/effector/createEffect',
        },
        {
          text: {en: 'createDomain'},
          link: '/api/effector/createDomain',
        },
        {
          text: {en: 'createApi', ru: 'createApi'},
          link: '/api/effector/createApi',
        },
        {
          text: {en: 'attach'},
          link: '/api/effector/attach',
        },
        {
          text: {en: 'combine', ru: 'combine'},
          link: '/api/effector/combine',
        },
        {
          text: {en: 'forward', ru: 'forward'},
          link: '/api/effector/forward',
        },
        {
          text: {en: 'fromObservable', ru: 'fromObservable'},
          link: '/api/effector/fromObservable',
        },
        {
          text: {en: 'guard', ru: 'guard'},
          link: '/api/effector/guard',
        },
        {
          text: {en: 'merge', ru: 'merge'},
          link: '/api/effector/merge',
        },
        {
          text: {en: 'restore'},
          link: '/api/effector/restore',
        },
        {
          text: {en: 'sample', ru: 'sample'},
          link: '/api/effector/sample',
        },
        {
          text: {en: 'split'},
          link: '/api/effector/split',
        },
      ],
    },
    {
      text: {en: 'Fork API'},
      collapsed: true,
      items: [
        {
          text: {en: 'fork'},
          link: '/api/effector/fork',
        },
        {
          text: {en: 'serialize'},
          link: '/api/effector/serialize',
        },
        {
          text: {en: 'allSettled'},
          link: '/api/effector/allSettled',
        },
        {
          text: {en: 'hydrate'},
          link: '/api/effector/hydrate',
        },
        {
          text: {en: 'scopeBind', ru: 'scopeBind'},
          link: '/api/effector/scopeBind',
        },
      ],
    },
    {
      text: {en: 'Utilities', ru: 'Служебные функции'},
      collapsed: true,
      items: [
        {
          text: {en: 'is', ru: 'is'},
          link: '/api/effector/is',
        },
      ],
    },
    {
      text: {en: 'Low-level API'},
      collapsed: true,
      items: [
        {
          text: {en: 'clearNode', ru: 'clearNode'},
          link: '/api/effector/clearNode',
        },
        {
          text: {en: 'withRegion'},
          link: '/api/effector/withRegion',
        },
        {
          text: {en: 'launch', ru: 'launch'},
          link: '/api/effector/launch',
        },
      ],
    },
    {
      text: {en: 'Compiler Plugins'},
      items: [
        {
          text: {en: 'Babel plugin', ru: 'Babel plugin'},
          link: '/api/effector/babel-plugin',
        },
        {
          text: {en: 'SWC plugin', ru: 'SWC plugin'},
          link: 'https://github.com/effector/swc-plugin',
        },
      ],
    },
  ],

  '/recipes': [
    {
      text: {en: 'Common'},
      items: [
        {
          text: {en: 'Countdown Timer'},
          link: '/recipes/common/countdown',
        },
      ],
    },
    {
      text: {en: 'React'},
      items: [
        {
          text: {en: 'Counter'},
          link: '/recipes/react/counter',
        },
        {
          text: {en: 'Effects'},
          link: '/recipes/react/effects',
        },
        {
          text: {en: 'Forms'},
          link: '/recipes/react/forms',
        },
        {
          text: {en: 'Gate'},
          link: '/recipes/react/gate',
        },
        {
          text: {en: 'ToDo Creator'},
          link: '/recipes/react/todo-creator',
        },
        {
          text: {en: 'Dynamic Form Schema'},
          link: '/recipes/react/dynamic-form-schema',
        },
        {
          text: {en: 'ToDo List with Validation'},
          link: '/recipes/react/todo-with-validation',
        },
        {
          text: {en: 'Slots'},
          link: '/recipes/react/slots',
        },
      ],
    },
    {
      text: {en: 'React Native'},
      items: [
        {
          text: {en: 'AsyncStorage Counter'},
          link: '/recipes/react-native/asyncstorage-counter',
        },
      ],
    },
  ],

  '/': [
    {
      text: {en: 'Introduction', ru: 'Начало работы'},
      items: [
        {
          text: {en: 'Motivation'},
          link: '/introduction/motivation',
        },
        {
          text: {en: 'Community'},
          link: '/introduction/community',
        },
        {
          text: {en: 'Installation', ru: 'Установка'},
          link: '/introduction/installation',
        },
        {
          text: {en: 'Ecosystem', ru: 'Экосистема effector'},
          link: '/introduction/ecosystem',
        },
        {
          text: {en: 'Examples', ru: 'Примеры'},
          link: '/introduction/examples',
        },
      ],
    },
    {
      text: {en: 'Conventions', ru: 'Соглашения'},
      items: [
        {
          text: {en: 'Naming'},
          link: '/conventions/naming',
        },
      ],
    },
    {
      text: {en: 'TypeScript Guide', ru: 'Использование с TypeScript'},
      items: [
        {
          text: {en: 'Typing effector', ru: 'Типизация effector'},
          link: '/typescript/typing-effector',
        },
        {
          text: {en: 'Usage with `effector-react`'},
          link: '/typescript/usage-with-effector-react',
        },
        {
          text: {en: 'Utility Types', ru: 'Служебные типы'},
          link: '/typescript/utility-types',
        },
      ],
    },
    {
      text: {
        en: 'Core principles',
      },
      items: [
        {
          text: {
            en: 'Releases policy',
          },
          link: '/core-principles/releases',
        },
        {
          text: {en: 'Testing'},
          link: '/core-principles/testing',
        },
        {
          text: {en: 'Typings'},
          link: '/core-principles/typings',
        },
        {
          text: {en: 'Own your data [DRAFT]'},
          link: '/core-principles/own-your-data',
        },
      ],
    },
    {
      text: {
        en: 'For library developers',
      },
      items: [
        {
          text: {
            en: 'Universal @@unitShape protocol',
          },
          link: '/ecosystem-development/unit-shape-protocol',
        },
      ],
    },
    {
      text: {en: 'Explanation', ru: 'Погружение'},
      items: [
        {
          text: {en: 'Glossary', ru: 'Глоссарий'},
          link: '/explanation/glossary',
        },
        {
          text: {en: 'Computation Priority'},
          link: '/explanation/computation-priority',
        },
        {
          text: {en: 'Prior Art', ru: 'Prior Art'},
          link: '/explanation/prior-art',
        },
        {
          text: {en: 'Protocol @@unitShape'},
          link: '/explanation/protocol-unitShape',
        },
      ],
    },
  ],
}

interface LText {
  en: string
  ru?: string
  'zh-cn'?: string
}

interface LSidebar {
  [path: string]: LSidebarGroup[]
}

interface LSidebarGroup {
  text: LText
  items: LSidebarItem[]
  collapsed?: boolean
}

type LSidebarItem = {text: LText; link: string}

function makeLocalizedSidebar(
  sidebar: LSidebar,
  locales: Array<keyof LText>, // [ru, zh-cn]
  mainLocale: keyof LText, // en
): DefaultTheme.Sidebar {
  const convertedSidebar: DefaultTheme.Sidebar = {}

  locales.forEach(locale => {
    Object.keys(sidebar).forEach(sidebarPath => {
      convertedSidebar[`/${locale}${sidebarPath}`] = localizeSidebarGroups(
        sidebar[sidebarPath],
        locale,
        mainLocale,
      )
    })
  })

  Object.keys(sidebar).forEach(sidebarPath => {
    convertedSidebar[sidebarPath] = localizeSidebarGroups(
      sidebar[sidebarPath],
      mainLocale,
      mainLocale,
    )
  })

  return convertedSidebar
}

function localizeSidebarGroups(
  groups: LSidebarGroup[],
  locale: keyof LText,
  mainLocale: keyof LText,
): DefaultTheme.SidebarGroup[] {
  return groups.map<DefaultTheme.SidebarGroup>(group => {
    const text = group.text[locale] ?? group.text[mainLocale]
    const items = group.items.map<DefaultTheme.SidebarItem>(item => {
      const text =
        item.text[locale] ?? `${item.text[mainLocale]} (${mainLocale})`
      const link =
        locale in item.text &&
        locale !== mainLocale &&
        !item.link.startsWith('http')
          ? `/${locale}${item.link}`
          : item.link
      return {text, link}
    })
    return {
      text,
      items,
      collapsed: group.collapsed,
      collapsible: group.collapsed,
    }
  })
}

export const sidebar = makeLocalizedSidebar(
  commonSidebars,
  ['ru', 'zh-cn'],
  'en',
)
