//@flow strict

let counter = 0

class ID {
  /*::+*/ id: number = ++counter
  toString() {
    return `{${this.id}}`
  }
  inspect() {
    return this.toString()
  }
  toValue() {
    return this.id
  }
  toJSON() {
    return {id: this.id}
  }
}
export type {ID}
export function create(): ID {
  return new ID()
}
