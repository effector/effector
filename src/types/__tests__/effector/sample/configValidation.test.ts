/* eslint-disable no-unused-vars */
import {createEvent, createStore, sample} from 'effector'

const typecheck = '{global}'

describe('fn', () => {
  test('fn is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type '() => any'.
      "
    `)
  })
  test('fn is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      Object literal may only specify known properties, and 'a' does not exist in type '() => any'.
      "
    `)
  })
})

describe('filter', () => {
  test('filter is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      "
    `)
  })
  test('filter is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Store<boolean> | (() => boolean)'.
      "
    `)
  })
})

describe('target', () => {
  test('target is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
  test('target is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
        fn: () => {},
        filter: Boolean,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
        fn: () => {},
        filter: Boolean,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        target: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
})

describe('clock', () => {
  test('clock is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
        fn: () => {},
      })
      sample({
        fn: () => {},
        //@ts-expect-error
        clock: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        clock: null,
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
        filter: () => true,
      })
      sample({
        filter: () => true,
        //@ts-expect-error
        clock: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
  test('clock is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
        fn: () => {},
      })
      sample({
        fn: () => {},
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
        filter: () => true,
      })
      sample({
        filter: () => true,
        //@ts-expect-error
        clock: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
})

describe('source', () => {
  test('source is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        filter: Boolean,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        fn: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        target: evt,
        //@ts-expect-error
        source: null,
        fn: () => {},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      "
    `)
  })
  test('source is function', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        filter: Boolean,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        fn: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        target: evt,
        //@ts-expect-error
        source: () => {},
        fn: () => {},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type '() => void' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      "
    `)
  })
})

describe('multiple errors', () => {
  test('source and clock', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        source: null,
        //@ts-expect-error
        clock: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
  test('source and target', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
  test('clock and target', () => {
    const evt = createEvent()
    function factory() {
      sample({
        source: evt,
        //@ts-expect-error
        clock: null,
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      "
    `)
  })
})

describe('config metadata', () => {
  test('valid metadata', () => {
    const clock = createEvent<number>()
    const target = createEvent<number>()

    sample({
      clock,
      target,
      name: 'named sample',
      greedy: false,
      batch: true,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('invalid metadata and unknown fields', () => {
    const clock = createEvent<number>()
    const target = createEvent<number>()

    sample({
      clock,
      target,
      //@ts-expect-error
      name: 1,
      //@ts-expect-error
      greedy: 'yes',
      //@ts-expect-error
      batch: 1,
      //@ts-expect-error
      clocks: clock,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'number' is not assignable to type 'never'.
      Type 'string' is not assignable to type 'never'.
      Type 'number' is not assignable to type 'never'.
      Type 'EventCallable<number>' is not assignable to type 'never'.
      "
    `)
  })
})

describe('invalid container items', () => {
  test('clock, target and source containers', () => {
    const clock = createEvent<number>()
    const target = createEvent<number>()
    const source = createStore(0)

    function factory() {
      sample({
        //@ts-expect-error
        clock: [clock, 0],
        target,
      })
      sample({
        clock,
        //@ts-expect-error
        target: [target, 0],
      })
      sample({
        //@ts-expect-error
        source: [source, clock],
        target: createEvent<readonly [number, number]>(),
      })
      sample({
        //@ts-expect-error
        source: {valid: source, invalid: clock},
        target: createEvent<{valid: number; invalid: number}>(),
      })
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'number' is not assignable to type 'Unit<any>'.
      Type 'number' is not assignable to type 'Unit<any>'.
      Type 'EventCallable<number>' is missing the following properties from type 'Store<any>': updates, getState, thru, defaultState
      Type 'EventCallable<number>' is missing the following properties from type 'Store<any>': updates, getState, thru, defaultState
      "
    `)
  })

  test('all config fields are invalid', () => {
    function factory() {
      sample({
        //@ts-expect-error
        clock: null,
        //@ts-expect-error
        source: null,
        //@ts-expect-error
        target: null,
        //@ts-expect-error
        fn: null,
        //@ts-expect-error
        filter: null,
      })
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type 'Record<string, Store<any>> | RoTuple<Store<any>> | Unit<any>'.
      Type 'null' is not assignable to type 'Unit<any>[] | Unit<any>'.
      Type 'null' is not assignable to type '() => any'.
      Type 'null' is not assignable to type 'Store<boolean> | (() => boolean)'.
      "
    `)
  })

  test('empty config', () => {
    function factory() {
      //@ts-expect-error
      sample({})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Property 'clock' is missing in type '{}' but required in type '{ clock: unknown; source?: undefined; filter?: undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
      "
    `)
  })
})
