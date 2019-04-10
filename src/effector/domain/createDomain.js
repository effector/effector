//@flow

import {domainFabric} from './domainFabric'
import {normalizeConfig, type Config, type DomainConfigPart} from '../config'

export function createDomain(
  name?: string,
  config?: Config<DomainConfigPart> = {},
) {
  const opts = normalizeConfig(config)
  return domainFabric({
    name: name === undefined ? '' : name,
    config: opts,
  })
}
