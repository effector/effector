const {defineReplacements} = require('./defineCjsReplacements')

module.exports = function (babel) {
  const replaceImports = defineReplacements(babel.types, [
    {
      pkg: '@vue/reactivity',
      val: 'reactivity',
    },
    {
      pkg: '@vue/runtime-core',
      val: 'runtimeCore',
    },
  ])
  return {
    name: 'vue-imports',
    visitor: {
      ImportDeclaration(path) {
        replaceImports(path, this)
      },
    },
  }
}
