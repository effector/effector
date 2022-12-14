import {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/api': [],
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
  ],
}
