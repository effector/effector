//@noflow

const {resolve: resolvePath} = require('path')

module.exports = api => {
  api && api.cache && api.cache.never && api.cache.never()
  // const env = api.cache(() => process.env.NODE_ENV)
  return generateConfig(meta, babelConfig)

  function generateConfig(meta, config) {
    const result = {}
    for (const key in config) {
      const value = config[key]
      result[key] = typeof value === 'function' ? value(meta) : value
    }
    return result
  }
}

const meta = {
  isBuild: !!process.env.IS_BUILD,
  isTest: process.env.NODE_ENV === 'test',
}

const aliases = {
  'effector/effect': 'effector/effect',
  'effector/validate': 'effector/validate',
  'effector/event': 'effector/event',
  'effector/store': 'effector/store',
  'effector/domain': 'effector/domain',
  'effector/kernel': 'effector/kernel',
  'effector/stdlib': 'effector/stdlib',
  'effector/blocks': 'effector/blocks',
  'effector/perf': 'effector/perf',
  'effector/watcher': 'effector/watcher',
  'effector/naming': 'effector/naming',
  invariant: 'effector/validate/invariant',
  warning: 'effector/validate/warning',
  'effector/flags': ({isBuild}) => (isBuild ? 'flags.prod' : 'flags.dev'),
  'effector/fixtures': 'fixtures',
  '@effector/forms': 'forms',
  'effector-react': 'react',
  'effector-vue': 'vue',
  Builder: '../tools/builder',
  effector({isTest, isBuild}) {
    if (isBuild) return null
    if (isTest) return './effector'
    return '../npm/effector'
  },
}

const babelConfig = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        loose: true,
        useBuiltIns: 'entry',
        modules: false,
        shippedProposals: true,
        targets: {
          node: '10',
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 1 Edge versions',
          ],
        },
      },
    ],
  ],
  plugins(meta) {
    const alias = parseAliases(meta, aliases)
    const result = [
      './src/babel/get-step',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      'macros',
      [
        'babel-plugin-module-resolver',
        {
          alias,
        },
      ],
    ]
    if (meta.isTest) {
      result.push('@babel/plugin-transform-modules-commonjs')
    }
    return result

    function parseAliases(meta, obj) {
      const result = {}
      for (const key in obj) {
        const value = obj[key]
        const name = typeof value === 'function' ? value(meta) : value
        if (name === undefined || name === null) continue
        result[key] = resolvePath(__dirname, 'src', name)
      }
      return result
    }
  },
  overrides: [
    {
      test(filename) {
        return filename.includes('__tests__')
      },
      plugins: ['./src/babel/babel-plugin'],
    },
  ],
  sourceMaps: true,
}
