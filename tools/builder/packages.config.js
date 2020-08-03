//@flow

const common = {
  author: 'Zero Bias',
  maintainers: [
    {
      name: 'Zero Bias',
      email: 'ribkatt@gmail.com',
    },
  ],
  sideEffects: false,
  license: 'MIT',
  devDependencies: {},
  scripts: {},
  repository: 'https://github.com/zerobias/effector',
  bugs: 'https://github.com/zerobias/effector/issues',
  homepage: 'https://effector.now.sh',
  engines: {
    node: '>=6.0.0',
  },
  publishConfig: {
    access: 'public',
  },
}

const keywords = [
  'data',
  'effect',
  'event',
  'functional',
  'reactive',
  'state manager',
  'state-manager',
  'state',
  'store',
]

const version = {
  effector: '21.2.0',
  'effector-react': '21.0.4',
  'effector-vue': '21.0.3',
  forest: '0.18.3',
}

const compiledFile = name => [`${name}.js`, `${name}.js.map`]
const esmFile = name => [`${name}.mjs`, `${name}.mjs.map`]

const getFiles = name => [
  'README.md',
  'LICENSE',
  'index.d.ts',
  'index.js.flow',
  //js files
  ...esmFile(name),
  ...compiledFile(`${name}.cjs`),
  ...compiledFile(`${name}.umd`),
  ...compiledFile('compat'),
  //flow typings
  `${name}.cjs.js.flow`,
  // `${name}.es.js.flow`,
  `${name}.umd.js.flow`,
  'compat.js.flow',
  //ts typings
  `${name}.cjs.d.ts`,
  `${name}.mjs.d.ts`,
  `${name}.umd.d.ts`,
  'compat.d.ts',
]

const dependsOnEffector = {
  effector: `^${version.effector}`,
}

export default {
  effector: {
    name: 'effector',
    version: version['effector'],
    description: 'The state manager',
    main: 'effector.cjs.js',
    module: 'effector.mjs',
    'umd:main': 'effector.umd.js',
    'jsnext:main': 'effector.mjs',
    typings: 'index.d.ts',
    dependencies: {},
    exports: {
      '.': {
        require: './effector.cjs.js',
        default: './effector.mjs',
      },
      './effector.mjs': './effector.mjs',
      './fork': {
        require: './fork.js',
        default: './fork.mjs',
      },
      './compat': './compat.js',
      './effector.umd': './effector.umd.js',
      './babel-plugin': './babel-plugin.js',
      './babel-plugin-react': './babel-plugin-react.js',
      './plugin/defaultMetaVisitor': './plugin/defaultMetaVisitor.js',
      './plugin/noopMetaVisitor': './plugin/noopMetaVisitor.js',
      './package.json': './package.json',
    },
    files: [
      ...getFiles('effector'),
      ...compiledFile('fork'),
      ...esmFile('fork'),
      'fork.d.ts',
      'babel-plugin.js',
      'babel-plugin-react.js',
      'plugin/defaultMetaVisitor.js',
      'plugin/noopMetaVisitor.js',
    ],
    browser: {
      './plugin/defaultMetaVisitor.js': './plugin/noopMetaVisitor.js',
    },
    keywords,
    ...common,
  },
  'effector-react': {
    name: 'effector-react',
    version: version['effector-react'],
    description: 'React bindings for effector',
    main: 'effector-react.cjs.js',
    module: 'effector-react.mjs',
    exports: {
      '.': {
        require: './effector-react.cjs.js',
        default: './effector-react.mjs',
      },
      './effector-react.mjs': './effector-react.mjs',
      './ssr': {
        require: './ssr.js',
        default: './ssr.mjs',
      },
      './compat': './compat.js',
      './effector-react.umd': './effector-react.umd.js',
    },
    'umd:main': 'effector-react.umd.js',
    'jsnext:main': 'effector-react.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      react: '^16.8.0',
      effector: '^21.0.2',
    },
    files: [
      ...getFiles('effector-react'),
      ...compiledFile('ssr'),
      ...esmFile('ssr'),
      'ssr.d.ts',
    ],
    keywords: ['react', ...keywords],
    ...common,
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    main: 'effector-vue.cjs.js',
    module: 'effector-vue.mjs',
    exports: {
      '.': {
        require: './effector-vue.cjs.js',
        default: './effector-vue.mjs',
      },
      './effector-vue.mjs': './effector-vue.mjs',
      './compat': './compat.js',
      './effector-vue.umd': './effector-react.umd.js',
    },
    'umd:main': 'effector-vue.umd.js',
    'jsnext:main': 'effector-vue.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      vue: '*',
      effector: '^21.0.2',
    },
    files: getFiles('effector-vue'),
    keywords: ['vue', ...keywords],
    ...common,
  },
  forest: {
    name: 'forest',
    version: version['forest'],
    description: 'UI engine for web',
    main: 'forest.cjs.js',
    module: 'forest.mjs',
    exports: {
      '.': {
        require: './forest.cjs.js',
        default: './forest.mjs',
      },
      './forest.mjs': './forest.mjs',
      './server': {
        require: './server.js',
        default: './server.mjs',
      },
      './forest.umd': './forest.umd.js',
    },
    'umd:main': 'forest.umd.js',
    'jsnext:main': 'forest.mjs',
    typings: 'index.d.ts',
    dependencies: {},
    peerDependencies: dependsOnEffector,
    keywords: [...keywords, 'dom', 'view'],
    ...common,
  },
}
