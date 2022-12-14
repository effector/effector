import {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
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
      items: [
        {
          text: 'is',
          link: '/api/effector/is',
        },
      ],
    },
    {
      text: 'Low-level API',
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
