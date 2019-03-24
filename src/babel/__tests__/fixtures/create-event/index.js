//@flow

import {createEvent} from 'effector'

const foo = createEvent()
const bar = createEvent('hello')
const f = () => createEvent()
