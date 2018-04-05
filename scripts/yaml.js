const {readFileSync} = require('fs')
const YAML = require('js-yaml')

require.extensions['.yaml'] = function(module, filename) {
  const data = readFileSync(filename, 'utf8')
  const content = YAML.load(data)
  module.exports = content
}

require.extensions['.yml'] = function(module, filename) {
  const data = readFileSync(filename, 'utf8')
  const content = YAML.load(data)
  module.exports = content
}