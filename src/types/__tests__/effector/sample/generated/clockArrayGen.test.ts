/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'

const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<{a: string; b: number}>()
const aclockTarget = createEvent<{a: string; clock: any}>()
const abclockTarget = createEvent<{a: string; b: number; clock: any}>()
const stringTarget = createEvent<string>()

test('plain, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [stringt, voidt, anyt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [stringt, anyt, voidt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, stringt, anyt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, stringt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, stringt, voidt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, stringt],
      fn: () => ({a: ''}),
      target: aTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
describe('plain, fn, fnWithoutArgs', () => {
  test('plain, fn, fnWithoutArgs (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [stringt, voidt],
        fn: () => ({a: ''}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt, stringt],
        fn: () => ({a: ''}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [stringt],
        fn: () => ({a: ''}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt],
        fn: () => ({a: ''}),
        target: aTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [numt, voidt, anyt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [numt, anyt, voidt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, numt, anyt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, numt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, numt, voidt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, numt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    "
  `)
})
test('plain, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [numt, voidt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, numt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [numt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt],
      fn: (a: string, clock: string) => ({a, clock}),
      target: aclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    "
  `)
})
test('plain, fn, fnClock, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [stringt, voidt, anyt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [stringt, anyt, voidt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, stringt, anyt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, stringt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, stringt, voidt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, stringt],
      fn: (a: string, clock: any) => ({a, clock}),
      target: aclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [stringt, voidt, anyt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [stringt, anyt, voidt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, stringt, anyt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, stringt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, stringt, voidt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, stringt],
      fn: (a: string) => ({a}),
      target: aTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, fnClock, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [stringt, voidt, anyt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [stringt, anyt, voidt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, stringt, anyt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, stringt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, stringt, voidt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, stringt],
      fn: (a, clock) => ({a, clock}),
      target: aclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: a,
      clock: [stringt, voidt, anyt],
      fn: (a) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [stringt, anyt, voidt],
      fn: (a) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, stringt, anyt],
      fn: (a) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [voidt, anyt, stringt],
      fn: (a) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, stringt, voidt],
      fn: (a) => ({a}),
      target: aTarget,
    })
    sample({
      source: a,
      clock: [anyt, voidt, stringt],
      fn: (a) => ({a}),
      target: aTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [stringt, voidt, anyt], target: stringTarget})
    sample({source: a, clock: [stringt, anyt, voidt], target: stringTarget})
    sample({source: a, clock: [voidt, stringt, anyt], target: stringTarget})
    sample({source: a, clock: [voidt, anyt, stringt], target: stringTarget})
    sample({source: a, clock: [anyt, stringt, voidt], target: stringTarget})
    sample({source: a, clock: [anyt, voidt, stringt], target: stringTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
describe('plain, fn, fnClock, typedFn', () => {
  test('plain, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [stringt, voidt],
        fn: (a: string, clock: any) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [voidt, stringt],
        fn: (a: string, clock: any) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [stringt],
        fn: (a: string, clock: any) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [voidt],
        fn: (a: string, clock: any) => ({a, clock}),
        target: aclockTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('plain, fn, typedFn', () => {
  test('plain, fn, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [stringt, voidt],
        fn: (a: string) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt, stringt],
        fn: (a: string) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [stringt],
        fn: (a: string) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt],
        fn: (a: string) => ({a}),
        target: aTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('plain, fn, fnClock', () => {
  test('plain, fn, fnClock (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [stringt, voidt],
        fn: (a, clock) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [voidt, stringt],
        fn: (a, clock) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [stringt],
        fn: (a, clock) => ({a, clock}),
        target: aclockTarget,
      })
      sample({
        source: a,
        clock: [voidt],
        fn: (a, clock) => ({a, clock}),
        target: aclockTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('plain, fn', () => {
  test('plain, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [stringt, voidt],
        fn: (a) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt, stringt],
        fn: (a) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [stringt],
        fn: (a) => ({a}),
        target: aTarget,
      })
      sample({
        source: a,
        clock: [voidt],
        fn: (a) => ({a}),
        target: aTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('plain', () => {
  test('plain (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, clock: [stringt, voidt], target: stringTarget})
      sample({source: a, clock: [voidt, stringt], target: stringTarget})
      sample({source: a, clock: [stringt], target: stringTarget})
      sample({source: a, clock: [voidt], target: stringTarget})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('combinable, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [stringt, voidt, anyt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [stringt, anyt, voidt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, stringt, anyt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, stringt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, stringt, voidt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, stringt],
      fn: () => ({a: '', b: 2}),
      target: abTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
describe('combinable, fn, fnWithoutArgs', () => {
  test('combinable, fn, fnWithoutArgs (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: {a, b},
        clock: [stringt, voidt],
        fn: () => ({a: '', b: 2}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt, stringt],
        fn: () => ({a: '', b: 2}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [stringt],
        fn: () => ({a: '', b: 2}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt],
        fn: () => ({a: '', b: 2}),
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [numt, voidt, anyt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [numt, anyt, voidt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, numt, anyt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, numt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, numt, voidt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, numt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    "
  `)
})
test('combinable, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [numt, voidt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, numt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [numt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt],
      fn: ({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock}),
      target: abclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<number>' is not assignable to type 'Unit<string>'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
              Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<void>' is not assignable to type 'Unit<string>'.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
    "
  `)
})
test('combinable, fn, fnClock, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [stringt, voidt, anyt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [stringt, anyt, voidt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, stringt, anyt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, stringt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, stringt, voidt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, stringt],
      fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
      target: abclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [stringt, voidt, anyt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [stringt, anyt, voidt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, stringt, anyt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, stringt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, stringt, voidt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, stringt],
      fn: ({a, b}: {a: string; b: number}) => ({a, b}),
      target: abTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, fnClock, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [stringt, voidt, anyt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [stringt, anyt, voidt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, stringt, anyt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, stringt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, stringt, voidt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, stringt],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target: abclockTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Parameter 'clock' implicitly has an 'any' type.
    "
  `)
})
test('combinable, fn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({
      source: {a, b},
      clock: [stringt, voidt, anyt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [stringt, anyt, voidt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, stringt, anyt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [voidt, anyt, stringt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, stringt, voidt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
    sample({
      source: {a, b},
      clock: [anyt, voidt, stringt],
      fn: ({a, b}) => ({a, b}),
      target: abTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    Binding element 'a' implicitly has an 'any' type.
    Binding element 'b' implicitly has an 'any' type.
    "
  `)
})
test('combinable, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [stringt, voidt, anyt], target: abTarget})
    sample({source: {a, b}, clock: [stringt, anyt, voidt], target: abTarget})
    sample({source: {a, b}, clock: [voidt, stringt, anyt], target: abTarget})
    sample({source: {a, b}, clock: [voidt, anyt, stringt], target: abTarget})
    sample({source: {a, b}, clock: [anyt, stringt, voidt], target: abTarget})
    sample({source: {a, b}, clock: [anyt, voidt, stringt], target: abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
describe('combinable, fn, fnClock, typedFn', () => {
  test('combinable, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: {a, b},
        clock: [stringt, voidt],
        fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt, stringt],
        fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [stringt],
        fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt],
        fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
        target: abclockTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('combinable, fn, typedFn', () => {
  test('combinable, fn, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: {a, b},
        clock: [stringt, voidt],
        fn: ({a, b}: {a: string; b: number}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt, stringt],
        fn: ({a, b}: {a: string; b: number}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [stringt],
        fn: ({a, b}: {a: string; b: number}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt],
        fn: ({a, b}: {a: string; b: number}) => ({a, b}),
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('combinable, fn, fnClock', () => {
  test('combinable, fn, fnClock (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: {a, b},
        clock: [stringt, voidt],
        fn: ({a, b}, clock) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt, stringt],
        fn: ({a, b}, clock) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [stringt],
        fn: ({a, b}, clock) => ({a, b, clock}),
        target: abclockTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt],
        fn: ({a, b}, clock) => ({a, b, clock}),
        target: abclockTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
      "
    `)
  })
})
describe('combinable, fn', () => {
  test('combinable, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({
        source: {a, b},
        clock: [stringt, voidt],
        fn: ({a, b}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt, stringt],
        fn: ({a, b}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [stringt],
        fn: ({a, b}) => ({a, b}),
        target: abTarget,
      })
      sample({
        source: {a, b},
        clock: [voidt],
        fn: ({a, b}) => ({a, b}),
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      "
    `)
  })
})
describe('combinable', () => {
  test('combinable (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a, b}, clock: [stringt, voidt], target: abTarget})
      sample({source: {a, b}, clock: [voidt, stringt], target: abTarget})
      sample({source: {a, b}, clock: [stringt], target: abTarget})
      sample({source: {a, b}, clock: [voidt], target: abTarget})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
