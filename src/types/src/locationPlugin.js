const {resolve, relative, dirname} = require('path')

const TEST_DIR = 'types'

module.exports = function(babel) {
  const {types: t, template, traverse} = babel
  const handledMethods = ['test', 'it', 'describe']
  const locationTemplate = template(
    'const typecheck = setupLocation(FILE, LOC, REPORT);',
  )
  const root = resolve(__dirname, '..', '..', TEST_DIR)
  const setupLocationModule = resolve(root, 'setupLocation.js')
  const relativePath = path => relative(root, path)
  const reportPath = path => {
    const hash = hashCode(relativePath(path))
    return resolve(__dirname, '..', '.reports', `type-report-${hash}.json`)
  }
  const setupLocationPath = path => {
    const dir = dirname(path)
    return relative(dir, setupLocationModule)
  }
  const jestVisitor = {
    CallExpression(path, state) {
      if (!handledMethods.includes(path.node.callee.name)) return
      path.node.arguments[1].body.body.unshift(
        locationTemplate({
          FILE: JSON.stringify(state.filename),
          REPORT: JSON.stringify(reportPath(state.filename)),
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

function hashCode(s) {
  let h = 0
  let i = 0
  if (s.length > 0)
    while (i < s.length) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return Math.abs(h).toString(36)
}
