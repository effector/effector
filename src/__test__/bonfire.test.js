//@flow

import {init, update} from '../bonfire'

test('init', () => {
  expect(init(
    {field: 0},
    ({target}) => target,
    (parent, target) => ({
      ...parent,
      target,
    })
  )).toBeDefined()
})

describe('update', () => {
  const state = {
    target: {field: 0},
    another: 'foo',
  }

  const bonfire = init(
    {field: 0},
    ({target}) => target,
    (parent, target) => ({
      ...parent,
      target,
    })
  )
  test('should do immutable update', () => {
    expect(update(
      state,
      (parent, {field}) => ({field: field+1}),
      bonfire
    )).toMatchSnapshot()
  })
  test('should handle the same and undefined return value', () => {
    expect(update(
      state,
      () => {},
      bonfire
    )).toMatchSnapshot()

    expect(update(
      state,
      (parent, value) => value,
      bonfire
    ).parent).toBe(state)
  })
})
