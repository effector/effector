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
      {const result: Store<AN> = sample({source:{a:$num}, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}})}
      {const result: Store<AN> = sample({source:a       , fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , fn: fn0})}
      {const result: Store<AN> = sample({source:a       })}
      {const result: Event<AN> = sample({source:aNum    , fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    })}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: { a: Store<number>; }; fn: ({ a }: { a: number; }) => { a: number; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: { a: Store<number>; }; fn: ({ a }: { a: number; }) => { a: number; }; }' is missing the following properties from type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: { a: Store<number>; }; fn: () => { a: number; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: { a: Store<number>; }; fn: () => { a: number; }; }' is missing the following properties from type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: { a: Store<number>; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: { a: Store<number>; }; }' is missing the following properties from type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, fn, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Store<{ a: number; }>; fn: ({ a }: { a: number; }) => { a: number; }; }' is not assignable to parameter of type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Store<{ a: number; }>; fn: ({ a }: { a: number; }) => { a: number; }; }' is missing the following properties from type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Store<{ a: number; }>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Store<{ a: number; }>; fn: () => { a: number; }; }' is missing the following properties from type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      Type 'Store<unknown>' is missing the following properties from type 'Event<AN>': filter, filterMap, prepend, getType
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      Type 'Store<unknown>' is not assignable to type 'Event<AN>'.
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Event<AN>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Event<AN>; fn: () => { a: number; }; }' is missing the following properties from type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      "
    `)
  })
  test('no target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num})}
      {const result: Event<AN> = sample({source:a       , clock: num, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock: num, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock: num, fn: fn0})}
      {const result: Event<AN> = sample({source:a       , clock: num})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: num})}
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
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num})}
      {const result: Store<AN> = sample({source:a       , clock: $num, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock: $num, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock: $num, fn: fn0})}
      {const result: Store<AN> = sample({source:a       , clock: $num})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num})}
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
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num]})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], fn: fn0})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num]})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Binding element 'a' implicitly has an 'any' type.
      Parameter 'c' implicitly has an 'any' type.
      Object is of type 'unknown'.
      Object is of type 'unknown'.
      "
    `)
  })
})
describe('no target, typed fn', () => {
  test('no target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: { a: Store<number>; }; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: { a: Store<number>; }; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      Type 'Store<unknown>' is not assignable to type 'Event<AN>'.
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
            Type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
      "
    `)
  })
  test('no target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, fn: fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, fn: fn1})}
      {const result: Event<AN> = sample({source:a       , clock: num, fn: fn2})}
      {const result: Event<AN> = sample({source:a       , clock: num, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, fn: fn1})}
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
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, fn: fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , clock: $num, fn: fn2})}
      {const result: Store<AN> = sample({source:a       , clock: $num, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, fn: fn1})}
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
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], fn: fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], fn: fn1})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], fn: fn2})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('unit target', () => {
  test('unit target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, target: aT})}
      {const result: Store<AN> = sample({source:a       , target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:a       , target: aT})}
      {const result: Store<AN> = sample({source:aNum    , target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:aNum    , target: aT})}
      {const result: Event<AN> = sample({source:{a:$num}, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, target: aNumT})}
      {const result: Event<AN> = sample({source:a       , target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:a       , target: aNumT})}
      {const result: Event<AN> = sample({source:aNum    , target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , target: aNumT})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT, fn: ({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT, fn: ({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT, fn: fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT, fn: ({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT, fn: ({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT, fn: fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<{ a: number; }>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Object is of type 'unknown'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
})
describe('unit target, typed fn', () => {
  test('unit target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:aNum    , target: aT, fn: fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:a       , target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , target: aNumT, fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: num, target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:a       , clock: num, target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock: num, target: aT, fn: fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: num, target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:a       , clock: num, target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: num, target: aNumT, fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: $num, target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:a       , clock: $num, target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock: $num, target: aT, fn: fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: $num, target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:a       , clock: $num, target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: $num, target: aNumT, fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
  test('unit target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock: [num,$num], target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:a       , clock: [num,$num], target: aT, fn: fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT, fn: fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock: [num,$num], target: aT, fn: fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock: [num,$num], target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:a       , clock: [num,$num], target: aNumT, fn: fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT, fn: fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock: [num,$num], target: aNumT, fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
      "
    `)
  })
})
describe('tuple target', () => {
  test('tuple target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target: [aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      Type 'Store<unknown>' is not assignable to type '[Event<AN>, Store<AN>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Store<{ a: number; }>' is not assignable to type '\\"incompatible unit in target array\\"'.
      "
    `)
  })
  test('tuple target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT], fn: ({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT], fn: ({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT], fn: fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT]})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object is of type 'unknown'.
      Object is of type 'unknown'.
      Object is of type 'unknown'.
      "
    `)
  })
})
describe('tuple target, typed fn', () => {
  test('tuple target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target: [aNumT,aT], fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: num, target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: num, target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: num, target: [aNumT,aT], fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: $num, target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: $num, target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: $num, target: [aNumT,aT], fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('tuple target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock: [num,$num], target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock: [num,$num], target: [aNumT,aT], fn: fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT], fn: fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock: [num,$num], target: [aNumT,aT], fn: fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
