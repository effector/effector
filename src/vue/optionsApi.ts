import {
  is,
  Store,
  sample,
  restore,
  clearNode,
  withRegion,
  createEvent,
} from 'effector'
import {
  Plugin,
  ComponentOptions,
  shallowRef,
  watch,
  WatchCallback,
  WatchOptions,
} from 'vue-next'

import {unwrapProxy} from './lib/unwrapProxy'
import {deepEqual} from './lib/deepEqual'
import {deepCopy} from './lib/deepCopy'

type Body = {
  vModel: boolean
  value: Store<any>
}

const mixin: ComponentOptions = {
  data() {
    let shape = this.$options.effector

    if (!shape) return {}

    if (typeof shape !== 'function') {
      throw Error('[effector] option should be a function')
    }

    shape = shape.call(this)

    if (typeof shape !== 'object') {
      throw Error('Returned value should be an object')
    }

    // @ts-ignore
    this.__clear = createEvent()

    const config: Record<string, Body> = {}
    const state: Record<string, any> = {}

    // @ts-ignore
    withRegion(this.__clear, () => {
      for (const key in shape) {
        const value = shape[key]

        const watchOptions: WatchOptions = {deep: true, immediate: false}
        let watchCallback: WatchCallback

        let nextID = 0

        let fromEvent = false
        let isSelfUpdate = false

        if (is.store(value)) {
          config[key] = {
            value,
            vModel: false,
          }
        } else if (is.event(value) || is.effect(value)) {
          config[key] = {
            value: restore(
              value.map(() => ++nextID),
              null,
            ),
            vModel: false,
          }
        } else {
          if (!is.store(value.value)) {
            throw Error(`Effector property ${key}.value should be Store`)
          }
          config[key] = value
        }

        state[key] = shallowRef(config[key].value.getState())

        config[key].value.updates.watch((payload: unknown) => {
          if (isSelfUpdate) {
            return
          }

          fromEvent = true
          state[key].value = shallowRef(payload).value
        })

        if (!config[key].vModel) {
          let temp: any = null

          watchCallback = (newValue, oldValue) => {
            if (!fromEvent) {
              const isEqual = deepEqual(newValue, temp)

              if (isEqual) {
                temp = null
                return
              }

              console.error(
                `[${key}] is immutable value. You must update this value via effector events`,
              )

              temp = deepCopy(oldValue)
              state[key].value = deepCopy(oldValue)
            }

            fromEvent = false
          }
        } else {
          const updated = createEvent<unknown>()
          sample({clock: updated, target: value.value})

          watchCallback = value => {
            isSelfUpdate = true

            if (!fromEvent) {
              updated(unwrapProxy(value))
            }

            fromEvent = false
            isSelfUpdate = false
          }
        }

        watch(() => state[key].value, watchCallback, watchOptions)
      }
    })

    return state
  },

  beforeUnmount() {
    if (this.__clear) {
      clearNode(this.__clear)
    }
  },
}

export const VueEffector: Plugin = {
  install(app) {
    app.mixin(mixin)
  },
}
