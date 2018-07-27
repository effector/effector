//@flow

import type {Store} from './index.h'
import {type CompositeName, createName} from '../compositeName'

export function setStoreName<State>(store: Store<State>, rawName: string) {
 const compositeName = createName(rawName, store.domainName)
 store.shortName = rawName
 store.compositeName = compositeName
}
