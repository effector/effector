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
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 9 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 11 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : ...'.
      Unmarked error at test line 13 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
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
      Argument of type '[{ clock: EventAsReturnType<R | null>; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(EventAsReturnType<R | null> extends Units ? ((clk: TypeOfClock<EventAsReturnType<R | null>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 6 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 8 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; fn: (data: unknown) => { data: unknown; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '[[{ data: unknown; }] extends [Readonly<{ data: R | null; }>] ? EventCallable<{ data: R | null; }> : { data: unknown; }] extends [EventCallable<{ data: R | null; }>] ? [config: ...] : ...'.
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
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 12 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 13 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 15 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: R | null) => true; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : ...'.
      Unmarked error at test line 18 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 21 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: R | null) => true; fn: (data: any) => { data: any; }; target: [EventCallable<{ data: R | null; }>]; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? [config: ...] : ...'.
      Unmarked error at test line 24 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 27 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true; fn: (data: UnitValue<...>) => { ...; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true) extends ... ? ... : [config: ...] : ...'.
      Unmarked error at test line 32 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true; fn: (data: UnitValue<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 38 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true; fn: (data: UnitValue<...>) => { ...; }; target: [...]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => true) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 46 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 48 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 49 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 51 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: R | null) => boolean; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : ...'.
      Unmarked error at test line 54 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 57 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: (data: R | null) => boolean; fn: (data: any) => { data: any; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? ((clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? [config: ...] : ...'.
      Unmarked error at test line 60 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 63 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean) extends ... ? ... : [config: ...] : ...'.
      Unmarked error at test line 68 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 74 'sample({'
      Argument of type '[{ clock: [NoInfer<EventAsReturnType<R | null>>]; filter: (data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; target: [...]; }]' is not assignable to parameter of type 'unknown extends NoInfer<EventAsReturnType<R | null>> ? ((data: UnitValue<NoInfer<EventAsReturnType<R | null>>>) => boolean) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 87 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: BooleanConstructor; fn: (data: NoInfer<EventAsReturnType<R | null>> extends Units ? NonNullable<...> : never) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? (clk: NoInfer<EventAsReturnType<R | null>> extends Units ? NonNullable<...> : never) => any : never) extends (arg?: any, clk?: any) => any ? ... : never'.
      Unmarked error at test line 93 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: BooleanConstructor; fn: (data: NoInfer<EventAsReturnType<R | null>> extends Units ? NonNullable<...> : never) => { ...; }; target: [...]; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? (clk: NoInfer<EventAsReturnType<R | null>> extends Units ? NonNullable<...> : never) => any : never) extends (arg?: any, clk?: any) => any ? [config: ...] : never'.
      Unmarked error at test line 121 'fn: data => ({data}),'
      Type '(data: R | null) => { data: R | null; }' is not assignable to type 'NoInfer<EventAsReturnType<R | null>> extends Units ? (clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => any : never'.
      Unmarked error at test line 123 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: StoreWritable<boolean>; fn: (data: any) => { data: any; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? (clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => any : never) extends ... ? ... : [error: ...]'.
      Unmarked error at test line 126 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 129 'sample({'
      Argument of type '[{ clock: NoInfer<EventAsReturnType<R | null>>; filter: StoreWritable<boolean>; fn: (data: R | null) => { data: R | null; }; target: [...]; }]' is not assignable to parameter of type '(NoInfer<EventAsReturnType<R | null>> extends Units ? (clk: TypeOfClock<NoInfer<EventAsReturnType<R | null>>>) => any : never) extends ... ? [config: ...] : [error: ...]'.
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
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(EventAsReturnType<R | null> extends Units ? ((clk: TypeOfClock<EventAsReturnType<R | null>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 9 'filter: data => true,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 10 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 12 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: unknown) => true; fn: (data: unknown) => { data: unknown; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '[[{ data: unknown; }] extends [Readonly<{ data: R | null; }>] ? EventCallable<{ data: R | null; }> : { data: unknown; }] extends [EventCallable<{ data: R | null; }>] ? [config: ...] : ...'.
      Unmarked error at test line 18 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: unknown) => true; fn: (data: unknown) => { data: unknown; }; target: [EventCallable<{ data: R | null; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: unknown; }] extends [Readonly<{ data: R | null; }>] ? EventCallable<{ data: R | null; }> : { data: unknown; }]] extends [readonly [EventCallable<{ data: R | null; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 24 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => true; fn: (data: UnitValue<EventAsReturnType<...>>) => { ...; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => true) extends ... ? ... : [config: ...] : ...'.
      Unmarked error at test line 29 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => true; fn: (data: UnitValue<EventAsReturnType<...>>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => true) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 35 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => true; fn: (data: UnitValue<EventAsReturnType<...>>) => { ...; }; target: [...]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => true) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 43 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: any) => boolean; fn: (data: any) => { data: any; }; }]' is not assignable to parameter of type '(EventAsReturnType<R | null> extends Units ? ((clk: TypeOfClock<EventAsReturnType<R | null>>) => clk is ...) | ((clk: TypeOfClock<...>) => boolean) : never) extends ... ? ... : [config: ...]'.
      Unmarked error at test line 45 'filter: data => !!data,'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 46 'fn: data => ({data}),'
      Parameter 'data' implicitly has an 'any' type.
      Unmarked error at test line 48 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: unknown) => boolean; fn: (data: unknown) => { data: unknown; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: unknown; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: unknown; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 54 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: unknown) => boolean; fn: (data: unknown) => { data: unknown; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: unknown; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: unknown; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 60 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => boolean) extends ... ? ... : [config: ...] : ...'.
      Unmarked error at test line 65 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; target: EventCallable<...>; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => boolean) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 71 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: UnitValue<EventAsReturnType<R | null>>) => boolean; fn: (data: UnitValue<...>) => { ...; }; target: [...]; }]' is not assignable to parameter of type 'unknown extends EventAsReturnType<R | null> ? ((data: UnitValue<EventAsReturnType<R | null>>) => boolean) extends ... ? [config: ...] : ... : ...'.
      Unmarked error at test line 84 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: BooleanConstructor; fn: (data: {}) => { data: {}; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: {}; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: {}; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 90 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: BooleanConstructor; fn: (data: {}) => { data: {}; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: {}; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: {}; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 118 'fn: data => ({data}),'
      Type '(data: R | null) => { data: R | null; }' is not assignable to type 'EventAsReturnType<R | null> extends Units ? (clk: TypeOfClock<EventAsReturnType<R | null>>) => any : never'.
      Unmarked error at test line 120 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: StoreWritable<boolean>; fn: (data: unknown) => { data: unknown; }; target: EventCallable<{ data: R | null; }>; }]' is not assignable to parameter of type '[[{ data: unknown; }] extends [Readonly<{ data: R | null; }>] ? EventCallable<{ data: R | null; }> : { data: unknown; }] extends [EventCallable<{ data: R | null; }>] ? [config: ...] : ...'.
      Unmarked error at test line 126 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: StoreWritable<boolean>; fn: (data: unknown) => { data: unknown; }; target: [EventCallable<{ data: R | null; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: unknown; }] extends [Readonly<{ data: R | null; }>] ? EventCallable<{ data: R | null; }> : { data: unknown; }]] extends [readonly [EventCallable<{ data: R | null; }>]] ? [config: ...] : ...'.
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
      Unmarked error at test line 50 'sample({'
      Argument of type '[{ clock: Event<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 56 'sample({'
      Argument of type '[{ clock: Event<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 67 'sample({'
      Argument of type '[{ clock: [Event<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 73 'sample({'
      Argument of type '[{ clock: [Event<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
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
      Unmarked error at test line 48 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 54 'sample({'
      Argument of type '[{ clock: EventCallable<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 65 'sample({'
      Argument of type '[{ clock: [EventCallable<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 71 'sample({'
      Argument of type '[{ clock: [EventCallable<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
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
