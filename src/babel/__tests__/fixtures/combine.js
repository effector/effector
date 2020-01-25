//@flow
import {createStore, combine} from 'effector'

const foo = createStore('foo')
const bar = createStore('h')

const baz1 = combine({foo, bar})
const baz2 = combine([foo, bar])
const baz3 = combine(foo, bar, (a, b) => [a, b])

const spread = [foo, bar]
const baz4 = combine(...spread)

const f = a => combine({foo, bar})
