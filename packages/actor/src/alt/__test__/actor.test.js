//@flow

import invariant from 'invariant'

import {eventFabric} from '../atom'

import {createActor} from '..'

import {logGroup} from './fixtures'

describe('with avar', () => {
 test('#1', async() => {
  const v1 = createActor({a: 0, b: 'foo'})

  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.readSync()).toMatchObject({a: 0, b: 'foo'})

  expect(v1.putSync({a: -2, b: 'put in filled'})).toBe(false)
  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.readSync()).toMatchObject({a: 0, b: 'foo'})
  expect(v1.takeSync()).toMatchObject({a: 0, b: 'foo'})

  expect(v1.status()).toMatchObject({empty: true, filled: false, killed: false})
  expect(v1.readSync()).toBe(null)
  const res1 = await v1.put({a: -1, b: 'bar'})

  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.readSync()).toMatchObject({a: -1, b: 'bar'})
  //  expect(res1).toMatchObject({a: -1, b: 'bar'})
 })

 test('#2', async() => {
  const v1 = createActor({a: 0, b: 'foo'})

  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.readSync()).toMatchObject({a: 0, b: 'foo'})
  let phase = 'init'
  const results = []
  const handler = id => _ => (results.push({id, _}), _)
  const res1Fn = jest.fn()
  const res2Fn = jest.fn(handler(2))
  const res3Fn = jest.fn(handler(3))
  const res4Fn = jest.fn(handler(4))
  const res5Fn = jest.fn(handler(5))
  const res6Fn = jest.fn(handler(6))
  const res1 = v1.put({a: -1, b: 'put async'}).then(e => {
   expect(e).not.toBeDefined()
   expect(phase).toBe('after take')
   res1Fn()
   phase = 'after res1 cb'
  })
  const res2 = v1.read().then(res2Fn)
  phase = 'after async put'
  expect(v1.putSync({a: -2, b: 'put in filled'})).toBe(false)
  phase = 'after try put'
  expect(res1Fn).not.toHaveBeenCalled()
  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.takeSync()).toMatchObject({a: 0, b: 'foo'})
  phase = 'after take'
  expect(v1.status()).toMatchObject({empty: false, filled: true, killed: false})
  expect(v1.readSync()).toMatchObject({a: -1, b: 'put async'})
  //  expect(res1).toMatchObject({a: -1, b: 'bar'})
  expect(res1Fn).toHaveBeenCalledTimes(0)
  expect(res2Fn).toHaveBeenCalledTimes(0)
  await res1
  expect(res1Fn).toHaveBeenCalledTimes(1)
  expect(res2Fn).toHaveBeenCalledTimes(1)
  expect(phase).toBe('after res1 cb')
  const res3 = v1.read().then(res3Fn)
  const res4 = v1.put({a: -3, b: '-> res4'}).then(res4Fn)
  // const res5 = v1.asyncTake().then(res5Fn)
  const res6 = v1.read().then(res6Fn)
  const res2Value = await res2
  console.log(res2Value)
  // expect(v1.tryRead()).toMatchObject({a: -3, b: '-> res4'})
  expect(res1Fn).toHaveBeenCalledTimes(1)
  expect(res2Fn).toHaveBeenCalledTimes(1)
  await res3
  // await res4
  // await res5
  await res6
  // expect(results).toMatchSnapshot()
  console.log(results)
 })

 test('with actor', async() => {
  const time = process.hrtime()
  function getTime() {
   const [a, b] = process.hrtime(time)
   return (b / 1e6).toFixed(2)
  }
  const actorVar = createActor({
   a: 0,
   b: ['_'],
   h: [
    /*::''*/
   ],
  })
  const e1 = eventFabric('e1')
  const e2 = eventFabric('e2')
  const e2fn = jest.fn()

  actorVar.on(e2, async(state, action, setState) => {
   logGroup('.on e2', [['state', 'action', 'time'], [state, action, getTime()]])
   e2fn(action)
   setState(state)
  })
  actorVar.on(e1, async(state, action, setState) => {
   logGroup('actorVar.on', [
    ['state', 'action', 'time'],
    [state, action, getTime()],
   ])
   const a = state.a + 1
   await new Promise(_ => setTimeout(_, 300))
   setState({
    a,
    b: [...state.b, (a + 9).toString(36)],
    h: [...state.h, action.payload],
   })
  })
  // e1.add(actor)
  e1.create('e1 a')
  const res00 = await actorVar.read()
  expect(res00).not.toBe(null)
  logGroup('res00', ['state', actorVar.readSync()], ['time', getTime()])
  e1.create('e1 b')
  e1.create('e1 c')
  const res0 = await actorVar.read()
  expect(res0).not.toBe(null)
  logGroup('res0', ['state', actorVar.readSync()], ['time', getTime()])

  const res1 = await actorVar.read()
  logGroup('res1', ['res1', res1], ['time', getTime()])
  expect(e2fn).toHaveBeenCalledTimes(0)
  e2.create(3)
  const res2 = await actorVar.read()
  expect(e2fn).toHaveBeenCalledTimes(1)
  expect(res1).toBe(res2)
 })
})

// test.skip('smoke', () => {
//  const reducer = jest.fn()
//  const e1 = eventFabric('e1')
//  const e2 = eventFabric('e2')
//  const e3 = eventFabric('e3')
//  expect(e1).toBeDefined()
//  const actor = createActor({value: 'foo'})
//  const actorB = createActor({value: 0})
//  actor.addReducer(reducer)
//  e1.add(actor)
//  e1.create('bar')
//  expect(reducer).toHaveBeenCalledTimes(1)

//  actorB.addReducer((state, event, setState) => {
//   console.log(event)
//   setState({value: state.value + 1})
//  })

//  e1.add(actorB)
//  e2.add(actorB)

//  e1.create('! a')
//  e1.create('! b')
//  e2.create('! c')

//  expect(actorB.getState()).toMatchObject({value: 3})
//  expect(reducer).toHaveBeenCalledTimes(3)
// })
