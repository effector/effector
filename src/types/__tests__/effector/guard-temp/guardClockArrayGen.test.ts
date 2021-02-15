/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard} from 'effector'
const typecheck = '{global}'

type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const strClk = createEvent<string>()
const num = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<AB>()
const aclock = createEvent<{a: string; clock: any}>()
const abclock = createEvent<{a: string; b: number; clock: any}>()
const fnAbClockString = ({a, b}: AB, clock: string) => ({a, b, clock})
const fnAbClockAny = ({a, b}: AB, clock: any) => ({a, b, clock})
const fnAString = (a: string) => ({a})
const fnAStringClockString = (a: string, clock: string) => ({a, clock})
const fnAStringClockAny = (a: string, clock: any) => ({a, clock})
const fnAb = ({a, b}: AB) => ({a, b})

describe('fn clock assertion', () => {
  test('plain, noTarget (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,num]     , fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt]         , fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num]           , fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,num,anyt], fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[anyt,num,voidt], fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num,voidt,anyt], fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[anyt,voidt,num], fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num,anyt,voidt], fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,anyt,num], fn:fnAStringClockString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('plain (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,num]     , target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt]         , target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num]           , target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[anyt,num,voidt], target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,num,anyt], target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[voidt,anyt,num], target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[anyt,voidt,num], target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num,anyt,voidt], target:aclock, fn:fnAStringClockString})
      //@ts-expect-error
      guard({filter: () => true, source:a, clock:[num,voidt,anyt], target:aclock, fn:fnAStringClockString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('combinable, noTarget (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num]           , fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,num]     , fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num,anyt,voidt], fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[anyt,num,voidt], fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,num,anyt], fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num,voidt,anyt], fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,num], fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,num], fn:fnAbClockString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('combinable (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,num]     , target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num]           , target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,num], target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num,anyt,voidt], target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,num], target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[num,voidt,anyt], target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[voidt,num,anyt], target:abclock, fn:fnAbClockString})
      //@ts-expect-error
      guard({filter: () => true, source:{a,b}, clock:[anyt,num,voidt], target:abclock, fn:fnAbClockString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
              Types of parameters 'clock' and 'clock' are incompatible.
                Type 'number | void' is not assignable to type 'string'.
                  Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('clock only', () => {
  test('noSource (should pass)', () => {
    //prettier-ignore
    {
      guard({filter: () => true, clock:strClk       })
      guard({filter: () => true, clock:anyt         })
      guard({filter: () => true, clock:[strClk]     })
      guard({filter: () => true, clock:[anyt]       })
      guard({filter: () => true, clock:[strClk,anyt]})
      guard({filter: () => true, clock:strClk       , target:str})
      guard({filter: () => true, clock:anyt         , target:str})
      guard({filter: () => true, clock:[strClk]     , target:str})
      guard({filter: () => true, clock:[anyt]       , target:str})
      guard({filter: () => true, clock:[strClk,anyt], target:str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noSource, fn (should pass)', () => {
    //prettier-ignore
    {
      guard({filter: () => true, clock:voidt         , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:strClk        , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:anyt          , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:num           , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:strClk        , fn:(a) => ({a})    })
      guard({filter: () => true, clock:strClk        , fn:fnAString       })
      guard({filter: () => true, clock:anyt          , fn:fnAString       })
      guard({filter: () => true, clock:anyt          , fn:(a) => ({a})    })
      guard({filter: () => true, clock:[strClk]      , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,anyt]  , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt]       , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[anyt,num]    , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk,anyt] , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,strClk], fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk,num]  , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[anyt]        , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[num,anyt]    , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,num]   , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[num]         , fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk]      , fn:fnAString       })
      guard({filter: () => true, clock:[anyt]        , fn:(a) => ({a})    })
      guard({filter: () => true, clock:[strClk,anyt] , fn:fnAString       })
      guard({filter: () => true, clock:[strClk,anyt] , fn:(a) => ({a})    })
      guard({filter: () => true, clock:[anyt]        , fn:fnAString       })
      guard({filter: () => true, clock:[strClk]      , fn:(a) => ({a})    })
      guard({filter: () => true, clock:strClk        , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:voidt         , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:anyt          , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:num           , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:strClk        , target:aTarget, fn:(a) => ({a})    })
      guard({filter: () => true, clock:anyt          , target:aTarget, fn:fnAString       })
      guard({filter: () => true, clock:strClk        , target:aTarget, fn:fnAString       })
      guard({filter: () => true, clock:anyt          , target:aTarget, fn:(a) => ({a})    })
      guard({filter: () => true, clock:[voidt]       , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,num]   , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk,num]  , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[num]         , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[anyt]        , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,strClk], target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[num,anyt]    , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[voidt,anyt]  , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk]      , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[anyt,num]    , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk,anyt] , target:aTarget, fn:()=>({a:'',b:2})})
      guard({filter: () => true, clock:[strClk]      , target:aTarget, fn:(a) => ({a})    })
      guard({filter: () => true, clock:[anyt]        , target:aTarget, fn:(a) => ({a})    })
      guard({filter: () => true, clock:[strClk,anyt] , target:aTarget, fn:(a) => ({a})    })
      guard({filter: () => true, clock:[strClk]      , target:aTarget, fn:fnAString       })
      guard({filter: () => true, clock:[anyt]        , target:aTarget, fn:fnAString       })
      guard({filter: () => true, clock:[strClk,anyt] , target:aTarget, fn:fnAString       })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('noClock (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    })
    guard({filter: () => true, source:{a,b}})
    guard({filter: () => true, source:a    , target:str     })
    guard({filter: () => true, source:{a,b}, target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test(' (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    , clock:[voidt,str]     })
    guard({filter: () => true, source:a    , clock:[voidt]         })
    guard({filter: () => true, source:a    , clock:[str]           })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt]})
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt]})
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt]})
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str]})
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt]})
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str]})
    guard({filter: () => true, source:{a,b}, clock:[str]           })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt]})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str]})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str]})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt]})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt]})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt]})
    guard({filter: () => true, source:a    , clock:[voidt]         , target:str     })
    guard({filter: () => true, source:a    , clock:[str]           , target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:str     })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:str     })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:str     })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:str     })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:str     })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:str     })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noClock, fn (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , fn:fnAString         })
    guard({filter: () => true, source:a    , fn:(a) => ({a})      })
    guard({filter: () => true, source:{a,b}, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, fn:fnAb              })
    guard({filter: () => true, source:a    , target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:{a,b}, target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, target:abTarget, fn:({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    , clock:[voidt,str]     , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str]           , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt]         , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[voidt]         , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[str]           , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str]           , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt]         , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], fn:fnAString         })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str]           , fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str]           , fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str]           , fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str]           , target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt]         , target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt]         , target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str]           , target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str]           , target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt]         , target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:aTarget , fn:()=>({a:''})      })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:aTarget , fn:fnAString         })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:aTarget , fn:(a) => ({a})      })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget, fn:()=>({a:'',b:2})  })
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abTarget, fn:({a,b}) => ({a,b})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abTarget, fn:fnAb              })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abTarget, fn:fnAb              })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    guard({filter: () => true, source:a    , clock:[str]           , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt]         , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[str]           , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt]         , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[str]           , fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str]           , fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:a    , clock:[str]           , target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt]         , target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt]         , target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt,str]     , target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[str]           , target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[anyt,voidt,str], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:a    , clock:[str,voidt,anyt], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,str,anyt], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[anyt,str,voidt], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[str,anyt,voidt], target:aclock , fn:fnAStringClockAny              })
    guard({filter: () => true, source:a    , clock:[voidt,anyt,str], target:aclock , fn:(a,clock) => ({a,clock})       })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt]         , target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str]     , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str]           , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,voidt,str], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[str,voidt,anyt], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,anyt,str], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    guard({filter: () => true, source:{a,b}, clock:[anyt,str,voidt], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[str,anyt,voidt], target:abclock, fn:fnAbClockAny                   })
    guard({filter: () => true, source:{a,b}, clock:[voidt,str,anyt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
