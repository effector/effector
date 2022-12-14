import {defineConfig} from 'vitepress'
import {navigation} from './theme/navigation'
import {sidebar} from './theme/sidebars'

export default defineConfig({
  title: 'effector',
  description: 'Business logic with ease',
  lastUpdated: true,
  head: [],
  lang: 'en-US',
  themeConfig: {
    siteTitle: 'effector',
    logo: '/effector.png',
    footer: {
      message: 'zerobias & Effector Core team',
      copyright: 'Copyright © 2018-2022',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/effector/effector',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/EffectorJS',
      },
    ],
    sidebar,
    algolia: process.env.ALGOLIA_API_KEY
      ? {
          appId: 'BH4D9OD16A',
          apiKey: process.env.ALGOLIA_API_KEY!,
          indexName: 'effector',
        }
      : undefined,
    editLink: {
      pattern: 'https://github.com/effector/effector/tree/master/docs/:path',
    },
    nav: navigation,
  },
})
