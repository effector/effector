// @ts-nocheck
export function deepCopy<T>(obj, cache = new Map()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return obj
  }

  const hit = cache.get(obj)

  if (hit) {
    return hit
  }

  /**
   * A reactive proxy of a Map or a Set passes `instanceof` and iterates
   * through the methods Vue instruments, so the copy is a Map or a Set too.
   */
  if (obj instanceof Map) {
    const copy = new Map()
    cache.set(obj, copy)
    obj.forEach((value, key) => {
      copy.set(deepCopy(key, cache), deepCopy(value, cache))
    })

    return copy
  }

  if (obj instanceof Set) {
    const copy = new Set()
    cache.set(obj, copy)
    obj.forEach(value => {
      copy.add(deepCopy(value, cache))
    })

    return copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  cache.set(obj, copy)

  for (const key of Object.keys(obj)) {
    copy[key] = deepCopy(obj[key], cache)
  }

  return copy
}
