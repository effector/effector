import {is} from '../is'
import {throwError} from '../throw'
import {Domain} from '../unit.h'
import {normalizeValues, cloneGraph} from './util'
import {getMeta} from '../getter'

export function fork(
  domain: Domain,
  {values, handlers}: {values?: any; handlers?: any} = {},
) {
  if (!is.domain(domain)) throwError('first argument of fork should be domain')
  const needToFill = !!values
  const valuesSidMap: Record<string, any> = normalizeValues(
    values || {},
    unit =>
      !is.store(unit) &&
      throwError('Values map can contain only stores as keys'),
  )
  const forked = cloneGraph(domain)
  if (needToFill) {
    Object.assign(forked.sidValuesMap, valuesSidMap)
  }
  if (handlers) {
    forked.handlers = normalizeValues(handlers, unit => {
      if (!is.effect(unit))
        throwError(`Handlers map can contain only effects as keys`)
      if (getMeta(unit, 'attached'))
        throwError('Handlers can`t accept attached effects')
    })
  }
  return forked
}
