/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'

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
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
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
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
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
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
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
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
      Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any> | Unit<any>[]'.
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
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
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
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type '() => void' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
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
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
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
      Type 'null' is not assignable to type 'Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
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
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      Type 'null' is not assignable to type 'Unit<any> | Unit<any>[]'.
      "
    `)
  })
})
