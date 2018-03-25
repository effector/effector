//@flow strict

import {create} from '../ID'

test('(id.id: number)', () => {
  const id = create()
  expect(typeof id.id).toBe('number')
})

test('id2.id === id1.id + 1', () => {
  const id1 = create()
  const id2 = create()
  expect(id1.id + 1).toBe(id2.id)
})

test('serialize', () => {
  const id = create()
  expect(JSON.stringify(id)).toBe(`{"id":${id.id}}`)
})

test('id.toValue() === id.id', () => {
  const id = create()
  expect(id.toValue()).toBe(id.id)
})
