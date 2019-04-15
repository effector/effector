//@flow
import {__DEV__} from 'effector/flags'

//eslint-disable-next-line max-len
let warning = function(/*::condition: any, format: string, ...args: any*/) {}
if (__DEV__) {
  warning = function(condition: any, format: string, ...args: any) {
    if (!condition) {
      console.error('Warning: ' + format, ...args)
    }
  }
}

export default warning
