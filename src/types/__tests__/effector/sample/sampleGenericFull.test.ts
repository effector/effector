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
      no errors
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
      no errors
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
      Unmarked error at test line 51 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 57 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 68 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 74 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
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
      Unmarked error at test line 48 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 54 'sample({'
      Argument of type '[{ clock: EventAsReturnType<R | null>; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
      Unmarked error at test line 65 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: EventCallable<{ data: R; }>; }]' is not assignable to parameter of type '[[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }] extends [EventCallable<{ data: R; }>] ? [config: ...] : ...'.
      Unmarked error at test line 71 'sample({'
      Argument of type '[{ clock: [EventAsReturnType<R | null>]; filter: (data: R | null) => boolean; fn: (data: R | null) => { data: R | null; }; target: [EventCallable<{ data: R; }>]; }]' is not assignable to parameter of type '[readonly [[{ data: R | null; }] extends [Readonly<{ data: R; }>] ? EventCallable<{ data: R; }> : { data: R | null; }]] extends [readonly [EventCallable<{ data: R; }>]] ? [config: ...] : ...'.
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
