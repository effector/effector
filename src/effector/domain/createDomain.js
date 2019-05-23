//@flow

import {domainFabric} from './domainFabric'
import {normalizeEventConfig, type Config, type DomainConfigPart} from '../config'

export function createDomain(
  nameOrConfig?: string | DomainConfigPart,
  opts?: Config<DomainConfigPart> = {},
) {
  const {config, name} = normalizeEventConfig(nameOrConfig, opts)
  return domainFabric({
    name: name === undefined ? '' : name,
    config,
  })
}
