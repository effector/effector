//@flow

export type Eff = () => void
export type Cancel = Eff
export type Delegate<A> = (_: A) => void
export type PendingDelegate<A> = {
 next: Delegate<A>,
 error?: Delegate<Error>,
 value: A,
}
