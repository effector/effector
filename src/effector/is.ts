export * as is from './validate'
import {forEach} from './collection'
import {assert, deprecate} from './throw'
import {arrifyNodes} from './createNode'
import type {NodeUnit} from './index.h'
import {getMeta} from './getter'

export const isObject = (value: any) =>
  typeof value === 'object' && value !== null
export const isFunction = (value: any) => typeof value === 'function'

export const isVoid = (value: any) => value === undefined

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

export const assertNodeSet = (
  value: any,
  method: string,
  valueName: string,
) => {
  if (Array.isArray(value)) {
    forEach(value, (item, i) =>
      assertNodeSetItem(item, method, `${i} item of ${valueName}`, ''),
    )
  } else {
    assertNodeSetItem(value, method, valueName, ' or array of units')
  }
}

export const assertTarget = (
  method: string,
  target: NodeUnit | NodeUnit[],
  targetField: string = 'target',
) =>
  forEach(arrifyNodes(target), item =>
    deprecate(
      !getMeta(item, 'derived'),
      `${method}: derived unit in "${targetField}"`,
      `createEvent/createStore`,
    ),
  )
