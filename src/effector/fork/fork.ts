import {is} from '../is'
import {assert} from '../throw'
import type {Domain, ValuesMap, HandlersMap, Scope} from '../unit.h'
import {normalizeValues} from './util'
import {createScope} from './createScope'
import {forEach} from '../collection'

type ForkConfig = {
  values?: ValuesMap
  handlers?: HandlersMap
  scope?: Scope
}

export function fork(
  domainOrConfig?: Domain | ForkConfig,
  optionalConfig?: ForkConfig,
) {
  let config: ForkConfig | void = domainOrConfig as any
  let domain: Domain
  if (is.domain(domainOrConfig)) {
    domain = domainOrConfig
    config = optionalConfig
  }

  const scope = createScope(domain!)

  if (config) {
    const oldScope = config.scope
    if (oldScope) {
      const activeEffects = oldScope.activeEffects
      oldScope.activeEffects = []
      scope.activeEffects = activeEffects
      forEach(activeEffects, scopeRef => (scopeRef.ref = scope))
    }
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
