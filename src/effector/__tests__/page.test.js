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
      isTemplate: true,
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

  function templateInstance(template, values = new Map()) {
    if (!template.meta.defaultPage) {
      const page = {}
      for (const {reg} of template.family.links) {
        for (const key in reg) {
          page[key] = reg[key].current
        }
      }
      template.meta.defaultPage = page
    }
    const resultPage = {...template.meta.defaultPage}
    for (const [store, value] of values) {
      for (const id in store.graphite.reg) {
        resultPage[id] = value
      }
    }
    for (const {meta, reg} of template.family.links) {
      if (!meta.rawShape) continue
      const rawShapeID = meta.rawShape.id
      const rawCombinedShape = resultPage[rawShapeID]
      const state = Array.isArray(rawCombinedShape)
        ? [...rawCombinedShape]
        : {...rawCombinedShape}
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
