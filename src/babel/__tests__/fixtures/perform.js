import {
  perform,
  perform as run,
  createStore,
  createEvent,
} from 'effector'
const count = createStore(0)
const event = createEvent()
const increment = perform({source: count, target: count, action: (set, n) => set(n + 1)})
perform({target: {emit: event}, action: target => target.emit()})
const config = {target: {emit: event}, action}
function action(target) {
  const alias = target
  alias.emit()
}
run(config)
const reset = run({
  target: {count},
  action(target) {
    target.count(0)
  },
})
