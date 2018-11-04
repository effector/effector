//@flow

import Vue from 'vue'

export const effectorMixin = {
 created() {
  const vm = this
  const key = 'state'
  let store = vm.$options.effector
  if (typeof store === 'function') {
   store = store.call(vm)
  }
  if (store) {
   //$off
   Vue.util.defineReactive(vm, key, undefined)
   if (!store.kind || store.kind !== 1) {
    console.warn(
     'Invalid Observable found in subscriptions option with key "' + key + '".',
     vm,
    )
    return
   }
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
