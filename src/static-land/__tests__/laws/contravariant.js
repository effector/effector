//@flow

import {HK} from 'funland'
import {Equiv} from 'funland-laws'

export interface Contravariant<F> {
  contramap<A, B>(f: (a: A) => B, fa: HK<F, B>): HK<F, A>
}

export class ContravariantLaws<F_> {
  F: Contravariant<F_>

  constructor(F: Contravariant<F_>) {
    this.F = F
  }

  identity<A>(fa: HK<F_, A>): Equiv<HK<F_, A>> {
    return Equiv.of(this.F.contramap(x => x, fa), fa)
  }

  composition<A, B, C>(fa: HK<F_, A>, f: (a: B) => C, g: (a: A) => B) {
    const F = this.F
    return Equiv.of(F.contramap(x => f(g(x)), fa), F.contramap(g, F.contramap(f, fa)))
  }
}
