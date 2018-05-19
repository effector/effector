//@flow

const plugins = [
 '@babel/plugin-proposal-export-namespace-from',
 '@babel/plugin-proposal-optional-chaining',
 '@babel/plugin-proposal-nullish-coalescing-operator',
 ['@babel/plugin-proposal-class-properties', {loose: true}],
 'babel-plugin-dev-expression',
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

if (process.env.NODE_ENV === 'test') {
 plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = {plugins, presets}
