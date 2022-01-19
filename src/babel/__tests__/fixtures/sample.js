import {createStore, createEvent, sample} from 'effector'

const foo = createStore('foo')
const bar = createEvent()

const baz1 = sample(foo, bar)
const baz2 = sample({
  source: foo,
  clock: bar,
})

sample(foo, bar)
sample({
  source: foo,
  clock: bar,
})

const spread = [foo, bar]
const baz4 = sample(...spread)

const config = {
  source: foo,
  clock: bar,
}

const baz5 = sample(config)

const f = () =>
  sample({
    source: foo,
    clock: bar,
  })

{
  const incorrect = sample(config)
  function sample() {}
}

{
  const sample = () => {}
  if (true) {
    const incorrect = sample(config)
  }
}
