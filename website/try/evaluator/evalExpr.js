//@flow

import {realmStatus} from '../domain'
import scopedEval from './scopedEval'

export function evalExpr(expr, vars) {
  status.init()
  try {
    // Function(param1, ..., paramn, body)
    const exprFunc = scopedEval.runCode(`
'use strict';
{
  ${expr}
}
`)
    const results = exprFunc(vars)
    status.done()
    return results
  } catch (error) {
    status.fail()
    console.error(error)
    throw error
  }
}

const status = {
  init() {
    realmStatus({
      active: true,
      throwError: false,
    })
  },
  done() {
    realmStatus({
      active: false,
      throwError: false,
    })
  },
  fail() {
    realmStatus({
      active: false,
      throwError: true,
    })
  },
}
