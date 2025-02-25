import {createEvent, createStore, sample} from 'effector'

function incorrect() {
  const $count = createStore(0)
  const increment = createEvent()
  const decrement = createEvent()

  sample({
    clock: increment,
    source: $count,
    fn: (count) => count + 1,
    target: $count,
  })

  sample({
    clock: decrement,
    source: $count,
    fn: (count) => count - 1,
    target: $count,
  })
}
