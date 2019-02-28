//@flow
//@jsx fx
//eslint-disable-next-line no-unused-vars
import {fx, stringRefcount, isStore} from 'effector/stdlib'

import {createEvent, forward} from 'effector/event'
import type {Store} from './index.h'
import {storeObjectName, storeObjectArrayName} from './setStoreName'
import {storeFabric} from './storeFabric'

const nextUpdaterID = stringRefcount()
function getFreshArray() {
  return this().slice()
}
function getFreshObject() {
  return Object.assign({}, this())
}
function storeCombination(
  obj: any,
  {freshGetter, nameSetter, initializer}: any,
) {
  const updater: any = createEvent('update ' + nextUpdaterID())
  const name = nameSetter(obj)
  const {stateNew, pairs} = initializer(obj)
  for (let i = 0; i < pairs.length; i++) {
    const {key, child} = pairs[i]
    if (!isStore(child)) continue
    /*::;(child: Store<any>);*/
    const runner = (
      <run
        runner={() => {
          runner.data.data.pushUpdate({
            event: updater,
            data: getFresh,
          })
        }}
      />
    )
    runner.data.data.pushUpdate = data => {}
    const runCmd = (
      <seq>
        <compute
          fn={state => {
            const current = store.getState()
            const changed = current[key] !== state
            current[key] = state
            return changed
          }}
        />
        <filter filter={changed => changed} />
        {runner}
      </seq>
    )
    stateNew[key] = child.getState()
    forward({
      from: child,
      to: {
        graphite: {seq: runCmd},
      },
    })
  }
  const store = storeFabric({
    name,
    currentState: stateNew,
  })
  const getFresh = freshGetter.bind(store.getState)
  //$todo
  store.defaultShape = obj
  forward({
    from: updater.map(fn => fn()),
    to: store,
  })
  return store
}
function createStoreArray<State: $ReadOnlyArray<Store<any> | any>>(
  obj: State,
): Store<
  $TupleMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
> {
  return storeCombination(obj, {
    freshGetter: getFreshArray,
    nameSetter: storeObjectArrayName,
    initializer(state) {
      const pairs = []
      const stateNew = [...obj]
      for (let i = 0; i < state.length; i++) {
        pairs.push({
          key: i,
          child: state[i],
        })
      }
      return {stateNew, pairs}
    },
  })
}

function createStoreObjectMap<State: {-[key: string]: Store<any> | any}>(
  obj: State,
): Store<
  $ObjMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
> {
  return storeCombination(obj, {
    freshGetter: getFreshObject,
    nameSetter: storeObjectName,
    initializer(state) {
      const pairs = []
      const stateNew = Object.assign({}, obj)
      for (const key in state) {
        pairs.push({
          key,
          child: state[key],
        })
      }
      return {stateNew, pairs}
    },
  })
}

declare export function createStoreObject<
  State: $ReadOnlyArray<Store<any> | any>,
>(
  obj: State,
): Store<
  $TupleMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
declare export function createStoreObject<
  State: {-[key: string]: Store<any> | any},
>(
  obj: State,
): Store<
  $ObjMap<
    State,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
export function createStoreObject(obj: *) {
  if (Array.isArray(obj)) {
    return createStoreArray(obj)
  }
  return createStoreObjectMap(obj)
}
//eslint-disable-next-line
declare export function extract<
  State: $ReadOnlyArray<Store<any> | any>,
  NextState: $ReadOnlyArray<Store<any> | any>,
>(
  store: Store<State>,
  extractor: (_: State) => NextState,
): Store<
  $TupleMap<
    NextState,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
declare export function extract<
  State: {-[key: string]: Store<any> | any},
  NextState: {-[key: string]: Store<any> | any},
>(
  obj: Store<State>,
  extractor: (_: State) => NextState,
): Store<
  $ObjMap<
    NextState,
    //prettier-ignore
    <S>(field: Store<S> | S) => S,
  >,
>
export function extract(store: Store<any>, extractor: any => any) {
  let result
  if ('defaultShape' in store) result = extractor((store: any).defaultShape)
  else result = extractor((store: any).defaultState)
  return createStoreObject(result)
}
