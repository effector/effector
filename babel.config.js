//@noflow

const {resolve: resolvePath} = require('path')

module.exports = api => {
 // module.exports = api => {
 // api.cache(false)
 const env = api.cache(() => process.env.NODE_ENV)
 console.log(env)
 const plugins = [
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  ['@babel/plugin-proposal-class-properties', {loose: true}],
  'macros',
  'babel-plugin-dev-expression',
  [
   'babel-plugin-module-resolver',
   {
    alias: {
     'effector/effect': resolvePath(__dirname, 'src', 'effect'),
     'effector/event': resolvePath(__dirname, 'src', 'event'),
     'effector/store': resolvePath(__dirname, 'src', 'store'),
     'effector/domain': resolvePath(__dirname, 'src', 'domain'),
     'effector/datatype': resolvePath(__dirname, 'src', 'datatype'),
     'effector/graphite': resolvePath(__dirname, 'src', 'graphite'),
     'effector/fixtures': resolvePath(__dirname, 'src', 'fixtures'),
     '^bs-platform/lib/es6/(.+)': ([, name]) =>
      resolvePath(__dirname, 'stdlib/es6', name),
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
    modules: false,
    shippedProposals: true,
    targets: {
     node: '6',
    },
   },
  ],
 ]

 if (process.env.NODE_ENV === 'test' || process.env.IS_SERVER != null) {
  plugins.push('@babel/plugin-transform-modules-commonjs')
 }

 return {plugins, presets}
}
