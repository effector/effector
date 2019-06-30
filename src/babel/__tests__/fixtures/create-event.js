//@flow

import {createEvent} from 'effector'

const foo = createEvent()
const bar = createEvent('hello')
const baz = createEvent({name: 'nice'})
const f = () => createEvent()
