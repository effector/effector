//@noflow

const {resolve: resolvePath} = require('path')

const resolveSource = path => resolvePath(__dirname, 'src', path)

module.exports = api => {
  // api && api.cache && api.cache.never && api.cache.never()
  const env = api.cache(() => process.env.NODE_ENV)
  const isBuild = !!process.env.IS_BUILD
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    'macros',
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          'effector/effect': resolveSource('effect'),
          'effector/event': resolveSource('event'),
          'effector/store': resolveSource('store'),
          'effector/domain': resolveSource('domain'),
          'effector/graphite': resolveSource('graphite'),
          'effector/fixtures': resolveSource('fixtures'),
          'effector/stdlib': resolveSource('stdlib'),
          'effector/perf': resolveSource('perf'),
          'effector/flags': resolveSource(isBuild ? 'flags.prod' : 'flags.dev'),
          effector: resolvePath(__dirname, 'src'),
          'effector-react': resolveSource('react'),
        },
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
          ],
        },
      },
    ],
  ]

  const overrides = []

  if (process.env.NODE_ENV === 'test' || process.env.IS_SERVER != null) {
    overrides.push({
      test: /\/__tests__\/.*\/.*\.(test|spec)\.js/g,
      plugins: ['./src/babel/babel-plugin'],
    })
    plugins.push('@babel/plugin-transform-modules-commonjs')
  }

  return {plugins, presets, overrides, sourceMaps: true}
}
