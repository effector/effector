module.exports = {
  title: 'Effector',
  tagline: 'The state manager',
  url: process.env.SITE_URL || 'https://effector.now.sh',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'zerobias', // Usually your GitHub org/user name.
  projectName: 'effector', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    image: 'img/comet.png',
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: 'effector',
    },
    navbar: {
      title: 'Effector',
      logo: {
        alt: 'Effector Logo',
        src: 'img/comet.png',
      },
      items: [
        {to: 'docs/introduction/installation', label: 'Docs', position: 'left'},
        {to: 'docs/api/effector/effector', label: 'API', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://share.effector.dev',
          label: 'Try',
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
          href: 'https://github.com/zerobias/effector',
          label: 'GitHub',
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
          ],
        },
        {
          title: 'Community',
          items: [
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
              to: 'https://github.com/zerobias/effector',
            },
          ],
        },
      ],
      logo: {
        alt: 'Effector - the state manager',
        src: 'img/comet.png',
        href: 'https://github.com/zerobias/effector',
      },
      copyright: `Copyright © ${new Date().getFullYear()} zerobias`,
    },
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.umd.js',
    '/js/splash.js',
    '/js/try-button.js'
  ],
  stylesheets: ['/css/try-button.css', '/css/fonts.css'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: '../../docs',
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: false,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/zerobias/effector/edit/master/fix/relative-bug/',
          remarkPlugins: [require('./src/plugins/remark-npm2yarn')],
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/zerobias/effector/edit/master/website/client/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
