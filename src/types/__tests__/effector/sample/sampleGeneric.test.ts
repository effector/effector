/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  StoreWritable,
  EventCallable,
} from 'effector'

const typecheck = '{global}'

test('generic edge cases (should pass)', () => {
  function generic1<A, B>(target: StoreWritable<A>, clock: EventCallable<B>) {
    {
      sample({
        source: target,
        clock,
        target,
      })
      const result = sample({
        source: target,
        clock,
      })
    }
    {
      const result: Store<A> = sample({
        source: target,
        clock,
        fn: (source, clock) => source,
        target,
      })
    }
    {
      const result: Event<B> = sample({
        source: target,
        clock,
        fn: (source, clock) => clock,
        target: clock,
      })
    }
    {
      sample({
        clock,
        source: target,
        filter: Boolean,
        target,
      })
      const result = sample({
        clock,
        source: target,
        filter: Boolean,
      })
    }
    {
      sample({
        clock,
        source: target,
        filter: Boolean,
        fn: (source, clock) => source,
        target,
      })
      const result = sample({
        clock,
        source: target,
        filter: Boolean,
        fn: (source, clock) => source,
      })
    }
    {
      sample({
        clock,
        source: target,
        filter: (source, clock) => true,
        fn: (source, clock) => source,
        target,
      })
      const result = sample({
        clock,
        source: target,
        filter: (source, clock) => true,
        fn: (source, clock) => source,
      })
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('generic edge cases (should fail)', () => {
  function generic1<A, B>(target: StoreWritable<A>, clock: EventCallable<B>) {
    {
      //@ts-expect-error
      sample({
        source: target,
        clock,
        target: clock,
      })
    }
    {
      //@ts-expect-error
      sample({
        source: target,
        clock,
        fn: (source, clock) => source,
        target: clock,
      })
    }
    {
      //@ts-expect-error
      sample({
        source: target,
        clock,
        fn: (source, clock) => clock,
        target,
      })
    }
    {
      //@ts-expect-error
      const result = sample({
        clock,
        source: target,
        filter: Boolean,
        target: clock,
      })
    }
    {
      //@ts-expect-error
      const result = sample({
        clock,
        source: target,
        filter: Boolean,
        fn: (source, clock) => clock,
        target,
      })
    }
    {
      //@ts-expect-error
      const result = sample({
        clock,
        source: target,
        filter: (source, clock) => true,
        fn: (source, clock) => clock,
        target,
      })
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<A, \\"src\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; target: EventCallable<B>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, \\"noFn\\", StoreWritable<...>>'.
    Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; fn: (source: A, clock: B) => A; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<A, \\"fnRet\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; fn: (source: A, clock: B) => A; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, (source: A, clock: B) => A, \\"noSrc\\">'.
    Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; fn: (source: A, clock: B) => B; target: StoreWritable<A>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; fn: (source: A, clock: B) => B; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, (source: A, clock: B) => B, \\"noSrc\\">'.
    Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<NonFalsy<A>, \\"src\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, \\"noFn\\", StoreWritable<...>>'.
    Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; fn: (source: NonFalsy<A>, clock: B) => B; target: StoreWritable<...>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: BooleanConstructor | undefined; fn?: ((source: NonFalsy<...>, clock: B) => B) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, (source: NonFalsy<....'.
    Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: (source: A, clock: B) => true; fn: (source: A, clock: B) => B; target: StoreWritable<...>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: ((source: A, clock: B) => true) | undefined; fn?: ((source: A, clock: B) => B) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, (source: A, clock:...'.
    "
  `)
})
describe('generic with either type', () => {
  type Either<L, R> = {type: 'left'; left: L} | {type: 'right'; right: R}
  function isRight<L, R>(
    item: Either<L, R>,
  ): item is {type: 'right'; right: R} {
    return item.type === 'right'
  }
  test('return type (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const result = sample({
        clock: trigger,
        fn: data => (isRight(data) ? data.right : null),
      })
      sample({
        clock: result,
        fn: data => ({data}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 6 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 8 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      "
    `)
  })
  test('generic matching (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const onSuccess = createEvent<R | null>()
      sample({
        clock: trigger,
        fn: data => (isRight(data) ? data.right : null),
        target: onSuccess,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('generic matching (should fail)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const onFail = createEvent<L | null>()
      sample({
        clock: trigger,
        fn: data => (isRight(data) ? data.right : null),
        //@ts-expect-error
        target: onFail,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 3 'sample({'
      Argument of type '[{ clock: Event<Either<L, R>>; fn: (data: Either<L, R>) => R | null; target: EventCallable<L | null>; }]' is not assignable to parameter of type 'TargetOrError<R | null, \\"fnRet\\", EventCallable<L | null>, { clock: Event<Either<L, R>>; source?: undefined; filter?: undefined; fn: (data: Either<L, R>) => R | null; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, (data: Either<...>) => R | null, \\"noSrc\\">'.
      lack of expected error at test line 7 'target: onFail,'
      "
    `)
  })
})

describe('generic union', () => {
  test('return type (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<L | R>) {
      const result = sample({
        clock: trigger,
        filter: (data): data is R => true,
      })
      sample({
        clock: result,
        fn: data => ({data}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 6 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R>>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfClock<...>) => b...'.
      Unmarked error at test line 8 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      "
    `)
  })
  test('generic matching (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<L | R>) {
      const onSuccess = createEvent<R>()
      sample({
        clock: trigger,
        filter: (data): data is R => true,
        target: onSuccess,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('generic matching (should fail)', () => {
    function whenSuccess<L, R>(trigger: Event<L | R>) {
      const onFail = createEvent<L>()
      sample({
        clock: trigger,
        filter: (data): data is R => true,
        //@ts-expect-error
        target: onFail,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 3 'sample({'
      Argument of type '[{ clock: Event<L | R>; filter: (data: L | R) => data is R; target: EventCallable<L>; }]' is not assignable to parameter of type 'TargetOrError<R extends L | R ? R : never, \\"clk\\", EventCallable<L>, { clock: Event<L | R>; source?: undefined; filter: (data: L | R) => data is R; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, \\"noFn\\", \\"noSrc\\">'.
      lack of expected error at test line 7 'target: onFail,'
      "
    `)
  })
  /**
   * this test probably should fail
   * as constraints in function not match factory constraints
   * but will be nice if this will work too
   **/
  test('non inline filter (should fail)', () => {
    function isRight<L, R>(item: L | R): item is R {
      return true
    }
    function whenSuccess<L, R>(trigger: Event<L | R>) {
      const onSuccess = createEvent<R>()
      sample({
        clock: trigger,
        //@ts-expect-error
        filter: isRight,
        target: onSuccess,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 6 'sample({'
      Argument of type '[{ clock: Event<L | R>; filter: <L, R>(item: L | R) => item is R; target: EventCallable<R>; }]' is not assignable to parameter of type 'TargetOrError<unknown extends L | R ? L | R : never, \\"clk\\", EventCallable<R>, { clock: Event<L | R>; source?: undefined; filter: <L, R>(item: L | R) => item is R; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }, \\"noFn\\", \\"noSrc\\">'.
      lack of expected error at test line 9 'filter: isRight,'
      "
    `)
  })
})

describe('generic type match', () => {
  test('with extends (should pass)', () => {
    function foo<T extends Record<string, any>>() {
      const trigger = createEvent<T>()
      const $target = createStore<T>(null as any)
      sample({
        clock: trigger,
        target: $target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('baisc generic (should pass)', () => {
    function foo<T>() {
      const trigger = createEvent<T>()
      const $target = createStore<T>(null as any)
      sample({
        clock: trigger,
        target: $target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
