/* eslint-disable no-unused-vars */
import {
  perform,
  createEvent,
  createStore,
  createEffect,
  EventCallable,
  UnitTargetable,
} from 'effector'
const typecheck = '{global}'

test('infers target, source, payload and update shapes', () => {
  const check = () => {
    const a = createStore(0)
    const text = createStore('')
    const save = createEffect((n: number) => String(n))
    const action: EventCallable<number> = perform({
      source: {$text: text},
      update: {a},
      target: {save},
      action: (set, value, n: number) => {
        const s: string = value.text
        const v: number = value.a
        const result: number = set.a(v + n)
        set.save(result)
        set.a.reinit()
      },
    })
    const inc: EventCallable<void> = perform({
      update: a,
      action: (set, value) => set(value + 1),
    })
    const source: EventCallable<string> = perform({
      source: a,
      target: text,
      action: (set, n, payload: string) => set(payload + n),
    })
    const target: EventCallable<number> = perform({
      target: a,
      action: (set, n: number) => set(n),
    })
    const result: void = perform({
      clock: [createEvent<number>(), createEvent<string>()],
      update: a,
      action: (set, value, payload) => {
        const n: string | number = payload
        set(value)
      },
    })
    perform({
      clock: createEvent<number>(),
      target: save,
      action: (set, n) => {
        const v: number = set(n)
      },
    })
    perform({
      clock: createEvent<number>(),
      source: a,
      target: save,
      action: (set, value, n) => set(value + n),
    })
    perform({
      clock: createEvent<number>(),
      update: {a},
      target: {save},
      action: (set, value, n) => {
        set.a(value.a + n)
        set.save(n)
      },
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('rejects invalid targets, sources, and payloads', () => {
  const check = () => {
    const a = createStore(0)
    // @ts-expect-error derived stores are not targets
    perform({target: a.map(x => x), action() {}})
    // @ts-expect-error events are not update stores
    perform({update: createEvent(), action() {}})
    // @ts-expect-error source must contain stores
    perform({source: {bad: createEvent()}, target: a, action() {}})
    // @ts-expect-error single update cannot be merged with a shape
    perform({update: a, target: {a}, action() {}})
    perform({
      update: a,
      action: (set, value) => {
        // @ts-expect-error no reducer setters
        set((n: number) => n + 1)
        // @ts-expect-error wrong value
        set('text')
      },
    })
    perform({
      target: createEffect((n: number) => String(n)),
      action: set => {
        // @ts-expect-error effect setters return payload, not a promise
        const promise: Promise<string> = set(1)
      },
    })
    const action = perform({target: a, action: (set, n: number) => set(n)})
    // @ts-expect-error payload inferred from callback
    action('text')
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<number>' is not assignable to type 'Record<string, UnitTargetable<any>> | UnitTargetable<any>'.
          Type 'Store<number>' is not assignable to type 'Record<string, UnitTargetable<any>>'.
            Index signature for type 'string' is missing in type 'Store<number>'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<void>' is not assignable to type 'undefined'.
    No overload matches this call.
      The last overload gave the following error.
        Type '{ bad: EventCallable<void>; }' is not assignable to type 'undefined'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'StoreWritable<number>' is not assignable to type 'undefined'.
    Argument of type '(n: number) => number' is not assignable to parameter of type 'number'.
    Argument of type 'string' is not assignable to parameter of type 'number'.
    This expression is not callable.
      Not all constituents of type '((value: any) => any) | { [x: string]: (value: any) => any; }' are callable.
        Type '{ [x: string]: (value: any) => any; }' has no call signatures.
    No overload matches this call.
      The last overload gave the following error.
        The 'this' context of type 'void' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
    "
  `)
})

test('contextual payload inference and function values', () => {
  const check = () => {
    const accept = (_: {onSubmit: UnitTargetable<string | number>}) => {}
    accept({
      onSubmit: perform({
        target: {},
        action: (_, payload) => {
          const value: string | number = payload
          // @ts-expect-error contextual inference is not any
          const bad: boolean = payload
        },
      }),
    })
    const store = createStore<() => number>(() => 1)
    perform({
      target: store,
      action: set => {
        const value: () => number = set(() => 2)
      },
    })
    perform({
      update: {$value: createStore(1)},
      action: (set, {value}) => set.$value(value + 1),
    })
    // @ts-expect-error invalid clock
    perform({clock: 1, target: {}, action() {}})
    // @ts-expect-error derived event is not targetable
    perform({target: createEvent<number>().map(n => n), action() {}})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'string | number' is not assignable to type 'boolean'.
      Type 'string' is not assignable to type 'boolean'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'number' is not assignable to type 'undefined'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Record<string, UnitTargetable<any>> | UnitTargetable<any>'.
          Type 'Event<number>' is not assignable to type 'Record<string, UnitTargetable<any>>'.
            Index signature for type 'string' is missing in type 'Event<number>'.
    "
  `)
})

test('action is the required callback field', () => {
  const check = () => {
    // @ts-expect-error fn is not an alias for action
    perform({target: {}, fn() {}})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Object literal may only specify known properties, and 'fn' does not exist in type 'PerformOptions & { target: Record<string, UnitTargetable<any>> | UnitTargetable<any>; source?: undefined; update?: undefined; clock?: undefined; action: (target: ((value: any) => any) | { ...; }, payload: void) => void; }'.
    "
  `)
})

test('update keys cannot shadow explicit dependencies', () => {
  const check = () => {
    const a = createStore(0)
    // @ts-expect-error duplicate update/source key
    perform({update: {a}, source: {a}, action() {}})
    // @ts-expect-error duplicate update/target key
    perform({update: {a}, target: {a}, action() {}})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type '{ a: StoreWritable<number>; }' is not assignable to type 'undefined'.
    No overload matches this call.
      The last overload gave the following error.
        Type '{ a: StoreWritable<number>; }' is not assignable to type 'undefined'.
    No overload matches this call.
      The last overload gave the following error.
        Type '{ a: StoreWritable<number>; }' is not assignable to type 'undefined'.
    "
  `)
})
