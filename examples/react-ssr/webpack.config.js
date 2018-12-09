process.env.TARGET = 'client'
process.env.NODE_ENV = 'production'

module.exports = {
 entry: './src/client/index.js',
 target: 'web',
 output: {
  path: `${__dirname}/dist`,
  filename: 'client.js',
  // chunkFilename: '[name].[chunkhash:4].bundle.js',
  publicPath: '/',
 },

 module: {
  rules: [
   {
    use: {
     loader: 'babel-loader',
    },
    test: /\.js$/,
   },
  ],
 },
 mode: 'production',
 // devtool: 'cheap-source-map',
}
