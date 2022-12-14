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
        link: '/api/effector/',
      },
      {
        text: 'React',
        link: '/api/effector-react/',
      },
      {
        text: 'Solid',
        link: '/api/effector-solid/',
      },
      {
        text: 'Vue',
        link: '/api/effector-vue/',
      },
    ],
  },
  {
    text: 'Recipes',
    link: '/recipes/',
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
