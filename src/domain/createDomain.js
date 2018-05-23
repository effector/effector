//@flow

import {domainFabric} from './domainFabric'

export function createDomain(name?: string) {
 return domainFabric(name === undefined ? '' : name)
}
