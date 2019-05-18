//@flow

import {HK} from 'funland'
import {Equiv} from 'funland-laws'

export interface Filterable<F> {
  filter<A>(f: (a: A) => boolean, fa: HK<F, A>): HK<F, A>;
}

export class FilterableLaws<F_> {
  F: Filterable<F_>

  constructor(F: Filterable<F_>) {
    this.F = F
  }

  identity<A>(fa: HK<F_, A>): Equiv<HK<F_, A>> {
    return Equiv.of(this.F.filter(() => true, fa), fa)
  }

  distributivity<A>(
    fa: HK<F_, A>,
    f: (a: A) => boolean,
    g: (a: A) => boolean,
  ): Equiv<HK<F_, A>> {
    return Equiv.of(
      this.F.filter(x => f(x) && g(x), fa),
      this.F.filter(g, this.F.filter(f, fa)),
    )
  }

  annihilation<A, B>(fa: HK<F_, A>, fb: HK<F_, B>) {
    const F = this.F
    return Equiv.of(F.filter(() => false, fa), F.filter(() => false, fb))
  }
}
