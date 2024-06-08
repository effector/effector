import {
  issueUrl,
  compiledFile,
  esmFile,
  getFiles,
  extensionlessExport,
  umdExport,
  rootExport,
} from './packageUtils'

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
  repository: 'https://github.com/effector/effector',
  bugs: 'https://github.com/effector/effector/issues',
  homepage: 'https://effector.dev',
  engines: {
    node: '>=11.0.0',
  },
  publishConfig: {
    access: 'public',
  },
  funding: [
    {
      type: 'patreon',
      url: 'https://www.patreon.com/zero_bias',
    },
    {
      type: 'opencollective',
      url: 'https://opencollective.com/effector',
    },
  ],
}

const keywords = [
  'business',
  'logic',
  'data',
  'flow',
  'state management',
  'state manager',
  'algebraic effects',
  'model',
  'reactive',
  'state',
  'frp',
  'event',
  'effect',
  'functional',
  'store',
]

const version = {
  effector: '23.2.2',
  'effector-react': '23.2.1',
  'effector-vue': '23.0.0',
  'effector-solid': '0.23.0',
  forest: '0.21.2',
}

const dependsOnEffector = {
  effector: `^${version.effector}`,
}

const compatExport = {
  types: './compat.d.ts',
  require: './compat.js',
  default: './compat.js',
}

export default {
  effector: {
    name: 'effector',
    version: version['effector'],
    description: 'Business logic with ease',
    main: 'effector.cjs.js',
    module: 'effector.mjs',
    'umd:main': 'effector.umd.js',
    'jsnext:main': 'effector.mjs',
    typings: 'index.d.ts',
    dependencies: {},
    exports: {
      '.': rootExport('./effector'),
      './effector.mjs': {
        types: './effector.mjs.d.ts',
        import: './effector.mjs',
        default: './effector.mjs',
      },
      './compat': compatExport,
      './inspect': extensionlessExport('./inspect'),
      './effector.umd': umdExport('./effector'),
      './babel-plugin': './babel-plugin.js',
      './package.json': './package.json',
    },
    files: [
      ...getFiles('effector'),
      ...compiledFile('inspect'),
      ...esmFile('inspect'),
      'inspect.d.ts',
      'babel-plugin.js',
    ],
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
      '.': rootExport('./effector-react'),
      './package.json': './package.json',
      './effector-react.mjs': {
        types: './effector-react.mjs.d.ts',
        import: './effector-react.mjs',
        default: './effector-react.mjs',
      },
      './compat': compatExport,
      './effector-react.umd': umdExport('./effector-react'),
    },
    'umd:main': 'effector-react.umd.js',
    'jsnext:main': 'effector-react.mjs',
    typings: 'index.d.ts',
    dependencies: {
      'use-sync-external-store': '^1.0.0',
    },
    peerDependencies: {
      react: '>=16.8.0 <19.0.0',
      effector: '^23.0.0',
    },
    files: [...getFiles('effector-react')],
    keywords: ['react', 'hooks', ...keywords],
    ...common,
    bugs: issueUrl('effector-react'),
  },
  'effector-solid': {
    name: 'effector-solid',
    version: version['effector-solid'],
    description: 'SolidJS bindings for effector',
    main: 'effector-solid.cjs.js',
    module: 'effector-solid.mjs',
    exports: {
      '.': rootExport('./effector-solid'),
      './package.json': './package.json',
      './effector-solid.mjs': {
        types: './effector-solid.mjs.d.ts',
        import: './effector-solid.mjs',
        default: './effector-solid.mjs',
      },
      './effector-solid.umd': umdExport('./effector-solid'),
    },
    'umd:main': 'effector-solid.umd.js',
    'jsnext:main': 'effector-solid.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      'solid-js': '>= 1.3.0',
      effector: '^23.0.0',
    },
    files: [...getFiles('effector-solid')],
    keywords: ['solid', 'solid-js', ...keywords],
    ...common,
    bugs: issueUrl('effector-solid'),
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    main: 'effector-vue.cjs.js',
    module: 'effector-vue.mjs',
    exports: {
      '.': rootExport('./effector-vue'),
      './composition': {
        types: './composition.d.ts',
        import: './composition.mjs',
        require: './composition.cjs.js',
        default: './composition.mjs',
      },
      './effector-vue.mjs': {
        types: './effector-vue.mjs.d.ts',
        import: './effector-vue.mjs',
        default: './effector-vue.mjs',
      },
      './composition.mjs': {
        types: './composition.mjs.d.ts',
        import: './composition.mjs',
        default: './composition.mjs',
      },
      './compat': compatExport,
      './effector-vue.umd': umdExport('./effector-vue'),
    },
    'umd:main': 'effector-vue.umd.js',
    'jsnext:main': 'effector-vue.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      vue: '*',
      effector: '^23.0.0',
      '@vue/reactivity': '^3.0.2',
      '@vue/runtime-core': '^3.0.2',
    },
    files: [
      ...getFiles('effector-vue'),
      ...compiledFile('composition.cjs'),
      ...esmFile('composition'),
      'composition.d.ts',
      'composition.mjs.d.ts',
      'composition.cjs.d.ts',
    ],
    keywords: ['vue', 'composition api', ...keywords],
    ...common,
    bugs: issueUrl('effector-vue'),
  },
  forest: {
    name: 'forest',
    version: version['forest'],
    description: 'UI engine for web',
    main: 'forest.cjs.js',
    module: 'forest.mjs',
    exports: {
      './package.json': './package.json',
      '.': rootExport('./forest'),
      './forest.mjs': {
        types: './forest.mjs.d.ts',
        import: './forest.mjs',
        default: './forest.mjs',
      },
      './server': extensionlessExport('./server'),
      './forest.umd': umdExport('./forest'),
    },
    'umd:main': 'forest.umd.js',
    'jsnext:main': 'forest.mjs',
    typings: 'index.d.ts',
    dependencies: {},
    peerDependencies: dependsOnEffector,
    keywords: [...keywords, 'dom', 'view'],
    ...common,
    bugs: issueUrl('forest'),
  },
}
