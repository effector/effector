//eslint-disable-next-line
export * as is from './validate'
import {assert} from './throw'

export const isObject = (value: any) =>
  typeof value === 'object' && value !== null
export const isFunction = (value: any) => typeof value === 'function'

export const assertObject = (value: any) =>
  assert(
    isObject(value) || isFunction(value),
    'expect first argument be an object',
  ) // or function

const assertNodeSetItem = (
  value: any,
  method: string,
  valueName: string,
  reason: string,
) =>
  assert(
    !(
      (!isObject(value) && !isFunction(value)) ||
      (!('family' in value) && !('graphite' in value))
    ),
    `${method}: expect ${valueName} to be a unit (store, event or effect)${reason}`,
  )

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
