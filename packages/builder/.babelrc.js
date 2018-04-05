module.exports = {
 env: {
  commonjs: {
   plugins: ['@babel/plugin-transform-modules-commonjs'],
  },
  test: {
   plugins: ['@babel/plugin-transform-modules-commonjs'],
  },
 },
 presets: [
  '@babel/preset-flow',
  [
   '@babel/preset-env',
   {
    modules: false,
    shippedProposals: true,
    targets: {
     node: '6',
    },
   },
  ],
 ],
 plugins: [
  [
   '@babel/plugin-proposal-object-rest-spread',
   {
    useBuiltIns: true,
   },
  ],
  ['@babel/plugin-proposal-class-properties', {loose: true}],
 ],
}
