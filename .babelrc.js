//@flow

const defaultPresets = [
 '@babel/preset-flow',
 [
  '@babel/preset-env',
  {
   modules: false,
   shippedProposals: true,
   loose: true,
   //  useBuiltIns: 'usage',
   targets: {
    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
    //node: 'current',
    // node: '6',
   },
  },
 ],
]

const defaultPlugins = [
 'macros',
 'babel-plugin-dev-expression',
 ['@babel/plugin-proposal-class-properties', {loose: true}],
]

function config(presets = [], plugins = []) {
 return {
  presets: [...defaultPresets, ...presets],
  plugins: [...defaultPlugins, ...plugins],
 }
}

module.exports = (env => {
 switch (env) {
  case 'test':
   return config(
    ['@babel/preset-react'],
    ['@babel/plugin-transform-modules-commonjs'],
   )
  case 'commonjs':
   return config(
    [],
    [
     'babel-plugin-transform-inline-environment-variables',
     '@babel/plugin-transform-modules-commonjs',
    ],
   )
  case 'es':
   return config([], ['babel-plugin-transform-inline-environment-variables'])
  default:
   return {
    presets: defaultPresets,
    plugins: defaultPlugins,
   }
 }
})(process.env.NODE_ENV)
