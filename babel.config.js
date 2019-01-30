//@noflow

const {resolve: resolvePath} = require('path')

const resolveSource = path => resolvePath(__dirname, 'src', path)

const aliases = {
  'effector/effect': 'effect',
  'effector/event': 'event',
  'effector/store': 'store',
  'effector/domain': 'domain',
  'effector/graphite': 'graphite',
  'effector/fixtures': 'fixtures',
  'effector/stdlib': 'stdlib',
  'effector/perf': 'perf',
  'effector/watcher': 'watcher',
  'effector/flags': ({isBuild}) => (isBuild ? 'flags.prod' : 'flags.dev'),
  warning: 'warning',
  invariant: 'invariant',
  'effector-react': 'react',
  'effector-vue': 'vue',
}

module.exports = api => {
  api && api.cache && api.cache.never && api.cache.never()
  // const env = api.cache(() => process.env.NODE_ENV)
  const alias = parseAliases(aliases, {
    isBuild: !!process.env.IS_BUILD,
  })
  if (process.env.NODE_ENV === 'test') {
    alias.effector = resolvePath(__dirname, 'src')
  }
  const plugins = [
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

  const presets = [
    '@babel/preset-flow',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        loose: true,
        useBuiltIns: false,
        modules: false,
        shippedProposals: true,
        targets: {
          node: '10',
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 2 Edge versions',
          ],
        },
      },
    ],
  ]

  const overrides = [
    {
      test(filename) {
        return filename.includes('__tests__')
      },
      plugins: ['./src/babel/babel-plugin'],
    },
  ]

  if (process.env.NODE_ENV === 'test' || process.env.IS_SERVER != null) {
    plugins.push('@babel/plugin-transform-modules-commonjs')
  }

  return {plugins, presets, overrides, sourceMaps: true}
}

function parseAliases(obj, meta) {
  const result = {}
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      result[key] = resolveSource(value)
    } else {
      result[key] = resolveSource(value(meta))
    }
  }
  return result
}
