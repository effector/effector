//@flow

export type Value = 1
export type Throw = 2
export type Try<A> = [Value, A] | [Throw, any]
