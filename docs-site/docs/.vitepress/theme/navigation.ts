import {DefaultTheme} from 'vitepress'

export const navigation: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    link: '/introduction/installation',
  },
  {
    text: 'API',
    activeMatch: '/api/',
    items: [
      {
        text: 'Effector',
        link: '/api/effector/index',
      },
      {
        text: 'React',
        link: '/api/effector-react/index',
      },
      {
        text: 'Solid',
        link: '/api/effector-solid/index',
      },
      {
        text: 'Vue',
        link: '/api/effector-vue/index',
      },
    ],
  },
  {
    text: 'Blog',
    link: 'https://www.patreon.com/zero_bias',
  },
  {
    text: 'Playground',
    link: 'https://share.effector.dev',
  },
  {
    text: 'Changelog',
    link: 'https://changelog.effector.dev/',
  },
]
