//@flow
/* eslint-disable */
import {formatter} from '../effector/logger'
import {__DEV__} from 'effector/flags'

let warning = function(/*::condition: any, format: string, ...args: any*/) {}
if (__DEV__) {
  warning = function(condition: any, format: string, ...args: any) {
    if (!condition) {
      console.error('Warning: ' + formatter(format, ...args))
    }
  }
}

export default warning
