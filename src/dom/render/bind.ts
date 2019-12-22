export function bind<A, R>(cb: (a: A) => R, a: A): (() => R)
export function bind<A, B, R>(cb: (a: A, b: B) => R, a: A): ((b: B) => R)
export function bind<A, B, C, R>(cb: (a: A, b: B, c: C) => R, a: A): ((b: B, c: C) => R)
export function bind<A, B, C, D, R>(cb: (a: A, b: B, c: C, d: D) => R, a: A): ((b: B, c: C, d: D) => R)
export function bind(cb: Function, data: any) {
  return cb.bind(null, data)
}
