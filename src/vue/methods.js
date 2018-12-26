//@flow

import type {EffectorVue} from './'
import {type Store, createEvent, createStore} from 'effector'

export function watchAsStore(
  expOrFn: string | Function,
  options: {
    immediate: boolean,
  } = {
    immediate: true,
  },
): Store<Object> {
  const vm: EffectorVue = this
  const update = createEvent()
  const store = createStore({})
  store.on(update, (state, value) => value)
  let _unwatch
  const watch = () => {
    _unwatch = vm.$watch(
      expOrFn,
      (newValue, oldValue) => {
        console.log(newValue, oldValue)
        update({oldValue, newValue})
      },
      options,
    )
  }

  //$todo
  if (vm._data) {
    watch()
  } else {
    vm.$once('hook:created', watch)
  }

  return store
}

export function store<State>(expOrFn: string | Function): Store<State> {
  const vm: EffectorVue = this
  return vm.$watchAsStore(expOrFn).map(({newValue}) => newValue)
}
