module.exports = function(babel) {
  const t = babel.types
  function defineReplacements(replacements) {
    const packages = replacements.map(({pkg}) => pkg)
    return (path, ctx) => {
      const node = path.node
      if (!packages.includes(node.source.value)) return
      const programPath = path.find(path => path.isProgram())
      if (!ctx.effVue_importMap) ctx.effVue_importMap = new Set()
      const {pkg, val} = replacements[packages.indexOf(node.source.value)]
      const importMap = ctx.effVue_importMap
      if (!importMap.has(pkg)) {
        importMap.add(pkg)
        programPath.node.body.unshift(
          t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier(val))],
            t.stringLiteral(pkg),
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
          t.VariableDeclarator(t.objectPattern(imports), t.identifier(val)),
        ]),
      )
    }
  }
  const replaceImports = defineReplacements([
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
