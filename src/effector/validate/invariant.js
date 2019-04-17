//@flow
/* eslint-disable */
import {__DEV__} from 'effector/flags'

export default (__DEV__
  ? function invariant(condition: any, format: string, ...args: any) {
      if (!condition) {
        const error = Error()
        if (Error.captureStackTrace) {
          Error.captureStackTrace(error, invariant)
        }
        error.name = 'Invariant Violation'
        let argIndex = 0
        error.message = format.replace(/%s/g, () => args[argIndex++])
        throw error
      }
    }
  : function invariant(condition: any /*::, format: string, ...args: any*/) {
      if (!condition) {
        throw Error('Minified exception occurred')
      }
    })
