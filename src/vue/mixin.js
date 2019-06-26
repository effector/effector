//@flow

import Vue from 'vue'
import {is} from 'effector'

export const effectorMixin = {
  created() {
    const vm = this
    const key = 'state'
    let store = vm.$options.effector
    if (typeof store === 'function') {
      store = store.call(vm)
    }
    if (store) {
      if (!is.store(store)) throw Error('property should Store')
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
