//@flow

const plugins = [
 '@babel/plugin-proposal-export-namespace-from',
 '@babel/plugin-proposal-optional-chaining',
 '@babel/plugin-proposal-nullish-coalescing-operator',
 [
  '@babel/plugin-proposal-object-rest-spread',
  {
   useBuiltIns: true,
  },
 ],
 ['@babel/plugin-proposal-class-properties', {loose: true}],
 '@babel/plugin-proposal-async-generator-functions',
 '@babel/plugin-transform-block-scoping',
 'babel-plugin-dev-expression',
]

const presets = ['@babel/preset-flow', '@babel/preset-react']

if (process.env.NODE_ENV === 'test') {
 plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = {plugins, presets}
