import {
  createEvent as createEventNPM,
  createStore as createStoreNPM,
  createStoreObject as createStoreObjectNPM,
} from 'effector'

import {
  createEvent as createEventES,
  createStore as createStoreES,
  createStoreObject as createStoreObjectES,
} from '../npm/effector/effector.es'

const {
  createEvent: createEventCJS,
  createStore: createStoreCJS,
  createStoreObject: createStoreObjectCJS,
} = require('../npm/effector/effector.cjs')

const {
  createEvent: createEventUMD,
  createStore: createStoreUMD,
  createStoreObject: createStoreObjectUMD,
} = require('../npm/effector/effector.umd')

runTest({
  name: 'es',
  createStore: createStoreES,
  createEvent: createEventES,
  createStoreObject: createStoreObjectES,
})

runTest({
  name: 'cjs',
  createStore: createStoreCJS,
  createEvent: createEventCJS,
  createStoreObject: createStoreObjectCJS,
})

runTest({
  name: 'umd',
  createStore: createStoreUMD,
  createEvent: createEventUMD,
  createStoreObject: createStoreObjectUMD,
})

runTest({
  name: 'npm',
  createStore: createStoreNPM,
  createEvent: createEventNPM,
  createStoreObject: createStoreObjectNPM,
})

function runTest({createStore, createEvent, createStoreObject, name}) {
  try {
    const event = createEvent('test')

    const count = createStore(0).on(event, n => n + 1)
    const text = createStore('').on(event, (text, e) => text + e)

    const store = createStoreObject({
      count,
      text,
    })

    store.watch(e => {
      console.log(name, 'watch', e)
    })

    event(' event')
  } catch (error) {
    console.error(name)
    console.error(error)
  }
}
