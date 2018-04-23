//@flow

import invariant from 'invariant'
import observable$$ from 'symbol-observable'

import warning from '@effector/warning'
import {createStore} from '@effector/store'

export type EventParams<Payload> = {
 domainName: string,
 name: string,
}

export function createEvent<Payload>({name, domainName}: EventParams<Payload>) {
 const fullName = [name, domainName].filter(str => str.length > 0).join('/')
 const eventStore = createStore()
 const subscribers = new Set()
 const unlockSymbol = {}
 let isLocked = unlockSymbol
 let index = 0
 //$todo
 const eventCreator = payload => eventConstructor(payload)

 eventCreator.getType = getType
 //$todo
 eventCreator.toString = getType //TODO that will throw
 //$off
 eventCreator[observable$$] = eventStore[observable$$]
 /* */
 eventCreator.map = map
 eventCreator.watch = watch
 eventCreator.to = to
 //$todo wtf
 eventCreator.epic = eventStore.epic
 eventCreator.thru = thru
 function map(fn: Function) {
  const innerStore = createEvent({name: `${name} -> *`, domainName})
  eventCreator.watch(_ => {
   const mapped = fn(_)
   innerStore(mapped)
  })
  return innerStore
 }
 function watch(fn: (payload: any, result: any) => any) {
  subscribers.add(fn)
  return () => {
   subscribers.delete(fn)
  }
 }
 function to(action: Function, reduce) {
  const needReduce = action.kind() === 'store' && typeof reduce === 'function'
  return eventCreator.watch(data => {
   if (!needReduce) {
    action(data)
   } else {
    const lastState = action.getState()
    const reduced = reduce(lastState, data)
    action.setState(reduced)
   }
  })
 }

 function getType() {
  return fullName
 }
 type Thru = (_: typeof eventCreator) => typeof eventCreator
 function thru(fn: Thru) {
  return fn(eventCreator)
 }
 function eventConstructor(payload) {
  invariant(isLocked === unlockSymbol || payload !== isLocked, 'already locked')
  const lastLocked = isLocked
  isLocked = payload
  const plainAction = {
   type: fullName,
   payload,
   meta: {id: eventStore.id, index: (++index).toString(36)},
  }
  eventStore.setState(payload)
  for (const f of subscribers) {
   f(payload, plainAction)
  }
  isLocked = lastLocked
  return plainAction
 }
 return eventCreator
}
function thunkRunner(done, fail, fn) {
 return function thunk(param) {
  let result, error
  let isFail = false
  try {
   result = fn(param)
  } catch (err) {
   isFail = true
   error = err
  }
  if (isFail === true) {
   return fail(error)
  }
  if (result === undefined || result === null) return done(result)
  if (typeof result.then === 'function') return result.then(done, fail)
  return done(result)
 }
}
export function createEffect<Payload>({
 name,
 domainName,
}: EventParams<Payload>) {
 const fullName = [name, domainName].filter(str => str.length > 0).join('/')
 const startEvent = createEvent({name: fullName, domainName})

 let thunk
 const done = createEvent({name: `${fullName} done`, domainName})
 const fail = createEvent({name: `${fullName} fail`, domainName})
 startEvent.done = done
 startEvent.fail = fail
 startEvent.use = use
 use(thunkDefaults)
 startEvent.watch(payload => {
  thunk(payload)
 })
 function use(fn) {
  thunk = thunkRunner(done, fail, fn)
 }
 async function thunkDefaults(_: any) {
  warning(`Effect ${fullName} called without implementation`)
 }

 return startEvent
}
