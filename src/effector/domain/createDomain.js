//@flow

import {domainFabric} from './domainFabric'
import {normalizeEventConfig, type Config, type DomainConfigPart} from '../config'

export function createDomain(
  nameOrConfig?: string | DomainConfigPart,
  opts?: Config<DomainConfigPart> = {},
) {
  return domainFabric(normalizeEventConfig(nameOrConfig, opts))
}
