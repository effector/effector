//@flow

import * as jv from 'jsverify'
import {HK, Apply} from 'funland'
import {Equiv, ApplyLaws} from 'funland-laws'
import {functorCheck} from './functor'

export function applyCheck<F_, A, B, C>(
  genFA: jv.Arbitrary<HK<F_, A>>,
  genAtoB: jv.Arbitrary<(a: A) => B>,
  genBtoC: jv.Arbitrary<(b: B) => C>,
  genFAtoB: jv.Arbitrary<HK<F_, (a: A) => B>>,
  genFBtoC: jv.Arbitrary<HK<F_, (b: B) => C>>,
  check: <T>(e: Equiv<HK<F_, T>>) => boolean,
  F: Apply<F_>,
  lawsRef?: ApplyLaws<F_>,
  includeSuperTypes: boolean = true,
) {
  const laws = lawsRef || new ApplyLaws<F_>(F)
  if (includeSuperTypes) {
    functorCheck(genFA, genAtoB, genBtoC, check, F, laws)
  }

  jv.property('apply.composition', genFA, genFAtoB, genFBtoC, (fa, fab, fbc) =>
    check(laws.applyComposition(fa, fab, fbc)),
  )
}
