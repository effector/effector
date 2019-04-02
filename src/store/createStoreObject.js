//@flow
import {step, createNode, stringRefcount, isStore} from 'effector/stdlib'
import {unitObjectName} from 'effector/naming'
import {linkGraphs} from 'effector/event'

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'

const nextBarrierID = stringRefcount()
function getFreshArray() {
  return this().slice()
}
function getFreshObject() {
  return Object.assign({}, this())
}
function storeCombination(
  obj: any,
  freshGetter,
  stateNew: any,
  defaultState: any,
) {
  const name = unitObjectName(obj)
  const barrierID = nextBarrierID()
  const nodes = []
  for (const key in obj) {
    const child = obj[key]
    defaultState[key] = isStore(child) ? child.defaultState : child
    if (!isStore(child)) continue
    /*::;(child: Store<any>);*/

    stateNew[key] = child.defaultState
    const node = createNode(
      step.compute({
        fn(state) {
          const current = store.getState()
          const changed = current[key] !== state
          current[key] = state
          return changed
        },
      }),
      step.filter({
        fn: changed => changed,
      }),
      step.barrier({barrierID}),
      step.compute({
        fn(state) {
          return getFresh()
        },
      }),
    )
    nodes.push(node)
    linkGraphs({
      from: child.graphite,
      to: node,
    })
  }
  const store = storeFabric({
    currentState: stateNew,
    //TODO: add location
    config: {name},
  })
  for (const node of nodes) {
    linkGraphs({
      from: node,
      to: store.graphite,
    })
  }
  const getFresh = freshGetter.bind(store.getState)
  ;(store: any).defaultShape = obj
  ;(store: any).defaultState = defaultState
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
  return storeCombination(
    obj,
    getFreshArray,
    obj.slice(),
    [],
    // initializer(state) {
    //   const pairs = []
    //   const stateNew = [...obj]
    //   const defaultState = []
    //   for (let i = 0; i < state.length; i++) {
    //     pairs.push({
    //       key: i,
    //       child: state[i],
    //     })
    //     defaultState[i] = state[i].defaultState
    //   }
    //   return {stateNew, pairs, defaultState}
    // },
  )
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
  return storeCombination(
    obj,
    getFreshObject,
    Object.assign({}, obj),
    {},
    // initializer(state) {
    //   const pairs = []
    //   const stateNew = Object.assign({}, obj)
    //   const defaultState = {}
    //   for (const key in state) {
    //     pairs.push({
    //       key,
    //       child: state[key],
    //     })
    //     defaultState[key] = state[key].defaultState
    //   }
    //   return {stateNew, pairs, defaultState}
    // },
  )
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
