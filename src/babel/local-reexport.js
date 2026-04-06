require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {module: 'commonjs', target: 'es2020', sourceMap: true},
  ignore: [file => !file.includes('src/babel-plugin')],
})

module.exports = require('./babel-plugin.ts')
