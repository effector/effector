//@flow
/* eslint-disable */
import {formatter} from '../effector/logger'
import {__DEV__} from 'effector/flags'

let invariant = function(condition: any /*::, format: string, ...args: any*/) {
  if (!condition) {
    throw Error('Minified exception occurred')
  }
}

if (__DEV__) {
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
