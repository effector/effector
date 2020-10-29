// @ts-nocheck
function find(list, f) {
  return list.filter(f)[0]
}

export function deepCopy(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy,
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
