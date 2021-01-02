//eslint-disable-next-line
export * as is from './validate'
import {throwError} from './throw'

export const isObject = (value: any) =>
  typeof value === 'object' && value !== null
export const isFunction = (value: any) => typeof value === 'function'

export const assertObject = (value: any) => {
  if (!isObject(value) && !isFunction(value))
    throwError('expect first argument be an object') // or function
}

function assertNodeSetItem(value: any, method: string, valueName: string, reason: string) {
  if ((!isObject(value) && !isFunction(value)) || (!('family' in value) && !('graphite' in value))) {
    throwError(`${method}: expect ${valueName} to be a unit (store, event or effect)${reason}`)
  }
}
export function assertNodeSet(value: any, method: string, valueName: string) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      assertNodeSetItem(item, method, `${i} item of ${valueName}`, '')
    }
  } else {
    assertNodeSetItem(value, method, valueName, ' or array of units')
  }
}
