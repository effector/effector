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
  'state manager',
  'reactive',
  'functional',
  'store',
  'event',
  'effect',
  'data',
  'state',
]

const version = {
  effector: '20.11.1',
  'effector-react': '20.6.0',
  'effector-vue': '20.3.2',
  'effector-dom': '0.0.6',

  'bs-effector': '20.0.0',
  'bs-effector-react': '20.0.0',

  '@effector/babel-plugin': '0.5.0',
  '@effector/babel-plugin-react': '0.2.1',
  '@effector/redux-adapter': '0.0.1',
  '@effector/forms': '0.0.1',
}

const compiledFile = name => [`${name}.js`, `${name}.js.map`]

const getFiles = name => [
  'README.md',
  'LICENSE',
  'index.d.ts',
  'index.js.flow',
  //js files
  ...compiledFile(`${name}.es`),
  ...compiledFile(`${name}.cjs`),
  ...compiledFile(`${name}.umd`),
  ...compiledFile('compat'),
  //flow typings
  `${name}.cjs.js.flow`,
  `${name}.es.js.flow`,
  `${name}.umd.js.flow`,
  'compat.js.flow',
  //ts typings
  `${name}.cjs.d.ts`,
  `${name}.es.d.ts`,
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
    module: 'effector.es.js',
    'umd:main': 'effector.umd.js',
    'jsnext:main': 'effector.es.js',
    typings: 'index.d.ts',
    dependencies: {
      'symbol-observable': '^1.2.0',
    },
    files: [
      ...getFiles('effector'),
      ...compiledFile('fork'),
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
    module: 'effector-react.es.js',
    'umd:main': 'effector-react.umd.js',
    'jsnext:main': 'effector-react.es.js',
    typings: 'index.d.ts',
    peerDependencies: {
      react: '^16.8.0',
      effector: '^20.9.0',
    },
    files: [...getFiles('effector-react'), ...compiledFile('ssr'), 'ssr.d.ts'],
    keywords: ['react', ...keywords],
    ...common,
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    main: 'effector-vue.cjs.js',
    module: 'effector-vue.es.js',
    'umd:main': 'effector-vue.umd.js',
    'jsnext:main': 'effector-vue.es.js',
    typings: 'index.d.ts',
    peerDependencies: {
      vue: '*',
      effector: '*',
    },
    files: getFiles('effector-vue'),
    keywords: ['vue', ...keywords],
    ...common,
  },
  'effector-dom': {
    name: 'effector-dom',
    version: version['effector-dom'],
    description: 'Effector package for working with dom',
    main: 'effector-dom.cjs.js',
    module: 'effector-dom.es.js',
    'umd:main': 'effector-dom.umd.js',
    'jsnext:main': 'effector-dom.es.js',
    typings: 'index.d.ts',
    dependencies: {},
    peerDependencies: dependsOnEffector,
    keywords,
    ...common,
  },
  'bs-effector': {
    name: 'bs-effector',
    version: version['bs-effector'],
    description: 'Reason bindings for effector',
    dependencies: {},
    peerDependencies: dependsOnEffector,
    files: ['src/Effector.re', 'bsconfig.json', 'LICENSE', 'README.md'],
    keywords: ['bucklescript', 'reason', 'bsb', ...keywords],
    ...common,
  },
  'bs-effector-react': {
    name: 'bs-effector-react',
    version: version['bs-effector-react'],
    description: 'Reason bindings for effector-react',
    peerDependencies: {
      'reason-react': '*',
      effector: '*',
    },
    files: ['src/EffectorReact.re', 'bsconfig.json', 'LICENSE', 'README.md'],
    keywords: ['bucklescript', 'reason', 'bsb', ...keywords],
    ...common,
  },
  '@effector/babel-plugin': {
    name: '@effector/babel-plugin',
    description: 'Compile-time preprocessing for effector',
    version: version['@effector/babel-plugin'],
    repository: 'https://github.com/zerobias/effector',
    main: 'index.js',
    files: [
      'index.js',
      'plugin/defaultMetaVisitor.js',
      'plugin/noopMetaVisitor.js',
    ],
    browser: {
      './plugin/defaultMetaVisitor.js': './plugin/noopMetaVisitor.js',
    },
    peerDependencies: dependsOnEffector,
    keywords: ['effector', 'babel-plugin', 'displayName'],
    ...common,
  },
  '@effector/babel-plugin-react': {
    name: '@effector/babel-plugin-react',
    description: 'Add displayName to createComponent call',
    version: version['@effector/babel-plugin-react'],
    repository: 'https://github.com/zerobias/effector',
    main: 'index.js',
    files: ['index.js'],
    peerDependencies: {
      'effector-react': '*',
    },
    keywords: ['effector', 'react', 'babel-plugin', 'displayName'],
    ...common,
  },
  '@effector/forms': {
    name: '@effector/forms',
    description: '',
    version: version['@effector/forms'],
    main: 'forms.cjs.js',
    module: 'forms.es.js',
    'umd:main': 'forms.umd.js',
    'jsnext:main': 'forms.es.js',
    typings: 'index.d.ts',
    files: getFiles('forms'),
    dependencies: dependsOnEffector,
    keywords: ['effector', 'forms'],
    ...common,
  },
  '@effector/redux-adapter': {
    name: '@effector/redux-adapter',
    description: 'Effector adapter for Redux',
    version: version['@effector/redux-adapter'],
    main: 'adapter.cjs.js',
    module: 'adapter.es.js',
    'umd:main': 'adapter.umd.js',
    'jsnext:main': 'adapter.es.js',
    files: getFiles('adapter'),
    typings: 'index.d.ts',
    keywords,
    ...common,
  },
}
