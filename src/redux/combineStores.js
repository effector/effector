//@flow

import {combine, createStore, type Store as EffectorStore} from 'effector'
import type {Store} from 'redux'

export function fromReduxStore<T>(reduxStore: Store<T>): EffectorStore<T> {
  const mirrorDefaultState = {
    ...reduxStore.getState(),
  }
  const mirrorStore = createStore(mirrorDefaultState)
  reduxStore.subscribe(() => {
    mirrorStore.setState({
      ...reduxStore.getState(),
    })
  })

  return mirrorStore
}

export function combineStores<A, B, R>(
  reduxStore: Store<A>,
  effectorStore: EffectorStore<B>,
  fn: (a: A, b: B) => R,
): EffectorStore<R> {
  const mirrorStore = combine(fromReduxStore(reduxStore), effectorStore, fn)

  //$off
  mirrorStore.dispatch = reduxStore.dispatch

  return mirrorStore
}
