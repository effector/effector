//@flow
import {createStore, createEvent, createApi} from 'effector'

const foo = createStore([])
const bar = createEvent()

const baz1 = createApi(foo, {reset: () => []})
createApi(foo, {reset: () => []})

const spread = [foo, {reset: () => []}]
const baz4 = createApi(...spread)

const f = () => createApi(foo, {reset: () => []})
