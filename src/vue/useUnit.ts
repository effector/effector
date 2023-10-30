import {is, Store, createWatch, Unit, Event, scopeBind} from 'effector'
import {onUnmounted, readonly, shallowRef} from 'vue-next'

import {stateReader} from './lib/state-reader'
import {getScope} from './lib/get-scope'
import {throwError} from './lib/throw'

export function useUnit<Shape extends {[key: string]: Unit<any>}>(
  config: Shape | {'@@unitShape': () => Shape},
) {
  const {scope} = getScope()

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

  const shape = isList ? [] : ({} as any)
  const storeKeys: string[] = []
  const storeValues: Array<Store<any>> = []
  const eventKeys: string[] = []
  const eventValues: Array<Unit<any>> = []
  for (const key in normShape) {
    const unit = normShape[key]
    if (!is.unit(unit)) throwError('expect useUnit argument to be a unit')
    if (is.event(unit) || is.effect(unit)) {
      shape[key] = scope ? scopeBind(unit as Event<any>, {scope}) : unit
      eventKeys.push(key)
      eventValues.push(unit)
    } else {
      shape[key] = null
      storeKeys.push(key)
      storeValues.push(unit as Store<any>)
    }
  }

  const states: Record<string, any> = {}
  for (const key of storeKeys) {
    const state = stateReader(normShape[key])
    const _ = shallowRef(state)
    const stop = createWatch({
      unit: normShape[key],
      fn: value => {
        _.value = shallowRef(value).value
      },
      scope,
    })

    states[key] = {
      state,
      stop,
      _,
    }
  }

  onUnmounted(() => {
    for (const val of Object.values(states)) {
      val.stop()
    }
  })

  if (isSingleUnit && is.store(config)) {
    return readonly(states.unit._)
  }

  if (isSingleUnit && is.event(config)) {
    if (scope) {
      return scopeBind(config, {scope})
    } else {
      return config
    }
  }

  const result: Record<string, any> = {}

  for (const key of eventKeys) {
    if (scope) {
      result[key] = scopeBind(normShape[key], {scope})
    } else {
      result[key] = normShape[key]
    }
  }

  for (const [key, value] of Object.entries(states)) {
    result[key] = readonly(value._)
  }

  if (isList) {
    return Object.values(result)
  }

  return result
}
