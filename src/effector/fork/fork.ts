import {is} from '../is'
import {assert} from '../throw'
import type {Domain} from '../unit.h'
import {normalizeValues} from './util'
import {createScope} from './createScope'

export function fork(
  domainOrConfig?: Domain | {values?; handlers?},
  optiionalConfig?: {values?; handlers?},
) {
  let config: {values?; handlers?} | void = domainOrConfig as any
  let domain: Domain
  if (is.domain(domainOrConfig)) {
    domain = domainOrConfig
    config = optiionalConfig
  }

  const scope = createScope(domain!)

  if (config) {
    if (config.values) {
      const valuesSidMap = normalizeValues(config.values, unit =>
        assert(is.store(unit), 'Values map can contain only stores as keys'),
      )
      Object.assign(scope.sidValuesMap, valuesSidMap)
      scope.fromSerialize =
        !Array.isArray(config.values) && !(config.values instanceof Map)
    }
    if (config.handlers) {
      scope.handlers = normalizeValues(config.handlers, unit =>
        assert(
          is.effect(unit),
          `Handlers map can contain only effects as keys`,
        ),
      )
    }
  }
  return scope
}
