import {getForkPage, getGraph, getLinks, getOwners, getParent} from './getter'
import {bind} from './bind'
import {createDefer} from './defer'
import {watchUnit} from './watch'
import {is, isObject} from './is'
import {throwError} from './throw'
import {launch, forkPage, setForkPage, currentPage} from './kernel'
import {createNode} from './createNode'
import {step} from './typedef'
import {Domain, Scope, Store} from './unit.h'
import {Node, StateRef} from './index.h'
import {removeItem, forEach, includes, forIn} from './collection'
import {
  DOMAIN,
  STORE,
  EVENT,
  EFFECT,
  SAMPLER,
  MAP,
  FORK_COUNTER,
  SCOPE,
} from './tag'

/**
 hydrate state on client

 const root = createDomain()
 hydrate(root, {
  values: window.__initialState__
})

 */
export function hydrate(domain: Domain | Scope, {values}: {values: any}) {
  if (!isObject(values)) {
    throwError('values property should be an object')
  }
  const normalizedValues = normalizeValues(values)
  let storeWatches: Node[]
  let storeWatchesRefs: any[]
  let forkPage: Scope
  if (is.scope(domain)) {
    forkPage = domain
    storeWatches = []
    storeWatchesRefs = []
    forIn(normalizedValues, (val, sid) => {
      //@ts-ignore
      const node = domain.sidMap[sid]
      if (node) {
        storeWatches.push(node)
        storeWatchesRefs.push(val)
        ;(domain as any).changedStores.add(node.meta.forkOf.id)
      }
    })
  } else if (is.domain(domain)) {
    const fillResult = fillValues({
      flatGraphUnits: flatGraph(domain),
      values: normalizedValues,
      collectWatches: true,
    })
    storeWatches = fillResult.storeWatches
    storeWatchesRefs = fillResult.storeWatchesRefs.map(({current}) => current)
  } else {
    throwError('first argument of hydrate should be domain or scope')
  }

  launch({
    target: storeWatches!,
    params: storeWatchesRefs!,
    forkPage: forkPage!,
  })
}

function fillValues({
  flatGraphUnits,
  values,
  collectWatches,
}: {
  flatGraphUnits: Node[]
  values: Record<string, any>
  collectWatches: boolean
}) {
  const storeWatches: Node[] = []
  const storeWatchesRefs: StateRef[] = []
  const refsMap = {} as Record<string, StateRef>
  const predefinedRefs = new Set()
  const valuesSidList = Object.getOwnPropertyNames(values)
  forEach(flatGraphUnits, node => {
    const {reg} = node
    const {op, unit, sid} = node.meta
    if (unit === STORE) {
      if (sid && includes(valuesSidList, sid)) {
        const {state} = node.scope
        state.current = values[sid]
        predefinedRefs.add(state)
      }
    }
    if (collectWatches && op === 'watch') {
      const owner = node.family.owners[0]
      if (owner.meta.unit === STORE) {
        storeWatches.push(node)
        storeWatchesRefs.push(owner.scope.state)
      }
    }
    Object.assign(refsMap, reg)
  })
  const refGraph = createRefGraph(refsMap)
  const result = toposort(refGraph)
  forEach(result, id => {
    execRef(refsMap[id])
  })

  return {
    storeWatches,
    storeWatchesRefs,
  }

  function execRef(ref: StateRef) {
    let isFresh = false
    if (ref.before && !predefinedRefs.has(ref)) {
      forEach(ref.before, cmd => {
        switch (cmd.type) {
          case MAP: {
            const from = cmd.from
            ref.current = cmd.fn(from.current)
            break
          }
          case 'field': {
            const from = cmd.from
            if (!isFresh) {
              isFresh = true
              if (Array.isArray(ref.current)) {
                ref.current = [...ref.current]
              } else {
                ref.current = {...ref.current}
              }
            }
            ref.current[cmd.field] = from.current
            break
          }
          case 'closure':
            break
        }
      })
    }
    if (!ref.after) return
    const value = ref.current
    forEach(ref.after, cmd => {
      const to = cmd.to
      // if (predefinedRefs.has(to)) continue
      switch (cmd.type) {
        case 'copy':
          to.current = value
          break
        case MAP:
          to.current = cmd.fn(value)
          break
      }
    })
  }
}

function createRefGraph(refsMap: Record<string, StateRef>) {
  const items = Object.values(refsMap)
  const refGraph = {} as Record<string, string[]>
  forEach(items, ({id}) => {
    refGraph[id] = []
  })
  //prettier-ignore
  forEach(items, ({id, before, after}) => {
    before && forEach(before, cmd => {
      refGraph[cmd.from.id].push(id)
    })
    after && forEach(after, cmd => {
      refGraph[id].push(cmd.to.id)
    })
  })
  return refGraph
}

/**
 serialize state on server
 */
export function serialize(
  {clones, changedStores}: any,
  {
    ignore = [],
    onlyChanges,
  }: {ignore?: Array<Store<any>>; onlyChanges?: boolean} = {},
) {
  const result = {} as Record<string, any>
  forEach(clones, ({meta, scope, reg}) => {
    if (meta.unit !== STORE) return
    const {sid} = meta
    if (!sid) return
    if (onlyChanges || meta.isCombine) {
      if (!changedStores.has(meta.forkOf.id)) return
    }
    result[sid] = reg[scope.state.id].current
  })
  forEach(ignore, ({sid}) => {
    if (sid) delete result[sid]
  })
  return result
}

/** bind event to scope */
export function scopeBind(unit: any) {
  if (!forkPage) {
    throwError('scopeBind cannot be called outside of forked .watch')
  }
  const savedForkPage = forkPage!
  const localUnit = forkPage!.find(unit)
  return is.effect(unit)
    ? (params: any) => {
        const req = createDefer()
        launch({
          target: localUnit,
          params: {
            params,
            req,
          },
          forkPage: savedForkPage,
        })
      }
    : (params: any) => {
        launch({target: localUnit, params, forkPage: savedForkPage})
        return params
      }
}

function normalizeValues(
  values: Map<Store<any>, any> | Record<string, any>,
  assertEach = (key: any, value: any) => {},
) {
  if (values instanceof Map) {
    const result = {} as Record<string, any>
    for (const [key, value] of values) {
      if (!is.unit(key)) throwError('Map key should be a unit')
      assertEach(key, value)
      result[key.sid!] = value
    }
    return result
  }
  return values
}

export function fork(
  domain: Domain,
  {values, handlers}: {values?: any; handlers?: any} = {},
) {
  if (!is.domain(domain)) throwError('first argument of fork should be domain')
  const needToFill = !!values
  values = normalizeValues(
    values || {},
    unit =>
      !is.store(unit) &&
      throwError('Values map can contain only stores as keys'),
  )
  const forked = cloneGraph(domain)
  if (needToFill) {
    fillValues()
  }
  if (handlers) {
    handlers = normalizeValues(
      handlers,
      unit =>
        !is.effect(unit) &&
        throwError(`Handlers map can contain only effects as keys`),
    )
    const handlerKeys = Object.keys(handlers)
    forEach(forked.clones, ({scope, meta}) => {
      if (meta.sid && includes(handlerKeys, meta.sid)) {
        scope.runner.scope.getHandler = () => handlers[meta.sid]
      }
    })
  }
  return forked

  function fillValues() {
    const sourceList = flatGraph(domain)
    const sourceRefsMap = {} as Record<string, StateRef>
    const refsMap = {} as Record<string, StateRef>
    const predefinedRefs = new Set()
    const templateOwnedRefs = new Set<string>()
    const valuesSidList = Object.getOwnPropertyNames(values)
    forEach(sourceList, ({reg, meta}) => {
      Object.assign(sourceRefsMap, reg)
      if (meta.nativeTemplate) forIn(reg, (_, id) => templateOwnedRefs.add(id))
    })
    forEach(forked.clones, node => {
      const {reg} = node
      const {unit, sid} = node.meta
      if (unit === STORE) {
        if (sid && includes(valuesSidList, sid)) {
          const {state} = node.scope
          reg[state.id].current = values[sid]
          predefinedRefs.add(state)
          forked.changedStores.add(node.meta.forkOf.id)
        }
      }
      Object.assign(refsMap, reg)
    })
    const refGraph = createRefGraph(sourceRefsMap)
    const result = toposort(refGraph, templateOwnedRefs)
    forEach(result, id => {
      execRef(refsMap[id], sourceRefsMap[id])
    })

    function execRef(ref: StateRef, sourceRef?: StateRef) {
      let isFresh = false
      if (sourceRef && sourceRef.before && !predefinedRefs.has(ref)) {
        forEach(sourceRef.before, cmd => {
          switch (cmd.type) {
            case MAP: {
              const from = refsMap[cmd.from.id]
              ref.current = cmd.fn(from.current)
              break
            }
            case 'field': {
              const from = refsMap[cmd.from.id]
              if (!isFresh) {
                isFresh = true
                if (Array.isArray(ref.current)) {
                  ref.current = [...ref.current]
                } else {
                  ref.current = {...ref.current}
                }
              }
              ref.current[cmd.field] = from.current
              break
            }
            case 'closure':
              break
          }
        })
      }
      if (!sourceRef || !sourceRef.after) return
      const value = ref.current
      forEach(sourceRef.after, cmd => {
        const to = refsMap[cmd.to.id]
        // if (predefinedRefs.has(to)) continue
        switch (cmd.type) {
          case 'copy':
            to.current = value
            break
          case MAP:
            to.current = cmd.fn(value)
            break
        }
      })
    }
  }
}

function toposort(rawGraph: Record<string, string[]>, ignore?: Set<string>) {
  const graph = {} as Record<string, string[]>
  for (const id in rawGraph) {
    graph[id] = [...new Set(rawGraph[id])]
  }
  const result = [] as string[]
  const visited = {} as Record<string, boolean>
  const temp = {} as Record<string, boolean>
  for (const node in graph) {
    if (!visited[node] && !temp[node]) {
      topologicalSortHelper(node)
    }
  }
  result.reverse()
  if (ignore && ignore.size > 0) {
    const processed = [] as string[]
    const ignored = [...ignore]
    let item: string | void
    while ((item = ignored.shift())) {
      processed.push(item)
      forEach(graph[item], child => {
        if (includes(processed, child) || includes(ignored, child)) return
        ignored.push(child)
      })
    }
    forEach(processed, item => {
      removeItem(result, item)
    })
  }
  return result

  function topologicalSortHelper(node: string) {
    temp[node] = true
    const neighbors = graph[node]
    for (let i = 0; i < neighbors.length; i++) {
      const n = neighbors[i]
      if (temp[n]) {
        continue
        // throw Error('found cycle in DAG')
      }
      if (!visited[n]) {
        topologicalSortHelper(n)
      }
    }
    temp[node] = false
    visited[node] = true
    result.push(node)
  }
}

export function allSettled(
  start: any,
  {scope, params: ctx}: {scope: any; params?: any},
) {
  if (!is.unit(start))
    return Promise.reject(Error('first argument should be unit'))
  const defer = createDefer()
  //@ts-ignore
  defer.parentFork = forkPage
  const {forkInFlightCounter} = scope.graphite.scope
  forkInFlightCounter.scope.defers.push(defer)
  const contextStart = scope.find(start)

  const launchUnits = [contextStart]
  const launchParams = []
  if (is.effect(start)) {
    launchParams.push({
      params: ctx,
      req: {
        rs(value: any) {
          //@ts-ignore
          defer.value = {status: 'done', value}
        },
        rj(value: any) {
          //@ts-ignore
          defer.value = {status: 'fail', value}
        },
      },
    })
  } else {
    launchParams.push(ctx)
  }
  launchUnits.push(forkInFlightCounter)
  launchParams.push(null)
  launch({
    target: launchUnits,
    params: launchParams,
    forkPage: scope,
  })
  return defer.req
}

function flatGraph(unit: any) {
  const list = [] as Node[]
  ;(function traverse(node) {
    if (includes(list, node)) return
    list.push(node)
    forEachRelatedNode(node, traverse)
  })(getGraph(unit))
  return list
}

/**
 everything we need to clone graph section
 reachable from given unit
 */
function cloneGraph(unit: any): Scope {
  const list = flatGraph(unit)
  const refs = new Map()
  const scope = {
    defers: [],
    inFlight: 0,
    fxID: 0,
  }
  const changedStores = new Set<string>()
  const putStoreToChanged = step.compute({
    fn(upd, _, stack) {
      if (
        !stack.node.meta.isCombine ||
        (getParent(stack) && getParent(stack).node.meta.op !== 'combine')
      )
        changedStores.add(stack.node.meta.forkOf.id)
      return upd
    },
  })
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
      step.barrier({priority: SAMPLER}),
      step.run({
        fn(_, scope) {
          const {inFlight, defers, fxID} = scope
          if (inFlight > 0 || defers.length === 0) return
          Promise.resolve().then(() => {
            if (scope.fxID !== fxID) return
            forEach(defers.splice(0, defers.length), (defer: any) => {
              setForkPage(defer.parentFork)
              defer.rs(defer.value)
            })
          })
        },
      }),
    ],
    meta: {unit: FORK_COUNTER},
  })
  const nodeMap = {} as Record<string, Node>
  const sidMap = {} as Record<string, Node>
  const clones = list.map(node => {
    const {seq, next, meta, scope} = node
    const result = createNode({
      node: seq.map(step => ({
        id: step.id,
        type: step.type,
        data: {...step.data},
      })) as any,
      child: [...next],
      meta: {forkOf: node, ...meta},
      scope: {...scope},
    })
    result.family = {
      type: node.family.type,
      links: [...getLinks(node)],
      owners: [...getOwners(node)],
    }
    nodeMap[node.id] = result
    if (meta.sid) sidMap[meta.sid] = result
    return result
  })
  const page = {} as Record<string, StateRef>
  forEach(clones, node => {
    const {
      reg,
      scope,
      meta: {onCopy, op, unit},
    } = node
    forIn(reg, (ref, id) => {
      let newRef = refs.get(ref)
      if (!newRef) {
        newRef = {
          id: ref.id,
          current: ref.current, //ref.id in values ? values[ref.id] : ref.current,
        }
        refs.set(ref, newRef)
      }
      page[id] = reg[id] = newRef
    })
    if (onCopy) {
      forEach(onCopy, (copyField: string) => {
        const origValue = scope[copyField]
        scope[copyField] = Array.isArray(origValue)
          ? origValue.map(getCloned)
          : getCloned(origValue)
      })
    }
    forEachRelatedNode(node, (node, i, siblings) => {
      siblings[i] = getCloned(node)
    })
    const itemTag = op || unit
    switch (itemTag) {
      case STORE:
        node.meta.wrapped = wrapStore(node)
        if (node.meta.sid) node.seq.push(putStoreToChanged)
        break
      // case EVENT:
      //   break
      case EFFECT:
        node.next.push(forkInFlightCounter)
        break
      case 'fx': {
        scope.finally.next.push(forkInFlightCounter)
        break
      }
      // case 'watch':
      //   break
    }
  })

  return {
    cloneOf: unit,
    changedStores,
    nodeMap,
    sidMap,
    clones,
    find: findClone,
    reg: page,
    getState: (store: any) => findClone(store).meta.wrapped.getState(),
    kind: SCOPE,
    graphite: createNode({
      family: {
        type: DOMAIN,
        links: [forkInFlightCounter, ...clones],
      },
      meta: {unit: 'fork'},
      scope: {forkInFlightCounter},
    }),
  }
  function getCloned(unit: any) {
    return nodeMap[getGraph(unit).id]
  }
  function findClone(unit: any) {
    const node = getGraph(unit)
    const index = list.indexOf(node)
    if (index === -1) {
      let unitName = 'unit'
      if (unit !== node && unit.id !== unit.shortName) unitName = unit.shortName
      throwError(`${unitName} not found in forked scope`)
    }
    return clones[index]
  }
}

function wrapStore(node: Node) {
  return {
    kind: STORE,
    getState: () => node.reg[node.scope.state.id].current,
    updates: {
      watch: bind(watchUnit, node),
    },
    graphite: node,
    family: node.family,
  }
}

function forEachRelatedNode(
  node: Node,
  cb: (node: Node, index: number, siblings: Node[]) => void,
) {
  const unit = node.meta.unit
  if (unit === 'fork' || unit === FORK_COUNTER) return
  forEach(node.next, cb)
  forEach(getOwners(node), cb)
  forEach(getLinks(node), cb)
}
