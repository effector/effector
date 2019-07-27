//@flow

import {createStoreObject, sample, forward, is} from 'effector'
import fetch from 'cross-fetch'

import {
  changeSources,
  codeCursorActivity,
  codeMarkLine,
  realmClearNode,
  realmEvent,
  realmStore,
  realmEffect,
  realmDomain,
  realmInvoke,
  realmInterval,
  realmTimeout,
  realmComponent,
  evalEffect,
  sourceCode,
  codeError,
  intervals,
  timeouts,
  realmStatus,
  stats,
  packageVersions,
  selectVersion,
  retrieveCode,
  retrieveVersion,
  version,
} from './domain'
import {typeAtPos, typeNode} from './flow/domain'
import {resetGraphiteState} from './graphite/domain'
import {compress} from './compression'
import {versionLoader, evaluator} from './evaluator'
import {typechecker, typeHoverToggle} from './settings/domain'
import {switcher} from './switcher'

version.on(selectVersion, (_, p) => p)

codeCursorActivity.watch(editor => {
  const cursor = editor.getCursor()
  const body = editor.getValue()
  const line = cursor.line + 1
  const col = cursor.ch
  typeAtPos({
    filename: '/static/repl.js',
    body,
    line,
    col,
  })
})

sample({
  source: typeHoverToggle,
  clock: codeCursorActivity,
  fn: (enabled, editor) => ({enabled, editor}),
}).watch(({enabled, editor}) => {
  const cursor = editor.getCursor()
  if (cursor.line === 0 && cursor.ch === 0) return
  if (enabled) {
    editor.addWidget(
      {
        line: cursor.line,
        ch: cursor.ch,
      },
      typeNode.current,
    )
    if (cursor.outside) {
      typeNode.hide()
    } else {
      typeNode.show()
    }
  }
})

intervals
  .on(realmInterval, (state, id) => [...state, id])
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

timeouts.watch(console.log)
intervals.watch(console.log)

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
  .on(realmComponent, ({component, ...rest}, e) => ({
    ...rest,
    component: [...component, e],
  }))
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

stats.watch(e => {
  //console.log('stats', e);
})

forward({
  from: evalEffect,
  to: resetGraphiteState,
})
evalEffect.use(evaluator)

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

realmInvoke.watch(({method, params, instance}) => {
  if (method === 'restore') {
    if (
      params.length > 0 &&
      (params[0].kind === 'event' || params[0].kind === 'effect')
    ) {
      realmStore(instance)
    } else {
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
    error: null,
    stackFrames: [],
  }))
  .on(evalEffect.fail, (_, e) => {
    if ('stack' in e.error) {
      return {
        isError: true,
        error: e.error,
        stackFrames: [],
      }
    }
    return {
      isError: true,
      error: e.error.original,
      stackFrames: e.error.stackFrames,
    }
  })

let textMarker
codeError.watch(async ({stackFrames}) => {
  if (textMarker) textMarker.clear()
  for (const frame of stackFrames) {
    if (frame._originalFileName !== 'repl.js') continue
    const line = (frame._originalLineNumber || 0) - 1
    const ch = frame._originalColumnNumber || 0
    textMarker = await codeMarkLine({
      from: {line, ch},
      options: {className: 'CodeMirror-lint-mark-error'},
    })
  }
})

changeSources.map(compress).watch(code => {
  localStorage.setItem('code-compressed', code)
})

forward({
  from: changeSources,
  to: sourceCode,
})

{
  const initStore = createStoreObject({
    sourceCode,
    versionLoader,
    typechecker,
  })
  initStore.watch(data => {
    console.log('init store update', data)
    evalEffect(data.sourceCode)
  })
}

packageVersions.watch(console.log)

changeSources(retrieveCode())
selectVersion(retrieveVersion())
