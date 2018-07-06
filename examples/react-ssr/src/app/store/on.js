//@flow
import type {Event, Store} from 'effector'

import {
 order,
 status,
 visible,
 selected,
 todos,
 nextID,
 filterStatus,
} from './shape'

import {injectData} from './event'

onInject(injectData, order, ({itemList}) => itemList.order)
onInject(injectData, status, ({itemList}) => new Map(itemList.status))
onInject(injectData, visible, ({itemList}) => new Map(itemList.visible))
onInject(injectData, selected, ({itemList}) => itemList.selected)
onInject(injectData, todos, ({todos}) => todos)
onInject(injectData, nextID, ({nextID}) => nextID)
onInject(injectData, filterStatus, ({filterStatus}) => filterStatus)

function onInject<State, Data>(
 injector: Event<Data>,
 store: Store<State>,
 handler: (payload: Data) => State,
) {
 store.on(injector, (_, payload) => handler(payload))
}
