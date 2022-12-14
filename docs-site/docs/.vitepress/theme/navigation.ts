import {DefaultTheme} from 'vitepress'

export const navigation: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    link: '/introduction/installation',
    activeMatch: '^/(introduction|conventions|explanation|typescript)/',
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
        text: 'Effector React',
        link: '/api/effector-react/',
      },
      {
        text: 'Effector Solid',
        link: '/api/effector-solid/',
      },
      {
        text: 'Effector Vue',
        link: '/api/effector-vue/',
      },
    ],
  },
  {
    text: 'Recipes',
    link: '/recipes/',
    activeMatch: '^/recipes/',
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
