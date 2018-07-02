//@flow

import {
 createStore,
 createEvent,
 createEffect,
 createStoreObject,
 createApi,
 restore,
 type Store,
 type Effect,
} from 'effector'

import type {
 TodoStatus,
 ShowFilter,
 TodoItem,
 PersistData,
 ID,
} from '../index.h'

export const {order, status, visible, selected} = restore({
 order: ([]: ID[]),
 status: new Map<ID, TodoStatus>(),
 visible: new Map<ID, boolean>(),
 selected: (null: ID | null),
})

export const {todos, nextID, filterStatus} = restore({
 todos: ([]: TodoItem[]),
 nextID: (0: ID),
 filterStatus: ('all': ShowFilter),
})
