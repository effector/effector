import {is, createWatch, Unit, scopeBind, Scope, EventCallable} from 'effector'
import {onUnmounted, readonly, shallowRef} from 'vue-next'

import {stateReader} from './lib/state-reader'
import {ScopeOptions, resolveScope} from './lib/get-scope'
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

export function useUnit<Shape extends {[key: string]: Unit<any>}>(
  config: Shape | {'@@unitShape': () => Shape},
  opts?: ScopeOptions,
) {
  const scope = resolveScope('useUnit', opts)

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
  const eventKeys: string[] = []

  for (const key in normShape) {
    const unit = normShape[key]
    if (!is.unit(unit)) throwError('expect useUnit argument to be a unit')
    if (is.event(unit) || is.effect(unit)) {
      eventKeys.push(key)
    } else {
      storeKeys.push(key)
    }
  }

  const states: Record<string, any> = {}
  for (const key of storeKeys) {
    // @ts-expect-error TS can't infer that normShape[key] is a Store
    const state = stateReader(normShape[key], scope)
    const ref = shallowRef(state)
    const stop = createWatch({
      unit: normShape[key],
      fn: value => {
        ref.value = shallowRef(value).value
      },
      scope,
    })

    states[key] = {
      stop,
      ref,
    }
  }

  onUnmounted(() => {
    for (const val of Object.values(states)) {
      val.stop()
    }
  })

  if (isSingleUnit && is.store(config)) {
    return readonly(states.unit.ref)
  }

  if (isSingleUnit && (is.event(config) || is.effect(config))) {
    return bindToScope(normShape.unit, scope)
  }

  const result: Record<string, any> = {}

  for (const key of eventKeys) {
    result[key] = bindToScope(normShape[key], scope)
  }
  for (const [key, value] of Object.entries(states)) {
    result[key] = readonly(value.ref)
  }

  if (isList) {
    return Object.values(result)
  }

  return result
}
