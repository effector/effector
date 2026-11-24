import {is, Store, Event, Effect, Scope, launch, createWatch} from 'effector'
import {
  Plugin,
  ComponentOptions,
  customRef,
  shallowRef,
  watch,
  WatchCallback,
  WatchOptions,
} from 'vue-next'

import {unwrapProxy} from './lib/unwrapProxy'
import {deepEqual} from './lib/deepEqual'
import {deepCopy} from './lib/deepCopy'
import {tryOnScopeDispose} from './lib/dispose'
import {resolveScope} from './lib/get-scope'
import {isServerRender} from './lib/ssr'
import {stateReader} from './lib/state-reader'
import {serverRef} from './lib/subscribe'

type Body = {
  vModel: boolean
  value: Store<any> | Event<any> | Effect<any, any, any>
}

/**
 * A server render subscribes to nothing, so a v-model key keeps what `created`
 * or `serverPrefetch` wrote into it and renders that: the client runs the same
 * hooks and gets the same markup. The store is not written, as before.
 * `trigger` lets a computed over the key see the write. Pinned by 'renders a
 * write into a v-model key' in optionsApi.test.ts.
 */
function writableServerRef(store: Store<any>, scope?: Scope) {
  const state = serverRef(store, scope)
  let written = false
  let local: unknown

  return customRef((_, trigger) => ({
    get: () => (written ? local : state.value),
    set(value) {
      written = true
      local = value
      trigger()
    },
  }))
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

    /**
     * `data()` runs with the component as the current instance, so the scope
     * of EffectorScopePlugin is injected here, once per component, the way a
     * composable resolves it in `setup`. Pinned by the "scope" tests in
     * optionsApi.test.ts.
     */
    const scope = resolveScope('VueEffector')
    /**
     * A server render has no unmount to unsubscribe in. It links nothing to
     * the units of the shape and reads the state when the template asks for
     * it. Pinned by the "server render" tests in optionsApi.test.ts.
     */
    const onServer = isServerRender()

    const config: Record<string, Body> = {}
    const state: Record<string, any> = {}

    for (const key in shape) {
      const value = shape[key]

      /**
       * `Boolean(true)` survives the build. A bare `true` ships as `1`, and Vue
       * 3.5 reads a numeric `deep` as the depth to traverse.
       */
      const watchOptions: WatchOptions = {
        deep: Boolean(true),
        immediate: false,
      }
      let watchCallback: WatchCallback

      let nextID = 0

      let fromEvent = false
      let isSelfUpdate = false

      if (is.store(value) || is.event(value) || is.effect(value)) {
        config[key] = {
          value,
          vModel: false,
        }
      } else {
        if (!is.store(value.value)) {
          throw Error(`Effector property ${key}.value should be Store`)
        }
        /** A write into a derived store would part it from its source. */
        if (value.vModel && !is.targetable(value.value)) {
          throw Error(
            `Effector property ${key}.value should not be a derived Store`,
          )
        }
        config[key] = value
      }

      const unit = config[key].value

      /**
       * An event or effect key shows the number of its calls. The watcher
       * sits on the unit itself and counts in the closure: a store made on
       * each mount would stay in `scope.reg` and `scope.additionalLinks`
       * after unmount. Pinned by 'an event or effect key leaves no entry in
       * the scope per mount' in optionsApi.test.ts.
       */
      if (!is.store(unit)) {
        state[key] = shallowRef(null)
      } else if (onServer) {
        state[key] = config[key].vModel
          ? writableServerRef(unit, scope)
          : serverRef(unit, scope)
      } else {
        state[key] = shallowRef(stateReader(unit, scope))
      }

      if (onServer) continue

      /**
       * `createWatch` is the subscription of the composables. With a scope
       * it follows that scope only. It is stopped with the effect scope of
       * the component. Pinned by 'follows the updates of the scope and no
       * other' in optionsApi.test.ts.
       */
      tryOnScopeDispose(
        'VueEffector',
        createWatch({
          unit,
          fn: (payload: unknown) => {
            if (isSelfUpdate) {
              return
            }

            fromEvent = true
            state[key].value = is.store(unit)
              ? shallowRef(payload).value
              : ++nextID
          },
          scope,
        }),
      )

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
        /**
         * `launch` writes into the store in the scope of the component, as
         * useVModel does. An event sampled into the store on each mount
         * would leave an entry in `scope.reg`. Pinned by 'writes a v-model
         * edit into the scope' and 'a v-model key leaves no entry in the
         * scope per mount' in optionsApi.test.ts.
         */
        const store = value.value

        watchCallback = value => {
          isSelfUpdate = true

          if (!fromEvent) {
            launch({target: store, params: unwrapProxy(value), scope})
          }

          fromEvent = false
          isSelfUpdate = false
        }
      }

      watch(() => state[key].value, watchCallback, watchOptions)
    }

    return state
  },
}

export const VueEffector: Plugin = {
  install(app) {
    app.mixin(mixin)
  },
}
