/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Store, Event} from 'effector'

const typecheck = '{global}'

type Either<L, R> = {type: 'left'; left: L} | {type: 'right'; right: R}

function isRight<L, R>(item: Either<L, R>): item is {type: 'right'; right: R} {
  return item.type === 'right'
}

describe('generic event as clock with fn', () => {
  test('event as return type + no infer (return from sample) (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: R | null}>()
      const evt = sample({
        clock: trigger,
        fn: data => (isRight(data) ? data.right : null),
      })
      sample({
        clock: evt,
        fn: data => ({data}),
      })
      sample({
        clock: evt,
        fn: data => ({data}),
        target: target,
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 7 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 9 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 11 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 13 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 20 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; fn: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>, { ...; } & { ...; }>'.
      "
    `)
  })
  test('event as return type (return from map) (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const evt = trigger.map(data => (isRight(data) ? data.right : null))
      const target = createEvent<{data: R | null}>()
      sample({
        clock: evt,
        fn: data => ({data}),
      })
      sample({
        clock: evt,
        fn: data => ({data}),
        target: target,
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 6 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 8 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 10 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 17 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; fn: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => { data: TypeOfClock<EventAsReturnType<R | null>[]>; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<EventAsReturnType<R | null>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>, { clock: EventAsReturnType<R | null>[]; ... 5 more ...; batch?: boolean | undefined; } & { ...; }>'.
      "
    `)
  })
  test('common event (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: Either<L, R>}>()
      sample({
        clock: trigger,
        fn: data => ({data}),
      })
      sample({
        clock: trigger,
        fn: data => ({data}),
        target: target,
      })
      sample({
        clock: [trigger],
        fn: data => ({data}),
      })
      sample({
        clock: [trigger],
        fn: data => ({data}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('callable event (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const evt = createEvent<Either<L, R>>()
      const target = createEvent<{data: Either<L, R>}>()
      sample({
        clock: evt,
        fn: data => ({data}),
      })
      sample({
        clock: evt,
        fn: data => ({data}),
        target: target,
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
      })
      sample({
        clock: [evt],
        fn: data => ({data}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('generic event as clock with fn and filter', () => {
  test('event as return type + no infer (return from sample) (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: R}>()
      const targetNil = createEvent<{data: R | null}>()
      const $filter = createStore(true)
      const evt = sample({
        clock: trigger,
        fn: data => (isRight(data) ? data.right : null),
      })
      {
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
      {
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 10 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 12 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 13 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 15 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 17 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 18 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 21 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>[]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 23 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 24 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 27 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 32 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 38 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 46 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 48 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 49 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 51 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 53 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 54 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 57 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R; }>[]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? ((clk: TypeOfClock<...>) => clk is NoInfer<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOfCl...'.
      Unmarked error at test line 59 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 60 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 63 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 68 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 74 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'NoInfer<EventAsReturnType<R | null>>[] extends Unit<any> | SourceRecord ? (NoInfer<EventAsReturnType<R | null>>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is NoInfer<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: Ty...'.
      Unmarked error at test line 82 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: BooleanConstructor; fn: (data: NoInfer<EventAsReturnType<R | null>> extends Units ? NonFalsy<...> : never) => { ...; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? [config: ...] : [message: ...]'.
      Unmarked error at test line 87 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: BooleanConstructor; fn: (data: NoInfer<EventAsReturnType<R | null>> extends Units ? NonFalsy<...> : never) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? (clk: NoInfer<...> extends Units ? NonFalsy<...> : never) => any : never) extends (arg?: any, clk?: any) =>...'.
      Unmarked error at test line 93 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: BooleanConstructor; fn: (data: NoInfer<EventAsReturnType<R | null>> extends Units ? NonFalsy<...> : never) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? (clk: NoInfer<...> extends Units ? NonFalsy<...> : never) => any : never) extends (arg?: any, clk?: any) =>...'.
      Unmarked error at test line 104 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: BooleanConstructor; fn: (data: NonFalsy<TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>>; }, \\"fnRet\\", EventCallable<{ data: R; }>, { ...; } & { ...; }>'.
      Unmarked error at test line 110 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: BooleanConstructor; fn: (data: NonFalsy<TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>>; }, \\"fnRet\\", EventCallable<{ data: R; }>[], { ...; } & { ...; }>'.
      Unmarked error at test line 118 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? [config: ...] : [message: ...]'.
      Unmarked error at test line 123 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? (clk: TypeOfClock<...>) => any : never) extends (NoInfer<...> extends Units ? (clk: TypeOfClock<...>) => an...'.
      Unmarked error at test line 129 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? [message: { error: \\"either target, clock or source should exists\\"; }] : NoInfer<EventAsReturnType<R | null>> extends Units ? (NoInfer<...> extends Units ? (clk: TypeOfClock<...>) => any : never) extends (NoInfer<...> extends Units ? (clk: TypeOfClock<...>) => an...'.
      Unmarked error at test line 140 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: StoreWritable<boolean>; fn: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>, { ...; } & { ...; }>'.
      Unmarked error at test line 146 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>[]; filter: StoreWritable<boolean>; fn: (data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<NoInfer<EventAsReturnType<R | null>>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>[], { ...; } & { ...; }>'.
      "
    `)
  })

  test('event as return type (return from map) (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: R}>()
      const targetNil = createEvent<{data: R | null}>()
      const $filter = createStore(true)
      const evt = trigger.map(data => (isRight(data) ? data.right : null))
      {
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
      {
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 7 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 9 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 10 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 12 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 14 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 15 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 18 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>[]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 20 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 21 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 24 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 29 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 35 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => true; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 43 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 45 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 46 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 48 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 50 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 51 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 54 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R; }>[]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? ((clk: TypeOfClock<...>) => clk is EventAsReturnType<...> extends Units ? TypeOfClock<...> : never) | ((clk: TypeOf...'.
      Unmarked error at test line 56 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 57 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 60 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 65 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 71 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => boolean; fn: (data: TypeOfClock<...>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'EventAsReturnType<R | null>[] extends Unit<any> | SourceRecord ? (EventAsReturnType<R | null>[] extends Unit<...> | SourceRecord ? ((src: any, clk: TypeOfClock<...>) => src is EventAsReturnType<...>[] extends Unit<...> | SourceRecord ? any : never) | ((src: any, clk: TypeOfClock<...>) => boolean) : ((clk: TypeOfCloc...'.
      Unmarked error at test line 79 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: BooleanConstructor; fn: (data: EventAsReturnType<R | null> extends Units ? NonFalsy<...> : never) => { ...; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? [config: ...] : [message: ...]'.
      Unmarked error at test line 84 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: BooleanConstructor; fn: (data: EventAsReturnType<R | null> extends Units ? NonFalsy<...> : never) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? (clk: EventAsReturnType<...> extends Units ? NonFalsy<...> : never) => any : never) extends (arg?: any, clk?: any) ...'.
      Unmarked error at test line 90 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: BooleanConstructor; fn: (data: EventAsReturnType<R | null> extends Units ? NonFalsy<...> : never) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? (clk: EventAsReturnType<...> extends Units ? NonFalsy<...> : never) => any : never) extends (arg?: any, clk?: any) ...'.
      Unmarked error at test line 101 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<TypeOfClock<EventAsReturnType<R | null>[]>>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<TypeOfClock<EventAsReturnType<R | null>[]>>; }, \\"fnRet\\", EventCallable<{ data: R; }>, { ...; } & { ...; }>'.
      Unmarked error at test line 107 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<TypeOfClock<EventAsReturnType<R | null>[]>>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<TypeOfClock<EventAsReturnType<R | null>[]>>; }, \\"fnRet\\", EventCallable<{ data: R; }>[], { ...; } & { ...; }>'.
      Unmarked error at test line 115 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? [config: ...] : [message: ...]'.
      Unmarked error at test line 120 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? (clk: TypeOfClock<...>) => any : never) extends (EventAsReturnType<...> extends Units ? (clk: TypeOfClock<...>) => ...'.
      Unmarked error at test line 126 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R | null; }>[]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? [message: { error: \\"either target, clock or source should exists\\"; }] : EventAsReturnType<R | null> extends Units ? (EventAsReturnType<...> extends Units ? (clk: TypeOfClock<...>) => any : never) extends (EventAsReturnType<...> extends Units ? (clk: TypeOfClock<...>) => ...'.
      Unmarked error at test line 137 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: StoreWritable<boolean>; fn: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<EventAsReturnType<R | null>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>, { clock: EventAsReturnType<R | null>[]; ... 5 more ...; batch?: boolean | undefined; } & { ...; }>'.
      Unmarked error at test line 143 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>[]; filter: StoreWritable<boolean>; fn: (data: TypeOfClock<EventAsReturnType<R | null>[]>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: TypeOfClock<EventAsReturnType<R | null>[]>; }, \\"fnRet\\", EventCallable<{ data: R | null; }>[], { clock: EventAsReturnType<R | null>[]; ... 5 more ...; batch?: boolean | undefined; } & { ...; }>'.
      "
    `)
  })

  test('common event (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: R}>()
      const targetNil = createEvent<{data: R | null}>()
      const $filter = createStore(true)
      const evt = trigger.map(data =>
        isRight(data) ? data.right : null,
      ) as Event<R | null>
      {
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
      {
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 26 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<......' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 31 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<......' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 37 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<......' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 50 'sample({'
      Argument of type '[{ clock: Event<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type 'TargetOrError<{ data: R | null; }, \\"fnRet\\", EventCallable<{ data: R; }>, { clock: Event<R | null>; source?: undefined; filter?: ((data: R | null) => boolean) | undefined; fn?: ((data: R | null) => { ...; }) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...;...'.
      Unmarked error at test line 56 'sample({'
      Argument of type '[{ clock: Event<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: R | null; }, \\"fnRet\\", EventCallable<{ data: R; }>[], { clock: Event<R | null>; source?: undefined; filter?: ((data: R | null) => boolean) | undefined; fn?: ((data: R | null) => { ...; }) | undefined; target: EventCallable<...>[]; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...'.
      Unmarked error at test line 62 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 67 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 73 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> extends \\"never\\" ? any : UnitValue<...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Unit<...> | SourceRec...'.
      Unmarked error at test line 103 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>) => { ...; }; target: EventCallable<......' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>; }, \\"fnRet\\", EventCallable<...>, { ...; } & { ...; }>'.
      Unmarked error at test line 109 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>) => { ...; }; target: EventCallable<......' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>; }, \\"fnRet\\", EventCallable<...>[], { ...; } & { ...; }>'.
      Unmarked error at test line 139 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: StoreWritable<boolean>; fn: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'TargetOrError<{ data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>; }, \\"fnRet\\", EventCallable<...>, { ...; } & { ...; }>'.
      Unmarked error at test line 145 'sample({'
      Argument of type '[{ clock: Event<R | null>[]; filter: StoreWritable<boolean>; fn: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => { ...; }; target: EventCallable<...>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: WhichType<UnitValue<ClockValueOf<{ [K in keyof Event<R | null>[] as WhichType<UnitValue<Event<R | null>[][K]>> extends \\"any\\" ? never : K]: Event<R | null>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>; }, \\"fnRet\\", EventCallable<...>[], { ...; } & { ...; }>'.
      "
    `)
  })

  test('callable event (should pass)', () => {
    function whenSuccess<L, R>(trigger: Event<Either<L, R>>) {
      const target = createEvent<{data: R}>()
      const targetNil = createEvent<{data: R | null}>()
      const $filter = createStore(true)
      const evt = createEvent<R | null>()
      {
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: data => true,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
      {
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: data => !!data,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: evt,
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: target,
        })
        sample({
          clock: [evt],
          filter: Boolean,
          fn: data => ({data}),
          target: [target],
        })
      }
      {
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: evt,
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: targetNil,
        })
        sample({
          clock: [evt],
          filter: $filter,
          fn: data => ({data}),
          target: [targetNil],
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 24 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> exten...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 29 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> exten...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 35 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => true; fn: (data: WhichType<...> exten...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 48 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type 'TargetOrError<{ data: R | null; }, \\"fnRet\\", EventCallable<{ data: R; }>, { clock: EventCallable<R | null>; source?: undefined; filter?: ((data: R | null) => boolean) | undefined; fn?: ((data: R | null) => { ...; }) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } ...'.
      Unmarked error at test line 54 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>[]; }]' is not assignable to parameter of type 'TargetOrError<{ data: R | null; }, \\"fnRet\\", EventCallable<{ data: R; }>[], { clock: EventCallable<R | null>; source?: undefined; filter?: ((data: R | null) => boolean) | undefined; fn?: ((data: R | null) => { ...; }) | undefined; target: EventCallable<...>[]; greedy?: boolean | undefined; batch?: boolean | undefined...'.
      Unmarked error at test line 60 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> ex...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 65 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> ex...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 71 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => boolean; fn: (data: WhichType<...> ex...' is not assignable to parameter of type 'unknown extends WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> ? WhichType<...> extends WhichType<...> ? [message: ...] : WhichType<...> extends Units ? (WhichType<...> extends Un...'.
      Unmarked error at test line 101 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>) => { ....' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>; }, \\"fnRet\\", EventCallable<...>, { ...; } & { ...; }>'.
      Unmarked error at test line 107 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: BooleanConstructor; fn: (data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>) => { ....' is not assignable to parameter of type 'TargetOrError<{ data: NonFalsy<WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>>; }, \\"fnRet\\", EventCallable<...>[], { ...; } & { ...; }>'.
      Unmarked error at test line 137 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: StoreWritable<boolean>; fn: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => { ...; };...' is not assignable to parameter of type 'TargetOrError<{ data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>; }, \\"fnRet\\", EventCallable<...>, { ...; } & { ...; }>'.
      Unmarked error at test line 143 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>[]; filter: StoreWritable<boolean>; fn: (data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>) => { ...; };...' is not assignable to parameter of type 'TargetOrError<{ data: WhichType<UnitValue<ClockValueOf<{ [K in keyof EventCallable<R | null>[] as WhichType<UnitValue<EventCallable<R | null>[][K]>> extends \\"any\\" ? never : K]: EventCallable<...>[][K]; }>>> extends \\"never\\" ? any : UnitValue<...>; }, \\"fnRet\\", EventCallable<...>[], { ...; } & { ...; }>'.
      "
    `)
  })
})

describe('generic store as source', () => {
  test('common store (should pass)', () => {
    function whenSuccess<L, R>(paramStore: Store<Either<L, R>>) {
      const target = createEvent<{data: Either<L, R>}>()
      sample({
        source: paramStore,
        fn: data => ({data}),
      })
      sample({
        source: paramStore,
        fn: data => ({data}),
        target: target,
      })
      sample({
        source: {a: paramStore},
        fn: ({a}) => ({a}),
      })
      sample({
        source: {a: paramStore},
        fn: ({a}) => ({data: a}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('writable store (should pass)', () => {
    function whenSuccess<L, R>(paramStore: Store<Either<L, R>>) {
      const $store = createStore<Either<L, R>>(null as unknown as Either<L, R>)
      const target = createEvent<{data: Either<L, R>}>()
      sample({
        source: $store,
        fn: data => ({data}),
      })
      sample({
        source: $store,
        fn: data => ({data}),
        target: target,
      })
      sample({
        source: {a: $store},
        fn: ({a}) => ({data: a}),
      })
      sample({
        source: {a: $store},
        fn: ({a}) => ({data: a}),
        target: target,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
