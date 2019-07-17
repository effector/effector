const {rollup} = require('rollup')
const {input, output} = require('./builder/rollup.config')

module.exports = (async function runner() {
  console.log('generate build script')
  const build = await rollup(input)
  await build.write(output)
  console.log('build')
  const {exec} = require('./builder.js')
  await exec()
})()
