//@flow
/* eslint-disable no-unused-vars */

import {createStore} from 'effector'
import {store} from 'effector-vue'

import setupLocation from '../../setupLocation'
const typecheck = '{global}'

test('store', () => {
  const method: Function = store
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
