import {createStore, createEvent} from 'effector'

createStore(0)
createEvent()

// const increment = createEvent('increment')
// const decrement = createEvent('decrement')
// const resetCounter = createEvent('reset counter')

// const counter = createStore(0)
//   .on(increment, state => state + 1)
//   .on(decrement, state => state - 1)
//   .reset(resetCounter)

// counter.watch(console.log)

// increment()
// decrement()
// resetCounter()
