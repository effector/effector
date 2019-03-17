const webpack = require('webpack')

module.exports = {
  entry: ['./src/index.js', './src/ecma.mjs'],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    port: 8080,
    public: 'http://0.0.0.0:8080',
  },
}
