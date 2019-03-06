//@flow

export default `const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(n => console.log('counter: ', n))
increment.watch(() => console.log('increment'))
decrement.watch(() => console.log('decrement'))

increment()
// increment
// counter: 1
decrement()
// decrement
// counter: 0
`
