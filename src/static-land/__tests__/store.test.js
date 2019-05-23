//@flow

import * as jv from 'jsverify'
import * as Store from '../store'
import type {Store as StoreType} from 'effector'

import {functorCheck} from './common/functor'
import {applicativeCheck} from './common/applicative'
import {applyCheck} from './common/apply'

function StoreArbitrary<A>(arb: jv.Arbitrary<A>): jv.Arbitrary<StoreType<A>> {
  return arb.smap(i => Store.of(i), b => b.getState())
}

describe('Functor<Store>', () => {
  functorCheck(
    StoreArbitrary(jv.number),
    jv.fun(jv.string),
    jv.fun(jv.int16),
    eq => eq.lh.getState() === eq.rh.getState(),
    Store,
  )
})

describe('Apply<Store>', () => {
  const arbBox = StoreArbitrary(jv.number)
  const genFAtoB = jv
    .fun(jv.string)
    .smap(f => Store.of(f), box => box.getState())
  const genFBtoC = jv
    .fun(jv.int32)
    .smap(f => Store.of(f), box => box.getState())

  applyCheck(
    arbBox,
    jv.fun(jv.string),
    jv.fun(jv.int16),
    genFAtoB,
    genFBtoC,
    eq => eq.lh.getState() === eq.rh.getState(),
    Store,
  )
})

describe('Applicative<Store>', () => {
  const arbBox = StoreArbitrary(jv.number)
  const genFAtoB = jv
    .fun(jv.string)
    .smap(f => Store.of(f), box => box.getState())
  const genFBtoC = jv
    .fun(jv.int32)
    .smap(f => Store.of(f), box => box.getState())

  applicativeCheck(
    arbBox,
    jv.fun(jv.string),
    jv.fun(jv.int16),
    genFAtoB,
    genFBtoC,
    jv.int32,
    eq => eq.lh.getState() === eq.rh.getState(),
    Store,
  )
})
