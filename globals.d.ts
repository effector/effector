
type TimeoutID = number
type $Shape<T> = Partial<T>
type $Exact<T> = T
type $Spread<A, B> = A & B
type $ReadOnlyArray<T> = ReadonlyArray<T>
type $NonMaybeType<T> = T
type $Subtype<T> = T
type $Supertype<T> = T
type empty = never
declare class mixed {}
type $Diff<A, B> = A & B
type $ElementType<T extends Object, K extends keyof T> = T[K]
type $PropertyType<T extends Object, K extends keyof T> = T[K]
type $Keys<T extends Object> = keyof T
type Class<T, K = { new (...args: any[]): T }> = K
type $Pred<N extends Number> = (value: any) => boolean
type $ReadOnly<T> = Readonly<T>
type $Refine<T, P, N extends Number> = T
type $Values<T, K extends keyof T = keyof T> = T[K]
type $Either<A, B, C = never, D = never> = A | B | C | D

type $ObjMap<T extends Object, F extends Function> = {
  [K in keyof T]: T[K]
}

// type IteratorResult<Yield, Return = void> =
//   | {
//       done: true
//       value: Return
//     }
//   | {
//       done: false
//       value: Yield
//     }

// interface Generator<Yield, Return = void, Next = void> {
//   '@@iterator'(): $Iterator<Yield, Return, Next>
//   next(value: void): IteratorResult<Yield>
//   return<R>(value: R): IteratorResult<Yield, R | Return>
//   throw(error?: any): IteratorResult<Yield>
// }

// interface $AsyncIterator<Yield, Return = void, Next = void> {
//   '@@asyncIterator'(): $AsyncIterator<Yield, Return, Next>
//   next(value?: Next): Promise<IteratorResult<Yield, Return>>
// }

// interface AsyncGenerator<Yield, Return = void, Next = void> {
//   '@@asyncIterator'(): $AsyncIterator<Yield, Return, Next>
//   next(value?: Next): Promise<IteratorResult<Yield, Return>>
//   return<R>(value: R): Promise<IteratorResult<Yield, R | Return>>
//   throw(error?: any): Promise<IteratorResult<Yield, Return>>
// }

// interface $Iterator<Yield, Return = void, Next = void> {
//   '@@iterator'(): $Iterator<Yield, Return, Next>
//   next(value?: Next): IteratorResult<Yield, Return>
// }

type $Compose = (
  <A, B, R>(
    a: A,
    b: B,
    noc: void,
    nod: void,
    noe: void,
    nof: void
  ) => R
) & (
  <A, B, C, R>(
    a: A,
    b: B,
    c: C,
    nod: void,
    noe: void,
    nof: void
  ) => R
) & (
  <A, B, C, D, R>(
    a: A,
    b: B,
    c: C,
    d: D,
    noe: void,
    nof: void
  ) => R
) & (
  <A, B, C, D, E, R>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    nof: void
  ) => R
) & (
  <A, B, C, D, E, F, R>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F
  ) => R
)