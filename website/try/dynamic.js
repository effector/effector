//@flow

import {forward} from 'effector'
import fetch from 'cross-fetch'

import {
  changeSources,
  realmEvent,
  realmStore,
  realmEffect,
  realmDomain,
  realmInvoke,
  realmInterval,
  realmTimeout,
  resetGraphiteState,
  evalEffect,
  EvalRealm,
  sourceCode,
  graphite,
  graphiteCode,
  codeError,
  realmLog,
  logs,
  intervals,
  timeouts,
  realmStatus,
  stats,
  packageVersions,
  selectVersion,
  retrieveCode,
  retrieveVersion,
} from './domain'
import {versionLoader} from './evaluator'

import {switcher} from './switcher'
import {evaluator} from './evaluator'
import {printLogs} from './logs'

intervals
  .on(realmInterval, (state, id) => [...state, id])
  .on(changeSources, (state) => {
    for (const id of state) {
      global.clearInterval(id)
    }
    return []
  })

timeouts
  .on(realmTimeout, (state, id) => [...state, id])
  .on(changeSources, (state) => {
    for (const id of state) {
      global.clearTimeout(id)
    }
    return []
  })

timeouts.watch(console.log)
intervals.watch(console.log)

// logs.watch(realmLog, (logs, log) => {
//   logs.push(log)
// })

logs
  .on(realmLog, (logs, log) => logs.concat(log))
  .on(changeSources, () => [])

// logs.watch(realmStatus, (logs, {active}) => {
//   if (!active) {
//     printLogs(logs)
//   }
//   logs.length = 0
// })

stats
  .on(realmEvent, ({event, ...rest}, e) => ({
    ...rest,
    event: [...event, e],
  }))
  .on(realmStore, ({store, ...rest}, e) => ({
    ...rest,
    store: [...store, e],
  }))
  .on(realmEffect, ({effect, ...rest}, e) => ({
    ...rest,
    effect: [...effect, e],
  }))
  .on(realmDomain, ({domain, ...rest}, e) => ({
    ...rest,
    domain: [...domain, e],
  }))
  .on(realmStatus, (stats, {active}) => {
    if (!active) return stats
    return {
      store: [],
      event: [],
      effect: [],
      domain: [],
    }
  })

stats.watch(e => {
  //console.log('stats', e);
})

forward({
  from: evalEffect,
  to: resetGraphiteState,
})
evalEffect.use(evaluator)

const graphiteInvokeSetter = (state, event) => {
  let result
  if (state.__shouldReset === true) result = {}
  else result = {...state}
  result[
    `${event.kind} '${event?.compositeName?.fullName || event.shortName}'`
  ] = event.graphite.seq
  return result
}

graphite
  .on(realmEvent, graphiteInvokeSetter)
  .on(realmStore, graphiteInvokeSetter)
  .on(realmEffect, graphiteInvokeSetter)
  .on(resetGraphiteState, e => {
    e.__shouldReset = true
    return e
  })

switcher({
  event: realmInvoke,
  selector: {
    realmEvent: obj => obj.kind === 'event' || obj.kind === 2,
    realmStore: obj => obj.kind === 'store' || obj.kind === 1,
    realmEffect: obj => obj.kind === 'effect' || obj.kind === 3,
    realmDomain: obj => obj.onCreateDomain && obj.domain,
  },
  pre: {
    realmEvent: data => data.instance || {},
    realmStore: data => data.instance || {},
    realmEffect: data => data.instance || {},
    realmDomain: data => data.instance || {},
  },
  post: {
    realmEvent,
    realmStore,
    realmEffect,
    realmDomain,
  },
})

realmEffect.watch(e => {
  realmEvent(e.done)
  realmEvent(e.fail)
})

realmDomain.watch(domain => {
  domain.onCreateEvent(event => {
    //TODO: wrong behaviour?
    if (event.domainName !== domain.compositeName) return
    realmEvent(event)
  })
  domain.onCreateEffect(event => {
    //TODO: wrong behaviour?
    if (event.domainName !== domain.compositeName) return
    realmEffect(event)
  })
  domain.onCreateStore(event => {
    //TODO: wrong behaviour?
    if (event.domainName !== domain.compositeName) return
    realmStore(event)
  })
  domain.onCreateDomain(event => realmDomain(event))
})

// realmInvoke.watch(e => console.log('realm invoke', e));
// realmEvent.watch(e => console.log('realm event', e.shortName));
// realmStore.watch(e => console.log('realm store', e.shortName));

codeError
  .on(evalEffect.done, () => ({
    isError: false,
    message: null,
    stack: null,
  }))
  .on(evalEffect.fail, (_, e) => ({
    isError: true,
    message: e.error.message,
    stack: e.error.stack,
  }))

forward({
  from: changeSources,
  to: sourceCode,
})

{
  let firstCall = true
  sourceCode.watch(e => {
    evalEffect(e)
  })
  sourceCode.watch(versionLoader, e => {
    if (firstCall) {
      firstCall = false
      return
    }
    evalEffect(e)
  })
}

packageVersions.watch(console.log)

changeSources(retrieveCode())
selectVersion(retrieveVersion())
