//@flow
import {createStore} from 'effector'
import {useStore} from 'effector-react'

const foo = createStore('foo')
const bar = createStore('bar')
const Foo = () => {
  const data = useStore(foo)
  const data0 = useStore(bar)
}
