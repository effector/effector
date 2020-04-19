//@flow
import {createStore} from 'effector'

const foo = createStore('foo')
const a = createStore('h')
const b = createStore('h', {})
//$off
const c = createStore('h', 23020)
const config = {option: 0}
const dod = createStore(null, config)

const f = a => createStore(a)

const {sid} = createStore(null)
const {shortName} = createStore(null, {name: 'foo'})

createStore(null)

createStore(null)
