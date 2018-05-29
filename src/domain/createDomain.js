//@flow

import {domainFabric} from './domainFabric'
import {createWrappedDomain as wrap} from './wrapper'
import type {Domain} from './index.h'

export function createDomain(name?: string) {
 return domainFabric(name === undefined ? '' : name)
}
export function createWrappedDomain(
 watcher: Function,
 name?: string,
 parent?: Domain,
): Domain {
 return wrap(watcher, parent?.domain || createDomain, name)
}
