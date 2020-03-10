//@flow

import {
  createNode,
  createEvent,
  createStore,
  combine,
  withRegion,
  launch,
  restore,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('region templates', () => {
  const fn = jest.fn()

  const trigger = createEvent()

  const template = createTemplate({
    state: {pageName: ''},
    fn({pageName}) {
      const foo = createStore(0).on(trigger, (foo, x) => foo + x)

      const combined = combine({foo, pageName})

      combined.watch(upd => {
        fn(upd)
      })
    },
  })

  expect(fn).not.toBeCalled()

  const pageA = spawn(template, {
    values: {pageName: 'A'},
  })
  const pageB = spawn(template, {
    values: {pageName: 'B'},
  })

  launch({
    target: trigger,
    params: 8,
    page: pageA,
  })
  launch({
    target: trigger,
    params: 4,
    page: pageB,
  })

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "foo": 0,
        "pageName": "A",
      },
      Object {
        "foo": 0,
        "pageName": "B",
      },
      Object {
        "foo": 8,
        "pageName": "A",
      },
      Object {
        "foo": 4,
        "pageName": "B",
      },
    ]
  `)
})

test('external state', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const external = createStore(0).on(trigger, x => x + 1)

  const template = createTemplate({
    state: {pageName: ''},
    fn({pageName}) {
      const combined = combine({external, pageName})

      combined.watch(fn)
    },
  })

  const pageA = spawn(template, {
    values: {pageName: 'A'},
  })
  const pageB = spawn(template, {
    values: {pageName: 'B'},
  })

  launch({
    target: trigger,
    params: null,
    page: pageA,
  })
  launch({
    target: trigger,
    params: null,
    page: pageB,
  })
  trigger(null)

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
Array [
  Object {
    "external": 0,
    "pageName": "A",
  },
  Object {
    "external": 0,
    "pageName": "B",
  },
  Object {
    "external": 1,
    "pageName": "A",
  },
  Object {
    "external": 2,
    "pageName": "B",
  },
  Object {
    "external": 3,
    "pageName": "",
  },
]
`)
})

function list({fn, source, key}) {
  const listTemplate = createTemplate({
    fn,
    state: {
      key: null,
      value: null,
    },
  })
}

function createTemplate({fn, state: values = {}}) {
  const template = {
    plain: [],
    seq: {},
    watch: [],
    nameMap: {},
  }
  const node = createNode({
    meta: {
      template,
    },
  })
  withRegion(node, () => {
    const state = restore(values)
    fn(state)
    template.nameMap = state
  })
  return node
}

function getCurrent(ref) {
  switch (ref.type) {
    case 'list':
      return [...ref.current]
    case 'shape':
      return {...ref.current}
    default:
      return ref.current
  }
}

function spawn(unit, {values = {}} = {}) {
  const template = unit.meta.template
  const page = {}
  for (const ref of template.plain) {
    page[ref.id] = {
      id: ref.id,
      current: getCurrent(ref),
    }
  }
  for (const name in values) {
    page[template.nameMap[name].stateRef.id].current = values[name]
  }
  for (const id in template.seq) {
    const after = template.seq[id]
    const value = page[id].current
    for (const cmd of after) {
      switch (cmd.type) {
        case 'copy':
          page[cmd.to.id].current = value
          break
        case 'map':
          page[cmd.to.id].current = cmd.fn(value)
          break
        case 'field':
          page[cmd.to.id].current[cmd.field] = value
          break
        case 'load':
          page[id] = cmd.from
          break
      }
    }
  }
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  return page
}

function runWatchersFrom(list, state, page) {
  state.stop = true
  let val
  try {
    while (state.i < list.length) {
      val = list[state.i]
      state.i++
      val.fn(page[val.of.id].current)
    }
  } catch (err) {
    console.error(err)
    state.stop = false
  }
}
