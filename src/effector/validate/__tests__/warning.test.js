//@flow

import {warning} from '../warning'

let globalConsole
beforeAll(() => {
  globalConsole = global.console
})
afterAll(() => {
  global.console = globalConsole
})

test('warning', () => {
  const oldConsoleError = global.console.error
  global.console = {
    error: jest.fn((...args) => oldConsoleError(...args)),
  }

  warning(false, 'Expected number but you passed %s.', {bar: 'foo'})

  expect(global.console.error.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "Warning: Expected number but you passed %s.",
        Object {
          "bar": "foo",
        },
      ],
    ]
  `)
})
