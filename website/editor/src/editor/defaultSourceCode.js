//@flow

export default `
const incremented = createEvent()
const decremented = createEvent()
const reseted = createEvent()
  
const counter = createStore(0)
 .on(increment, state => state + 1)
 .on(decrement, state => state - 1)
 .reset(reseted)
  
counter.watch(n => console.log('counter: ', n))
// counter: 0
incremented.watch(() => console.log('counter incremented'))
decremented.watch(() => console.log('counter decremented'))
reseted.watch(() => console.log('counter reseted'))
  
incremented()
// counter: 1
// incremented
decremented()
// counter: 0
// incremented
reseted()
// counter: 0
// counter reseted
`
