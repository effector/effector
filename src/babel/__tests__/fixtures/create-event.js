//@flow

import {createEvent} from 'effector'

const foo = createEvent()
const bar = createEvent('hello')
const baz = createEvent({name: 'nice'})
const f = () => createEvent()

const {sid} = createEvent()
const {name} = createEvent('foo')
const {shortName} = createEvent({name: 'foo'})
