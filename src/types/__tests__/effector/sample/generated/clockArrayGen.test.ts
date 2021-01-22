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

test('plain, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], fn: ()=>({a:''}), target: aTarget})
    sample({source: a, clock: [str,anyt,voidt], fn: ()=>({a:''}), target: aTarget})
    sample({source: a, clock: [voidt,str,anyt], fn: ()=>({a:''}), target: aTarget})
    sample({source: a, clock: [voidt,anyt,str], fn: ()=>({a:''}), target: aTarget})
    sample({source: a, clock: [anyt,str,voidt], fn: ()=>({a:''}), target: aTarget})
    sample({source: a, clock: [anyt,voidt,str], fn: ()=>({a:''}), target: aTarget})
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
      sample({source: a, clock: [str,voidt], fn: ()=>({a:''}), target: aTarget})
      sample({source: a, clock: [voidt,str], fn: ()=>({a:''}), target: aTarget})
      sample({source: a, clock: [str], fn: ()=>({a:''}), target: aTarget})
      sample({source: a, clock: [voidt], fn: ()=>({a:''}), target: aTarget})
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
    //@ts-expect-error
    sample({source: a, clock: [num,voidt,anyt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [num,anyt,voidt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num,anyt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [voidt,anyt,num], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [anyt,num,voidt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [anyt,voidt,num], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
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
    //@ts-expect-error
    sample({source: a, clock: [num,voidt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [num], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
    //@ts-expect-error
    sample({source: a, clock: [voidt], fn: (a:string, clock:string) => ({a,clock}), target: aclock})
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
    sample({source: a, clock: [str,voidt,anyt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
    sample({source: a, clock: [str,anyt,voidt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
    sample({source: a, clock: [voidt,str,anyt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
    sample({source: a, clock: [voidt,anyt,str], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
    sample({source: a, clock: [anyt,str,voidt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
    sample({source: a, clock: [anyt,voidt,str], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
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
    sample({source: a, clock: [str,voidt,anyt], fn: (a:string) => ({a}), target: aTarget})
    sample({source: a, clock: [str,anyt,voidt], fn: (a:string) => ({a}), target: aTarget})
    sample({source: a, clock: [voidt,str,anyt], fn: (a:string) => ({a}), target: aTarget})
    sample({source: a, clock: [voidt,anyt,str], fn: (a:string) => ({a}), target: aTarget})
    sample({source: a, clock: [anyt,str,voidt], fn: (a:string) => ({a}), target: aTarget})
    sample({source: a, clock: [anyt,voidt,str], fn: (a:string) => ({a}), target: aTarget})
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
    sample({source: a, clock: [str,voidt,anyt], fn: (a,clock) => ({a,clock}), target: aclock})
    sample({source: a, clock: [str,anyt,voidt], fn: (a,clock) => ({a,clock}), target: aclock})
    sample({source: a, clock: [voidt,str,anyt], fn: (a,clock) => ({a,clock}), target: aclock})
    sample({source: a, clock: [voidt,anyt,str], fn: (a,clock) => ({a,clock}), target: aclock})
    sample({source: a, clock: [anyt,str,voidt], fn: (a,clock) => ({a,clock}), target: aclock})
    sample({source: a, clock: [anyt,voidt,str], fn: (a,clock) => ({a,clock}), target: aclock})
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
    sample({source: a, clock: [str,voidt,anyt], fn: (a) => ({a}), target: aTarget})
    sample({source: a, clock: [str,anyt,voidt], fn: (a) => ({a}), target: aTarget})
    sample({source: a, clock: [voidt,str,anyt], fn: (a) => ({a}), target: aTarget})
    sample({source: a, clock: [voidt,anyt,str], fn: (a) => ({a}), target: aTarget})
    sample({source: a, clock: [anyt,str,voidt], fn: (a) => ({a}), target: aTarget})
    sample({source: a, clock: [anyt,voidt,str], fn: (a) => ({a}), target: aTarget})
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
describe('plain, fn, fnClock, typedFn', () => {
  test('plain, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, clock: [str,voidt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
      sample({source: a, clock: [voidt,str], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
      sample({source: a, clock: [str], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
      sample({source: a, clock: [voidt], fn: (a:string, clock:any) => ({a,clock}), target: aclock})
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
      sample({source: a, clock: [str,voidt], fn: (a:string) => ({a}), target: aTarget})
      sample({source: a, clock: [voidt,str], fn: (a:string) => ({a}), target: aTarget})
      sample({source: a, clock: [str], fn: (a:string) => ({a}), target: aTarget})
      sample({source: a, clock: [voidt], fn: (a:string) => ({a}), target: aTarget})
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
      sample({source: a, clock: [str,voidt], fn: (a,clock) => ({a,clock}), target: aclock})
      sample({source: a, clock: [voidt,str], fn: (a,clock) => ({a,clock}), target: aclock})
      sample({source: a, clock: [str], fn: (a,clock) => ({a,clock}), target: aclock})
      sample({source: a, clock: [voidt], fn: (a,clock) => ({a,clock}), target: aclock})
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
      sample({source: a, clock: [str,voidt], fn: (a) => ({a}), target: aTarget})
      sample({source: a, clock: [voidt,str], fn: (a) => ({a}), target: aTarget})
      sample({source: a, clock: [str], fn: (a) => ({a}), target: aTarget})
      sample({source: a, clock: [voidt], fn: (a) => ({a}), target: aTarget})
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
test('combinable, fn, unificationToAny, fnWithoutArgs (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a, b}, clock: [str,voidt,anyt], fn: ()=>({a:'',b:2}), target: abTarget})
    sample({source: {a, b}, clock: [str,anyt,voidt], fn: ()=>({a:'',b:2}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,str,anyt], fn: ()=>({a:'',b:2}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,anyt,str], fn: ()=>({a:'',b:2}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,str,voidt], fn: ()=>({a:'',b:2}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,voidt,str], fn: ()=>({a:'',b:2}), target: abTarget})
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
      sample({source: {a, b}, clock: [str,voidt], fn: ()=>({a:'',b:2}), target: abTarget})
      sample({source: {a, b}, clock: [voidt,str], fn: ()=>({a:'',b:2}), target: abTarget})
      sample({source: {a, b}, clock: [str], fn: ()=>({a:'',b:2}), target: abTarget})
      sample({source: {a, b}, clock: [voidt], fn: ()=>({a:'',b:2}), target: abTarget})
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
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,voidt,anyt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,anyt,voidt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,num,anyt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,anyt,num], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [anyt,num,voidt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [anyt,voidt,num], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
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
    //@ts-expect-error
    sample({source: {a, b}, clock: [num,voidt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt,num], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [num], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
    //@ts-expect-error
    sample({source: {a, b}, clock: [voidt], fn: ({a,b}:AB, clock:string) => ({a,b,clock}), target: abclock})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [str,anyt,voidt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [voidt,str,anyt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [voidt,anyt,str], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [anyt,str,voidt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [anyt,voidt,str], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [str,anyt,voidt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,str,anyt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,anyt,str], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,str,voidt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,voidt,str], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [str,anyt,voidt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [voidt,str,anyt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [voidt,anyt,str], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [anyt,str,voidt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
    sample({source: {a, b}, clock: [anyt,voidt,str], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
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
    sample({source: {a, b}, clock: [str,voidt,anyt], fn: ({a,b}) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [str,anyt,voidt], fn: ({a,b}) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,str,anyt], fn: ({a,b}) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [voidt,anyt,str], fn: ({a,b}) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,str,voidt], fn: ({a,b}) => ({a,b}), target: abTarget})
    sample({source: {a, b}, clock: [anyt,voidt,str], fn: ({a,b}) => ({a,b}), target: abTarget})
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
describe('combinable, fn, fnClock, typedFn', () => {
  test('combinable, fn, fnClock, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a, b}, clock: [str,voidt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [voidt,str], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [str], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [voidt], fn: ({a,b}:AB, clock:any) => ({a,b,clock}), target: abclock})
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
      sample({source: {a, b}, clock: [str,voidt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [voidt,str], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [str], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [voidt], fn: ({a,b}:AB) => ({a,b}), target: abTarget})
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
      sample({source: {a, b}, clock: [str,voidt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [voidt,str], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [str], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
      sample({source: {a, b}, clock: [voidt], fn: ({a,b}, clock) => ({a,b,clock}), target: abclock})
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
      sample({source: {a, b}, clock: [str,voidt], fn: ({a,b}) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [voidt,str], fn: ({a,b}) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [str], fn: ({a,b}) => ({a,b}), target: abTarget})
      sample({source: {a, b}, clock: [voidt], fn: ({a,b}) => ({a,b}), target: abTarget})
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
