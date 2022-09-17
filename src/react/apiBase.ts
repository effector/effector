import {Store, is, step, scopeBind, Scope, Unit, Event} from 'effector'
import React from 'react'
import {useSyncExternalStore} from 'use-sync-external-store/shim'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/shim/with-selector'
import {throwError} from './throw'
import {createWatch} from './createWatch'
import {withDisplayName} from './withDisplayName'

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

export function useStoreBase<State>(store: Store<State>, scope?: Scope) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const subscribe = React.useCallback(
    (cb: () => void) => createWatch(store, cb, scope),
    [store, scope],
  )
  const read = React.useCallback(
    () => stateReader(store, scope),
    [store, scope],
  )
  const currentValue = useSyncExternalStore(subscribe, read, read)

  return currentValue
}

export function useUnitBase<Shape extends {[key: string]: Unit<any>}>(
  shape: Shape,
  scope?: Scope,
) {
  const isSingleUnit = is.unit(shape)
  const normShape: {[key: string]: Unit<any>} = isSingleUnit
    ? {unit: shape}
    : shape
  const isList = Array.isArray(normShape)
  const flagsRef = React.useRef({
    stale: true,
    wasSubscribed: false,
    justSubscribed: false,
  })
  const [eventsShape, storeKeys, storeValues] = React.useMemo(() => {
    flagsRef.current.stale = true
    const shape = Array.isArray(normShape) ? [] : ({} as any)
    const storeKeys: string[] = []
    const storeValues: Array<Store<any>> = []
    for (const key in normShape) {
      const unit = normShape[key]
      if (!is.unit(unit)) throwError('expect useUnit argument to be a unit')
      if (is.event(unit) || is.effect(unit)) {
        shape[key] = scope ? scopeBind(unit as Event<any>, {scope}) : unit
      } else {
        shape[key] = null
        storeKeys.push(key)
        storeValues.push(unit as Store<any>)
      }
    }
    return [shape, storeKeys, storeValues]
  }, [flagsRef, scope, ...Object.keys(normShape), ...Object.values(normShape)])
  const stateRef = React.useRef({value: eventsShape, storeKeys})
  const subscribe = React.useCallback(
    (cb: () => void) => {
      const flags = flagsRef.current
      if (flags.wasSubscribed) flags.justSubscribed = true
      const cbCaller = () => {
        if (!flags.stale) {
          flags.stale = true
          cb()
        }
      }
      const batchStep = step.compute({priority: 'sampler', batch: true})
      const subs = storeValues.map(store =>
        createWatch(store, cbCaller, scope, batchStep),
      )
      flags.wasSubscribed = true
      return () => {
        subs.forEach(fn => fn())
      }
    },
    [storeValues, scope, stateRef, flagsRef],
  )
  const read = React.useCallback(() => {
    const state = stateRef.current
    const flags = flagsRef.current
    let resultValue
    let changed = false
    const oldVal = state.value
    const oldKeys = state.storeKeys
    if (
      (storeKeys.length > 0 || oldKeys.length > 0) &&
      (flags.stale || flags.justSubscribed)
    ) {
      changed = !flags.justSubscribed
      resultValue = isList ? [...eventsShape] : {...eventsShape}
      if (oldKeys.length !== storeKeys.length) {
        changed = true
      }
      for (let i = 0; i < storeKeys.length; i++) {
        const updatedValue = stateReader(storeValues[i], scope)
        const key = storeKeys[i]
        if (!changed) {
          if (!oldKeys.includes(key)) {
            changed = true
          } else {
            changed = oldVal[key] !== updatedValue
          }
        }
        resultValue[key] = updatedValue
      }
    }
    if (changed) {
      state.value = resultValue
    }
    state.storeKeys = storeKeys
    flags.stale = false
    flags.justSubscribed = false
    return isSingleUnit ? state.value.unit : state.value
  }, [subscribe, flagsRef])
  return useSyncExternalStore(subscribe, read, read)
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
    (cb: () => void) => createWatch(store, cb, scope),
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
    const listItems = useStoreBase(list, scope)
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

export function useEventBase(eventObject: any, scope?: Scope) {
  if (!scope) {
    return eventObject
  }
  const isShape = !is.unit(eventObject) && typeof eventObject === 'object'
  const events = isShape ? eventObject : {event: eventObject}

  return React.useMemo(() => {
    if (is.unit(eventObject)) {
      //@ts-expect-error
      return scopeBind(eventObject, {scope})
    }
    const shape = Array.isArray(eventObject) ? [] : ({} as any)
    for (const key in eventObject) {
      shape[key] = scopeBind(eventObject[key], {scope})
    }
    return shape
  }, [scope, ...Object.keys(events), ...Object.values(events)])
}
