import {Store} from 'effector'
import {activeStack} from './render/stack'
import {own} from './own'
import {bind} from './render/bind'

export function remap<T extends {[field: string]: any}, S extends keyof T>(
  store: Store<T>,
  key: S,
): Store<T[S]>
export function remap<
  T extends {[field: string]: any},
  S extends {[field: number]: keyof T} | {[field: string]: keyof T}
>(
  store: Store<T>,
  shape: S,
): {[K in keyof S]: S[K] extends keyof T ? Store<T[S[K]]> : never}

export function remap(
  store: Store<any>,
  shape: string | Array<any> | {[field: string]: any},
) {
  const stack = activeStack.get()
  if (Array.isArray(shape)) {
    const result = [] as any
    for (let i = 0; i < shape.length; i++) {
      result[i] = store.map(bind(readField, shape[i]))
    }
    if (stack) {
      own(stack.signal, result)
    }
    return result
  }
  if (typeof shape === 'object' && shape !== null) {
    const owned = [] as any[]
    const result = {} as any
    for (const key in shape) {
      result[key] = store.map(bind(readField as any, shape[key]))
      owned.push(result[key])
    }
    if (stack) {
      own(stack.signal, owned)
    }
    return result
  }
  const result = store.map(bind(readField as any, shape))
  if (stack) {
    own(stack.signal, result)
  }
  return result
}

export function storeField<T extends {[field: string]: any}, K extends keyof T>(
  store: Store<T>,
  key: K,
): Store<T[K]> {
  const result = store.map(bind(readField, key))
  const stack = activeStack.get()
  if (stack) {
    own(stack.signal, [result])
  }
  return result
}

function readField<T extends {[field: string]: any}, K extends keyof T>(
  key: K,
  value: T,
) {
  return value[key]
}
