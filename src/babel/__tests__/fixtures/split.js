import {createStore, createEvent, split} from 'effector'

const foo = createStore([])
const bar = createEvent()

const baz1 = split(foo, {nonEmpty: list => list.length === 0})
split(foo, {nonEmpty: list => list.length === 0})
const baz2 = split({
  source: foo,
  match: {nonEmpty: list => list.length === 0},
  cases: {nonEmpty: bar},
})

split({
  source: foo,
  match: {nonEmpty: list => list.length === 0},
  cases: {nonEmpty: bar},
})

const spread = [foo, {nonEmpty: list => list.length === 0}]
const baz4 = split(...spread)

const config = {
  source: foo,
  match: {nonEmpty: list => list.length === 0},
  cases: {nonEmpty: bar},
}

const baz5 = split(config)

const f = () => split(foo, {nonEmpty: list => list.length === 0})

{
  const incorrect = split({
    source: foo,
    match: {nonEmpty: list => list.length === 0},
    cases: {nonEmpty: bar},
  })

  function split() {}
}
