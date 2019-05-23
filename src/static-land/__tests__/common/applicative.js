//@flow

import * as jv from 'jsverify'
import {HK, Applicative} from 'funland'
import {Equiv, ApplicativeLaws} from 'funland-laws'
import {applyCheck} from './apply'

export function applicativeCheck<F, A, B, C>(
  genFA: jv.Arbitrary<HK<F, A>>,
  genAtoB: jv.Arbitrary<(a: A) => B>,
  genBtoC: jv.Arbitrary<(b: B) => C>,
  genFAtoB: jv.Arbitrary<HK<F, (a: A) => B>>,
  genFBtoC: jv.Arbitrary<HK<F, (b: B) => C>>,
  genA: jv.Arbitrary<A>,
  check: <T>(e: Equiv<HK<F, T>>) => boolean,
  F_: Applicative<F>,
  lawsRef?: ApplicativeLaws<F>,
  includeSuperTypes: boolean = true,
) {
  const laws = lawsRef || new ApplicativeLaws<F>(F_)
  if (includeSuperTypes) {
    applyCheck(genFA, genAtoB, genBtoC, genFAtoB, genFBtoC, check, F_, laws)
  }

  jv.property('applicative.identity', genFA, fa =>
    check(laws.applicativeIdentity(fa)),
  )

  jv.property('applicative.homomorphism', genA, genAtoB, (a, f) =>
    check(laws.applicativeHomomorphism(a, f)),
  )

  jv.property('applicative.interchange', genA, genFAtoB, (a, ff) =>
    check(laws.applicativeInterchange(a, ff)),
  )

  jv.property('applicative.map', genFA, genAtoB, (fa, f) =>
    check(laws.applicativeMap(fa, f)),
  )
}
