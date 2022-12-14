import {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/api': [],
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
      ],
    },
  ],
}
