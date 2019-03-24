const defs = t => {
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
  return {
    val: {
      type: 'CallExpression',
      check(ctx, path) {
        //console.log(ctx, path);
        return (
          path.type === 'CallExpression' && path.node.callee.name === '__val'
        )
      },
      expression({path}) {
        const result = t.memberExpression(
          t.memberExpression(
            t.memberExpression(
              t.identifier('meta'),
              t.identifier('val'),
              false,
            ),
            t.identifier(path.node.arguments[0].value),
            false,
          ),
          t.identifier('current'),
          false,
        )
        if (path.node.arguments.length > 1) {
          return t.assignmentExpression('=', result, path.node.arguments[1])
        }
        return result
      },
    },
    step: {
      type: 'Identifier',
      check: (ctx, path) => path.isIdentifier(ctx.identifier),
      expression: ctx => STEP,
    },
    single: {
      type: 'Identifier',
      check: (ctx, path) => path.isIdentifier(ctx.identifier),
      expression: ctx =>
        t.memberExpression(
          t.memberExpression(STEP, t.identifier('data'), false),
          t.identifier('data'),
          false,
        ),
    },
  }
}

function apply(babel) {
  return {
    name: 'get-step',
    visitor: createReplacer({
      t: babel.types,
      initializer: defs,
    }),
  }
}

function createReplacer({t, initializer}) {
  const replacersRaw = initializer(t)
  const visitorAcc = {}
  for (const name in replacersRaw) {
    const config = replacersRaw[name]
    const expression = config.expression
    const acc = (visitorAcc[config.type] = visitorAcc[config.type] || [])
    const replacer = ReplaceTag.bind({
      seenSymbol: Symbol(),
      check: config.check,
      identifier: {name: String('__' + name)},
      replaceBy: expression,
    })
    acc.push(replacer)
  }
  const acc = {}
  for (const key in visitorAcc) {
    acc[key] = runReplacer.bind(null, visitorAcc[key])
  }
  return acc
  function runReplacer(replacers, path) {
    for (let i = 0; i < replacers.length; i++) {
      ;(0, replacers[i])(path)
    }
  }
  function ReplaceTag(path) {
    if (path[this.seenSymbol]) return
    path[this.seenSymbol] = true
    if (!this.check(this, path)) return
    if (path.findParent(p => p.isDeclareVariable())) return
    // console.log(path);
    path.replaceWith(this.replaceBy({path}))
  }
}

module.exports = function(babel) {
  return apply(babel)
}
