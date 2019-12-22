//@flow

import Vue from 'vue'

export function createComponent<S>(options: Object, store?: S) {
  return Vue.extend(
    Object.assign(
      {},
      options,
      store && {
        effector() {
          return store
        },
      },
    ),
  )
}
