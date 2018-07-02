const {resolve} = require('path')
module.exports = {
 entry: './src/client/index.js',
 target: 'web',
 // context: __dirname,
 output: {
  path: resolve(__dirname, 'dist'),
  filename: 'client.js',
  // chunkFilename: '[name].[chunkhash:4].bundle.js',
  publicPath: '/',
  // pathinfo: true,
 },

 module: {
  rules: [
   {
    use: {
     loader: 'babel-loader',
     // options: babelConfig,
    },
    test: /\.js$/,
    // include: [
    //   resolve(__dirname, 'src'),
    //   protocolRoot,
    //   uiRoot,
    //   messengerRoot,
    // ],
    // exclude: [
    //   // /node_modules/,
    //   // './src/api-type/index.js',
    //   // resolve('schema'),
    //   // /node_modules/,
    // ],
   },
  ],
 },
 mode: 'production',
 // devtool: 'cheap-source-map',
}
