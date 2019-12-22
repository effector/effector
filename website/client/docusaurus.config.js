// See https://docusaurus.io/docs/site-config

module.exports = {
  title: 'Effector.js',
  tagline: 'Library for efficient manage reactive state',
  url: process.env.SITE_URL || 'https://effector.now.sh',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'zerobias', // Usually your GitHub org/user name.
  projectName: 'effector', // Usually your repo name.
  themeConfig: {
    image: 'img/comet.png',
    navbar: {
      title: 'Effector.js',
      logo: {
        alt: 'Effector.js Logo',
        src: 'img/comet.png',
      },
      links: [
        {to: 'docs/introduction/installation', label: 'Docs', position: 'left'},
        {to: 'docs/api/effector/effector', label: 'API', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: '/try',
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
              to: 'docs/doc1',
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
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      logo: {
        alt: 'Effector.js',
        src: 'img/comet.png',
        href: 'https://github.com/zerobias/effector',
      },
      copyright: `Copyright © ${new Date().getFullYear()} zerobias`,
    },

  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://unpkg.com/lz-string@1.4.4/libs/lz-string.min.js',
    'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.umd.js',
    '/js/splash.js',
    '/js/try-button.js',
  ],
  stylesheets: ['/css/try-button.css'],
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // headerLinks: [
  //   {doc: 'introduction/installation', label: 'Docs'},
  //   {doc: 'api/effector/effector', label: 'API'},
  //   {href: '/try', label: 'Try'},
  //   {href: 'https://changelog.effector.dev', label: 'Changelog'},
  //   // {page: 'help', label: 'Help'},
  //   // {languages: false},
  //   // {search: false},
  //   {href: 'https://twitter.com/effectorjs', label: 'Twitter'},
  //   {href: 'https://github.com/zerobias/effector', label: 'GitHub'},
  //   {blog: true, label: 'Blog'},
  // ],
  //
  // // If you have users set above, you add it here:
  // users: [],
  //
  // /* path to images for header/footer */
  // headerIcon: 'img/comet.png',
  // footerIcon: 'img/comet.png',
  // //favicon: 'img/favicon.png',
  //
  // /* Colors for website */
  // colors: {
  //   primaryColor: '#E95801',
  //   secondaryColor: '#dd5300',
  // },
  //
  // /* Custom fonts for website */
  // /*
  // fonts: {
  //   myFont: [
  //     "Times New Roman",
  //     "Serif"
  //   ],
  //   myOtherFont: [
  //     "-apple-system",
  //     "system-ui"
  //   ]
  // },
  // */
  //
  // // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  // copyright: `Copyright © ${new Date().getFullYear()} zerobias`,
  // usePrism: ['jsx', 'flow', 'typescript'],
  // highlight: {
  //   // Highlight.js theme to use for syntax highlighting in code blocks.
  //   theme: 'default',
  // },
  //
  // // Add custom scripts here that would be placed in <script> tags.
  // scripts: [
  //   'https://buttons.github.io/buttons.js',
  //   'https://unpkg.com/lz-string@1.4.4/libs/lz-string.min.js',
  //   'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.umd.js',
  //   '/js/splash.js',
  //   '/js/try-button.js',
  // ],
  // stylesheets: ['/css/try-button.css'],
  //
  // separateCss: ['static/try'],
  //
  // // On page navigation for the current documentation page.
  // onPageNav: 'separate',
  // // No .html extensions for paths.
  // cleanUrl: true,
  //
  // // Open Graph and Twitter card images.
  // ogImage: 'img/comet.png',
  // twitterImage: 'img/comet.png',
  //
  // // Show documentation's last contributor's name.
  // enableUpdateBy: false,
  //
  // // Show documentation's last update time.
  // // enableUpdateTime: true,
  //
  // // You may provide arbitrary config keys to be used as needed by your
  // // template. For example, if you need your repo's URL...
  // repoUrl: 'https://github.com/zerobias/effector',
}
