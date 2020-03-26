//@flow

//eslint-disable-next-line
export * as is from './validate'
import {throwError} from './throw'

export const isObject = (value: any) =>
  typeof value === 'object' && value !== null
export const isFunction = (value: any) => typeof value === 'function'

export const assertObject = (value: any) => {
  if (!isObject(value) && !isFunction(value))
    throwError('expect value to be an object') // or function
}

export const isUnitOrList = (value: any) => {
  if (Array.isArray(value)) return value.every(is.unit)
  return is.unit(value)
}

export const assertUnitOrList = (value: any) => {
  if (!isUnitOrList(value))
    throwError('expect value to be an array of unit or single unit')
}
