//@flow

import {
  //$off
  types,
} from 'redux-act'

const {add, check} = types

export const getTypeId = counter()
export const getActId = counter()
export const getAsyncActId = counter()
export const getStoreId = counter()
export const getDomainId = counter()
export const getReducerId = counter()
export const getFieldId = counter()
export const getValueId = counter()

export function registerType(description: string) {
  const isSerializable =
    typeof description === 'string' && /^[0-9A-Z_]+$/.test(description)

  const id = getTypeId()
  if (isSerializable) {
    check(description)
    add(description)
    return {
      type: description,
      id,
    }
  }


  const type = `[${id}] ${description}`
  return {type, id}
}


export function counter() {
  let id = 0
  return () => ++id
}
