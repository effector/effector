//@flow

import * as React from 'react'
import {type Store, is, combine, createEvent} from 'effector'
import {useStore} from './useStore'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import type {StoreView} from './index.h'
import {withDisplayName} from './withDisplayName'

export function createComponent<Props: {...}, State>(
  shape:
    | Store<State>
    | {+[key: string]: Store<any> | any, ...}
    | ((props: Props) => Store<State>),
  renderProp: (props: Props, state: State) => React.Node,
): StoreView<State, Props> {
  let storeFn: (props: Props) => Store<any>
  let store: Store<any>
  if (is.store(shape)) {
    store = (shape: any)
  } else if (typeof shape === 'function') {
    storeFn = shape
  } else {
    if (typeof shape === 'object' && shape !== null) {
      //$todo
      store = combine(shape)
    } else throw Error('shape should be a store or object with stores')
  }
  const storeName = store?.shortName ?? 'Unknown'
  const mounted = createEvent(`${storeName}.View mounted`)
  const unmounted = createEvent(`${storeName}.View unmounted`)
  //prettier-ignore
  const instanceFabric: (props: Props) => Store<any> =
    typeof shape === 'function'
      ? (storeFn: any)
      : (props => store)
  function RenderComponent(props: Props) {
    const propsRef = React.useRef(props)
    const ownStore = React.useMemo(() => instanceFabric(props), [])
    const state = useStore(ownStore)
    useIsomorphicLayoutEffect(() => {
      mounted({props: propsRef.current, state: ownStore.getState()})
      return () => {
        unmounted({props: propsRef.current, state: ownStore.getState()})
      }
    }, [])
    const result = renderProp(props, state)
    propsRef.current = props
    return result
  }
  RenderComponent.mounted = mounted
  RenderComponent.unmounted = unmounted
  return withDisplayName(`${storeName}.View`, RenderComponent)
}
