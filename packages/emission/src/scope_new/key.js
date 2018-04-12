//@flow

let id = 0

export class Key {
 /*::+*/ id = ++id
 toString() {
  return this.id.toString(36)
 }
 inspect() {
  return this.toString()
 }
}

export function createKey(): Key {
 return new Key()
}
