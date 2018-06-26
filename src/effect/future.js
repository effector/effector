//@flow

export class Future<Args, Done, Fail = Error> /*:: extends Promise<Done> */ {
 /*::+*/ args: Args
 promise: () => Promise<Done>
 done: () => Promise<{params: Args, result: Done}>
 fail: () => Promise<{params: Args, error: Fail}>
 cache: () => Done | void = () => undefined
 //prettier-ignore
 then: (
  & (() => Promise<Done>)
  & (<U>(
      onFulfill: (value: Done) => U
    ) => Promise<U>)
 )
 constructor(args: Args) {
  /*::
  function sup(rs: (_: Done) => void, rj: (_: Fail) => void): void {}
  super(sup)
  */
  this.args = args
 }
}
