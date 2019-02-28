//@flow

import {createApi, restore, createStoreObject} from '..'

test('create api', () => {
  const shape = restore({
    todos: ['to do', 'list'],
    newTodo: '',
    selected: [1],
  })
  const full = createStoreObject(shape)
  const listCmd = createApi(shape.todos, {
    add(todos, item) {
      return [...todos, item]
    },
    remove(todos, index) {
      return [...todos].splice(index, 1)
    },
  })
  shape.selected.on(listCmd.remove, (selected, index) => {
    const pos = selected.indexOf(index)
    if (pos === -1) return selected
    return [...selected].splice(pos, 1)
  })
  const selectionCmd = createApi(shape.selected, {
    add(selected, item) {
      return [...selected, item]
    },
    remove(selected, index) {
      return [...selected].splice(index, 1)
    },
  })
  expect(full.getState()).toMatchObject({
    todos: ['to do', 'list'],
    newTodo: '',
    selected: [1],
  })
  listCmd.add('new todo')
  selectionCmd.add(2)
  expect(full.getState()).toMatchObject({
    todos: ['to do', 'list', 'new todo'],
    newTodo: '',
    selected: [1, 2],
  })
})
