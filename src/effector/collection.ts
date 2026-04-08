export function forIn<T, Key extends string = string>(
  obj: Record<Key, T>,
  cb: (value: T, key: Key) => void,
) {
  for (const key in obj) {
    cb(obj[key], key)
  }
}

export const includes = <T>(list: T[], item: T) => list.includes(item)

export const removeItem = <T>(list: T[], item: T) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}

export const add = <T>(list: T[], item: T) => list.push(item)

export function forEach<T>(
  list: T[],
  fn: (item: T, index: number, list: T[]) => void,
): void
export function forEach<K, T>(
  list: Map<K, T>,
  fn: (item: T, key: K) => void,
): void
export function forEach<T>(list: Set<T>, fn: (item: T) => void): void
export function forEach(list: any, fn: Function) {
  list.forEach(fn)
}

/** generalized visitor with duplicates check */
export function traverse<T>(
  startItem: T,
  cb: (item: T, visit: (item: T) => void) => void,
) {
  const visited = new Set<T>()
  const stack = [startItem]
  const visit = (item: T) => stack.push(item)
  let item: T | void
  while ((item = stack.shift())) {
    if (!visited.has(item)) {
      visited.add(item)
      cb(item, visit)
    }
  }
}
