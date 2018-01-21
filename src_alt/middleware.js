//@flow

import type {Middleware} from 'redux'

import {emitter, emit} from './pubsub'
import {Act} from './act'
import {UniqGuard} from './fixtures'
import {resolver, type ActInit} from './act-init'
import {engine, type Engine} from './engine'
import type {Domain} from './domain'

export function effectorMiddleware<State>(domains: Domain[] = []): Middleware<State> {
  return ({dispatch, getState}) => {
    const reduxEngine: Engine<State> = engine()
    reduxEngine.setState(getState())
    domains.forEach(domain => {
      domain.commit = dispatch
    })
    emitter.on('dispatch', e => {
      if (e instanceof Act) {
        if (e.storeId === -1 || e.storeId !== reduxEngine.engineId)
          return
      }
      dispatch(e)
    })
    const actCache: UniqGuard<Act<*>> = new UniqGuard
    return next => (action) => {
      const handler = action instanceof Act
        ? onAct
        : onPlain
      return handler(
        action,
        reduxEngine.engineId,
        actCache,
        next,
        getState
      )
    }
  }
}

function onPlain(
  act,
  storeId: number,
  actCache: UniqGuard<Act<*>>,
  next,
  getState
) {
  const result = next(act)
  const state = getState()
  emitter.emit('state', state)
  return result
}

function onAct<P, T/*:::* */>(
  act: Act<P, T>,
  storeId: number,
  actCache: UniqGuard<Act<*>>,
  next,
  getState
) {
  if (act.storeId !== -1 && act.storeId !== storeId)
    return act
  if (actCache.check(act)) {
    // if (__DEV__) {
    console.log('Message duplication ', act.type, act.id)
    // }
    return act
  }
  let bindAction = act
  function bind() {
    if (bindAction === act)
      bindAction = (Object.create(act): typeof act)
  }
  if (bindAction.storeId === -1) {
    // bind()
    bindAction.storeId = storeId
  }
  if (bindAction.tag === 'async/init') {
    bind()
    const rebind: ActInit<*, *, *> = (bindAction: any)
    rebind.promiseCache = new Promise(
      (rs) => emitter.once(
        `act/async/*/${rebind.seq}`,
        value => resolver(value, rs)
      )
    )
  }
  const pureAction = bindAction.toJSON()

  next(pureAction)
  const state = getState()

  emitter.emit(`state/${bindAction.storeId}`, state)
  emit(bindAction.typeId, bindAction)
  return bindAction
}
