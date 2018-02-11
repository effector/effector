//@flow

const types: Set<string> = new Set

export function add(name: string) {
  check(name)
  types.add(name)
}

export function has(name: string) {
  return types.has(name)
}

export function check(name: string) {
  if (has(name)) {
    throw new TypeError(`Duplicate action type: ${name}`)
  }
}
