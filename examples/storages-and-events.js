const {createStore, createEvent} = require('effector')

const turnOn = createEvent()
const turnOff = createEvent()

const status = createStore('offline')
  .on(turnOn, () => 'online')
  .on(turnOff, () => 'offline')

status.watch(newStatus => {
  console.log(`status changed: ${newStatus}`)
})

turnOff()
turnOn()
turnOff()
turnOff() // Will not trigger watch function because nothing has changed

/*
result:

status changed: offline
status changed: online
status changed: offline
*/
