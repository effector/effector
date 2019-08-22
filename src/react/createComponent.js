//@flow

import * as React from 'react'
import {type Store, is, createStoreObject, createEvent} from 'effector'
import {useStore} from './useStore'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import type {StoreView} from './index.h'

type Unsubscribe = () => void

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
      store = createStoreObject(shape)
    } else throw Error('shape should be a store or object with stores')
  }
  const storeName = store?.shortName ?? 'Unknown'
  const mounted = createEvent(`${storeName}.View mounted`)
  const unmounted = createEvent(`${storeName}.View unmounted`)
  function RenderComponent(props: Props) {
    const propsRef = React.useRef(props)
    const _store = React.useMemo(
      () => (typeof shape === 'function' ? storeFn(props) : store),
      [],
    )
    const state = useStore(_store)
    useIsomorphicLayoutEffect(() => {
      propsRef.current = props
    }, [props])
    useIsomorphicLayoutEffect(() => {
      mounted({props, state: _store.getState()})
      return () => {
        unmounted({props: propsRef.current, state: _store.getState()})
      }
    }, [])
    return renderProp(props, state)
  }
  RenderComponent.displayName = `${storeName}.View`
  RenderComponent.mounted = mounted
  RenderComponent.unmounted = unmounted
  return RenderComponent
}
