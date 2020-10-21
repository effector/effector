import {createStore} from 'effector'

const foo = customFabric('x')

const bar = customFabric()

const config = ['x']
const baz = customFabric(...config)

customFabric('x')

const bam = customFabric('x', {name: 'bm'})

function customFabric(params, {sid} = {}) {
  return createStore({params, x: 0}, {sid})
}
