//@flow

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Effector from 'effector'
import * as EffectorReact from 'effector-react'

import {realmInvoke, realmInterval, realmTimeout} from '../domain'
import {consoleMap} from '../logs'

export function prepareRuntime(effector: typeof Effector, version: string) {
  const EvalRealm = effector.createDomain('EvalRealm')
  const api = {}
  assignEffectorRealm(api, EvalRealm, effector)
  assignEffectorReactRealm(api, EvalRealm, EffectorReact)
  assignLibrary(api, effector)
  assignLibrary(api, EffectorReact)
  return {
    React,
    ReactDOM,
    console: consoleMap(),
    setInterval,
    setTimeout,
    __VERSION__: version,
    effector,
    ...api,
  }
}

function setInterval<TArguments: Array<mixed>>(
  callback: (...args: TArguments) => mixed,
  timeout?: number,
  ...args: TArguments
) {
  const id = global.setInterval(callback, timeout, ...args)
  realmInterval(id)
  return id
}

function setTimeout<TArguments: Array<mixed>>(
  callback: (...args: TArguments) => mixed,
  timeout?: number,
  ...args: TArguments
) {
  const id = global.setTimeout(callback, timeout, ...args)
  realmTimeout(id)
  return id
}

function assignLibrary(target, effector) {
  for (const method in effector) {
    if (method in target) continue
    target[method] = effector[method]
  }
  return target
}

function assignEffectorRealm(target, EvalRealm, effector) {
  return apiMap(target, {
    createEvent: effector.createEvent,
    createEffect: effector.createEffect,
    createStore: effector.createStore,
    createStoreObject: effector.createStoreObject,
    createDomain: effector.createDomain,
    createApi: effector.createApi,
    restoreEvent: effector.restoreEvent,
    restoreEffect: effector.restoreEffect,
    restore: effector.restore,
    combine: effector.combine,
    sample: effector.sample,
    merge: effector.merge,
    //createEvent: EvalRealm.event,
    //createStore: EvalRealm.store,
    //createEffect: EvalRealm.effect,
    //createDomain: EvalRealm.domain,
  })
}

function assignEffectorReactRealm(target, EvalRealm, effector) {
  return apiMap(target, {
    createComponent: effector.createComponent,
  })
}

function apiMap(target, obj) {
  for (const key in obj) {
    target[key] = apiFabric.bind(obj[key], key)
  }
  return target
}

function apiFabric(key, ...args) {
  const instance = this(...args)
  realmInvoke({method: key, instance})
  return instance
}
