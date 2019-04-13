//@flow

import {invariant} from '../invariant'

test('invariant', () => {
  const oldConsoleError = global.console.error
  global.console = {
    error: jest.fn((...args) => oldConsoleError(...args)),
  }

  expect(() =>
    invariant(false, 'Expected number but you passed %s', 'string'),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Expected number but you passed string"`,
  )
})
