//@flow

import {createEvent as e} from 'effector'

const notForPlugin = createEvent()
const foo = e()
const bar = e('hello')
const baz = e({name: 'nice'})
const f = () => e()
