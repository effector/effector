// See https://docusaurus.io/docs/site-config

const siteConfig = {
  title: 'Effector', // Title for your website.
  tagline: 'The state manager',
  url: process.env.SITE_URL || 'https://effector.now.sh', // Your website URL
  baseUrl: '/', // Base URL for your project */
  editUrl: 'https://github.com/zerobias/effector/tree/master/docs/',
  docsUrl: '',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  customDocsPath: '../docs',

  // Used for publishing and more
  projectName: 'effector',
  organizationName: 'zerobias',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction/installation', label: 'Docs'},
    {doc: 'api/effector/effector', label: 'API'},
    {href: '/try', label: 'Try'},
    {href: 'https://changelog.effector.dev', label: 'Changelog'},
    // {page: 'help', label: 'Help'},
    {languages: false},
    {search: true},
    {href: 'https://twitter.com/effectorjs', label: 'Twitter'},
    {href: 'https://github.com/zerobias/effector', label: 'GitHub'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users: [],

  /* path to images for header/footer */
  headerIcon: 'img/comet.png',
  footerIcon: 'img/comet.png',
  //favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#E95801',
    secondaryColor: '#dd5300',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} zerobias`,
  usePrism: ['jsx', 'flow', 'typescript'],
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://unpkg.com/lz-string@1.4.4/libs/lz-string.min.js',
    'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.umd.js',
    '/js/splash.js',
    '/js/try-button.js',
  ],
  stylesheets: ['/css/try-button.css'],

  separateCss: ['static/try'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/comet.png',
  twitterImage: 'img/comet.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: false,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/zerobias/effector',
}

module.exports = siteConfig
