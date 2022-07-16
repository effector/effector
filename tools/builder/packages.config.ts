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
  effector: '22.3.0',
  'effector-react': '22.1.3',
  'effector-vue': '22.1.1',
  'effector-solid': '0.22.0',
  forest: '0.21.1',
}

const issueUrl = (tag: string) =>
  `https://github.com/effector/effector/issues?q=is:issue+label:${tag}`

const compiledFile = (name: string) => [`${name}.js`, `${name}.js.map`]
const esmFile = (name: string) => [`${name}.mjs`, `${name}.mjs.map`]

const getFiles = (name: string) => [
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
    description: 'Business logic with ease',
    main: 'effector.cjs.js',
    module: 'effector.mjs',
    'umd:main': 'effector.umd.js',
    'jsnext:main': 'effector.mjs',
    typings: 'index.d.ts',
    dependencies: {},
    exports: {
      '.': {
        import: './effector.mjs',
        require: './effector.cjs.js',
        default: './effector.mjs',
      },
      './effector.mjs': './effector.mjs',
      './fork': {
        import: './fork.mjs',
        require: './fork.js',
        default: './fork.mjs',
      },
      './compat': './compat.js',
      './effector.umd': './effector.umd.js',
      './babel-plugin': './babel-plugin.js',
      './babel-plugin-react': './babel-plugin-react.js',
      './package.json': './package.json',
    },
    files: [
      ...getFiles('effector'),
      ...compiledFile('fork'),
      ...esmFile('fork'),
      'fork.d.ts',
      'babel-plugin.js',
      'babel-plugin-react.js',
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
      '.': {
        import: './effector-react.mjs',
        require: './effector-react.cjs.js',
        default: './effector-react.mjs',
      },
      './package.json': './package.json',
      './effector-react.mjs': './effector-react.mjs',
      './scope.mjs': './scope.mjs',
      './scope': {
        import: './scope.mjs',
        require: './scope.js',
        default: './scope.mjs',
      },
      './ssr': {
        import: './ssr.mjs',
        require: './ssr.js',
        default: './ssr.mjs',
      },
      './compat': './compat.js',
      './effector-react.umd': './effector-react.umd.js',
    },
    'umd:main': 'effector-react.umd.js',
    'jsnext:main': 'effector-react.mjs',
    typings: 'index.d.ts',
    dependencies: {
      'use-sync-external-store': '^1.0.0',
    },
    peerDependencies: {
      react: '>=16.8.0 <19.0.0',
      effector: '^22.0.2',
    },
    files: [
      ...getFiles('effector-react'),
      ...compiledFile('scope'),
      ...esmFile('scope'),
      ...compiledFile('ssr'),
      ...esmFile('ssr'),
      'scope.d.ts',
      'ssr.d.ts',
    ],
    keywords: ['react', 'hooks', ...keywords],
    ...common,
    bugs: issueUrl('effector-react,effector-react%2Fscope'),
  },
  'effector-solid': {
    name: 'effector-solid',
    version: version['effector-solid'],
    description: 'SolidJS bindings for effector',
    main: 'effector-solid.cjs.js',
    module: 'effector-solid.mjs',
    exports: {
      '.': {
        import: './effector-solid.mjs',
        require: './effector-solid.cjs.js',
        default: './effector-solid.mjs',
      },
      './package.json': './package.json',
      './effector-solid.mjs': './effector-solid.mjs',
      './scope.mjs': './scope.mjs',
      './scope': {
        import: './scope.mjs',
        require: './scope.js',
        default: './scope.mjs',
      },
      './effector-solid.umd': './effector-solid.umd.js',
    },
    'umd:main': 'effector-solid.umd.js',
    'jsnext:main': 'effector-solid.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      'solid-js': '>= 1.3.0',
      effector: '^22.0.2',
    },
    files: [
      ...getFiles('effector-solid'),
      ...compiledFile('scope'),
      ...esmFile('scope'),
      'scope.d.ts',
    ],
    keywords: ['solid', 'solid-js', ...keywords],
    ...common,
    bugs: issueUrl('effector-solid,effector-solid%2Fscope'),
  },
  'effector-vue': {
    name: 'effector-vue',
    version: version['effector-vue'],
    description: 'Vue bindings for effector',
    main: 'effector-vue.cjs.js',
    module: 'effector-vue.mjs',
    exports: {
      '.': {
        import: './effector-vue.mjs',
        require: './effector-vue.cjs.js',
        default: './effector-vue.mjs',
      },
      './composition': {
        import: './composition.mjs',
        require: './composition.cjs.js',
        default: './composition.mjs',
      },
      './ssr': {
        import: './ssr.mjs',
        require: './ssr.cjs.js',
        default: './ssr.mjs',
      },
      './effector-vue.mjs': './effector-vue.mjs',
      './composition.mjs': './composition.mjs',
      './ssr.mjs': './ssr.mjs',
      './compat': './compat.js',
      './effector-vue.umd': './effector-vue.umd.js',
    },
    'umd:main': 'effector-vue.umd.js',
    'jsnext:main': 'effector-vue.mjs',
    typings: 'index.d.ts',
    peerDependencies: {
      vue: '*',
      effector: '^22.0.2',
      '@vue/reactivity': '^3.0.2',
      '@vue/runtime-core': '^3.0.2',
    },
    files: [
      ...getFiles('effector-vue'),
      ...compiledFile('composition.cjs'),
      ...compiledFile('ssr.cjs'),
      ...esmFile('composition'),
      ...esmFile('ssr'),
      'composition.d.ts',
      'composition.mjs.d.ts',
      'composition.cjs.d.ts',
      'ssr.d.ts',
      'ssr.mjs.d.ts',
      'ssr.cjs.d.ts',
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
      '.': {
        import: './forest.mjs',
        require: './forest.cjs.js',
        default: './forest.mjs',
      },
      './forest.mjs': './forest.mjs',
      './server': {
        import: './server.mjs',
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
    bugs: issueUrl('forest'),
  },
}
