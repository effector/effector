//@flow

import {createEffect} from 'effector'

const foo = createEffect()
const bar = createEffect('hello')
const baz = createEffect({
  handler() {
    return 0
  },
})
const quux = createEffect('nice', {
  handler() {
    return 0
  },
})
const f = () => createEffect()
