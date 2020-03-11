//@flow

export const forIn = (obj, cb: (value: any, key: string) => void) => {
  for (const key in obj) {
    cb(obj[key], key)
  }
}
