//@flow

import {traversable, store, state, identity} from 'fp-ts'

import {Lens, fromTraversable} from 'monocle-ts'

class DataType<D> {
  value: identity.Identity<D>
  change<T, Ctx>(lens: Lens<D, T>, payload: Ctx) {
    identity.identity
    const from: Traversable =
      fromTraversable(this.value)
    const val = traversable.sequence(
      this.value,
      lens
    )
    return this.value
  }
}
