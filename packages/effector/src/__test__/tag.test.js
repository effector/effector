//@flow

import {toTag} from '../id'

test('should combine tags correctly', () => {
  expect(toTag('foo', 'bar')).toBe('foo/bar')
  expect(toTag('')).toBe('')
  expect(toTag()).toBe('')
  expect(toTag('', 'bar')).toBe('bar')
  expect(toTag('foo', '', 'bar')).toBe('foo/bar')
})
