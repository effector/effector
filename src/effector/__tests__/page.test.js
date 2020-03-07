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

  const template = createNode({
    meta: {
      template: {
        plain: {},
        list: [],
        shape: [],
      },
    },
  })

  const trigger = createEvent()

  let pageName

  withRegion(template, () => {
    const foo = createStore(0).on(trigger, (foo, x) => foo + x)
    pageName = createStore('')

    const combined = combine({foo, pageName})

    combined.watch(upd => {
      fn(upd)
    })
  })

  expect(fn).not.toBeCalled()

  function templateInstance(unit, values = new Map()) {
    const template = unit.meta.template
    const resultPage = {...template.plain}
    for (const {id, current} of template.list) {
      resultPage[id] = [...current]
    }
    for (const {id, current} of template.shape) {
      resultPage[id] = {...current}
    }
    for (const [store, value] of values) {
      for (const id in store.graphite.reg) {
        resultPage[id] = value
      }
    }
    for (const {meta, reg} of unit.family.links) {
      if (!meta.rawShape) continue
      const rawShapeID = meta.rawShape.id
      const state = resultPage[rawShapeID]
      resultPage[rawShapeID] = state
      for (const field in meta.shape) {
        const id = meta.shape[field].stateRef.id
        state[field] = resultPage[id]
      }
      let resultState = state
      if (meta.fn) {
        resultState = meta.fn(state)
      }
      for (const id in reg) {
        resultPage[id] = resultState
      }
    }
    return resultPage
  }

  const pageA = templateInstance(template, new Map([[pageName, 'A']]))
  const pageB = templateInstance(template, new Map([[pageName, 'B']]))

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
