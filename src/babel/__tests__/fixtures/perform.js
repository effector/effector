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
perform({target: {event}, action: target => target.event()})
const config = {target: {event}, action}
function action(target) {
  const alias = target
  alias.event()
}
run(config)
const reset = run({
  target: {store: count},
  action(target) {
    target.store(0)
  },
})
const domain = createDomain()
domain.event()
