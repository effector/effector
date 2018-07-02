//@flow
import invariant from 'invariant'
import {combine} from 'effector'

import {
 order,
 status,
 visible,
 selected,
 todos,
 nextID,
 filterStatus,
} from './shape'
import type {TodoStatus, ID} from '../index.h'

export const todosView = combine(
 todos,
 order,
 status,
 visible,
 selected,
 (todos, order, status, visible, selected) => {
  const result = []
  for (const {id, text, date} of todos) {
   const itemIndex = order.findIndex(id_ => id_ === id)
   const itemStatus = status.get(id)
   const itemVisible = visible.get(id)
   const isSelected = selected !== null && selected === id
   invariant(itemIndex > -1, 'order not found')
   invariant(itemStatus, 'status not found')
   invariant(itemVisible, 'visible not found')
   result[itemIndex] = {
    id: (id: ID),
    text,
    date,
    status: (itemStatus: TodoStatus),
    isVisible: itemVisible,
    isSelected,
   }
  }
  return result
 },
)
