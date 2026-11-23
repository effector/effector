import {toRaw} from 'vue-next'

import {deepCopy} from './deepCopy'

/**
 * Copies the state a form is bound to, so that the store and the local copy of
 * the component never share a reference.
 *
 * `structuredClone` keeps `Map`, `Set`, `RegExp` and typed arrays, which the
 * hand-written `deepCopy` turns into plain objects (#975), and it copies a
 * `Date`, which `deepCopy` has returned by reference since #1228. It is missing
 * in older runtimes and throws on a value it cannot serialize, a function or
 * a DOM node, so one such value anywhere in the state sends the whole copy
 * through `deepCopy`. The raw value is cloned: a reactive proxy has no
 * internal slots of the object it wraps, and `structuredClone` reads those.
 */
export function clone<T>(value: T): T {
  const raw = toRaw(value)

  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(raw)
    } catch (err) {
      /** Not serializable, the fallback keeps such values by reference. */
    }
  }

  return deepCopy(raw)
}
