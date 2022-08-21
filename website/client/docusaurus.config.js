module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'zh-cn'],
  },
  title: 'effector',
  tagline: 'Business logic with ease',
  url: process.env.SITE_URL || 'https://effector.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'effector', // Usually your GitHub org/user name.
  projectName: 'effector', // Usually your repo name.
  onBrokenLinks: 'ignore', // Temporal option for smoother transition to multilang docs
  themeConfig: {
    image: 'img/comet.png',
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
    algolia: {
      appId: 'BH4D9OD16A',
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: 'effector',
    },
    navbar: {
      title: 'effector',
      logo: {
        alt: 'effector Logo',
        src: 'img/comet.png',
      },
      items: [
        {to: 'docs/introduction/installation', label: 'Docs', position: 'left'},
        {to: 'docs/api/effector', label: 'API', position: 'left'},
        {
          href: 'https://www.patreon.com/zero_bias',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://share.effector.dev',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://changelog.effector.dev',
          label: 'Changelog',
          position: 'right',
        },
        {
          href: 'https://twitter.com/effectorjs',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://github.com/effector/effector',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/introduction/installation',
            },
            {
              label: 'API',
              to: 'docs/api/effector/effector',
            },
            {
              label: 'Changelog',
              to: 'https://changelog.effector.dev',
            },
            {
              href: 'https://www.patreon.com/zero_bias',
              label: 'Blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'dev.to',
              href: 'https://dev.to/effector',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/effectorjs',
            },
            {
              label: 'Telegram 🇷🇺',
              href: 'https://t.me/effector_ru',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/effector_en',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Github',
              to: 'https://github.com/effector/effector',
            },
            {
              label: 'Reddit',
              to: 'https://www.reddit.com/r/effectorjs/',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCm8PRc_yjz3jXHH0JylVw1Q',
            },
            {
              label: 'Hosted by Netlify',
              href: 'https://netlify.com',
            },
          ],
        },
      ],
      logo: {
        alt: 'effector - business logic with ease',
        src: 'img/comet.png',
        href: 'https://github.com/effector/effector',
      },
      copyright: `Copyright © 2018-${new Date().getFullYear()} zerobias & Effector Core team`,
    },
  },
  scripts: [],
  stylesheets: ['/css/fonts.css'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          path: '../../docs',
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: false,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/effector/effector/tree/master/website/client/',
          remarkPlugins: [],
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/effector/effector/edit/master/website/client/',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
if (!process.env.ALGOLIA_API_KEY) {
  delete module.exports.themeConfig.algolia
}
