//@flow

import Vue from 'vue'

function createComponent<S>(options: Object, store?: S) {
  return Vue.extend({
    ...options,
    ...(store && {
      effector() {
        return store
      },
    }),
  })
}

export {createComponent}