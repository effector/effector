import {isReactive, toRaw, unref} from 'vue-next'

export function unwrapProxy<T>(payload: T) {
  const data = unref(payload)
  const raw = isReactive(data) ? toRaw(data) : data
  return raw
}
