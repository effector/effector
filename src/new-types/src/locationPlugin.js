const {resolve} = require('path')

module.exports = function(babel) {
  const {types: t, template, traverse} = babel
  const handledMethods = ['test', 'it', 'describe']
  const locationTemplate = template(
    'const typecheck = setupLocation(FILE, LOC, REPORT);',
  )
  const reportPath = resolve(__dirname, '../ts-report.json')
  const jestVisitor = {
    CallExpression(path, state) {
      if (!handledMethods.includes(path.node.callee.name)) return
      path.node.arguments[1].body.body.unshift(
        locationTemplate({
          FILE: JSON.stringify(state.filename),
          REPORT: JSON.stringify(reportPath),
          LOC: JSON.stringify(path.node.loc, null, 2),
        }),
      )
    },
  }
  return {
    name: 'test-meta',
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(jestVisitor, {filename: state.filename})
        },
      },
    },
  }
}
