//@flow

export default `
  const increment = createEvent()
  const decrement = createEvent()
  const resetCounter = createEvent()
  
  const counter = createStore(0)
    .on(increment, state => state + 1)
    .on(decrement, state => state - 1)
    .reset(resetCounter)
  
  counter.watch(n => console.log('counter: ', n))
  // counter: 0
  increment.watch(() => console.log('increment'))
  decrement.watch(() => console.log('decrement'))
  resetCounter.watch(() => console.log('reset counter'))
  
  increment()
  // counter: 1
  // increment
  decrement()
  // counter: 0
  // decrement
  resetCounter()
  // counter: 0
  // reset counter
`
