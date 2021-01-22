/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event, Store} from 'effector'
const typecheck = '{global}'

type AN = {a: number}
const $num = createStore(0)
const a = createStore({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aTarget = createStore({a: 0})
const aNumTarget = createEvent<AN>()
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})

test('tuple target, tuple clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: [num, $num], fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: [num, $num], fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: [num, $num], fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: [num, $num]         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: [num, $num], fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: [num, $num], fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: [num, $num], fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: [num, $num]         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: [num, $num], fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: [num, $num], fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: [num, $num], fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: [num, $num]         , target: [aNumTarget, aTarget]})}
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
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: $num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: $num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: $num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: $num         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: $num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: $num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: $num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: $num         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: $num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: $num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: $num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: $num         , target: [aNumTarget, aTarget]})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('tuple target, event clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, clock: num         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , clock: num         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: num, fn: fn2, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: num, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: num, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , clock: num         , target: [aNumTarget, aTarget]})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('tuple target, none clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}, fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:{a: $num}         , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a        , fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:a                 , target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , fn: fn1, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum     , fn: fn0, target: [aNumTarget, aTarget]})}
    {const result: [Event<AN>, Store<AN>] = sample({source:aNum              , target: [aNumTarget, aTarget]})}
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
    "
  `)
})
test('store target, tuple clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: [num, $num]         , target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: [num, $num], fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: [num, $num], fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: [num, $num], fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: [num, $num]         , target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: [num, $num], fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: [num, $num], fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: [num, $num], fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: [num, $num]         , target: aTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
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
    "
  `)
})
test('store target, store clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num         , target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: $num         , target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: $num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: $num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: $num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: $num         , target: aTarget})}
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
    "
  `)
})
test('store target, event clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, clock: num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: num         , target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , clock: num         , target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: num, fn: fn2, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: num, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: num, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , clock: num         , target: aTarget})}
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
    "
  `)
})
test('store target, none clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}, fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:{a: $num}         , target: aTarget})}
    {const result: Store<AN> = sample({source:a        , fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:a        , fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:a                 , target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , fn: fn1, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum     , fn: fn0, target: aTarget})}
    {const result: Store<AN> = sample({source:aNum              , target: aTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is missing the following properties from type 'Store<AN>': reset, getState, map, on, and 9 more.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    Type 'Unit<{ a: number; }>' is not assignable to type 'Store<AN>'.
    "
  `)
})
test('event target, tuple clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num]         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num]         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num]         , target: aNumTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Unit<AN>' is missing the following properties from type 'Event<AN>': watch, map, filter, filterMap, and 7 more.
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
test('event target, store clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, clock: $num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: $num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: $num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: $num         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: $num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: $num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: $num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: $num         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num         , target: aNumTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
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
test('event target, event clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , clock: num         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn2, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , clock: num         , target: aNumTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
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
test('event target, none clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}, fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:{a: $num}         , target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a        , fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:a                 , target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , fn: fn1, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum     , fn: fn0, target: aNumTarget})}
    {const result: Event<AN> = sample({source:aNum              , target: aNumTarget})}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Unit<AN>' is not assignable to type 'Event<AN>'.
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
test('none target, tuple clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn2})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn1})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num], fn: fn0})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: [num, $num]         })}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn2})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn1})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num], fn: fn0})}
    {const result: Event<AN> = sample({source:a        , clock: [num, $num]         })}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn2})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn1})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num], fn: fn0})}
    {const result: Event<AN> = sample({source:aNum     , clock: [num, $num]         })}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('none target, store clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn2})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn1})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num, fn: fn0})}
    {const result: Store<AN> = sample({source:{a: $num}, clock: $num         })}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn2})}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn1})}
    {const result: Store<AN> = sample({source:a        , clock: $num, fn: fn0})}
    {const result: Store<AN> = sample({source:a        , clock: $num         })}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn2})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn1})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num, fn: fn0})}
    {const result: Event<AN> = sample({source:aNum     , clock: $num         })}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('none target, event clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn2})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn1})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num, fn: fn0})}
    {const result: Event<AN> = sample({source:{a: $num}, clock: num         })}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn2})}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn1})}
    {const result: Event<AN> = sample({source:a        , clock: num, fn: fn0})}
    {const result: Event<AN> = sample({source:a        , clock: num         })}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn2})}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn1})}
    {const result: Event<AN> = sample({source:aNum     , clock: num, fn: fn0})}
    {const result: Event<AN> = sample({source:aNum     , clock: num         })}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('none target, none clock (should pass)', () => {
  //prettier-ignore
  {
    {const result: Store<AN> = sample({source:{a: $num}, fn: fn1})}
    {const result: Store<AN> = sample({source:{a: $num}, fn: fn0})}
    {const result: Store<AN> = sample({source:{a: $num}         })}
    {const result: Store<AN> = sample({source:a        , fn: fn1})}
    {const result: Store<AN> = sample({source:a        , fn: fn0})}
    {const result: Store<AN> = sample({source:a                 })}
    {const result: Event<AN> = sample({source:aNum     , fn: fn1})}
    {const result: Event<AN> = sample({source:aNum     , fn: fn0})}
    {const result: Event<AN> = sample({source:aNum              })}
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Argument of type '{ source: { a: Store<number>; }; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
          Type '{ source: { a: Store<number>; }; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: { a: Store<number>; }; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
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
        Argument of type '{ source: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
          Type '{ source: Store<{ a: number; }>; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
    No overload matches this call.
      The last overload gave the following error.
        Argument of type '{ source: Store<{ a: number; }>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
          Type '{ source: Store<{ a: number; }>; fn: () => { a: number; }; }' is missing the following properties from type '{ source: Store<{ a: number; }>; clock: Clock<unknown>; fn: (source: { a: number; }, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
    Type 'Store<unknown>' is missing the following properties from type 'Event<AN>': filter, filterMap, prepend, getType
    No overload matches this call.
      The last overload gave the following error.
        Argument of type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is not assignable to parameter of type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
          Type '{ source: Event<AN>; fn: ({ a }: AN) => { a: number; }; }' is missing the following properties from type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
    Type 'Store<unknown>' is not assignable to type 'Event<AN>'.
    No overload matches this call.
      The last overload gave the following error.
        Argument of type '{ source: Event<AN>; fn: () => { a: number; }; }' is not assignable to parameter of type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }'.
          Type '{ source: Event<AN>; fn: () => { a: number; }; }' is missing the following properties from type '{ source: Event<AN>; clock: Clock<unknown>; fn: (source: AN, clock: unknown) => { a: number; }; target: \\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]; greedy?: boolean | undefined; }': clock, target
    "
  `)
})
