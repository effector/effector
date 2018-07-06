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

export const {order, status, visible, selected} = restore(
 ({
  order: [],
  status: new Map(),
  visible: new Map(),
  selected: null,
 }: {
  order: ID[],
  status: Map<ID, TodoStatus>,
  visible: Map<ID, boolean>,
  selected: ID | null,
 }),
)

export const {todos, nextID, filterStatus} = restore(
 ({
  todos: [],
  nextID: 0,
  filterStatus: 'all',
 }: {
  todos: TodoItem[],
  nextID: ID,
  filterStatus: ShowFilter,
 }),
)
