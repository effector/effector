import {
  Store,
  is,
  scopeBind,
  Scope,
  Unit,
  Event,
  createWatch,
  step,
  Node,
} from 'effector'
import React, {useMemo} from 'react'
import {useSyncExternalStore} from 'use-sync-external-store/shim'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/shim/with-selector'
import {throwError} from './throw'
import {withDisplayName} from './withDisplayName'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {Gate} from './index.h'
import {useDeprecate} from './useDeprecate'

const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue
const keysEqual = (a?: readonly any[], b?: readonly any[]) => {
  if (!a || !b || a.length !== b.length) return false

  let isEqual = true

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      isEqual = false
      break
    }
  }

  return isEqual
}

export function useUnitBase<Shape extends {[key: string]: Unit<any>}>(
  shape: Shape | {'@@unitShape': () => Shape},
  scope?: Scope,
) {
  const isSingleUnit = is.unit(shape)
  let normShape: {[key: string]: Unit<any>} = {}
  if (isSingleUnit) {
    normShape = {unit: shape}
  } else if ('@@unitShape' in shape) {
    if (typeof shape['@@unitShape'] === 'function') {
      normShape = shape['@@unitShape']()
    } else {
      throwError('expect @@unitShape to be a function')
    }
  } else {
    normShape = shape
  }
  const isList = Array.isArray(normShape)
  const flagsRef = React.useRef({
    stale: true,
    justSubscribed: false,
    scope,
  })
  const [
    eventsShape,
    storeKeys,
    storeValues,
    eventKeys,
    eventValues,
    usedUnits,
  ] = React.useMemo(() => {
    flagsRef.current.stale = true
    const shape = Array.isArray(normShape) ? [] : ({} as any)
    const storeKeys: string[] = []
    const storeValues: Array<Store<any>> = []
    const eventKeys: string[] = []
    const eventValues: Array<Unit<any>> = []
    for (const key in normShape) {
      if (!Object.prototype.hasOwnProperty.call(normShape, key)) continue
      const unit = normShape[key]
      if (!is.unit(unit)) {
        const keyMessage = isSingleUnit ? 'argument' : `value in key "${key}"`
        throwError(`expect useUnit ${keyMessage} to be a unit`)
      }
      if (is.event(unit) || is.effect(unit)) {
        shape[key] = scope ? scopeBind(unit as Event<any>, {scope}) : unit
        eventKeys.push(key)
        eventValues.push(unit)
      } else {
        shape[key] = null
        storeKeys.push(key)
        storeValues.push(unit as Store<any>)
      }
    }
    const usedUnits = new Set<Node>()
    return [shape, storeKeys, storeValues, eventKeys, eventValues, usedUnits]
  }, [flagsRef, scope, ...Object.keys(normShape), ...Object.values(normShape)])
  const stateRef = React.useRef({
    value: eventsShape,
    storeKeys,
    eventKeys,
    eventValues,
  })
  const subscribe = React.useCallback(
    (cb: () => void) => {
      const flags = flagsRef.current
      flags.justSubscribed = true
      const cbCaller = () => {
        if (!flags.stale) {
          flags.stale = true
          cb()
        }
      }
      return createWatch({
        unit: storeValues,
        fn: cbCaller,
        scope,
        batch: true,
        // @ts-expect-error
        seq: isSingleUnit
          ? []
          : [
              step.filter({
                fn(upd, _, stack) {
                  if (stack.parent) {
                    return usedUnits.has(stack.parent.node)
                  }
                  return false
                },
              }),
            ],
      })
    },
    [storeValues, scope, stateRef, flagsRef, usedUnits, isSingleUnit],
  )
  const read = React.useCallback(() => {
    const state = stateRef.current
    const flags = flagsRef.current
    let resultValue
    let changed = false
    const oldVal = state.value
    const oldStoreKeys = state.storeKeys
    const oldEventKeys = state.eventKeys
    const oldEventValues = state.eventValues
    const scopeChanged = scope !== flags.scope
    if (flags.stale || flags.justSubscribed || scopeChanged) {
      changed = !flags.justSubscribed || scopeChanged
      resultValue = isList ? [...eventsShape] : {...eventsShape}
      if (
        oldStoreKeys.length !== storeKeys.length ||
        oldEventKeys.length !== eventKeys.length
      ) {
        changed = true
      }
      for (let i = 0; i < storeKeys.length; i++) {
        const updatedValue = stateReader(storeValues[i], scope)
        const key = storeKeys[i]
        if (!changed) {
          if (!oldStoreKeys.includes(key)) {
            changed = true
          } else {
            changed = oldVal[key] !== updatedValue
          }
        }
        resultValue[key] = updatedValue
      }
      for (let i = 0; i < eventKeys.length; i++) {
        const updatedValue = eventValues[i]
        const key = eventKeys[i]
        if (!changed) {
          if (!oldEventKeys.includes(key)) {
            changed = true
          } else {
            changed = oldEventValues[oldEventKeys.indexOf(key)] !== updatedValue
          }
        }
      }
    }
    if (changed) {
      state.value = resultValue
    }
    state.storeKeys = storeKeys
    state.eventKeys = eventKeys
    state.eventValues = eventValues
    flags.stale = false
    flags.justSubscribed = !changed
    flags.scope = scope
    return isSingleUnit ? state.value.unit : state.value
  }, [subscribe, storeValues, eventValues, scope, stateRef, flagsRef])
  const result = useSyncExternalStore(subscribe, read, read)
  return useMemo(() => {
    if (isSingleUnit) return result
    usedUnits.clear()
    return getProxy(result, (target, key) => {
      const value = target[key]
      const storeKeyIndex = storeKeys.indexOf(key as any)
      if (storeKeyIndex !== -1) {
        const store = storeValues[storeKeyIndex]
        usedUnits.add((store as any).graphite)
        return stateReader(store, scope)
      }
      return value
    })
  }, [isSingleUnit, result])
  // if (isSingleUnit) return result
  // usedUnits.clear()
  // return getProxy(result, (target, key) => {
  //   const value = target[key]
  //   const storeKeyIndex = storeKeys.indexOf(key as any)
  //   if (storeKeyIndex !== -1) {
  //     const store = storeValues[storeKeyIndex]
  //     usedUnits.add((store as any).graphite)
  //     return stateReader(store, scope)
  //   }
  //   return value
  // })
}

const getProxy: <T extends object>(
  val: T,
  getter: (val: T, key: string) => any,
) => T =
  typeof Proxy !== 'undefined'
    ? (val, getter) => new Proxy(val, {get: getter})
    : (val, getter) => {
        const result = (Array.isArray(val) ? [] : {}) as typeof val
        Object.keys(val).forEach(key => {
          Object.defineProperty(result, key, {
            enumerable: true,
            get: () => getter(val, key),
          })
        })
        return result
      }

export function useStoreMapBase<State, Result, Keys extends ReadonlyArray<any>>(
  [configOrStore, separateFn]: [
    configOrStore:
      | {
          store: Store<State>
          keys: Keys
          fn(state: State, keys: Keys): Result
          updateFilter?: (update: Result, current: Result) => boolean
          defaultValue?: Result
        }
      | Store<State>,
    separateFn?: (state: State, keys: Keys) => Result,
  ],
  scope?: Scope,
): Result {
  let fn: (state: State, keys: Keys) => Result
  let updateFilter: (update: Result, current: Result) => boolean =
    basicUpdateFilter
  let defaultValue: Result | undefined
  let store: Store<State>
  let keys: Keys
  if (separateFn) {
    fn = separateFn
    store = configOrStore as Store<State>
    keys = [] as unknown as Keys
  } else {
    ;({
      fn,
      store,
      keys,
      defaultValue,
      updateFilter = basicUpdateFilter,
    } = configOrStore as any)
  }
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')

  const subscribe = React.useCallback(
    (fn: () => void) => createWatch({unit: store, fn, scope}),
    [store, scope],
  )
  const read = React.useCallback(
    () => stateReader(store, scope),
    [store, scope],
  )

  const stateRef = React.useRef<State>()
  const valueRef = React.useRef<Result>()
  const keysRef = React.useRef(keys)

  const value = useSyncExternalStoreWithSelector(
    subscribe,
    read,
    read,
    state => {
      if (stateRef.current !== state || !keysEqual(keysRef.current, keys)) {
        let result = fn(state, keys)
        if (result === undefined && defaultValue !== undefined) {
          result = defaultValue
        }
        stateRef.current = state
        keysRef.current = keys

        /**
         * skip update, if undefined
         * just like original store or previous implementation
         */
        if (result !== undefined) {
          valueRef.current = result
        }
      }

      return valueRef.current as Result
    },
    (current, update) => !updateFilter(update, current),
  )

  return value
}
export function useListBase<T>(
  list: Store<T[]>,
  renderItem:
    | {
        keys?: any[]
        fn(item: T, index: number): React.ReactNode
        getKey?: (item: T) => string
        placeholder?: React.ReactNode
      }
    | ((item: T, index: number) => React.ReactNode),
  scope?: Scope,
): React.ReactNode {
  let keys = [] as any[]
  let fn
  let getKey: ((item: T) => string) | void
  let placeholder: React.ReactNode | void
  if (typeof renderItem === 'object' && renderItem !== null) {
    if (renderItem.keys) keys = renderItem.keys
    ;({fn, getKey, placeholder} = renderItem)
  } else {
    fn = renderItem
  }
  if (!is.store(list)) throwError('expect useList first argument to be a store')
  if (typeof fn !== 'function')
    throwError("expect useList's renderItem to be a function")
  if (!Array.isArray(keys)) throwError("expect useList's keys to be an array")
  const Item = React.useMemo(() => {
    const Item = withDisplayName(
      `${list.shortName || 'Unknown'}.Item`,
      (
        props:
          | {index: number; keys: any[]; keyVal: never; value: never}
          | {index: never; keys: any[]; keyVal: string; value: T},
      ) => {
        const {index, keys, keyVal, value} = props
        const isKeyed = !!fnRef.current[1]
        if (isKeyed) {
          return fnRef.current[0](value, keyVal as any)
        }
        const item = useStoreMapBase(
          [
            {
              store: list,
              keys: [index, ...keys],
              fn: (list, keys) => list[keys[0]],
            },
          ],
          scope,
        )
        return fnRef.current[0](item, index)
      },
    )
    return React.memo(Item)
  }, [list, scope, !!getKey!])
  const fnRef = React.useRef([fn, getKey!] as const)
  fnRef.current = [fn, getKey!]
  const keysSelfMemo = React.useMemo(() => keys, keys)
  if (getKey!) {
    const listItems = useUnitBase(list, scope)
    if (listItems.length === 0 && placeholder) return placeholder
    return listItems.map(value => {
      const key = fnRef.current[1](value)
      return React.createElement(Item, {
        keyVal: key,
        key,
        keys: keysSelfMemo,
        value,
      })
    })
  } else {
    const length = useStoreMapBase(
      [
        {
          store: list,
          keys: [list],
          fn: list => list.length,
        },
      ],
      scope,
    )
    if (length === 0 && placeholder) return placeholder
    return Array.from({length}, (_, i) =>
      React.createElement(Item, {
        index: i,
        key: i,
        keys: keysSelfMemo,
      }),
    )
  }
}

export function useGateBase<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
  scope?: Scope,
) {
  const {open, close, set} = useUnitBase(
    {
      open: GateComponent.open,
      close: GateComponent.close,
      set: GateComponent.set,
    },
    scope,
  )
  const ForkedGate = React.useMemo(
    () =>
      ({
        open,
        close,
        set,
      } as Gate<Props>),
    [GateComponent, open],
  )

  const propsRef = React.useRef<{value: any; count: number}>({
    value: null,
    count: 0,
  })
  useIsomorphicLayoutEffect(() => {
    ForkedGate.open(propsRef.current.value)
    return () => ForkedGate.close(propsRef.current.value) as any
  }, [ForkedGate])
  if (!shallowCompare(propsRef.current.value, props)) {
    propsRef.current.value = props
    propsRef.current.count += 1
  }
  useIsomorphicLayoutEffect(() => {
    ForkedGate.set(propsRef.current.value)
  }, [propsRef.current.count])
}

function shallowCompare(a: any, b: any) {
  if (a === b) return true
  if (
    typeof a === 'object' &&
    a !== null &&
    typeof b === 'object' &&
    b !== null
  ) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i]
      if (a[key] !== b[key]) return false
    }
    return true
  }
  return false
}
