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

 actorB.on([e1, e2], (state, event, setState) => {
  // console.log(event)
  setState({value: state.value + 1})
 })

 e1.create('! a')
 e1.create('! b')
 e2.create('! c')

 expect(actorB.getState()).toMatchObject({value: 3})
 expect(reducer).toHaveBeenCalledTimes(3)
})

test('raise', () => {
 const reducerA = jest.fn()
 const reducerB = jest.fn()
 const e1 = eventFabric('e1')
 const e2 = eventFabric('e2')
 const e3 = eventFabric('e3')
 const actorA = createActorState({value: 'foo'})
 const actorB = createActorState({value: 0})
 actorA.addReducer(reducerA)
 actorB.addReducer(reducerB)

 actorA.on(e1, (state, e, setState) => {
  console.log(e.valueOf())
  actorA.raise(('raised': 'raised'), e2, actorB)
 })

 actorB.on(e2, (state, event, setState) => {
  console.log(event.valueOf())
  setState({value: state.value + 1})
 })
 e1.create(('void': 'void'))
 e1.create(('void': 'void'))
 e1.create(('void': 'void'))

 //  e1.create('! a')
 //  e1.create('! b')
 //  e2.create('! c')

 expect(reducerA).toHaveBeenCalledTimes(3)
 expect(actorB.getState()).toMatchObject({value: 3})
})
