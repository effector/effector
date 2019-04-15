//@flow
/* eslint-disable */
import {__DEV__} from 'effector/flags'

//prettier-ignore
let invariant = function(condition: any /*::, format: string, ...args: any*/) {
  if (!condition) {
    throw Error('Minified exception occurred')
  }
}

if (__DEV__) {
  function formatter(message: string, ...args: Array<any>) {
    let argIndex = 0
    return message.replace(/%s/g, () => args[argIndex++])
  }
  invariant = function(condition: any, format: string, ...args: any) {
    if (!condition) {
      const error = Error()
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, invariant)
      }
      error.name = 'Invariant Violation'
      error.message = formatter(format, ...args)
      throw error
    }
  }
}

export default invariant
