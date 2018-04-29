//@flow

export function addToArray<A>(a: Array<A>, b: A) {
 const i = a.indexOf(b)
 if (i === -1) {
  a.push(b)
 }
}

export function removeFromArray<A>(a: Array<A>, b: A) {
 const i = a.indexOf(b)
 if (i !== -1) {
  a.splice(i, 1)
 }
}

let _nextId = 0
export function nextId() {
 return _nextId++
}

export const unique: any = {
 equals(arg: any): boolean {
  return false
 },
 inspect() {
  return 'Unique{_}'
 },
}

function defaultEquals(a: any, b: any): boolean {
 return (
  Object.is(a, b)
  || (a != null && typeof a.equals === 'function' && a.equals(b))
 )
}

// declare export function equals(ctx: any, a: any, b: any): boolean
export function equals<T>(ctx: any, a: T, b: T) {
 if (typeof ctx._equals === 'function') return ctx._equals(a, b)
 return defaultEquals(a, b)
}
