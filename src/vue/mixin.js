//@flow

import Vue from 'vue'
import {is, createStoreObject, Store} from 'effector'

declare function isStore(a: mixed): boolean %checks(a instanceof Store)

export const effectorMixin = {
  beforeCreate() {
    const vm: {
      $options: {
        effector?: () => Store<mixed> | mixed,
        ...
      },
      _subscription: any,
      [key: string]: any,
      ...
    } = this
    const key = 'state'
    let shape = vm.$options.effector
    if (typeof shape === 'function') {
      shape = shape.call(vm)
    }
    if (shape) {
      if (is.store(shape) /*:: && isStore(shape) */) {
        //$off
        Vue.util.defineReactive(vm, key, shape.getState())
        vm._subscription = shape.watch(value => {
          vm[key] = value
        })
      } else if (
        typeof shape === 'object' &&
        shape !== null /*:: && !isStore(shape) */
      ) {
        const store = createStoreObject(shape)
        for (const key in shape) {
          //$off
          Vue.util.defineReactive(vm, key, store.defaultState[key])
        }
        vm._subscription = store.watch(value => {
          for (const key in value) {
            vm[key] = value[key]
          }
        })
      } else {
        throw Error('property should be Store')
      }
    }
  },
  beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  },
}
