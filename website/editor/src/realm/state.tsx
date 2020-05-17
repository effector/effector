import {createStore, Event, Store, Effect, Domain} from 'effector'
import {StoreView} from 'effector-react'

export const intervals: Store<IntervalID[]> = createStore([])
export const timeouts: Store<TimeoutID[]> = createStore([])

export const listeners: Store<
  Array<{
    type: string,
    target: any,
    fn: Function,
    options?: any,
  }>,
> = createStore([])

export const stats: Store<{
  event: Event<any>[],
  store: Store<any>[],
  effect: Effect<any, any, any>[],
  domain: Domain[],
  component: StoreView<any, any>[],
}> = createStore({
  event: [],
  store: [],
  effect: [],
  domain: [],
  component: [],
})
