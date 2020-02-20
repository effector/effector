//@flow

export default `
const add = createEvent()
const sub = createEvent()
const reset = createEvent()
  
const counter = createStore(0)
 .on(add, (count, num) => count + num)
 .on(sub, (count, num) => count - num)
 .reset(reset)
  
counter.watch(n => console.log('counter: ', n))
// counter: 0
add.watch(() => console.log('add'))
sub.watch(() => console.log('subtract'))
reset.watch(() => console.log('reset counter'))
  
add(2)
// counter: 2
// add
sub(1)
// counter: 1
// subtract
reset()
// counter: 0
// reset counter
`
