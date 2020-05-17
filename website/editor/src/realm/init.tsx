import {is} from 'effector'

import {changeSources, selectVersion} from '../editor'
import {
  realmClearNode,
  realmInvoke,
  realmEvent,
  realmStore,
  realmEffect,
  realmDomain,
  realmInterval,
  realmTimeout,
  realmClearInterval,
  realmClearTimeout,
  realmComponent,
  realmStatus,
  realmListener,
  realmRemoveListener,
} from '.'

import {intervals, timeouts, listeners, stats} from './state'

listeners
  .on(realmListener, (list, record) => [...list, record])
  .on(realmRemoveListener, (list, {type, target, fn}) =>
    list.filter(record => {
      if (record.fn === fn && record.type === type && record.target === target)
        return false
      return true
    }),
  )
  .on(changeSources, listeners => {
    for (const {type, target, fn, options} of listeners) {
      target.removeEventListener.__original__(type, fn, options)
    }
    return []
  })
  .on(selectVersion, listeners => {
    for (const {type, target, fn, options} of listeners) {
      target.removeEventListener.__original__(type, fn, options)
    }
    return []
  })

intervals
  .on(realmInterval, (state, id) => [...state, id])
  .on(realmClearInterval, (state, removed) =>
    state.filter(id => id !== removed),
  )
  .on(changeSources, state => {
    for (const id of state) {
      global.clearInterval(id)
    }
    return []
  })
  .on(selectVersion, state => {
    for (const id of state) {
      global.clearInterval(id)
    }
    return []
  })

timeouts
  .on(realmTimeout, (state, id) => [...state, id])
  .on(realmClearTimeout, (state, removed) => state.filter(id => id !== removed))
  .on(changeSources, state => {
    for (const id of state) {
      global.clearTimeout(id)
    }
    return []
  })
  .on(selectVersion, state => {
    for (const id of state) {
      global.clearTimeout(id)
    }
    return []
  })

stats
  .on(realmEvent, ({event, ...rest}, e) => {
    if (event.includes(e)) return
    return {
      ...rest,
      event: [...event, e],
    }
  })
  .on(realmStore, ({store, ...rest}, e) => {
    if (store.includes(e)) return
    return {
      ...rest,
      store: [...store, e],
    }
  })
  .on(realmEffect, ({effect, ...rest}, e) => {
    if (effect.includes(e)) return
    return {
      ...rest,
      effect: [...effect, e],
    }
  })
  .on(realmDomain, ({domain, ...rest}, e) => {
    if (domain.includes(e)) return
    return {
      ...rest,
      domain: [...domain, e],
    }
  })
  .on(realmComponent, ({component, ...rest}, e) => {
    if (component.includes(e)) return
    return {
      ...rest,
      component: [...component, e],
    }
  })
  .on(realmStatus, (stats, {active}) => {
    if (!active) return stats
    return {
      event: [],
      store: [],
      effect: [],
      domain: [],
      component: [],
    }
  })
  .on(realmClearNode, (stats, unit) => {
    if (is.store(unit)) {
      return {
        ...stats,
        store: [...stats.store.filter(store => store !== unit)],
      }
    }
    if (is.event(unit)) {
      return {
        ...stats,
        event: [...stats.event.filter(event => event !== unit)],
      }
    }
    if (is.effect(unit)) {
      return {
        ...stats,
        effect: [...stats.effect.filter(effect => effect !== unit)],
      }
    }
    return stats
  })
  .reset(changeSources)
  .reset(selectVersion)

realmInvoke.watch(({method, params, instance}) => {
  if (method === 'restore') {
    if (
      params.length > 0 &&
      (params[0].kind === 'event' ||
        params[0].kind === 'effect' ||
        params[0].kind === 'store')
    ) {
      realmStore(instance)
    } else {
      //TODO seems like a bug: restore doesn't have to deal with object shapes
      for (const key in instance) {
        realmStore(instance[key])
      }
    }
  }
  if (method === 'createApi') {
    for (const key in instance) {
      realmEvent(instance[key])
    }
  }
  if (method === 'createComponent') {
    realmComponent(instance)
  }
  if (method === 'clearNode') {
    realmClearNode(params[0])
  }
})

realmEffect.watch(e => {
  realmEvent(e.done)
  realmEvent(e.fail)
})

realmDomain.watch(domain => {
  domain.onCreateEvent(event => {
    //TODO: wrong behaviour?
    if (getDomainName(event) !== domain.compositeName) return
    realmEvent(event)
  })
  domain.onCreateEffect(event => {
    //TODO: wrong behaviour?
    if (getDomainName(event) !== domain.compositeName) return
    realmEffect(event)
  })
  domain.onCreateStore(event => {
    //TODO: wrong behaviour?
    if (getDomainName(event) !== domain.compositeName) return
    realmStore(event)
  })
  domain.onCreateDomain(event => realmDomain(event))
})
function getDomainName(event) {
  if (event.parent) return event.parent.compositeName
  // before 20.9.0
  return event.domainName
}
realmClearInterval.watch(id => {
  global.clearInterval(id)
})
realmClearTimeout.watch(id => {
  global.clearTimeout(id)
})
