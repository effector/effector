const {rollup} = require('rollup')
const {input, output} = require('./builder/rollup.config')
const {resolve} = require('path')

module.exports = (async function runner() {
  console.log('generate build script')
  const build = await rollup(input)
  await build.write(output)
  console.log('build')
  process.env.IS_BUILD = 'true'
  delete require.cache[resolve(__dirname, '../babel.config.js')]
  const {exec} = require('./builder.js')
  await exec()
})()
