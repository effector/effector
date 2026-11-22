import {
  perform,
  perform as run,
  createStore,
  createEvent,
  createDomain,
} from 'effector'
const count = createStore(0)
const event = createEvent()
const increment = perform({update: count, action: (set, n) => set(n + 1)})
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
const domain = createDomain()
domain.event()
