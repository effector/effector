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
  optiionalConfig?: ForkConfig,
) {
  let config: ForkConfig | void = domainOrConfig as any
  let domain: Domain
  if (is.domain(domainOrConfig)) {
    domain = domainOrConfig
    config = optiionalConfig
  }

  const scope = createScope(domain!)

  if (config) {
    const oldScope = config.scope
    if (oldScope) {
      // Update old scope scopeRef
      // to redirect all effect.finally and scope-binded events to new scope
      oldScope.scopeRef.ref = scope

      // transfer old scope scopeRef to the new scope,
      // so any further fork(scope) calls will also redirect any effect.finally and scope-binded events to new scope
      scope.scopeRef = oldScope.scopeRef
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
