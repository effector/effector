//@flow
/* eslint-disable no-unused-vars */

import {createStore} from 'effector'
import {store} from 'effector-vue'

const typecheck = '{global}'

test('store', () => {
  const method: Function = store
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --flow--
    no errors
    "
  `)
})
