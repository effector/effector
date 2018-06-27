//@flow

import {createStore, createApi, restore, createStoreObject} from '..'
import {createEvent} from 'effector/event'
import {spy} from 'effector/fixtures'

test('.map', () => {
 const newWord = createEvent<string>()
 const a = createStore('word').on(newWord, (_, word) => word)

 const b = a.map(word => word.length)

 const sum = b.map((ln, prevLn) => ln + prevLn, 0)

 sum.watch(spy)

 expect(a.getState()).toBe('word')
 expect(b.getState()).toBe(4)
 expect(sum.getState()).toBe(4)

 newWord('lol')

 expect(a.getState()).toBe('lol')
 expect(b.getState()).toBe(3)
 expect(sum.getState()).toBe(7)

 newWord('long word')

 expect(a.getState()).toBe('long word')
 expect(b.getState()).toBe(9)
 expect(sum.getState()).toBe(16)

 expect(spy).toHaveBeenCalledTimes(3)

 newWord('')

 expect(spy).toHaveBeenCalledTimes(3)
})

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
