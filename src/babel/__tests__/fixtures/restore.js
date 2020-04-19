//@flow
import {createEvent, restore} from 'effector'

const foo = createEvent()
const a = restore(foo, null)
const b = restore(foo, null, {})
//$off
const c = restore(foo, null, 23020)
const config = {option: 0}
const dod = restore(foo, null, config)

const f = a => restore(foo, null)

const {sid} = restore(foo, null)
const {shortName} = restore(foo, null, {name: 'bar'})

restore(foo, null)

restore(foo, null)
