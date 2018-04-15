//@flow

import {createActor, createEvent} from '../actor'

test('smoke', () => {
 const reducer = jest.fn()
 const e1 = createEvent('e1')
 const e2 = createEvent('e2')
 const e3 = createEvent('e3')
 expect(e1).toBeDefined()
 const actor = createActor({value: 'foo'})
 const actorB = createActor({value: 0})
 actor.addReducer(reducer)
 e1.add(actor)
 e1.create('bar')
 expect(reducer).toHaveBeenCalledTimes(1)

 actorB.addReducer((state, event, setState) => {
  console.log(event)
  setState({value: state.value + 1})
 })

 e1.add(actorB)
 e2.add(actorB)

 e1.create()
 e1.create()
 e2.create()

 expect(actorB.getState()).toMatchObject({value: 3})
 expect(reducer).toHaveBeenCalledTimes(3)
})

function map(fn, actor) {
 const update = createEvent('update')
 const resultActor = createActor()
 update.add(resultActor)
 resultActor.addReducer((state, event, setState) => {
  setState(fn(event.payload))
 })
 actor.addReducer((state, event, setState) => {
  update.create(event.payload, event.meta)
 })
}

test('map', () => {
 const fn = jest.fn()
 const e1 = createEvent('e1')
 const a1 = createActor({value: 0})
 const a2 = map(({value}) => ({result: value * 10}), a1)
})
