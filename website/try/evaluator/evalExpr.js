//@flow

import {realmStatus} from '../domain'

export function evalExpr(expr, vars) {
  const args = []
  const segments = []
  for (const key in vars) {
    args.push(vars[key])
    segments.push(key)
  }
  segments.push(`
  try {
    ${expr}
  } catch (error) {
    throw error
  }`)
  status.init()
  try {
    // Function(param1, ..., paramn, body)
    const exprFunc = Function(...segments)
    const results = exprFunc(...args)
    status.done()
    return results
  } catch (error) {
    status.fail()
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
