const {resolve, relative, dirname} = require('path')

module.exports = function(babel) {
  const {types: t, template, traverse} = babel
  const handledMethods = ['test', 'it']
  const locationTemplate = template(
    'const typecheck = setupLocation(FILE, LOC);',
  )
  const root = resolve(__dirname, '..')
  const testsRoot = resolve(__dirname, '..', '__tests__')
  const setupLocationModule = resolve(root, 'setupLocation.js')
  const setupLocationPath = path => {
    const dir = dirname(path)
    return relative(dir, setupLocationModule)
  }
  const jestVisitor = {
    CallExpression(path, state) {
      if (!handledMethods.includes(path.node.callee.name)) return
      path.node.arguments[1].body.body.unshift(
        locationTemplate({
          FILE: JSON.stringify(relative(testsRoot, state.filename)),
          LOC: JSON.stringify(path.node.loc, null, 2),
        }),
      )
    },
  }
  return {
    name: 'type-test-location-plugin',
    visitor: {
      Program: {
        enter(path, state) {
          path.node.body.unshift(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('setupLocation'))],
              t.stringLiteral(setupLocationPath(state.filename)),
            ),
          )
          path.traverse(jestVisitor, {filename: state.filename})
        },
      },
    },
  }
}
