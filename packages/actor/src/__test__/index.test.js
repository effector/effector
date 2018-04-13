//@flow

import {createActor} from '..'

test('smoke', () => {
 const actor = createActor([
  {
   foo: 'bar',
   count: 0,
  },
  {
   tag: 'computed',
   value: 3,
  },
 ])
 actor.pushMessage('hello')
 actor.pushMessage('how r u')
 expect(actor.state).toMatchSnapshot()
})

test('send message', async() => {
 const actor = createActor([
  {
   foo: 'bar',
   count: 0,
  },
  {
   tag: 'computed',
   value: 3,
  },
 ])
 expect(actor.state).toMatchSnapshot()

 await actor.sendMessage('hello')
 await actor.sendMessage('how r u')

 expect(actor.state).toMatchSnapshot()
})

test('async getState', async() => {
 const actor = createActor([
  {
   foo: 'bar',
   count: 0,
  },
  {
   tag: 'computed',
   value: 3,
  },
 ])

 const state = await actor.getState()
 expect(state).toMatchSnapshot()
})

test('after', async() => {
 const fn = jest.fn()
 const fn1 = jest.fn()
 const actor = createActor([
  {
   foo: 'bar',
   count: 0,
  },
  {
   tag: 'computed',
   value: 3,
  },
 ])
 actor.after(
  (state, e) => {
   if (e !== 'inc') return
   return state[0]
  },
  async stateA => {
   stateA.count += 1
   fn(stateA.count)
   console.log(stateA)
  },
 )
 actor.after(
  (state, e) => {
   if (e !== 'print count') return
   if (state[0].count > 0) return state[0].count
  },
  async count => {
   fn1(count)
   console.log(count)
  },
 )
 await actor.sendMessage('inc')
 await actor.readIncoming()
 await actor.sendMessage('inc')
 await actor.sendMessage('print count')
 await actor.readIncoming()
 expect(actor.state.state[0].count).toBe(2)
})
