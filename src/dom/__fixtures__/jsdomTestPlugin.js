module.exports = babel => {
  const {types: t, template} = babel
  const handledMethods = ['test', 'it']
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
      CallExpression(path) {
        if (!handledMethods.includes(path.node.callee.name)) return
        const body = path.node.arguments[1].body.body
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
