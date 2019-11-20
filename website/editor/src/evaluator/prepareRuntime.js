//@flow

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Effector from 'effector'
import * as EffectorReact from 'effector-react'

import {
  realmInvoke,
  realmInterval,
  realmTimeout,
  realmClearInterval,
  realmClearTimeout,
} from '../realm'
import {consoleMap} from '../logs'

export function prepareRuntime(
  effector: typeof Effector,
  effectorReact: typeof EffectorReact,
  version: string,
) {
  const api = {}
  apiMap(api, {
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
  apiMap(api, {
    createComponent: effectorReact.createComponent,
  })
  assignLibrary(api, effector)
  assignLibrary(api, effectorReact)
  return {
    React,
    ReactDOM,
    console: consoleMap(),
    setInterval,
    setTimeout,
    clearInterval,
    clearTimeout,
    __VERSION__: version,
    effector,
    ...api,
  }
}
function clearInterval(id) {
  realmClearInterval(id)
}
function clearTimeout(id) {
  realmClearTimeout(id)
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
