import {kv} from './types'

export function forInMap<T, S>(
  rec: kv<T>,
  fn: (item: T, key: string) => S | void,
): Record<string, S> {
  const result: Record<string, S> = {}
  forIn(rec, (item, key) => {
    const mapped = fn(item, key)
    if (mapped !== undefined) {
      result[key] = mapped
    }
  })
  return result
}

export function forIn<T>(
  obj: kv<T>,
  cb: (value: T, key: string) => void | true,
): void | true {
  for (const key in obj) {
    if (cb(obj[key], key)) return true
  }
}
