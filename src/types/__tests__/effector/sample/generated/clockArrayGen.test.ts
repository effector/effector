/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'

type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<AB>()
const aclock = createEvent<{a: string; clock: any}>()
const abclock = createEvent<{a: string; b: number; clock: any}>()

describe('plain', () => {
  test('plain (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, clock: [str,voidt], target: str})
      sample({source: a, clock: [voidt,str], target: str})
      sample({source: a, clock: [str], target: str})
      sample({source: a, clock: [voidt], target: str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('plain, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: str})
    sample({source: a, clock: [str,anyt,voidt], target: str})
    sample({source: a, clock: [voidt,str,anyt], target: str})
    sample({source: a, clock: [voidt,anyt,str], target: str})
    sample({source: a, clock: [anyt,str,voidt], target: str})
    sample({source: a, clock: [anyt,voidt,str], target: str})
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
      sample({source: a, clock: [str,voidt], target: aTarget, fn: ()=>({a:''})})
      sample({source: a, clock: [voidt,str], target: aTarget, fn: ()=>({a:''})})
      sample({source: a, clock: [str], target: aTarget, fn: ()=>({a:''})})
      sample({source: a, clock: [voidt], target: aTarget, fn: ()=>({a:''})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('plain, fn, fnClock, typedFn', () => {
  test('plain, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, clock: [str,voidt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
      sample({source: a, clock: [voidt,str], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
      sample({source: a, clock: [str], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
      sample({source: a, clock: [voidt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
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
      sample({source: a, clock: [str,voidt], target: aTarget, fn: (a:string) => ({a})})
      sample({source: a, clock: [voidt,str], target: aTarget, fn: (a:string) => ({a})})
      sample({source: a, clock: [str], target: aTarget, fn: (a:string) => ({a})})
      sample({source: a, clock: [voidt], target: aTarget, fn: (a:string) => ({a})})
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
      sample({source: a, clock: [str,voidt], target: aclock, fn: (a,clock) => ({a,clock})})
      sample({source: a, clock: [voidt,str], target: aclock, fn: (a,clock) => ({a,clock})})
      sample({source: a, clock: [str], target: aclock, fn: (a,clock) => ({a,clock})})
      sample({source: a, clock: [voidt], target: aclock, fn: (a,clock) => ({a,clock})})
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
      sample({source: a, clock: [str,voidt], target: aTarget, fn: (a) => ({a})})
      sample({source: a, clock: [voidt,str], target: aTarget, fn: (a) => ({a})})
      sample({source: a, clock: [str], target: aTarget, fn: (a) => ({a})})
      sample({source: a, clock: [voidt], target: aTarget, fn: (a) => ({a})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('plain, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: a, clock: [num,voidt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [num], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [voidt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
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
test('plain, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: ()=>({a:''})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, fnClock, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
    sample({source: a, clock: [str,anyt,voidt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
    sample({source: a, clock: [voidt,str,anyt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
    sample({source: a, clock: [voidt,anyt,str], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
    sample({source: a, clock: [anyt,str,voidt], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
    sample({source: a, clock: [anyt,voidt,str], target: aclock, fn: (a:string, clock:any) => ({a,clock})})
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
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: (a:string) => ({a})})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: (a:string) => ({a})})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: (a:string) => ({a})})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: (a:string) => ({a})})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: (a:string) => ({a})})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: (a:string) => ({a})})
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
    sample({source: a, clock: [str,voidt,anyt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [str,anyt,voidt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,str,anyt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,anyt,str], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,str,voidt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,voidt,str], target: aclock, fn: (a,clock) => ({a,clock})})
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
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: (a) => ({a})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: a, clock: [num,voidt,anyt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [num,anyt,voidt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num,anyt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [voidt,anyt,num], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [anyt,num,voidt], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
    //@ts-expect-error
    sample({source: a, clock: [anyt,voidt,num], target: aclock, fn: (a:string, clock:string) => ({a,clock})})
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
describe('combinable', () => {
  test('combinable (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a, b}, clock: [str,voidt], target: abTarget})
      sample({source: {a, b}, clock: [voidt,str], target: abTarget})
      sample({source: {a, b}, clock: [str], target: abTarget})
      sample({source: {a, b}, clock: [voidt], target: abTarget})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('combinable, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abTarget})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abTarget})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abTarget})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abTarget})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abTarget})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abTarget})
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
      sample({source: {a, b}, clock: [str,voidt], target: abTarget, fn: ()=>({a:'',b:2})})
      sample({source: {a, b}, clock: [voidt,str], target: abTarget, fn: ()=>({a:'',b:2})})
      sample({source: {a, b}, clock: [str], target: abTarget, fn: ()=>({a:'',b:2})})
      sample({source: {a, b}, clock: [voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('combinable, fn, fnClock, typedFn', () => {
  test('combinable, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a, b}, clock: [str,voidt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
      sample({source: {a, b}, clock: [voidt,str], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
      sample({source: {a, b}, clock: [str], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
      sample({source: {a, b}, clock: [voidt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
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
      sample({source: {a, b}, clock: [str,voidt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
      sample({source: {a, b}, clock: [voidt,str], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
      sample({source: {a, b}, clock: [str], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
      sample({source: {a, b}, clock: [voidt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
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
      sample({source: {a, b}, clock: [str,voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
      sample({source: {a, b}, clock: [voidt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
      sample({source: {a, b}, clock: [str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
      sample({source: {a, b}, clock: [voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('combinable, fn', () => {
  test('combinable, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a, b}, clock: [str,voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
      sample({source: {a, b}, clock: [voidt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
      sample({source: {a, b}, clock: [str], target: abTarget, fn: ({a,b}) => ({a,b})})
      sample({source: {a, b}, clock: [voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('combinable, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,voidt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,num], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [num], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
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
test('combinable, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abTarget, fn: ()=>({a:'',b:2})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, fnClock, typedFn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abclock, fn: ({a,b}:AB, clock:any) => ({a,b,clock})})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abTarget, fn: ({a,b}:AB) => ({a,b})})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, unificationToAny (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [str,voidt,anyt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a, b}, clock: [str,anyt,voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a, b}, clock: [voidt,str,anyt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a, b}, clock: [voidt,anyt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a, b}, clock: [anyt,str,voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a, b}, clock: [anyt,voidt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,voidt,anyt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,anyt,voidt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,num,anyt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,anyt,num], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [anyt,num,voidt], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
    //@ts-expect-error
    sample({source: {a, b}, clock: [anyt,voidt,num], target: abclock, fn: ({a,b}:AB, clock:string) => ({a,b,clock})})
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
