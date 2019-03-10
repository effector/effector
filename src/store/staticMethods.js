//@flow

import type {Store} from './index.h'

export function withProps<R, S, P>(
  store: Store<S>,
  handler: (store: S, props: P) => R,
): (props: P) => R {
  return (props: P) => handler(store.getState(), props)
}
