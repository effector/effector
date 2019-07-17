//@flow
import {createStore} from 'effector'
import {createComponent} from 'effector-react'

const foo = createStore('foo')
const Foo = createComponent(foo, (props, data) => null)
