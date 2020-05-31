import {Store} from 'effector'

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
  if (Array.isArray(shape)) {
    return shape.map(key => store.map(value => value[key]))
  }
  if (typeof shape === 'object' && shape !== null) {
    const result = {} as any
    for (const key in shape) {
      const projectedKey = shape[key]
      result[key] = store.map(
        typeof projectedKey === 'function'
          ? value => projectedKey(value)
          : value => value[projectedKey],
      )
    }
    return result
  }
  return store.map(value => value[shape])
}
