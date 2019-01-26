//@flow

import type {Store} from './index.h'
import type {CompositeName} from '../compositeName'

export function withProps<R, S, P>(
  store: Store<S>,
  handler: (store: S, props: P) => R,
): (props: P) => R {
  return (props: P) => handler(store.getState(), props)
}
export function getDisplayName(store: {
  compositeName?: CompositeName,
  domainName?: CompositeName,
  /*::+*/ id: string,
  /*::...*/
}) {
  if (store.compositeName) {
    return store.compositeName.fullName
  }
  if (store.domainName) {
    return store.domainName.fullName
  }
  return store.id
}
