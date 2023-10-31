/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event, Store} from 'effector'
const typecheck = '{global}'
type AN = {a: number}
const $num = createStore(0)
const a = createStore({a: 0})
const $aNull = createStore<AN | null>({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aNumNull = createEvent<AN | null>()
const aT = createStore({a: 0})
const aNumT = createEvent<AN>()
const $flag = createStore(true)
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})
const filterFun = (val: AN | null) => val !== null
const filterInf = (val: AN | null): val is AN => val !== null
describe('no target', () => {
  test('no target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNumNull, filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    })}
      {const result: Event<AN> = sample({source:aNum    , fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       })}
      {const result: Store<AN> = sample({source:a       , fn:fn0})}
      {const result: Store<AN> = sample({source:a       , fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:{a:$num}})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:fn0})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , filter:$flag})}
      {const result: Event<AN> = sample({source:a       , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , filter:$flag, fn:({a}) => ({a})})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:(val: AN | null): val is AN => val !== null})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag, fn:({a},c) => ({a:a+c})})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag, fn:({a},c) => ({a:a+c})})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('no target, typed fn', () => {
  test('no target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Event<AN> = sample({source:aNumNull, filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , fn:fn1})}
      {const result: Store<AN> = sample({source:a       , fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , filter:$flag, fn:fn1})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:num, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, filter:$flag, fn:fn2})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:$num, fn:fn2})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, clock:$num, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:$num, filter:$flag, fn:fn2})}
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
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], fn:fn2})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, clock:[num,$num], fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], filter:$flag, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
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
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:$flag, fn:({a}) => ({a})})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean, fn:fn0})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean, fn:fn0})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag, fn:fn0})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag, fn:fn0})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag, fn:({a}) => ({a})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag, fn:({a}) => ({a})})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('unit target, typed fn', () => {
  test('unit target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:fn1})}
      {const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , target:aNumT, filter:$flag, fn:fn1})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:num, target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:num, target:aNumT, filter:Boolean, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:num, target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:num, target:aNumT, filter:Boolean, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:num, target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:num, target:aNumT, filter:$flag, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:num, target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:num, target:aNumT, filter:$flag, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:$num, target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:$num, target:aNumT, filter:Boolean, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:$num, target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:$num, target:aNumT, filter:Boolean, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:$num, target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:$num, target:aNumT, filter:$flag, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:$num, target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:$num, target:aNumT, filter:$flag, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:filterInf, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:filterInf, fn:fn2})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:aNumNull, clock:[num,$num], target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:aNumNull, clock:[num,$num], target:aNumT, filter:Boolean, fn:fn2})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean, fn:fn1})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean, fn:fn1})}
      {const result: Store<AN> = sample({source:$aNull  , clock:[num,$num], target:aT   , filter:Boolean, fn:fn2})}
      {const result: Event<AN> = sample({source:$aNull  , clock:[num,$num], target:aNumT, filter:Boolean, fn:fn2})}
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
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:filterFun, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:filterFun, fn:fn2})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:aNum    , clock:[num,$num], target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:aNum    , clock:[num,$num], target:aNumT, filter:$flag, fn:fn2})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag, fn:fn1})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag, fn:fn1})}
      {const result: Store<AN> = sample({source:a       , clock:[num,$num], target:aT   , filter:$flag, fn:fn2})}
      {const result: Event<AN> = sample({source:a       , clock:[num,$num], target:aNumT, filter:$flag, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('tuple target', () => {
  test('tuple target, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT]})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
        Target requires 2 element(s) but source may have fewer.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:({a}:AN) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:({a}:AN,c) => ({a:a+c})})}
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
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn0})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:({a}) => ({a})})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:({a},c) => ({a:a+c})})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
})
describe('tuple target, typed fn', () => {
  test('tuple target, typed fn, none clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], filter:$flag, fn:fn1})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, event clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:num, target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:num, target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:num, target:[aNumT,aT], filter:$flag, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:num, target:[aNumT,aT], filter:$flag, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, store clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:$num, target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:$num, target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:$num, target:[aNumT,aT], filter:$flag, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
  test('tuple target, typed fn, tuple clock (should pass)', () => {
    //prettier-ignore
    {
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:filterInf, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNumNull, clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:$aNull  , clock:[num,$num], target:[aNumT,aT], filter:Boolean, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[num,$num], target:[aNumT,aT], fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:filterFun, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn2})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn1})}
      {const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[num,$num], target:[aNumT,aT], filter:$flag, fn:fn2})}
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      Type '(EventCallable<AN> | StoreWritable<{ a: number; }>)[]' is not assignable to type '[Event<AN>, Store<AN>]'.
      "
    `)
  })
})
