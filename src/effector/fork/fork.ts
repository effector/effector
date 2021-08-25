import {is} from '../is'
import {assert} from '../throw'
import type {Domain} from '../unit.h'
import {normalizeValues, cloneGraph} from './util'
import {getMeta} from '../getter'

export function fork(
  domainOrConfig?: Domain | {values?: any; handlers?: any},
  optiionalConfig?: {values?: any; handlers?: any},
) {
  let config: {values?: any; handlers?: any} | void = domainOrConfig as any
  let domain: Domain
  if (is.domain(domainOrConfig)) {
    domain = domainOrConfig
    config = optiionalConfig
  }

  const forked = cloneGraph(domain!)

  if (config) {
    if (config.values) {
      const valuesSidMap = normalizeValues(config.values, unit =>
        assert(is.store(unit), 'Values map can contain only stores as keys'),
      )
      Object.assign(forked.sidValuesMap, valuesSidMap)
    }
    if (config.handlers) {
      forked.handlers = normalizeValues(config.handlers, unit => {
        assert(is.effect(unit), `Handlers map can contain only effects as keys`)
        assert(
          !getMeta(unit, 'attached'),
          'Handlers can`t accept attached effects',
        )
      })
    }
  }
  return forked
}
