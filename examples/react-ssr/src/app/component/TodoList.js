//@flow

import * as React from 'react'
import {createComponent} from 'effector-react'

import {todosView} from '../store/view'
import {addTodo} from '../store/event'

export const TodoList = createComponent(todosView, (props: {||}, state) =>
 state.map(item => <div key={item.id}>{item.text}</div>),
)
