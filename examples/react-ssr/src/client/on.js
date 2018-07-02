//@flow

import {
 order,
 status,
 visible,
 selected,
 todos,
 nextID,
 filterStatus,
} from '../app/store/shape'
import {injectData} from '../app/store/event'

order.on(injectData, (_, {itemList}) => itemList.order)
status.on(injectData, (_, {itemList}) => new Map(itemList.status))
visible.on(injectData, (_, {itemList}) => new Map(itemList.visible))
selected.on(injectData, (_, {itemList}) => itemList.selected)
todos.on(injectData, (_, {todos}) => todos)
nextID.on(injectData, (_, {nextID}) => nextID)
filterStatus.on(injectData, (_, {filterStatus}) => filterStatus)
