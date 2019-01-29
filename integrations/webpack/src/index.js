import {createEvent as createEventES} from '../npm/effector/effector.es'
const {createEvent: createEventCJS} = require('../npm/effector/effector.cjs')
const {createEvent: createEventUMD} = require('../npm/effector/effector.umd')

try {
  const event = createEventES('test')
  event({})
} catch (error) {
  console.error(error)
}

try {
  const event = createEventCJS('test')
  event({})
} catch (error) {
  console.error(error)
}

try {
  const event = createEventUMD('test')
  event({})
} catch (error) {
  console.error(error)
}
