// @ts-nocheck
export function deepCopy<T>(obj, cache = new Map()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const hit = cache.get(obj)

  if (hit) {
    return hit
  }

  const copy = Array.isArray(obj) ? [] : {}
  cache.set(obj, copy)

  for (const key of Object.keys(obj)) {
    copy[key] = deepCopy(obj[key], cache)
  }

  return copy
}
