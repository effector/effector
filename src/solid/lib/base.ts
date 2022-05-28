import {
  clearNode,
  createNode,
  createWatch,
  is,
  Scope,
  scopeBind,
  step,
  Store,
  Unit,
} from 'effector'
import {throwError} from './throw'
import {Accessor, batch, createMemo, createSignal, onCleanup} from 'solid-js'

const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue

export function useUnitBase<Shape extends {[key: any]: Unit<any>}>(
  shape: Shape,
  scope?: Scope,
) {
  const isShape = !is.unit(shape) && typeof shape === 'object'
  const normShape = isShape ? shape : {unit: shape}
  const isList = Array.isArray(normShape)
  const entries = Object.entries(normShape)

  const initial = isList ? [] : {}
  const stores = []
  const storeIdMap = {}
  const storeSetterMap = {}

  for (const [key, value] of entries) {
    if (is.store(value)) {
      if (stores.includes(value)) {
        throwError(`useUnit store at key "${key}" is already exists in shape`)
      }
      stores.push(value)
      storeIdMap[value.graphite.id] = key
      const [get, set] = createSignal(stateReader(value, scope))
      initial[key] = get
      storeSetterMap[key] = set
    } else {
      if (!is.unit(value)) throwError('expected useUnit argument to be a unit')
      initial[key] = scope ? scopeBind(value, {scope}) : value
    }
  }

  const seq = [
    step.compute({priority: 'effect'}),
    step.compute({priority: 'sampler', batch: true}),
    step.run({
      fn: () => {
        batch(() => {
          for (const store of stores) {
            const key = storeIdMap[store.graphite.id]
            storeSetterMap[key](() => store.getState())
          }
        })
      },
    }),
  ]

  if (scope) {
    const node = createNode({node: seq})
    const scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
    const storeLinks = []
    stores.forEach(store => {
      const id = store.graphite.id
      const links = scopeLinks[id] || []
      scopeLinks[id] = links
      links.push(node)
      storeLinks.push(links)
    })
    onCleanup(() => {
      storeLinks.forEach(links => {
        const idx = links.indexOf(node)
        if (idx !== -1) links.splice(idx, 1)
      })
      clearNode(node)
    })
  } else {
    const node = createNode({
      node: seq,
      parent: stores,
      family: {owners: stores},
    })
    onCleanup(() => {
      clearNode(node)
    })
  }

  return isShape ? initial : initial.unit
}

export function useStoreMapBase<State, Result, Keys extends ReadonlyArray<any>>(
  [configOrStore, separateFn]: [
    configOrStore:
      | {
          store: Store<State>
          keys: Keys
          fn(state: State, keys: Keys): Result
          updateFilter?: (update: Result, current: Result) => boolean
        }
      | Store<State>,
    separateFn?: (state: State, keys: Keys) => Result,
  ],
  scope?: Scope,
): Accessor<Result> {
  let fn: (state: State, keys: Keys) => Result
  let updateFilter: (update: Result, current: Result) => boolean =
    basicUpdateFilter
  let store: Store<State>
  let keys: Keys
  if (separateFn) {
    fn = separateFn
    store = configOrStore as Store<State>
    keys = [] as unknown as Keys
  } else {
    fn = (configOrStore as any).fn
    store = (configOrStore as any).store
    keys = (configOrStore as any).keys
    updateFilter = (configOrStore as any).updateFilter || basicUpdateFilter
  }
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')
  const [result, setResult] = createSignal<{
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    store: Store<State>
    active: boolean
  }>({} as any, {equals: false})
  const refState = result()
  refState.fn = fn
  refState.upd = updateFilter
  refState.init = refState.store === store
  refState.store = store
  refState.active = true
  onCleanup(() => {
    if (refState) {
      refState.active = false
    }
  })
  const inc = () => setResult(refState)

  updateRef(stateReader(store, scope), keys, refState)
  const stop = createWatch({
    unit: store,
    fn: val => updateRef(val, keys, refState, inc),
    scope: scope,
  })

  onCleanup(stop)

  return createMemo(() => result().val)
}

function updateRef<State, Keys, Result>(
  sourceValue: State,
  keys: Keys,
  refState: {
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    active: boolean
  },
  inc?: () => void,
) {
  const newValue = refState.fn(sourceValue, keys)
  if (!refState.init) {
    refState.val = newValue
    refState.init = true
  } else {
    if (
      newValue !== undefined &&
      basicUpdateFilter(newValue, refState.val) &&
      refState.upd(newValue, refState.val)
    ) {
      refState.val = newValue
      inc && refState.active && inc()
    }
  }
}
