//@flow

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Effector from 'effector'
import * as EffectorReact from 'effector-react'

import {realmInvoke, realmInterval, realmTimeout} from '../realm'
import {consoleMap} from '../logs'

export function prepareRuntime(effector: typeof Effector, version: string) {
  const api = {}
  assignEffector(api, effector)
  assignEffectorReact(api, EffectorReact)
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

function assignEffector(target, effector) {
  apiMap(target, {
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
    split: effector.split,
    clearNode: effector.clearNode,
  })
  assignLibrary(target, effector)
}

function assignEffectorReact(target, effectorReact) {
  apiMap(target, {
    createComponent: effectorReact.createComponent,
  })
  assignLibrary(target, effectorReact)
}

function apiMap(target, obj) {
  for (const key in obj) {
    target[key] = apiFabric.bind(null, obj[key], key)
  }
  return target
}

function apiFabric(fn, key, ...args) {
  const instance = fn(...args)
  realmInvoke({method: key, params: args, instance})
  return instance
}
