export const forIn = (obj: any, cb: (value: any, key: string) => void) => {
  for (const key in obj) {
    cb(obj[key], key)
  }
}
