module.exports = babel => {
  const {types: t, template} = babel
  const handledFunctions = ['test', 'it']
  const handledMethods = ['only', 'skip']
  const provideGlobalsTemplate = template(
    'const {document, window, el, execFunc, exec, act} = provideGlobals()',
  )
  const finalizerTemplate = template('window.close()')
  const initBrowserTemplate = template('const initBrowser = async() => {}')

  return {
    name: 'jsdom-test-plugin',
    visitor: {
      Program(path) {
        path.node.body.unshift(
          t.importDeclaration(
            [
              t.importSpecifier(
                t.identifier('provideGlobals'),
                t.identifier('provideGlobals'),
              ),
            ],
            t.stringLiteral('effector/fixtures/dom'),
          ),
          initBrowserTemplate(),
        )
      },
      CallExpression({node}) {
        const callee = node.callee
        if (!handledFunctions.includes(callee.name)) {
          if (
            !t.isMemberExpression(callee) ||
            !t.isIdentifier(callee.object) ||
            !t.isIdentifier(callee.property) ||
            !handledFunctions.includes(callee.object.name) ||
            !handledMethods.includes(callee.property.name)
          ) {
            return
          }
        }
        const body = node.arguments[1].body.body
        const tryWrapper = t.tryStatement(
          t.blockStatement([...body]),
          null,
          t.blockStatement([finalizerTemplate()]),
        )
        body.splice(0, body.length)
        body.unshift(provideGlobalsTemplate(), tryWrapper)
      },
    },
  }
}
