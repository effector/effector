//@flow

const common = {
  author: 'Zero Bias',
  maintainers: [
    {
      name: 'Zero Bias',
      email: 'ribkatt@gmail.com',
    },
    {
      name: 'goodmind',
      email: 'andwebar@gmail.com',
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
}

const version = {
  effector: '0.18.3',
  'effector-react': '0.18.6',
  'effector-vue': '0.18.2',

  'bs-effector': '0.18.2',
  'bs-effector-react': '0.18.2',

  '@effector/babel-plugin': '0.1.0',
  '@effector/babel-plugin-react': '0.0.3',
  '@effector/forms': '0.0.1',
}

const cjsExt = 'js'
const ecmaExt = 'mjs'

const getFiles = name => [
  'README.md',
  'LICENSE',
  'index.d.ts',
  'index.js.flow',
  //js files
  `${name}.${ecmaExt}`,
  `${name}.${cjsExt}`,
  `${name}.umd.js`,
  //mappings
  `${name}.${ecmaExt}.map`,
  `${name}.${cjsExt}.map`,
  `${name}.umd.js.map`,
  //typings
  `${name}.${cjsExt}.flow`,
  `${name}.${ecmaExt}.flow`,
  `${name}.umd.js.flow`,
]

const getModules = name => ({
  main: `${name}`,
  module: `${name}.${ecmaExt}`,
  'umd:main': `${name}.umd.js`,
  'jsnext:main': `${name}.${ecmaExt}`,
})

const dependsOnEffector = {
  effector: `^${version.effector}`,
}

export default {
  effector: {
    name: 'effector',
    version: version['effector'],
    description: 'Application state manager',
    ...getModules('effector'),
    typings: 'index.d.ts',
    dependencies: {
      'symbol-observable': '^1.2.0',
    },
    files: getFiles('effector'),
    keywords: [
      'data',
      'datastructure',
      'functional',
      'collection',
      'state',
      'store',
      'reactive',
      'streams',
      'actions',
      'effects',
      'redux',
    ],
    ...common,
  },
  'effector-react': {
    name: 'effector-react',
    version: version['effector-react'],
    description: 'React bindings for effector',
    ...getModules('effector-react'),
    typings: 'index.d.ts',
    dependencies: dependsOnEffector,
    peerDependencies: {
      react: '^16.8.0',
    },
    files: getFiles('effector-react'),
    keywords: [
      'data',
      'datastructure',
      'functional',
      'collection',
      'state',
      'store',
      'reactive',
      'streams',
      'actions',
      'effects',
      'redux',
      'react',
    ],
    ...common,
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    ...getModules('effector-vue'),
    typings: 'index.d.ts',
    dependencies: dependsOnEffector,
    peerDependencies: {
      vue: '*',
    },
    files: getFiles('effector-vue'),
    keywords: [
      'data',
      'datastructure',
      'functional',
      'collection',
      'state',
      'store',
      'reactive',
      'streams',
      'actions',
      'effects',
      'redux',
      'vue',
    ],
    ...common,
  },
  'bs-effector': {
    name: 'bs-effector',
    version: version['bs-effector'],
    description: 'Reason bindings for effector',
    dependencies: {},
    peerDependencies: dependsOnEffector,
    files: ['src/Effector.re', 'bsconfig.json', 'LICENSE', 'README.md'],
    keywords: [
      'bucklescript',
      'reason',
      'bsb',
      'data',
      'datastructure',
      'functional',
      'collection',
      'state',
      'store',
      'reactive',
      'streams',
      'actions',
      'effects',
      'redux',
    ],
    ...common,
  },
  'bs-effector-react': {
    name: 'bs-effector-react',
    version: version['bs-effector-react'],
    description: 'Reason bindings for effector-react',
    dependencies: dependsOnEffector,
    peerDependencies: {
      'reason-react': '*',
    },
    files: ['src/EffectorReact.re', 'bsconfig.json', 'LICENSE', 'README.md'],
    keywords: [
      'bucklescript',
      'reason',
      'bsb',
      'data',
      'datastructure',
      'functional',
      'collection',
      'state',
      'store',
      'reactive',
      'streams',
      'actions',
      'effects',
      'redux',
      'react',
    ],
    ...common,
  },
  '@effector/babel-plugin': {
    name: '@effector/babel-plugin',
    description: 'Call setStoreName on createStore calls',
    version: version['@effector/babel-plugin'],
    repository: 'https://github.com/zerobias/effector',
    main: 'index.js',
    files: ['index.js'],
    peerDependencies: dependsOnEffector,
    keywords: ['effector', 'babel-plugin', 'displayName'],
    publishConfig: {
      access: 'public',
    },
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
    publishConfig: {
      access: 'public',
    },
    ...common,
  },
  '@effector/forms': {
    name: '@effector/forms',
    description: '',
    version: version['@effector/forms'],
    ...getModules('forms'),
    typings: 'index.d.ts',
    repository: 'https://github.com/zerobias/effector',
    files: getFiles('forms'),
    dependencies: dependsOnEffector,
    keywords: ['effector', 'forms'],
    private: true,
    ...common,
  },
}
