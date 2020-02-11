//@flow

//eslint-disable-next-line
export * as is from './validate'

export const isObject = (value: any) =>
  typeof value === 'object' && value !== null
export const isFunction = (value: any) => typeof value === 'function'
