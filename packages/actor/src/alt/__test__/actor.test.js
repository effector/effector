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

 e1.create('! a')
 e1.create('! b')
 e2.create('! c')

 expect(actorB.getState()).toMatchObject({value: 3})
 expect(reducer).toHaveBeenCalledTimes(3)
})

function map(fn, actor) {
 const update = createEvent('update')
 const resultActor = createActor('! map result')
 update.add(resultActor)
 resultActor.addReducer((state, event, setState) => {
  setState(event.payload.get())
 })
 actor.addReducer((state, event, setState) => {
  dispatch(update, event.payload.map(fn), event.meta)
 })
 return resultActor
}

function dispatch(event, ...args) {
 //payload, meta, system
 event.create(...args)
}

test.skip('map', () => {
 const fn = jest.fn()
 const fn1 = jest.fn()
 const e1 = createEvent('e1')
 const a1 = createActor({value: 0})
 e1.add(a1)
 const a2 = map(value => {
  console.log(value)
  return {value: value.value * 10}
 }, a1)
 a2.addReducer((state, event, setState) => {
  console.log(state, event)
  fn(state, event, setState)
  expect(state).toMatchObject({value: 20})
 })
 dispatch(e1, 2)
 //  expect(fn).toHaveBeenCalledTimes(1)

 //  const a3 = map(({value}) => ({value: value * 10}), a2)
 //  a3.addReducer((state, event, setState) => {
 //   console.log(state, event)
 //   fn1(state, event, setState)
 //   expect(state).toMatchObject({value: 200})
 //  })
 dispatch(e1, 2)

 //  expect(fn).toHaveBeenCalledTimes(2)
 //  expect(fn1).toHaveBeenCalledTimes(1)
})
