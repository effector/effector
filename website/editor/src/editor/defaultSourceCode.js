//@flow

export default `
const increment = createEvent()
const decrement = createEvent()
const reset = createEvent()
  
const counter = createStore(0)
 .on(increment, state => state + 1)
 .on(decrement, state => state - 1)
 .reset(reset)
  
counter.watch(n => console.log('counter: ', n))
// counter: 0
increment.watch(() => console.log('increment counter'))
decrement.watch(() => console.log('decrement counter'))
reset.watch(() => console.log('reset counter'))
  
increment()
// counter: 1
// increment
decrement()
// counter: 0
// increment
reset()
// counter: 0
// reset counter
`
