module.exports = function(babel) {
  const t = babel.types
  return {
    name: 'vue-imports',
    visitor: {
      ImportDeclaration(path, state) {
        const node = path.node
        if (node.source.value !== '@vue/reactivity') return
        const programPath = path.find(path => path.isProgram())
        if (!this.effVue_importAdded) {
          this.effVue_importAdded = true
          programPath.node.body.unshift(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('reactivity'))],
              t.stringLiteral('@vue/reactivity'),
            ),
          )
        }

        const imports = []
        for (let i = 0; i < node.specifiers.length; i++) {
          const specifier = node.specifiers[i]
          if (t.isImportDefaultSpecifier(specifier)) return
          if (!t.isImportSpecifier(specifier)) continue
          imports.push(
            t.objectProperty(
              t.identifier(specifier.imported.name),
              t.identifier(specifier.local.name),
            ),
          )
        }
        path.replaceWith(
          t.VariableDeclaration('const', [
            t.VariableDeclarator(
              t.objectPattern(imports),
              t.identifier('reactivity'),
            ),
          ]),
        )
      },
    },
  }
}
