//@flow

import warning from '..'

test('warning', () => {
  const oldConsoleError = global.console.error
  global.console = {
    error: jest.fn((...args) => oldConsoleError(...args)),
  }

  warning(false, 'Expected number but you passed %s.', {bar: 'foo'})

  expect(global.console.error.mock.calls).toMatchSnapshot()
})
