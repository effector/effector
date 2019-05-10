//@flow

import Vue from 'vue'
import {invariant, isStore} from 'effector'

export const effectorMixin = {
  created() {
    const vm = this
    const key = 'state'
    let store = vm.$options.effector
    if (typeof store === 'function') {
      store = store.call(vm)
    }
    if (store) {
      invariant(
        isStore(store),
        'effector-vue: Property should Store, but you passed %s',
        store,
      )
      //$off
      Vue.util.defineReactive(vm, key, store.getState())
      vm._subscription = store.subscribe(value => {
        vm[key] = value
      })
    }
  },
  beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  },
}
