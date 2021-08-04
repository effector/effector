export function forIn<T extends Record<string, unknown>>(
  obj: T,
  cb: (value: T[keyof T], key: Exclude<keyof T, number>) => void,
) {
  for (const key in obj) {
    cb(obj[key], key as any)
  }
}
