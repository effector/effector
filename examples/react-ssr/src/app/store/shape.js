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
 order: ([1, 2]: ID[]),
 status: new Map<ID, TodoStatus>([[1, 'active'], [2, 'active']]),
 visible: new Map<ID, boolean>([[1, true], [2, true]]),
 selected: (null: ID | null),
})

export const {todos, nextID, filterStatus} = restore({
 todos: ([
  {
   id: 1,
   text: 'ook',
   date: new Date(),
  },
  {
   id: 2,
   text: 'ook 2',
   date: new Date(),
  },
 ]: TodoItem[]),
 nextID: (3: ID),
 filterStatus: ('all': ShowFilter),
})
