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

export const unique = {
 equals(arg: mixed) {
  return false
 },
 inspect() {
  return 'Unique{_}'
 },
}
type Equals = (a: *, b: *) => boolean
function defaultEquals(a, b) {
 return Object.is(a, b) || (a && typeof a.equals === 'function' && a.equals(b))
}

export function setEquals(derivable: {-_equals: Equals}, eq: Equals) {
 derivable._equals = eq
 return derivable
}

export function equals(ctx: *, a: *, b: *) {
 return (ctx._equals || defaultEquals)(a, b)
}
