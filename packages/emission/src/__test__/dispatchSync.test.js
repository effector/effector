//@flow

import {Emittery} from '..'

const delay = n => new Promise(rs => setTimeout(rs, n))

let event

beforeEach(() => {
 event = new Emittery() // '🦄'
})

test(`dispatchSync() - calls listeners subscribed
    when dispatchSync() was invoked`, () => {
 const refs = [
  [1],
  [1, 1, 2, 3],
  [1, 1, 2, 3, 2, 4, 5],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6],
 ]
 const emitter = new Emittery()
 const calls = []
 const off1 = emitter.on(event, () => calls.push(1))
 event.dispatchSync()
 emitter.on(event, () => calls.push(2))

 expect(calls).toEqual(refs[0])

 const off3 = emitter.on(event, () => {
  calls.push(3)
  off1()
  emitter.on(event, () => calls.push(4))
 })
 event.dispatchSync()
 expect(calls).toEqual(refs[1])
 off3()

 const off5 = emitter.on(event, () => {
  calls.push(5)
  emitter.onAny(() => calls.push(6))
 })
 event.dispatchSync()
 expect(calls).toEqual(refs[2])
 off5()

 let off8 = emitter.on(event, () => {
  calls.push(7)
  off8()
 })
 off8 = emitter.on(event, () => calls.push(8))
 event.dispatchSync()
 expect(calls).toEqual(refs[3])

 let off10 = emitter.onAny(() => {
  calls.push(9)
  off10()
 })
 off10 = emitter.onAny(() => calls.push(10))
 event.dispatchSync()
 expect(calls).toEqual(refs[4])

 event.dispatchSync()
 expect(calls).toEqual(refs[5])

 event.dispatchSync()
 emitter.clearListeners()
 expect(calls).toEqual(refs[6])
})
