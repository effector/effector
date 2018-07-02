//@flow
import {createEffect, createApi, type Effect} from 'effector'
import {todos} from './shape'
import type {
 TodoStatus,
 ShowFilter,
 TodoItem,
 PersistData,
 ID,
} from '../index.h'
export const {addTodo, removeTodo} = createApi(todos, {
 addTodo: (todos, newItem: TodoItem) => [...todos, newItem],
 removeTodo: (todos, id: ID) => todos.filter(item => item.id !== id),
})

export const saveAll: Effect<PersistData, void> = createEffect('save all todos')
export const loadAll: Effect<
 void,
 PersistData,
 'nothing to load',
> = createEffect('load all todos')
