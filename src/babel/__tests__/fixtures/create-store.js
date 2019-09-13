//@flow
import {createStore as cc} from 'effector'

const notForPlugin = createStore()
const foo = cc('foo')
const a = cc('h')
const b = cc('h', {})
//$off
const c = cc('h', 23020)
const config = {option: 0}
const dod = cc(null, config)

const f = a => cc(a)
