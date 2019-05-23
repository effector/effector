//@flow

import * as jv from 'jsverify'
import {HK, Functor} from 'funland'
import {Equiv, FunctorLaws} from 'funland-laws'

export function functorCheck<F_, A, B, C>(
  genFA: jv.Arbitrary<HK<F_, A>>,
  genAtoB: jv.Arbitrary<(a: A) => B>,
  genBtoC: jv.Arbitrary<(b: B) => C>,
  check: <T>(e: Equiv<HK<F_, T>>) => boolean,
  F: Functor<F_>,
  lawsRef?: FunctorLaws<F_>,
) {
  const laws = lawsRef || new FunctorLaws<F_>(F)

  jv.property('functor.identity', genFA, fa => check(laws.identity(fa)))

  jv.property('functor.composition', genFA, genAtoB, genBtoC, (fa, g, f) =>
    check(laws.composition(fa, f, g)),
  )
}
