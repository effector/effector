//@flow

import {
  createDomain,
  createNode,
  forward,
  sample,
  launch,
  step,
  clearNode,
  is,
} from 'effector'
import * as React from 'react'

import {
  useStore as commonUseStore,
  useStoreMap as commonUseStoreMap,
} from './useStore'
import {useList as commonUseList} from './useList'

const stack = []
const Scope = React.createContext(null)
export const {Provider} = Scope

/* useStore wrapper for scopes */
export function useStore(store) {
  return commonUseStore(useScopeStore(store))
}
/* useList wrapper for scopes */
export function useList(store, opts) {
  return commonUseList(useScopeStore(store), opts)
}
/* useList wrapper for scopes */
export function useStoreMap({store, keys, fn}) {
  return commonUseStoreMap({
    store: useScopeStore(store),
    keys,
    fn,
  })
}
function useScopeStore(store) {
  const scope = React.useContext(Scope)
  return scope.find(store).meta.wrapped
}

/* invoke event in scope */
export function invoke(unit, payload) {
  if (stack.length === 0) {
    throw Error('invoke cannot be called outside of forked .watch')
  }
  launch(stack[stack.length - 1](unit), payload)
}

/* bind event to scope */
export function scopeBind(unit) {
  if (stack.length === 0) {
    throw Error('scopeBind cannot be called outside of forked .watch')
  }
  const result = stack[stack.length - 1](unit)
  return payload => {
    launch(result, payload)
  }
}

/*
bind event to scope. works like React.useCallback, but for scopes
*/
export function useScopeEvent(event) {
  const scope = React.useContext(Scope)
  const unit = scope.find(store)
  const result = payload => launch(unit, payload)
  return React.useCallback(result, [event])
}

/*
const scope = createScope({domain, start})
const alice = await fork(scope, {ctx})
clearNode(alice)
*/
export function createScope({domain, start}) {
  if (!is.domain(domain))
    throw Error('first argument of createScope should be domain')
  return {
    start,
    domain,
  }
}
export async function fork({start, domain}, {ctx}) {
  const {scope, req, syncComplete} = cloneGraph(domain)
  launch(scope.find(start), ctx)
  syncComplete()
  await req
  return scope
}
const noop = () => {}
class Defer {
  constructor() {
    this.req = new Promise(rs => {
      this.rs = rs
    })
  }
}
/**
everything we need to clone graph section
reachable from given unit

to erase, call clearNode(clone.node)
*/
export function cloneGraph(unit) {
  const queryStack = []
  unit = unit.graphite || unit
  const list = flatGraph(unit)
  const clones = list.map(node => {
    const result = createNode({
      node: [...node.seq.map(copyStep)],
      child: [...node.next],
      meta: {...node.meta, forkOf: node},
      scope: {...node.scope},
    })
    result.family = {
      type: node.family.type,
      links: [...node.family.links],
      owners: [...node.family.owners],
    }
    return result
  })
  let defer = new Defer()
  const fxCount = {
    current: 0,
    syncComplete: false,
  }
  let fxID = 0

  let tryCompleteInitPhase = () => {
    if (!fxCount.syncComplete) return
    if (fxCount.current !== 0) return
    const id = fxID
    Promise.resolve().then(() => {
      if (id !== fxID) return
      tryCompleteInitPhase = noop
      const rs = defer.rs
      defer.rs = noop
      defer = null
      rs()
    })
  }

  const refs = new Map()
  const handlers = new Map()

  queryList(clones, () => {
    query({op: 'fx'}, node => {
      const {scope, seq} = node
      scope.done = findClone(scope.done)
      scope.fail = findClone(scope.fail)
      scope.anyway = findClone(scope.anyway)

      forward({
        from: getNode(scope.anyway),
        to: createNode({
          meta: {fork: true},
          node: [
            step.barrier({}),
            step.run({
              fn() {
                fxCount.current -= 1
                // console.log('in flight effects: %d', fxCount.current)
                if (fxCount.current === 0) {
                  fxID += 1
                  tryCompleteInitPhase()
                }
              },
            }),
          ],
        }),
      })
    })
  })

  queryList(list, () => {
    query({unit: 'store'}, item => {
      cloneRef(item.seq[1].data.store)
      cloneRef(item.seq[3].data.store)
    })
    query({op: 'sample', sample: 'source'}, item => {
      cloneRef(item.scope.hasSource)
      cloneRef(item.seq[0].data.store)
    })
    query({op: 'sample', sample: 'clock'}, item => {
      cloneRef(item.scope.hasSource)
      cloneRef(item.scope.sourceState)
      cloneRef(item.scope.clockState)
    })
    query({op: 'sample', sample: 'store'}, item => {
      cloneRef(item.scope.state)
    })
    query({op: 'combine'}, item => {
      cloneRef(item.scope.target)
      cloneRef(item.scope.isFresh)
    })
  })
  list.length = 0

  queryList(clones, () => {
    query({unit: 'store'}, node => {
      const {seq, meta} = node
      const plainState = getRef(seq[1].data.store)
      const oldState = getRef(seq[3].data.store)
      seq[1] = copyStep(seq[1])
      seq[2] = copyStep(seq[2])
      seq[3] = copyStep(seq[3])
      seq[1].data.store = plainState
      seq[2].data.store = oldState
      seq[3].data.store = oldState
      meta.plainState = plainState
      meta.wrapped = wrapStore(node)
    })
    query({op: 'sample', sample: 'source'}, ({scope, seq}) => {
      scope.hasSource = getRef(scope.hasSource)
      seq[0].data.store = getRef(seq[0].data.store)
    })
    query({op: 'sample', sample: 'clock'}, ({scope}) => {
      scope.hasSource = getRef(scope.hasSource)
      scope.sourceState = getRef(scope.sourceState)
      scope.clockState = getRef(scope.clockState)
    })
    query({op: 'sample', sample: 'store'}, ({scope}) => {
      scope.state = getRef(scope.state)
    })
    query({op: 'combine'}, ({scope}) => {
      scope.target = getRef(scope.target)
      scope.isFresh = getRef(scope.isFresh)
    })

    query({op: 'map'}, ({scope}) => {
      if (scope.state) {
        scope.state = getRef(scope.state)
      }
    })
    query({op: 'on'}, ({scope}) => {
      scope.state = getRef(scope.state)
    })

    query({unit: 'domain'}, ({scope}) => {
      scope.history = {
        domains: new Set(),
        stores: new Set(),
        events: new Set(),
        effects: new Set(),
      }
    })
    query({unit: 'effect'}, ({scope, seq}) => {
      scope.runner = findClone(scope.runner)
      seq.push(
        step.tap({
          fn() {
            fxCount.current += 1
            // console.log('in flight effects: %d', fxCount.current)
            fxID += 1
          },
        }),
      )
    })
    query({op: 'watch'}, ({scope}) => {
      const handler = scope.handler
      scope.handler = data => {
        stack.push(findClone)
        try {
          handler(data)
        } finally {
          stack.pop()
        }
      }
    })
  })

  clones.forEach(clone => {
    reallocSiblings(clone.next)
    reallocSiblings(clone.family.links)
    reallocSiblings(clone.family.owners)
  })
  refs.clear()
  handlers.clear()
  return {
    syncComplete() {
      fxCount.syncComplete = true
      if (fxCount.current === 0) {
        fxID += 1
        tryCompleteInitPhase()
      }
    },
    req: defer.req,
    scope: {
      find: findClone,
      graphite: createNode({
        node: [],
        meta: {unit: 'domain'},
        family: {
          type: 'domain',
          links: clones,
        },
      }),
    },
  }
  function queryList(list, cb) {
    queryStack.push(list)
    try {
      cb()
    } finally {
      queryStack.pop()
    }
  }
  function query(shape, cb) {
    const list = queryStack[queryStack.length - 1]
    list
      .filter(item => {
        for (const key in shape) {
          if (item.meta[key] !== shape[key]) return false
        }
        return true
      })
      .forEach(cb)
  }
  function getRef(ref) {
    if (ref == null) throw Error('no ref')
    if (!refs.has(ref)) throw Error('no ref found')
    return refs.get(ref)
  }
  function cloneRef(ref) {
    if (ref == null) throw Error('no ref')
    if (refs.has(ref)) return
    refs.set(ref, {...ref})
  }
  function reallocSiblings(siblings) {
    siblings.forEach((node, i) => {
      if (!node.meta.fork) siblings[i] = findClone(node)
    })
  }
  function findClone(unit) {
    unit = unit.graphite || unit
    const result = clones.find(clone => clone.meta.forkOf === unit)
    if (!result) {
      if (unit.meta.forkOf) {
        console.count('clone of forked item')
        return unit
      }
      console.log('unit not found', unit)
      throw Error('not found')
    }
    return result
  }
  function copyStep(step) {
    return {
      id: step.id,
      type: step.type,
      data: {...step.data},
    }
  }
  function getNode(unit) {
    return unit.graphite || unit
  }

  function flatGraph(unit) {
    const visited = new Set()
    traverse(unit.graphite || unit)
    function traverse(node) {
      if (visited.has(node)) return
      visited.add(node)
      node.next.forEach(traverse)
      node.family.owners.forEach(traverse)
      node.family.links.forEach(traverse)
    }
    return [...visited]
  }
  function wrapStore(node) {
    return {
      kind: 'store',
      getState: () => node.meta.plainState.current,
      updates: {
        watch: cb => createWatch(node, cb),
      },
      graphite: node,
      family: node.family,
    }
  }

  /* watchers for bare graph nodes */
  function createWatch(node, cb) {
    return forward({
      from: node,
      to: createNode({
        node: [
          step.run({
            fn(result) {
              cb(result)
            },
          }),
        ],
        family: {
          type: 'crosslink',
          owners: [],
        },
        meta: {op: 'watch'},
      }),
    })
  }
}
