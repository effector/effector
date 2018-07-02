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
import {loadAll} from '../app/store/event'

const loaded = loadAll.done

order.on(loaded, (_, {result}) => result.itemList.order)
status.on(loaded, (_, {result}) => new Map(result.itemList.status))
visible.on(loaded, (_, {result}) => new Map(result.itemList.visible))
selected.on(loaded, (_, {result}) => result.itemList.selected)
todos.on(loaded, (_, {result}) => result.todos)
nextID.on(loaded, (_, {result}) => result.nextID)
filterStatus.on(loaded, (_, {result}) => result.filterStatus)
