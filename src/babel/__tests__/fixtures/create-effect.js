//@flow

import {createEffect as cf} from 'effector'

const notForPlugin = createEffect()
const foo = cf()
const bar = cf('hello')
const baz = cf({
  handler() {
    return 0
  },
})
const quux = cf('nice', {
  handler() {
    return 0
  },
})
const f = () => cf()
