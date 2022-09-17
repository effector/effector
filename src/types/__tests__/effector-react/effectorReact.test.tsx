/* eslint-disable no-unused-vars */
import * as React from 'react'
import {createStore, createEvent, createEffect} from 'effector'
import {
  createComponent,
  createGate,
  useGate,
  useEvent,
  useUnit,
} from 'effector-react'

const typecheck = '{global}'

test('createComponent', () => {
  const ImplicitObject = createComponent(
    {
      a: createStore<number>(0),
      b: createStore<number>(1),
    },
    (props, state) => {
      const createComponent_implicitObject_check1: number = state.a
      const createComponent_implicitObject_check2: number = state.b
      return null
    },
  )
  const Store = createComponent(createStore(0), (props, state) => {
    const createComponent_createStore_check1: number = state
    return null
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('createGate', () => {
  const Foo = createGate<number>('foo')
  const Bar = createGate<{a: number}>('bar')
  const Baz = createGate<number | null>('baz', null)

  const Component = () => {
    useGate(Foo, 1)
    useGate(Bar, 1)
    useGate(Bar, {a: 1})
    useGate(Bar, {})

    useGate(Baz, null)
    useGate(Baz, 1)
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '1' is not assignable to parameter of type '{ a: number; } | undefined'.
    Argument of type '{}' is not assignable to parameter of type '{ a: number; }'.
      Property 'a' is missing in type '{}' but required in type '{ a: number; }'.
    "
  `)
})

test('useEvent of Event', () => {
  const runEvent: () => (payload: number) => number = () =>
    useEvent(createEvent<number>())
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useEvent of Event<void>', () => {
  const runEvent: () => () => void = () => useEvent(createEvent<void>())
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useEvent of Effect', () => {
  const runEffect: () => (payload: number) => Promise<string> = () =>
    useEvent(createEffect<number, string, Error>())
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useEvent of Effect<void, unknown, Error>', () => {
  const runEffect: () => () => Promise<unknown> = () =>
    useEvent(createEffect<void, unknown, Error>())
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useEvent of object', () => {
  const handlers: () => {
    foo: (payload: number) => number
    bar: (payload: number) => Promise<string>
  } = () =>
    useEvent({
      foo: createEvent<number>(),
      bar: createEffect<number, string, Error>(),
    })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useEvent of array', () => {
  const handlers: () => [
    (payload: number) => number,
    (payload: number) => Promise<string>,
  ] = () =>
    useEvent([createEvent<number>(), createEffect<number, string, Error>()])
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useUnit should support single units', () => {
  const a = createEvent<number>()
  const $b = createStore(0)
  const cFx = createEffect((p: number) => p.toString())

  const Comp = () => {
    const aEv: (p: number) => number = useUnit(a)
    const b: number = useUnit($b)
    const cEff: (p: number) => Promise<string> = useUnit(cFx)
  }

  expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
  `)
})
test('useUnit should support array shape', () => {
  const Comp = () => {
    const handlers: [
      number,
      (payload: number) => number,
      (payload: number) => Promise<string>,
    ] = useUnit([
      createStore(0),
      createEvent<number>(),
      createEffect<number, string, Error>(),
    ])
  }

  expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
  `)
})
test('useUnit should support object shape', () => {
  const Comp = () => {
    const handlers: {
      foo: (payload: number) => number
      bar: (payload: number) => Promise<string>
      baz: string
    } = useUnit({
      baz: createStore(''),
      foo: createEvent<number>(),
      bar: createEffect<number, string, Error>(),
    })
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('useUnit should not allow non-unit values', () => {
  const Comp = () => {
    const handlers: {
      foo: (payload: number) => number
      bar: (payload: number) => Promise<string>
      baz: string
      wrong: string
    } = useUnit({
      baz: createStore(''),
      foo: createEvent<number>(),
      bar: createEffect<number, string, Error>(),
      wrong: 'plain string',
    })
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'string' is not assignable to type 'Store<any> | Effect<any, any, any> | Event<any>'.
    "
  `)
})

test('useUnit should correctly resolve void events and effects in shape mode', () => {
  const event = createEvent<void>()
  const effect = createEffect(() => {})

  function x(callback: (e: unknown) => void | Promise<void>) {}

  const Comp = () => {
    const {runEvent} = useUnit({runEvent: event})
    const {runEffect} = useUnit({runEffect: effect})
    const [runEvent1] = useUnit([event])
    const [runEffect1] = useUnit([effect])

    x(runEvent)
    x(runEffect)
    x(runEvent1)
    x(runEffect1)
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useUnit should correctly resolve any type except void events and effects in shape mode', () => {
  const event = createEvent<boolean>()
  const effect = createEffect((_: boolean) => _)

  function x(callback: (e: boolean) => boolean | Promise<boolean>) {}

  const Comp = () => {
    const {runEvent} = useUnit({runEvent: event})
    const {runEffect} = useUnit({runEffect: effect})
    const [runEvent1] = useUnit([event])
    const [runEffect1] = useUnit([effect])

    x(runEvent)
    x(runEffect)
    x(runEvent1)
    x(runEffect1)
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('useUnit should not allow to call void events with arguments', () => {
  const event = createEvent()

  const Comp = () => {
    const {runEvent} = useUnit({runEvent: event})
    const [runEvent1] = useUnit([event])

    runEvent(1)
    runEvent1('')
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Expected 0 arguments, but got 1.
    Expected 0 arguments, but got 1.
    "
  `)
})

test('useUnit should not allow to call void effects with arguments', () => {
  const effect = createEffect(() => {})

  const Comp = () => {
    const {runEffect} = useUnit({runEffect: effect})
    const [runEffect1] = useUnit([effect])

    runEffect(1)
    runEffect1('')
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Expected 0 arguments, but got 1.
    Expected 0 arguments, but got 1.
    "
  `)
})

test('useUnit should not allow wrong types for events or effects with arguments', () => {
  const event = createEvent<number>()
  const effect = createEffect((_: string) => _)

  const constEvent = createEvent<42>()
  const constEffect = createEffect((_: 42) => _)

  const Comp = () => {
    const {runEvent} = useUnit({runEvent: event})
    const {runEffect} = useUnit({runEffect: effect})
    const [runEvent1] = useUnit([event])
    const [runEffect1] = useUnit([effect])
    const {runConstEvent} = useUnit({runConstEvent: constEvent})
    const {runConstEffect} = useUnit({runConstEffect: constEffect})

    runEvent('')
    runEffect(1)
    runEvent1('')
    runEffect1(1)
    runConstEvent(0)
    runConstEffect({})
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type 'string' is not assignable to parameter of type 'number'.
    Argument of type 'number' is not assignable to parameter of type 'string'.
    Argument of type 'string' is not assignable to parameter of type 'number'.
    Argument of type 'number' is not assignable to parameter of type 'string'.
    Argument of type '0' is not assignable to parameter of type '42'.
    Argument of type '{}' is not assignable to parameter of type '42'.
    "
  `)
})
