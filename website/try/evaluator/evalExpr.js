//@flow

import {realmStatus} from '../domain'
import scopedEval from './scopedEval'
import {transformCode} from './compiler'
export function evalExpr(expr, vars) {
  status.init()
  try {
    const compiled = transformCode(`'use strict';
{

${expr}

}`)
    const exprFunc = scopedEval.runCode(compiled)
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
