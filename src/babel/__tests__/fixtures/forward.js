//@flow

import {createStore, createEvent, forward} from 'effector'

const foo = createStore('foo')
const bar = createEvent()

const baz1 = forward({from: foo, to: bar})
const baz2 = forward({
  from: foo,
  to: bar,
})

forward({from: foo, to: bar})
forward({
  from: foo,
  to: bar,
})

const config = {
  from: foo,
  to: bar,
}

const baz5 = forward(config)

const f = () =>
  forward({
    from: foo,
    to: bar,
  })
