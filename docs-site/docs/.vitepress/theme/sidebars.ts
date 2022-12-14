import {DefaultTheme} from 'vitepress'

const sidebarEnglish: DefaultTheme.Sidebar = {
  '/api/effector-react': [
    {
      text: 'Hooks',
      items: [
        {
          text: 'useUnit',
          link: '/api/effector-react/useUnit',
        },
        {
          text: 'useList',
          link: '/api/effector-react/useList',
        },
        {
          text: 'useStoreMap',
          link: '/api/effector-react/useStoreMap',
        },
        {
          text: 'useStore',
          link: '/api/effector-react/useStore',
        },
        {
          text: 'useEvent',
          link: '/api/effector-react/useEvent',
        },
      ],
    },
    {
      text: 'Gates',
      items: [
        {
          text: 'Gate',
          link: '/api/effector-react/Gate',
        },
        {
          text: 'createGate',
          link: '/api/effector-react/createGate',
        },
        {
          text: 'useGate',
          link: '/api/effector-react/useGate',
        },
      ],
    },
    {
      text: 'HOC-like APIs',
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: 'connect',
          link: '/api/effector-react/connect',
        },
        {
          text: 'createComponent',
          link: '/api/effector-react/createComponent',
        },
        {
          text: 'createStoreConsumer',
          link: '/api/effector-react/createStoreConsumer',
        },
      ],
    },
  ],
  '/api/effector-solid': [],
  '/api/effector-vue': [],

  '/api/effector': [
    {
      text: 'Unit Types',
      items: [
        {
          text: 'Event',
          link: '/api/effector/Event',
        },
        {
          text: 'Store',
          link: '/api/effector/Store',
        },
        {
          text: 'Effect',
          link: '/api/effector/Effect',
        },
        {
          text: 'Domain',
          link: '/api/effector/Domain',
        },
        {
          text: 'Scope',
          link: '/api/effector/Scope',
        },
      ],
    },
    {
      text: 'Methods',
      items: [
        {
          text: 'createStore',
          link: '/api/effector/createStore',
        },
        {
          text: 'createEvent',
          link: '/api/effector/createEvent',
        },
        {
          text: 'createEffect',
          link: '/api/effector/createEffect',
        },
        {
          text: 'createDomain',
          link: '/api/effector/createDomain',
        },
        {
          text: 'createApi',
          link: '/api/effector/createApi',
        },
        {
          text: 'attach',
          link: '/api/effector/attach',
        },
        {
          text: 'combine',
          link: '/api/effector/combine',
        },
        {
          text: 'forward',
          link: '/api/effector/forward',
        },
        {
          text: 'fromObservable',
          link: '/api/effector/fromObservable',
        },
        {
          text: 'guard',
          link: '/api/effector/guard',
        },
        {
          text: 'merge',
          link: '/api/effector/merge',
        },
        {
          text: 'restore',
          link: '/api/effector/restore',
        },
        {
          text: 'sample',
          link: '/api/effector/sample',
        },
        {
          text: 'split',
          link: '/api/effector/split',
        },
      ],
    },
    {
      text: 'Fork API',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'fork',
          link: '/api/effector/fork',
        },
        {
          text: 'serialize',
          link: '/api/effector/serialize',
        },
        {
          text: 'allSettled',
          link: '/api/effector/allSettled',
        },
        {
          text: 'hydrate',
          link: '/api/effector/hydrate',
        },
        {
          text: 'scopeBind',
          link: '/api/effector/scopeBind',
        },
      ],
    },
    {
      text: 'Utilities',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'is',
          link: '/api/effector/is',
        },
      ],
    },
    {
      text: 'Low-level API',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'clearNode',
          link: '/api/effector/clearNode',
        },
        {
          text: 'withRegion',
          link: '/api/effector/withRegion',
        },
        {
          text: 'launch',
          link: '/api/effector/launch',
        },
      ],
    },
    {
      text: 'Compiler Plugins',
      items: [
        {
          text: 'Babel plugin',
          link: '/api/effector/babel-plugin',
        },
        {
          text: 'SWC plugin',
          link: 'https://github.com/effector/swc-plugin',
        },
      ],
    },
  ],

  '/recipes': [
    {
      text: 'Common',
      items: [
        {
          text: 'Countdown Timer',
          link: '/recipes/common/countdown',
        },
      ],
    },
    {
      text: 'React',
      items: [
        {
          text: 'Counter',
          link: '/recipes/react/counter',
        },
        {
          text: 'Effects',
          link: '/recipes/react/effects',
        },
        {
          text: 'Forms',
          link: '/recipes/react/forms',
        },
        {
          text: 'Gate',
          link: '/recipes/react/gate',
        },
        {
          text: 'ToDo Creator',
          link: '/recipes/react/todo-creator',
        },
        {
          text: 'Dynamic Form Schema',
          link: '/recipes/react/dynamic-form-schema',
        },
        {
          text: 'ToDo List with Validation',
          link: '/recipes/react/todo-with-validation',
        },
        {
          text: 'Slots',
          link: '/recipes/react/slots',
        },
      ],
    },
    {
      text: 'React Native',
      items: [
        {
          text: 'AsyncStorage Counter',
          link: '/recipes/react-native/asyncstorage-counter',
        },
      ],
    },
  ],
  '/': [
    {
      text: 'Getting started',
      items: [
        {
          text: 'Motivation',
          link: '/introduction/motivation',
        },
        {
          text: 'Community',
          link: '/introduction/community',
        },
        {
          text: 'Installation',
          link: '/introduction/installation',
        },
        {
          text: 'Ecosystem',
          link: '/introduction/ecosystem',
        },
        {
          text: 'Examples',
          link: '/introduction/examples',
        },
      ],
    },
    {
      text: 'Conventions',
      items: [
        {
          text: 'Naming',
          link: '/conventions/naming',
        },
      ],
    },
    {
      text: 'TypeScript guide',
      items: [
        {
          text: 'Typing effector',
          link: '/typescript/typing-effector',
        },
        {
          text: 'Usage with `effector-react`',
          link: '/typescript/usage-with-effector-react',
        },
        {
          text: 'Utility Types',
          link: '/typescript/utility-types',
        },
      ],
    },
    {
      text: 'Explanation',
      items: [
        {
          text: 'Glossary',
          link: '/explanation/glossary',
        },
        {
          text: 'Computation Priority',
          link: '/explanation/computation-priority',
        },
        {
          text: 'Prior Art',
          link: '/explanation/prior-art',
        },
      ],
    },
  ],
}

const sidebarRussian: DefaultTheme.Sidebar = {
  '/ru/api/effector-react': [
    {
      text: 'Hooks',
      items: [
        {
          text: 'useUnit',
          link: '/api/effector-react/useUnit',
        },
        {
          text: 'useList',
          link: '/api/effector-react/useList',
        },
        {
          text: 'useStoreMap',
          link: '/api/effector-react/useStoreMap',
        },
        {
          text: 'useStore',
          link: '/api/effector-react/useStore',
        },
        {
          text: 'useEvent',
          link: '/api/effector-react/useEvent',
        },
      ],
    },
    {
      text: 'Gates',
      items: [
        {
          text: 'Gate',
          link: '/api/effector-react/Gate',
        },
        {
          text: 'createGate',
          link: '/api/effector-react/createGate',
        },
        {
          text: 'useGate',
          link: '/api/effector-react/useGate',
        },
      ],
    },
    {
      text: 'HOC-like APIs',
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: 'connect',
          link: '/api/effector-react/connect',
        },
        {
          text: 'createComponent',
          link: '/api/effector-react/createComponent',
        },
        {
          text: 'createStoreConsumer',
          link: '/api/effector-react/createStoreConsumer',
        },
      ],
    },
  ],
  '/ru/api/effector-solid': [],
  '/ru/api/effector-vue': [],

  '/ru/api/effector': [
    {
      text: 'Unit Types',
      items: [
        {
          text: 'Event',
          link: '/api/effector/Event',
        },
        {
          text: 'Store',
          link: '/api/effector/Store',
        },
        {
          text: 'Effect',
          link: '/api/effector/Effect',
        },
        {
          text: 'Domain',
          link: '/api/effector/Domain',
        },
        {
          text: 'Scope',
          link: '/api/effector/Scope',
        },
      ],
    },
    {
      text: 'Methods',
      items: [
        {
          text: 'createStore',
          link: '/api/effector/createStore',
        },
        {
          text: 'createEvent',
          link: '/api/effector/createEvent',
        },
        {
          text: 'createEffect',
          link: '/api/effector/createEffect',
        },
        {
          text: 'createDomain',
          link: '/api/effector/createDomain',
        },
        {
          text: 'createApi',
          link: '/api/effector/createApi',
        },
        {
          text: 'attach',
          link: '/api/effector/attach',
        },
        {
          text: 'combine',
          link: '/api/effector/combine',
        },
        {
          text: 'forward',
          link: '/api/effector/forward',
        },
        {
          text: 'fromObservable',
          link: '/api/effector/fromObservable',
        },
        {
          text: 'guard',
          link: '/api/effector/guard',
        },
        {
          text: 'merge',
          link: '/api/effector/merge',
        },
        {
          text: 'restore',
          link: '/api/effector/restore',
        },
        {
          text: 'sample',
          link: '/api/effector/sample',
        },
        {
          text: 'split',
          link: '/api/effector/split',
        },
      ],
    },
    {
      text: 'Fork API',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'fork',
          link: '/api/effector/fork',
        },
        {
          text: 'serialize',
          link: '/api/effector/serialize',
        },
        {
          text: 'allSettled',
          link: '/api/effector/allSettled',
        },
        {
          text: 'hydrate',
          link: '/api/effector/hydrate',
        },
        {
          text: 'scopeBind',
          link: '/api/effector/scopeBind',
        },
      ],
    },
    {
      text: 'Utilities',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'is',
          link: '/api/effector/is',
        },
      ],
    },
    {
      text: 'Low-level API',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'clearNode',
          link: '/api/effector/clearNode',
        },
        {
          text: 'withRegion',
          link: '/api/effector/withRegion',
        },
        {
          text: 'launch',
          link: '/api/effector/launch',
        },
      ],
    },
    {
      text: 'Compiler Plugins',
      items: [
        {
          text: 'Babel plugin',
          link: '/api/effector/babel-plugin',
        },
        {
          text: 'SWC plugin',
          link: 'https://github.com/effector/swc-plugin',
        },
      ],
    },
  ],

  '/ru/recipes': [
    {
      text: 'Common',
      items: [
        {
          text: 'Countdown Timer',
          link: '/recipes/common/countdown',
        },
      ],
    },
    {
      text: 'React',
      items: [
        {
          text: 'Counter',
          link: '/recipes/react/counter',
        },
        {
          text: 'Effects',
          link: '/recipes/react/effects',
        },
        {
          text: 'Forms',
          link: '/recipes/react/forms',
        },
        {
          text: 'Gate',
          link: '/recipes/react/gate',
        },
        {
          text: 'ToDo Creator',
          link: '/recipes/react/todo-creator',
        },
        {
          text: 'Dynamic Form Schema',
          link: '/recipes/react/dynamic-form-schema',
        },
        {
          text: 'ToDo List with Validation',
          link: '/recipes/react/todo-with-validation',
        },
        {
          text: 'Slots',
          link: '/recipes/react/slots',
        },
      ],
    },
    {
      text: 'React Native',
      items: [
        {
          text: 'AsyncStorage Counter',
          link: '/recipes/react-native/asyncstorage-counter',
        },
      ],
    },
  ],
  '/ru/': [
    {
      text: 'Начало работы',
      items: [
        {
          text: 'Мотивация команды',
          link: '/ru/introduction/motivation',
        },
        {
          text: 'Сообщество',
          link: '/ru/introduction/community',
        },
        {
          text: 'Установка',
          link: '/ru/introduction/installation',
        },
        {
          text: 'Экосистема effector',
          link: '/ru/introduction/ecosystem',
        },
        {
          text: 'Примеры',
          link: '/ru/introduction/examples',
        },
      ],
    },
    {
      text: 'Соглашения',
      items: [
        {
          text: 'Именование',
          link: '/ru/conventions/naming',
        },
      ],
    },
    {
      text: 'Использование с TypeScript',
      items: [
        {
          text: 'Типизация effector',
          link: '/ru/typescript/typing-effector',
        },
        {
          text: 'Использование с `effector-react`',
          link: '/ru/typescript/usage-with-effector-react',
        },
        {
          text: 'Служебные типы',
          link: '/ru/typescript/utility-types',
        },
      ],
    },
    {
      text: 'Погружение',
      items: [
        {
          text: 'Глоссарий',
          link: '/ru/explanation/glossary',
        },
        {
          text: 'Приоритет вычислений',
          link: '/ru/explanation/computation-priority',
        },
        {
          text: 'Prior Art',
          link: '/ru/explanation/prior-art',
        },
      ],
    },
  ],
}

export const sidebar = {...sidebarRussian, ...sidebarEnglish}
