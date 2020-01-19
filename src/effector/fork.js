//@flow

import {getGraph, bind} from './stdlib'
import {createDefer} from './defer'
import {watchUnit} from './watch'

import {is, step, launch, createNode, clearNode} from 'effector'

const stack = []

/**
hydrate state on client

const root = createDomain()
hydrate(root, {
  values: window.__initialState__
})

*/
export function hydrate(domain, {values}) {
  if (!is.domain(domain)) {
    throw Error('first argument of hydrate should be domain')
  }
  if (Object(values) !== values) {
    throw Error('values property should be an object')
  }
  const valuesSidList = Object.getOwnPropertyNames(values)
  const units = flatGraph(domain)
  for (const {meta, scope, reg} of units) {
    if (meta.unit === 'store' && meta.sid && valuesSidList.includes(meta.sid)) {
      reg[scope.state.id].current = values[meta.sid]
    }
  }
}

/**
serialize state on server
*/
export function serialize({clones}) {
  const result = {}
  for (const {meta, scope, reg} of clones) {
    if (meta.unit !== 'store') continue
    if (!meta.sid) continue
    result[meta.sid] = reg[scope.state.id].current
  }
  return result
}

/** invoke event in scope */
export function invoke(unit, payload) {
  if (stack.length === 0) {
    throw Error('invoke cannot be called outside of forked .watch')
  }
  launch(stack[stack.length - 1](unit), payload)
}

/** bind event to scope */
export function scopeBind(unit) {
  if (stack.length === 0) {
    throw Error('scopeBind cannot be called outside of forked .watch')
  }
  const result = stack[stack.length - 1](unit)
  return payload => {
    launch(result, payload)
  }
}
function universalLaunch(unit, payload) {
  if (stack.length > 0) {
    invoke(unit, payload)
  } else {
    launch(unit, payload)
  }
}
export function fork(domain, {values = {}} = {}) {
  if (!is.domain(domain)) throw Error('first argument of fork should be domain')
  if (!domain.graphite.meta.withScopes) {
    domain.graphite.meta.withScopes = true
    domain.onCreateEvent(event => {
      event.create = payload => {
        universalLaunch(event, payload)
        return payload
      }
    })
    domain.onCreateEffect(effect => {
      effect.create = params => {
        const req = createDefer()
        universalLaunch(effect, {params, req})
        return req.req
      }
    })
  }
  return cloneGraph(domain, {values})
}
export function allSettled(start, {scope: {clones, find}, params: ctx}) {
  const defer = createDefer()
  let isSyncComplete = false
  let fxCount = 0
  let fxID = 0

  let tryCompleteInitPhase = () => {
    if (!isSyncComplete) return
    if (fxCount !== 0) return
    const id = fxID
    Promise.resolve().then(() => {
      if (id !== fxID) return
      tryCompleteInitPhase = null
      clearNode(onStart)
      clearNode(onEnd)
      defer.rs()
    })
  }
  const completeInitPhase = () => {
    if (fxCount === 0) {
      fxID += 1
      tryCompleteInitPhase && tryCompleteInitPhase()
    }
  }
  const effects = []
  const finalizers = []
  for (let i = 0; i < clones.length; i++) {
    const node = clones[i]
    if (node.meta.unit !== 'effect') continue
    effects.push(node)
    finalizers.push(node.scope.runner.scope.anyway)
  }
  const onStart = createNode({
    node: [
      step.compute({
        fn() {
          fxCount += 1
          fxID += 1
        },
      }),
    ],
    parent: effects,
  })
  const onEnd = createNode({
    node: [
      step.run({
        fn() {
          fxCount -= 1
          completeInitPhase()
        },
      }),
    ],
    parent: finalizers,
  })
  if (start) {
    launch(find(start), ctx)
  }
  isSyncComplete = true
  completeInitPhase()
  return defer.req
}
function flatGraph(unit) {
  const list = []
  ;(function traverse(node) {
    if (list.includes(node)) return
    list.push(node)
    forEachRelatedNode(node, traverse)
  })(getGraph(unit))
  return list
}
/**
everything we need to clone graph section
reachable from given unit
*/
function cloneGraph(unit, {values}) {
  const list = flatGraph(unit)
  const refs = new Map()

  const clones = list.map(({seq, next, meta, scope, family}) => {
    const result = createNode({
      node: seq.map(step => ({
        id: step.id,
        type: step.type,
        data: Object.assign({}, step.data),
        hasRef: step.hasRef,
      })),
      child: [...next],
      meta: Object.assign({}, meta),
      scope: Object.assign({}, scope),
    })
    result.family = {
      type: family.type,
      links: [...family.links],
      owners: [...family.owners],
    }
    return result
  })

  clones.forEach(node => {
    const {
      reg,
      scope,
      meta: {onCopy, op, unit},
    } = node
    for (const id in reg) {
      const ref = reg[id]
      let newRef = refs.get(ref)
      if (!newRef) {
        newRef = {
          id: ref.id,
          current: ref.id in values ? values[ref.id] : ref.current,
        }
        refs.set(ref, newRef)
      }
      reg[id] = newRef
    }
    if (onCopy) {
      for (let j = 0; j < onCopy.length; j++) {
        scope[onCopy[j]] = findClone(scope[onCopy[j]])
      }
    }
    forEachRelatedNode(node, (node, i, siblings) => {
      siblings[i] = findClone(node)
    })
    const itemTag = op || unit
    switch (itemTag) {
      case 'store':
        node.meta.wrapped = wrapStore(node)
        break
      case 'watch': {
        const handler = scope.fn
        scope.fn = data => {
          stack.push(findClone)
          try {
            handler(data)
          } finally {
            stack.pop()
          }
        }
        break
      }
    }
  })

  return {
    clones,
    find: findClone,
  }
  function findClone(unit) {
    unit = getGraph(unit)
    const index = list.indexOf(unit)
    if (index === -1) throw Error('not found')
    return clones[index]
  }
}

function wrapStore(node) {
  return {
    kind: 'store',
    getState: () => node.reg[node.scope.state.id].current,
    updates: {
      watch: bind(watchUnit, node),
    },
    graphite: node,
    family: node.family,
  }
}
function forEachRelatedNode({next, family}, cb) {
  next.forEach(cb)
  family.owners.forEach(cb)
  family.links.forEach(cb)
}
