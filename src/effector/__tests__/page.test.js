//@flow

import {
  createNode,
  createEvent,
  createStore,
  combine,
  withRegion,
  launch,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('region templates', () => {
  const fn = jest.fn()

  const trigger = createEvent()

  const template = createTemplate(() => {
    const foo = createStore(0).on(trigger, (foo, x) => foo + x)
    const pageName = createStore('')

    const combined = combine({foo, pageName})

    combined.watch(upd => {
      fn(upd)
    })

    return {
      state: {pageName},
    }
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

function createTemplate(fn) {
  const template = {
    plain: {},
    combine: {},
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
    const result = fn()
    if (result.state) {
      template.nameMap = result.state
    }
  })
  return node
}

function spawn(unit, {values = {}} = {}) {
  const template = unit.meta.template
  const page = {...template.plain}
  for (const name in values) {
    page[template.nameMap[name].stateRef.id] = values[name]
  }
  for (const id in template.combine) {
    if (template.combine[id] === 'shape') {
      page[id] = {...page[id]}
    } else {
      page[id] = [...page[id]]
    }
  }
  for (const id in template.seq) {
    const after = template.seq[id]
    const value = page[id]
    for (const cmd of after) {
      switch (cmd.type) {
        case 'copy':
          page[cmd.to.id] = value
          break
        case 'map':
          page[cmd.to.id] = cmd.fn(value)
          break
        case 'field':
          page[cmd.to.id][cmd.field] = value
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
      val.fn(page[val.of.id])
    }
  } catch (err) {
    console.error(err)
    state.stop = false
  }
}
