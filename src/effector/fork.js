//@flow

import {getGraph} from './getter'
import {bind} from './bind'
import {createDefer} from './defer'
import {watchUnit} from './watch'

import {is, step, launch, createNode} from 'effector'

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
  values = normalizeValues(values)
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
function normalizeValues(values) {
  if (values instanceof Map) {
    const result = {}
    for (const [key, value] of values) {
      result[key.sid] = value
    }
    return result
  }
  return values
}
export function fork(domain, {values = {}, deep = true} = {}) {
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
  values = normalizeValues(values)
  return cloneGraph(domain, {values, deep})
}
export function allSettled(
  start,
  {
    scope: {
      find,
      graphite: {
        scope: {forkInFlightCounter},
      },
    },
    params: ctx,
  },
) {
  const defer = createDefer()
  forkInFlightCounter.scope.defers.push(defer)
  launch(find(start), ctx)
  launch(forkInFlightCounter)
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
function cloneGraph(unit, {values, deep}) {
  const list = flatGraph(unit)
  const refs = new Map()
  const scope = {
    defers: [],
    inFlight: 0,
    fxID: 0,
  }
  const forkInFlightCounter = createNode({
    scope,
    node: [
      step.compute({
        fn(_, scope, stack) {
          if (!stack.parent) {
            scope.fxID += 1
            return
          }
          if (stack.parent.node.meta.named === 'finally') {
            scope.inFlight -= 1
          } else {
            scope.inFlight += 1
            scope.fxID += 1
          }
        },
      }),
      step.barrier({priority: 'sampler'}),
      step.run({
        fn(_, scope) {
          const {inFlight, defers, fxID} = scope
          if (inFlight > 0 || defers.length === 0) return
          Promise.resolve().then(() => {
            if (scope.fxID !== fxID) return
            defers.splice(0, defers.length).forEach(defer => {
              defer.rs()
            })
          })
        },
      }),
    ],
    meta: {unit: 'forkInFlightCounter'},
  })

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
      case 'effect':
        node.next.push(forkInFlightCounter)
        break
      case 'fx':
        scope.finally.next.push(forkInFlightCounter)
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
    graphite: createNode({
      family: {
        type: 'domain',
        links: [forkInFlightCounter, ...clones],
      },
      meta: {unit: 'fork'},
      scope: {forkInFlightCounter},
    }),
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
function forEachRelatedNode({next, family, meta}, cb) {
  if (meta.unit === 'fork' || meta.unit === 'forkInFlightCounter') return
  next.forEach(cb)
  family.owners.forEach(cb)
  family.links.forEach(cb)
}
