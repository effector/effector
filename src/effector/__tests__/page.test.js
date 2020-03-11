//@flow

import {
  createNode,
  createEvent,
  createStore,
  combine,
  withRegion,
  launch,
  restore,
  step,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

let spawnID = 0
const templateStack = []
const spawnStack = []

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

  spawn(template, {
    values: {pageName: 'A'},
  })
  spawn(template, {
    values: {pageName: 'B'},
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
        "external": 1,
        "pageName": "B",
      },
    ]
  `)
})

test('nested template', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const external = createStore('x').on(trigger, (_, e) => e)

  const template = createTemplate({
    state: {pageName: ''},
    fn({pageName}) {
      const combined = combine({external, pageName})

      const nested = createTemplate({
        state: {index: -1},
        fn({index}) {
          const nestedCombined = combine(
            combined,
            index,
            ({external, pageName}, index) => ({
              external,
              pageName,
              index,
            }),
          )

          nestedCombined.watch(fn)
        },
      })

      pageName.watch(() => {
        spawn(nested, {
          values: {index: 0},
        })
        spawn(nested, {
          values: {index: 1},
        })
      })
    },
  })

  spawn(template, {
    values: {pageName: 'A'},
  })
  spawn(template, {
    values: {pageName: 'B'},
  })

  trigger('y')

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "external": "x",
        "index": 0,
        "pageName": "",
      },
      Object {
        "external": "x",
        "index": 1,
        "pageName": "",
      },
      Object {
        "external": "x",
        "index": 0,
        "pageName": "",
      },
      Object {
        "external": "x",
        "index": 1,
        "pageName": "",
      },
      Object {
        "external": "y",
        "index": 1,
        "pageName": "A",
      },
      Object {
        "external": "y",
        "index": 0,
        "pageName": "A",
      },
      Object {
        "external": "y",
        "index": 1,
        "pageName": "A",
      },
      Object {
        "external": "y",
        "index": 1,
        "pageName": "B",
      },
      Object {
        "external": "y",
        "index": 0,
        "pageName": "B",
      },
      Object {
        "external": "y",
        "index": 1,
        "pageName": "B",
      },
      Object {
        "external": "y",
        "index": 0,
        "pageName": "B",
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
  let parent = null
  if (templateStack.length > 0) {
    parent = templateStack[templateStack.length - 1]
  }
  const template = {
    plain: [],
    closure: [],
    seq: {},
    watch: [],
    nameMap: {},
    pages: [],
    loader: step.filter({
      fn(upd, scope, stack) {
        if (!stack.page || stack.page.template !== template) {
          template.pages.forEach(page => {
            launch({
              params: upd,
              target: stack.node,
              page,
              defer: true,
            })
          })
          return false
        }
        return true
      },
    }),
    parent,
  }
  const node = createNode({
    meta: {
      template,
    },
    isRegion: true,
  })
  const [parentRegion] = node.family.owners
  templateStack.push(template)
  withRegion(node, () => {
    const state = restore(values)
    fn(state)
    template.nameMap = state
  })
  templateStack.pop()
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
  let parent = null
  if (spawnStack.length > 0) {
    parent = spawnStack[spawnStack.length - 1]
  }
  const page = {}
  const result = {
    id: ++spawnID,
    reg: page,
    template,
    parent,
  }
  template.pages.push(result)
  spawnStack.push({template, spawn: result})
  for (const ref of template.plain) {
    page[ref.id] = {
      id: ref.id,
      current: getCurrent(ref),
    }
  }
  for (const ref of template.closure) {
    page[ref.id] = ref
  }
  if (parent) {
    Object.assign(page, parent.spawn.reg)
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
      }
    }
  }
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  spawnStack.pop()
  return result
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
