// @flow

const path = require('path')
const {transform} = require('@babel/core')
const jestPreset = require('babel-preset-jest')

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: [jestPreset],
      overrides: [
        {
          test(filename) {
            return path.dirname(filename) === path.join(__dirname, '__tests__')
          },
          plugins: [require.resolve('./src/plugin.js')],
        },
      ],
    })

    if (path.dirname(filename) === path.join(__dirname, '__tests__'))
      console.log(result.code)

    return result ? result.code : src
  },
}
