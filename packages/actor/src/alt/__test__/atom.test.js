//@flow

import {createActorState, eventFabric} from '../atom'

test('smoke', () => {
 const reducer = jest.fn()
 const e1 = eventFabric('e1')
 const e2 = eventFabric('e2')
 const e3 = eventFabric('e3')
 expect(e1).toBeDefined()
 const actor = createActorState({value: 'foo'})
 const actorB = createActorState({value: 0})
 actor.addReducer(reducer)
 actor.on(e1, (state, e, setState) => {
  console.log(state, e, setState)
 })
 e1.create('bar')
 expect(reducer).toHaveBeenCalledTimes(1)

 actorB.addReducer((state, event, setState) => {
  console.log(event)
  setState({value: state.value + 1})
 })

 e1.add(actorB)
 e2.add(actorB)

 e1.create('! a')
 e1.create('! b')
 e2.create('! c')

 expect(actorB.getState()).toMatchObject({value: 3})
 expect(reducer).toHaveBeenCalledTimes(3)
})

function dispatch(event, ...args) {
 //payload, meta, system
 event.create(...args)
}
