import {is, Unit, scopeBind, Scope, EventCallable, Store} from 'effector'
import {readonly} from 'vue-next'

import {ScopeOptions, resolveScope} from './lib/get-scope'
import {subscribeStores} from './lib/subscribe'
import {throwError} from './lib/throw'

/**
 * Without a scope the unit itself is returned, the same way effector-react
 * and effector-solid do it. A `scopeBind(unit, {safe: true})` wrapper would
 * capture the ambient scope at bind time and reset it on every call, pushing
 * calls made inside an effect handler out of the running scope.
 */
function bindToScope(unit: Unit<any>, scope?: Scope) {
  return scope ? scopeBind(unit as EventCallable<any>, {scope}) : unit
}

/** Shared by `useUnit` and `useStore`, `name` only names them in messages. */
export function useUnitBase<Shape extends {[key: string]: Unit<any>}>(
  name: string,
  config: Shape | {'@@unitShape': () => Shape},
  opts?: ScopeOptions,
) {
  const scope = resolveScope(name, opts)

  const isSingleUnit = is.unit(config)

  let normShape: {[key: string]: Unit<any>} = {}
  if (isSingleUnit) {
    normShape = {unit: config}
  } else if ('@@unitShape' in config) {
    if (typeof config['@@unitShape'] === 'function') {
      normShape = config['@@unitShape']()
    } else {
      throwError('expect @@unitShape to be a function')
    }
  } else {
    normShape = config
  }

  const isList = Array.isArray(normShape)

  const storeKeys: string[] = []
  const stores: Store<any>[] = []
  const eventKeys: string[] = []

  for (const key in normShape) {
    const unit = normShape[key]
    if (!is.unit(unit)) throwError(`expect ${name} argument to be a unit`)
    if (is.event(unit) || is.effect(unit)) {
      eventKeys.push(key)
    } else {
      storeKeys.push(key)
      stores.push(unit as Store<any>)
    }
  }

  const refs = subscribeStores(name, stores, scope)

  if (isSingleUnit && is.store(config)) {
    return readonly(refs[0])
  }

  if (isSingleUnit && (is.event(config) || is.effect(config))) {
    return bindToScope(normShape.unit, scope)
  }

  const result: Record<string, any> = {}

  for (const key of eventKeys) {
    result[key] = bindToScope(normShape[key], scope)
  }
  storeKeys.forEach((key, index) => {
    result[key] = readonly(refs[index])
  })

  if (isList) {
    return Object.values(result)
  }

  return result
}

export function useUnit<Shape extends {[key: string]: Unit<any>}>(
  config: Shape | {'@@unitShape': () => Shape},
  opts?: ScopeOptions,
) {
  return useUnitBase('useUnit', config, opts)
}
