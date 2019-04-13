//@flow
import {__DEV__} from 'effector/flags'

//eslint-disable-next-line max-len
export let warning = function(/*::condition: any, format: string, ...args: any*/) {}
if (__DEV__) {
  warning = function(condition: any, format: string, ...args: any) {
    if (!condition) {
      console.error('Warning: ' + format, ...args)
    }
  }
}
