//@flow
import {createStore} from 'effector'
const foo = createStore('foo')

const f = a => createStore(a)
