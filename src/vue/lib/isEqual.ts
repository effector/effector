/**
 * Structural comparison of a copy with the value it was made from.
 *
 * `useVModel` tells an edit of the form from the state the store has pushed
 * into it, and the two are never the same object. The types a form carries
 * are compared by content: dates, regexps, maps, sets, array buffers and
 * their views, arrays and plain objects. Anything else, an `Error` or a boxed
 * primitive for one, has no branch here and is not a plain object either, so
 * it stays compared by reference and a copy of it never matches.
 *
 * `lib/deepEqual.ts` is the comparison of the Vue 3 Options API, in
 * `src/vue/optionsApi.ts`, and knows plain objects and arrays only.
 */
export function isEqual(
  a: unknown,
  b: unknown,
  /**
   * The pairs on the way down, so a value that refers to itself ends here
   * instead of recursing. A pair leaves the map once it is decided, so a
   * comparison that failed does not answer for another one.
   */
  seen: Map<unknown, unknown> = new Map(),
): boolean {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
  if (seen.get(a) === b) return true

  seen.set(a, b)
  try {
    return compare(a, b, seen)
  } finally {
    seen.delete(a)
  }
}

function compare(a: object, b: object, seen: Map<unknown, unknown>): boolean {
  const type = Object.prototype.toString.call(a)
  if (type !== Object.prototype.toString.call(b)) return false

  switch (type) {
    case '[object Date]':
      /** `Object.is` so that two invalid dates are equal to each other. */
      return Object.is((a as Date).getTime(), (b as Date).getTime())
    case '[object RegExp]':
      return String(a) === String(b)
    case '[object Map]':
      return mapsEqual(
        a as Map<unknown, unknown>,
        b as Map<unknown, unknown>,
        seen,
      )
    case '[object Set]':
      return setsEqual(a as Set<unknown>, b as Set<unknown>, seen)
    case '[object ArrayBuffer]':
      return bytesEqual(
        new Uint8Array(a as ArrayBuffer),
        new Uint8Array(b as ArrayBuffer),
      )
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((item, i) => isEqual(item, b[i], seen))
    )
  }

  /** Typed arrays and `DataView`, of the same kind by the tag above. */
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    return bytesEqual(viewBytes(a), viewBytes(b))
  }

  if (!isPlainObject(a)) return false

  const copy = a as Record<string, unknown>
  const source = b as Record<string, unknown>
  const keys = Object.keys(copy)

  return (
    keys.length === Object.keys(source).length &&
    keys.every(key => key in source && isEqual(copy[key], source[key], seen))
  )
}

/**
 * The prototype of a plain object is the `Object.prototype` of its realm, or
 * nothing at all. Comparing it with the `Object.prototype` at hand would take
 * an object built in another realm, a worker or a frame, for an instance of a
 * class and stop comparing it by content.
 */
function isPlainObject(value: object) {
  const proto = Object.getPrototypeOf(value)
  return proto === null || Object.getPrototypeOf(proto) === null
}

function viewBytes(view: ArrayBufferView) {
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength)
}

function bytesEqual(a: Uint8Array, b: Uint8Array) {
  return a.length === b.length && a.every((byte, i) => byte === b[i])
}

/**
 * A copy has its own object keys and values, so a lookup by reference only
 * finds the entries with primitive keys and has to fall back to a scan.
 */
function mapsEqual(
  a: Map<unknown, unknown>,
  b: Map<unknown, unknown>,
  seen: Map<unknown, unknown>,
) {
  if (a.size !== b.size) return false

  const rest = new Map(b)

  for (const [key, value] of a) {
    if (rest.has(key) && isEqual(value, rest.get(key), seen)) {
      rest.delete(key)
      continue
    }

    let found = false
    for (const [restKey, restValue] of rest) {
      if (isEqual(key, restKey, seen) && isEqual(value, restValue, seen)) {
        rest.delete(restKey)
        found = true
        break
      }
    }

    if (!found) return false
  }

  return true
}

function setsEqual(
  a: Set<unknown>,
  b: Set<unknown>,
  seen: Map<unknown, unknown>,
) {
  if (a.size !== b.size) return false

  const rest = new Set(b)

  for (const value of a) {
    if (rest.delete(value)) continue

    let found = false
    for (const restValue of rest) {
      if (isEqual(value, restValue, seen)) {
        rest.delete(restValue)
        found = true
        break
      }
    }

    if (!found) return false
  }

  return true
}
