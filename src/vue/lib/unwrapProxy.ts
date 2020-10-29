import {isReactive, toRaw, unref} from '@vue/reactivity'

export function unwrapProxy<T>(payload: T) {
  const data = unref(payload)
  const pureValue = isReactive(data) ? toRaw(data) : data
  return pureValue
}
