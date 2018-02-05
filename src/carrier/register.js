//@flow

const types = {}
const config = {
  checkExisting: true
}

export function add(name: string) {
  types[name] = true
}

export function has(name: string) {
  return !!types[name]
}

export function check(name: string) {
  if (config.checkExisting && has(name)) {
    throw new TypeError(`Duplicate action type: ${name}`)
  }
}
