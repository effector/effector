//@noflow

import {Emittery} from '..'

const delay = n => new Promise(rs => setTimeout(rs, n))

let event

beforeEach(() => {
 event = new Emittery() // '🦄'
})

test('on()', async() => {
 const emitter = new Emittery()
 const calls = []
 const listener1 = () => calls.push(1)
 const listener2 = () => calls.push(2)
 emitter.on(event, listener1)
 emitter.on(event, listener2)
 await emitter.emit(event)
 expect(calls).toEqual([1, 2])
})

test('on() - eventName must be a string', () => {
 const emitter = new Emittery()
 expect(() => emitter.on(42, () => {})).toThrowError(TypeError)
})

test('on() - must have a listener', () => {
 const emitter = new Emittery()
 expect(() => emitter.on(event).toThrowError(TypeError))
})

test('on() - returns a unsubcribe method', async() => {
 const emitter = new Emittery()
 const calls = []
 const listener = () => calls.push(1)

 const off = emitter.on(event, listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])

 off()
 await emitter.emit(event)
 expect(calls).toEqual([1])
})

test('on() - dedupes identical listeners', async() => {
 const emitter = new Emittery()
 const calls = []
 const listener = () => calls.push(1)

 emitter.on(event, listener)
 emitter.on(event, listener)
 emitter.on(event, listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])
})

test('off()', async() => {
 const emitter = new Emittery()
 const calls = []
 const listener = () => calls.push(1)

 emitter.on(event, listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])

 emitter.off(event, listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])
})

test('off() - eventName must be a string', () => {
 const emitter = new Emittery()
 expect(() => emitter.off(42)).toThrowError(TypeError)
})

test('off() - no listener', () => {
 const emitter = new Emittery()
 expect(() => emitter.off(event).toThrowError(TypeError))
})

test('once()', async() => {
 const fixture = '🌈'
 const emitter = new Emittery()
 const promise = emitter.once(event)
 emitter.emit(event, fixture)
 expect(await promise).toBe(fixture)
})

test('once() - eventName must be a string', () => {
 const emitter = new Emittery()
 expect(emitter.once(42)).rejects.toThrowError(TypeError)
})

test('emit() - one event', done => {
 expect.assertions(1)

 const emitter = new Emittery()
 const eventFixture = {foo: true}

 emitter.on(event, data => {
  expect(data).toEqual(eventFixture)
  done()
 })

 emitter.emit(event, eventFixture)
})

test('emit() - multiple events', async done => {
 expect.assertions(1)

 const emitter = new Emittery()
 let count = 0

 emitter.on(event, async() => {
  await delay(Math.random() * 100)
  if (++count >= 5) {
   expect(count).toBe(5)
   done()
  }
 })

 await emitter.emit(event)
 await emitter.emit(event)
 await emitter.emit(event)
 await emitter.emit(event)
 await emitter.emit(event)
})

test('emit() - eventName must be a string', async() => {
 const emitter = new Emittery()
 await expect(() => emitter.emit(42)).not.toThrowError(TypeError)
})

test('emit() - is async', done => {
 expect.assertions(1)

 const emitter = new Emittery()
 let unicorn = false

 emitter.on(event, () => {
  unicorn = true
  done()
 })

 emitter.emit(event)

 expect(unicorn).toBe(false)
})

test(`emit() - calls listeners subscribed
    when emit() was invoked`, async() => {
 const emitter = new Emittery()
 const calls = []
 const off1 = emitter.on(event, () => calls.push(1))
 const p = emitter.emit(event)
 emitter.on(event, () => calls.push(2))
 await p
 expect(calls).toEqual([1])

 const off3 = emitter.on(event, () => {
  calls.push(3)
  off1()
  emitter.on(event, () => calls.push(4))
 })
 await emitter.emit(event)
 expect(calls).toEqual([1, 1, 2, 3])
 off3()

 const off5 = emitter.on(event, () => {
  calls.push(5)
  emitter.onAny(() => calls.push(6))
 })
 await emitter.emit(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5])
 off5()

 let off8 = () => {}
 emitter.on(event, () => {
  calls.push(7)
  off8()
 })
 off8 = emitter.on(event, () => calls.push(8))
 await emitter.emit(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 6])

 let off10 = () => {}
 emitter.onAny(() => {
  calls.push(9)
  off10()
 })
 off10 = emitter.onAny(() => calls.push(10))
 await emitter.emit(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 6, 2, 4, 7, 6, 9])

 await emitter.emit(event)
 expect(calls).toEqual([
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
  6,
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
 ])

 const p2 = emitter.emit(event)
 emitter.clearListeners()
 await p2
 expect(calls).toEqual([
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
  6,
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
 ])
})

test('emitSerial()', done => {
 expect.assertions(1)

 const emitter = new Emittery()
 const events = []

 const listener = async data => {
  await delay(Math.random() * 100)
  events.push(data)

  if (events.length >= 5) {
   expect(events).toEqual([1, 2, 3, 4, 5])
   done()
  }
 }

 emitter.on(event, () => listener(1))
 emitter.on(event, () => listener(2))
 emitter.on(event, () => listener(3))
 emitter.on(event, () => listener(4))
 emitter.on(event, () => listener(5))

 emitter.emitSerial(event, 'e')
})

test('emitSerial() - eventName must be a string', () => {
 const emitter = new Emittery()
 expect(emitter.emitSerial(42)).resolves.toBeUndefined()
})

test('emitSerial() - is async', done => {
 expect.assertions(1)

 const emitter = new Emittery()
 let unicorn = false

 emitter.on(event, () => {
  unicorn = true
  done()
 })

 emitter.emitSerial(event)

 expect(unicorn).toBe(false)
})

test(`emitSerial() - calls listeners subscribed
    when emitSerial() was invoked`, async() => {
 const emitter = new Emittery()
 const calls = []
 const off1 = emitter.on(event, () => calls.push(1))
 const p = emitter.emitSerial(event)
 emitter.on(event, () => calls.push(2))
 await p
 expect(calls).toEqual([1])

 const off3 = emitter.on(event, () => {
  calls.push(3)
  off1()
  emitter.on(event, () => calls.push(4))
 })
 await emitter.emitSerial(event)
 expect(calls).toEqual([1, 1, 2, 3])
 off3()

 const off5 = emitter.on(event, () => {
  calls.push(5)
  emitter.onAny(() => calls.push(6))
 })
 await emitter.emitSerial(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5])
 off5()

 let off8 = () => {}
 emitter.on(event, () => {
  calls.push(7)
  off8()
 })
 off8 = emitter.on(event, () => calls.push(8))
 await emitter.emitSerial(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 6])

 let off10 = () => {}
 emitter.onAny(() => {
  calls.push(9)
  off10()
 })
 off10 = emitter.onAny(() => calls.push(10))
 await emitter.emitSerial(event)
 expect(calls).toEqual([1, 1, 2, 3, 2, 4, 5, 2, 4, 7, 6, 2, 4, 7, 6, 9])

 await emitter.emitSerial(event)
 expect(calls).toEqual([
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
  6,
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
 ])

 const p2 = emitter.emitSerial(event)
 emitter.clearListeners()
 await p2
 expect(calls).toEqual([
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
  6,
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
 ])
})

test.skip('onAny()', async() => {
 expect.assertions(4)

 const emitter = new Emittery()
 const eventFixture = {foo: true}

 emitter.onAny((eventName, data) => {
  expect(eventName).toBe('🦄')
  expect(data).toEqual(eventFixture)
 })

 await emitter.emit('🦄', eventFixture)
 await emitter.emitSerial(event, eventFixture)
})

test('onAny() - must have a listener', () => {
 const emitter = new Emittery()
 expect(() => emitter.onAny()).not.toThrowError(TypeError)
})

test('offAny()', async() => {
 const emitter = new Emittery()
 const calls = []
 const listener = () => calls.push(1)
 emitter.onAny(listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])
 emitter.offAny(listener)
 await emitter.emit(event)
 expect(calls).toEqual([1])
})

test('offAny() - no listener', () => {
 const emitter = new Emittery()
 expect(() => emitter.offAny()).not.toThrowError(TypeError)
})

test('clearListeners()', async() => {
 const emitter = new Emittery()
 const calls = []
 emitter.on(event, () => calls.push('🦄1'))
 expect(() => emitter.on('🌈', () => calls.push('🌈'))).toThrowError(TypeError)
 emitter.on(event, () => calls.push('🦄2'))
 emitter.onAny(() => calls.push('any1'))
 emitter.onAny(() => calls.push('any2'))
 await emitter.emit(event)
 await emitter.emit('🌈')
 expect(calls).toEqual(['🦄1', '🦄2', 'any1', 'any2', /*'🌈',*/ 'any1', 'any2'])
 emitter.clearListeners()
 await emitter.emit(event)
 await emitter.emit('🌈')
 expect(calls).toEqual(['🦄1', '🦄2', 'any1', 'any2', /*'🌈',*/ 'any1', 'any2'])
})

test.skip('clearListeners() - with event name', async() => {
 const emitter = new Emittery()
 const calls = []
 emitter.on(event, () => calls.push('🦄1'))
 expect(() => emitter.on('🌈', () => calls.push('🌈'))).toThrowError(TypeError)
 emitter.on(event, () => calls.push('🦄2'))
 emitter.onAny(() => calls.push('any1'))
 emitter.onAny(() => calls.push('any2'))
 await emitter.emit(event)
 await emitter.emit('🌈')
 expect(calls).toEqual(['🦄1', '🦄2', 'any1', 'any2', /*'🌈',*/ 'any1', 'any2'])
 emitter.clearListeners('🦄')
 await emitter.emit(event)
 await emitter.emit('🌈')
 expect(calls).toEqual([
  '🦄1',
  '🦄2',
  'any1',
  'any2',
  '🌈',
  'any1',
  'any2',
  'any1',
  'any2',
  '🌈',
  'any1',
  'any2',
 ])
})

test('listenerCount()', () => {
 const emitter = new Emittery()
 emitter.on(event, () => {})
 expect(() => emitter.on('🌈', () => {})).toThrowError(TypeError)
 emitter.on(event, () => {})
 emitter.onAny(() => {})
 emitter.onAny(() => {})
 expect(emitter.listenerCount('🦄')).toBe(2)
 expect(emitter.listenerCount('🌈')).toBe(2)
 expect(emitter.listenerCount()).toBe(4)
})

test('listenerCount() - works with empty eventName strings', () => {
 const emitter = new Emittery()
 emitter.on(event, () => {})
 expect(emitter.listenerCount(event)).toBe(1)
})

test('listenerCount() - eventName must be undefined if not a string', () => {
 const emitter = new Emittery()
 expect(() => emitter.listenerCount(42)).not.toThrowError(TypeError)
})
