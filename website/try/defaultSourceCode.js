//@flow

export default `const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(n => console.log('counter: ', n))
// counter: 0
increment.watch(() => console.log('increment'))
decrement.watch(() => console.log('decrement'))

increment()
// counter: 1
// increment
decrement()
// counter: 0
// decrement
`
