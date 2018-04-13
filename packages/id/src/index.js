//@flow

let id = 0

class ID {
 /*::+*/ id: string = (++id).toString(36)
 inspect() {
  return this.id
 }
}

export type {ID}

export function nextID(): ID {
 return new ID()
}
