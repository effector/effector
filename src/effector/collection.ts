export const forIn = (obj: any, cb: (value: any, key: string) => void) => {
  for (const key in obj) {
    cb(obj[key], key)
  }
}

export const includes = (list: any[], item: any) => list.includes(item)

export const removeItem = (list: any[], item: any) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}

export function forEach<T>(
  list: T[],
  fn: (item: T, index: number, list: T[]) => void,
): void
export function forEach<T>(list: Set<T>, fn: (item: T) => void): void
export function forEach(list: any, fn: Function) {
  list.forEach(fn)
}
