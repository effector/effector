import {DefaultTheme} from 'vitepress'

export const navigation: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    link: '/introduction/installation',
    activeMatch: '^/(introduction|conventions|explanation|typescript)/',
  },
  {
    text: 'API',
    activeMatch: '^/(api)/',
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
  {
    text: 'v22.x.x',
    items: [
      {
        text: 'beta (current)',
        link: '/',
      },
      {
        text: 'v22.x.x (actual)',
        link: 'https://effector.dev',
      },
      {
        text: 'v21.x.x',
        link: 'https://v21.effector.dev',
      },
      {
        text: 'v20.x.x',
        link: 'https://v20.effector.dev',
      },
    ],
  },
]
