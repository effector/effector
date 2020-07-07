import React from 'react'
import {Store, is, combine, createEvent} from 'effector'
import {useStore} from './useStore'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {StoreView} from './index.h'
import {withDisplayName} from './withDisplayName'
import {throwError} from './throw'

export function createComponent<Props, State>(
  shape: Store<State> | {[key: string]: Store<any> | any},
  renderProp: (props: Props, state: State) => React.ReactNode,
): StoreView<State, Props> {
  let store: Store<any>
  if (is.store(shape)) {
    store = shape
  } else {
    if (typeof shape === 'object' && shape !== null) {
      store = combine(shape)
    } else throwError('shape should be a store or object with stores')
  }
  let storeName = 'Unknown'
  //@ts-ignore
  if (store && store.shortName) {
    storeName = store.shortName
  }
  const mounted = createEvent<any>()
  const unmounted = createEvent<any>()

  function RenderComponent(props: Props) {
    const propsRef = React.useRef(props)
    const state = useStore(store)
    useIsomorphicLayoutEffect(() => {
      mounted({props: propsRef.current, state: store.getState()})
      return () => {
        unmounted({props: propsRef.current, state: store.getState()})
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
