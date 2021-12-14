/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event, Store} from 'effector'
const typecheck = '{global}'
type AN = {a: number}
const $num = createStore(0)
const a = createStore({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aT = createStore({a: 0})
const aNumT = createEvent<AN>()
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})
describe('no target', () => {
  test('no target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    })}
      {const result: Event<AN> = sample({source:aNum    , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       })}
      {const result: Store<AN> = sample({source:a       , fn:fn0})}
      {const result: Store<AN> = sample({source:a       , fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:({a}) => ({a})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:num})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:$num})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:$num})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num]})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num]})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num]})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      "
    `)
  })
})
describe('no target, typed fn', () => {
  test('no target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , fn:fn1})}
      {const result: Store<AN> = sample({source:a       , fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type 'void' is not assignable to type 'Event<AN>'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      "
    `)
  })
})
describe('unit target', () => {
  test('unit target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , target:aT   })}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , target:aT   })}
      {const result: Event<AN> = sample({source:a       , target:aNumT})}
      {const result: Store<AN> = sample({source:a       , target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, target:aT   })}
      {const result: Event<AN> = sample({source:{a:$num}, target:aNumT})}
      {const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:({a}) => ({a})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   })}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   })}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   })}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   })}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   })}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   })}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   })}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   })}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   })}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   , fn:fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   , fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   , fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      "
    `)
  })
})
describe('unit target, typed fn', () => {
  test('unit target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, target:aNumT, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:$num, target:aNumT, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unit target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, fn:fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:[num,$num], target:aT   , fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], target:aNumT, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Store<{ a: number; }>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: Event<AN>; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      "
    `)
  })
})
describe('tuple target', () => {
  test('tuple target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:({a}) => ({a})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
        Target requires 2 element(s) but source may have fewer.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }, c: any) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }, c: any) => { ...; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: () => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }) => { a: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: { a: any; }, c: any) => { ...; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      "
    `)
  })
})
describe('tuple target, typed fn', () => {
  test('tuple target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Event<AN>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN, c: number) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: Store<{ a: number; }>; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN, c: number) => { ...; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      Type '(Event<AN> | Store<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Argument of type '{ source: { a: Store<number>; }; clock: (Store<number> | Event<number>)[]; target: (Event<AN> | Store<{ a: number; }>)[]; fn: ({ a }: AN, c: number) => { ...; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Store<number> | Event<number>)[]; }'.
      "
    `)
  })
})
