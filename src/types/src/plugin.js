// @flow

// const execa = require('execa')
// const recast = require('recast')
// const prettier = require('prettier')
const path = require('path')
const fs = require('fs-extra')
const generate = require('@babel/generator').default

function getImportNodes(program) {
  return program
    .get('body')
    .filter(
      item =>
        item.isImportDeclaration() ||
        (item.isExportDeclaration() && item.node.source),
    )
    .map(item => item.node)
}

module.exports = function(babel, options = {}) {
  const {types: t, template} = babel
  const testTemplate = template(`
jest.setTimeout(15000)
test('snapshots', async () => {
  await require('../__fixtures__/run.js').typeCheck(TS_FILE, FLOW_FILE)
})
`)
  const plugin = {
    name: 'plugin',
    visitor: {
      Program: {
        enter(path, state) {
          const importsCode = generate(t.program(getImportNodes(path)))
          state.importsCode = importsCode.code
        },
        exit(program, state) {
          program.pushContainer(
            'body',
            testTemplate({
              FLOW_FILE: t.stringLiteral(
                path.join(
                  __dirname,
                  '..',
                  '__fixtures__',
                  'flow',
                  path.basename(state.filename),
                ),
              ),
              TS_FILE: t.stringLiteral(
                path.join(
                  __dirname,
                  '..',
                  '__fixtures__',
                  'typescript',
                  path.basename(state.filename),
                ),
              ),
            }),
          )
        },
      },
      CallExpression({node}, state) {
        if (node.callee.name === 'test') {
          const title = node.arguments[0].extra.rawValue
          try {
            const code = generate(node.arguments[1].body).code
            const file = lang =>
              path.join(
                __dirname,
                '..',
                '__fixtures__',
                lang,
                path.basename(state.filename),
                `${title}${lang === 'typescript' ? '.ts' : '.js'}`,
              )
            for (const lang of ['flow', 'typescript']) {
              fs.outputFileSync(file(lang), `${state.importsCode}\n${code}`)
            }
          } catch (err) {
            console.error(title, err)
          }
        }
      },
    },
  }
  return plugin
}
