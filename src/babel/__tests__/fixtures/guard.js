//@flow
import {createStore, createEvent, guard} from 'effector'

const foo = createStore(true)
const bar = createEvent()

const baz1 = guard(bar, {filter: foo})
const baz2 = guard({
  source: bar,
  filter: foo,
})

guard(bar, {filter: foo})
guard({
  source: bar,
  filter: foo,
})

const spread = [bar, {filter: foo}]
const baz4 = guard(...spread)

const config = {
  source: bar,
  filter: foo,
}

const baz5 = guard(config)

const f = () =>
  guard({
    source: bar,
    filter: foo,
  })
