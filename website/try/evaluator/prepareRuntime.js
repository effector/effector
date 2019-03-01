import {realmInvoke, realmLog} from '../domain'

export function prepareRuntime(effector) {
  const EvalRealm = effector.createDomain('EvalRealm')
  const api = {}
  assignRealm(api, EvalRealm, effector)
  assignLibrary(api, effector)
  return {
    effector,
    ...api,
    console: consoleMap(),
  }
}

function assignLibrary(target, effector) {
  for (const method in effector) {
    if (method in target) continue
    target[method] = effector[method]
  }
  return target
}

function assignRealm(target, EvalRealm, effector) {
  return apiMap(target, {
    createEvent: effector.createEvent,
    createEffect: effector.createEffect,
    createStore: effector.createStore,
    createStoreObject: effector.createStoreObject,
    restoreEvent: effector.restoreEvent,
    restoreEffect: effector.restoreEffect,
    restore: effector.restore,
    combine: effector.combine,
    //createEvent: EvalRealm.event,
    //createStore: EvalRealm.store,
    //createEffect: EvalRealm.effect,
    //createDomain: EvalRealm.domain,
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

function consoleMap() {
  const console = {}

  for (const method in global.console) {
    console[method] = logger.bind(method)
  }
  return console
}

function logger(...args) {
  realmLog({method: this, args})
}
