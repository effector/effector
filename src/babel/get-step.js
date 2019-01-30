'use strict'
//@noflow

module.exports = function(babel) {
  const {types: t} = babel
  const SEEN_SYMBOL = Symbol()
  const CALLSTACK = t.memberExpression(
    t.identifier('meta'),
    t.identifier('callstack'),
    false,
  )
  const STEP = t.memberExpression(
    CALLSTACK,
    t.binaryExpression(
      '-',
      t.memberExpression(CALLSTACK, t.identifier('length'), false),
      t.numericLiteral(1),
    ),
    true,
  )
  const STEP_GETTER = t.expressionStatement(STEP)
  const SINGLE_GETTER = t.expressionStatement(
    t.memberExpression(
      t.memberExpression(STEP, t.identifier('data'), false),
      t.identifier('data'),
      false,
    ),
  )
  return {
    name: 'get-step',
    visitor: {
      // DeclareVariable: {
      //   enter(path) {
      //     // path.skip()
      //   },
      // },
      Identifier: {
        enter(path) {
          if (path[SEEN_SYMBOL]) return
          if (path.isIdentifier({name: '__step'})) {
            path[SEEN_SYMBOL] = true
            if (!path.findParent(p => p.isDeclareVariable())) {
              // if (path.scope.hasBinding('meta')) {
              path.replaceWith(STEP_GETTER)
              // path.replaceWithSourceString(
              //   'meta.callstack[meta.callstack.length - 1]',
              // )
              // }
            }
          } else if (path.isIdentifier({name: '__single'})) {
            path[SEEN_SYMBOL] = true
            if (!path.findParent(p => p.isDeclareVariable())) {
              path.replaceWith(SINGLE_GETTER)
            }
          }
        },
      },
    },
  }
}
