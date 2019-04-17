//@flow
import {__DEV__} from 'effector/flags'

export default (__DEV__
  ? (condition: any, format: string, ...args: any) => {
    if (!condition) {
      console.error('Warning: ' + format, ...args)
    }
  }
  : (/*::condition: any, format: string, ...args: any*/) => {})
