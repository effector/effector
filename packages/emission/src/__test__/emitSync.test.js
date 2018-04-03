//@flow

import {Emittery} from '..'

const delay = n => new Promise(rs => setTimeout(rs, n))

let event

beforeEach(() => {
 event = new Emittery() // '🦄'
})

test(`emitSync() - calls listeners subscribed
    when emitSync() was invoked`, () => {
 const refs = [
  [1],
  [1, 1, 2, 3],
  [1, 1, 2, 3, 2, 4, 5],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6, 2, 4, 7, 6, 9, 10],
  [1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 8, 6, 2, 4, 7, 6, 9, 10, 2, 4, 7, 6, 9],
  [
   1,
   1,
   2,
   3,
   2,
   4,
   5,
   2,
   4,
   7,
   8,
   6,
   2,
   4,
   7,
   6,
   9,
   10,
   2,
   4,
   7,
   6,
   9,
   2,
   4,
   7,
   6,
   9,
  ],
 ]
 const emitter = new Emittery()
 const calls = []
 const off1 = emitter.on(event, () => calls.push(1))
 emitter.emitSync(event)
 emitter.on(event, () => calls.push(2))

 expect(calls).toEqual(refs[0])

 const off3 = emitter.on(event, () => {
  calls.push(3)
  off1()
  emitter.on(event, () => calls.push(4))
 })
 emitter.emitSync(event)
 expect(calls).toEqual(refs[1])
 off3()

 const off5 = emitter.on(event, () => {
  calls.push(5)
  emitter.onAny(() => calls.push(6))
 })
 emitter.emitSync(event)
 expect(calls).toEqual(refs[2])
 off5()

 let off8 = emitter.on(event, () => {
  calls.push(7)
  off8()
 })
 off8 = emitter.on(event, () => calls.push(8))
 emitter.emitSync(event)
 expect(calls).toEqual(refs[3])

 let off10 = emitter.onAny(() => {
  calls.push(9)
  off10()
 })
 off10 = emitter.onAny(() => calls.push(10))
 emitter.emitSync(event)
 expect(calls).toEqual(refs[4])

 emitter.emitSync(event)
 expect(calls).toEqual(refs[5])

 emitter.emitSync(event)
 emitter.clearListeners()
 expect(calls).toEqual(refs[6])
})
