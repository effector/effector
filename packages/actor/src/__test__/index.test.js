//@flow

import {createActor} from '..'

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
 expect(actor.meta).toMatchSnapshot()
})

test('after', async() => {
 const fn = jest.fn()
 const fnPrintCount = jest.fn()
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
   fnPrintCount(count)
   console.log(count)
  },
 )

 expect(fn).toHaveBeenCalledTimes(0)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.sendMessage('inc')

 expect(fn).toHaveBeenCalledTimes(0)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.readIncoming()

 expect(fn).toHaveBeenCalledTimes(1)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.sendMessage('inc')

 expect(fn).toHaveBeenCalledTimes(1)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.sendMessage('print count')

 expect(fn).toHaveBeenCalledTimes(1)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.readIncoming()

 expect(fn).toHaveBeenCalledTimes(2)
 expect(fnPrintCount).toHaveBeenCalledTimes(1)

 expect(actor.state[0].count).toBe(2)

 expect(actor.state).toMatchSnapshot()
 expect(actor.meta).toMatchSnapshot()
})

test('after + new subscribers', async() => {
 const fnInc = jest.fn()
 const fnPrintCount = jest.fn()
 let needAddSubscription = true
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

 expect(actor.meta).toMatchSnapshot()
 actor.after(
  (state, e) => {
   if (e !== 'inc') return
   return state[0]
  },
  async stateA => {
   stateA.count += 1
   fnInc(stateA.count)
   console.log(stateA, needAddSubscription)
   if (needAddSubscription) {
    needAddSubscription = false
    actor.after(
     (state, e) => {
      console.log(e, state)
      if (e !== 'print count') return
      return state[0].count
     },
     async count => {
      fnPrintCount(count)
      console.log(count)
     },
    )
   }
  },
 )

 expect(fnInc).toHaveBeenCalledTimes(0)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.sendMessage('inc')
 expect(actor.meta).toMatchSnapshot()
 await actor.sendMessage('print count')

 expect(fnInc).toHaveBeenCalledTimes(0)
 expect(fnPrintCount).toHaveBeenCalledTimes(0)
 expect(actor.meta).toMatchSnapshot()

 await actor.readIncoming()

 expect(fnInc).toHaveBeenCalledTimes(1)
 expect(fnPrintCount).toHaveBeenCalledTimes(1)
 expect(actor.meta).toMatchSnapshot()

 expect(actor.state).toMatchSnapshot()
})
