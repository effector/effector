const {defineReplacements} = require('./defineCjsReplacements')

module.exports = function (babel) {
  const replaceImports = defineReplacements(babel.types, [
    {
      pkg: 'use-sync-external-store/shim/index.js',
      val: 'shimJs',
    },
    {
      pkg: 'use-sync-external-store/shim/with-selector.js',
      val: 'shimSelectorJs',
    },
    {
      pkg: 'use-sync-external-store/shim',
      val: 'shim',
    },
    {
      pkg: 'use-sync-external-store/shim/with-selector',
      val: 'shimSelector',
    },
  ])
  return {
    name: 'react-shim-imports',
    visitor: {
      ImportDeclaration(path) {
        replaceImports(path, this)
      },
    },
  }
}
