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

const SILENT = true

let spawnID = 0
let currentTemplate = null
let currentSpawn = null

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

describe('nested template', () => {
  describe('pair of child forks', () => {
    test('pair of parent forks', () => {
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
            "pageName": "A",
          },
          Object {
            "external": "x",
            "index": 1,
            "pageName": "A",
          },
          Object {
            "external": "x",
            "index": 0,
            "pageName": "B",
          },
          Object {
            "external": "x",
            "index": 1,
            "pageName": "B",
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
            "index": 1,
            "pageName": "B",
          },
        ]
      `)
    })
    test('single parent fork', () => {
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

      trigger('y')

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "external": "x",
            "index": 0,
            "pageName": "A",
          },
          Object {
            "external": "x",
            "index": 1,
            "pageName": "A",
          },
          Object {
            "external": "y",
            "index": 1,
            "pageName": "A",
          },
        ]
      `)
    })
    test('no parent forks', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const external = createStore('x').on(trigger, (_, e) => e)

      createTemplate({
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

      trigger('y')

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`Array []`)
    })
  })
  describe('single child fork', () => {
    test('pair of parent forks', () => {
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
    "pageName": "A",
  },
  Object {
    "external": "x",
    "index": 0,
    "pageName": "B",
  },
  Object {
    "external": "y",
    "index": 0,
    "pageName": "A",
  },
  Object {
    "external": "y",
    "index": 0,
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
    test('single parent fork', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const external = createStore('x').on(trigger, (_, e) => e)

      const template = createTemplate({
        name: 'single parent',
        state: {pageName: ''},
        fn({pageName}) {
          const combined = combine({external, pageName})

          const nested = createTemplate({
            name: 'single child',
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
          })
        },
      })

      spawn(template, {
        values: {pageName: 'A'},
      })

      trigger('y')

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
Array [
  Object {
    "external": "x",
    "index": 0,
    "pageName": "A",
  },
  Object {
    "external": "y",
    "index": 0,
    "pageName": "A",
  },
]
`)
    })
    test('no parent forks', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const external = createStore('x').on(trigger, (_, e) => e)

      createTemplate({
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
          })
        },
      })

      trigger('y')

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`Array []`)
    })
  })
})

function createTemplate({fn, state: values = {}, name = ''}) {
  const parent = currentTemplate
  const template = {
    name,
    plain: [],
    closure: [],
    seq: {},
    watch: [],
    nameMap: {},
    pages: [],
    childTemplates: [],
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
  if (parent) {
    parent.childTemplates.push(template)
  }
  const node = createNode({
    meta: {
      template,
    },
  })
  currentTemplate = template
  withRegion(node, () => {
    const state = restore(values)
    fn(state)
    template.nameMap = state
  })
  currentTemplate = parent
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
  const parent = currentSpawn
  const page = {}
  const result = {
    id: ++spawnID,
    reg: page,
    template,
    parent,
  }
  template.pages.push(result)
  currentSpawn = {template, spawn: result}
  log('spawn', template.name)
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
    log('parent spawn reg', parent.spawn.reg)
    log('page before assign', page)
    Object.assign(page, parent.spawn.reg)
    log('page after assign', page)
  }
  for (const name in values) {
    const id = template.nameMap[name].stateRef.id
    page[id] = {
      id,
      current: values[name],
    }
  }

  for (const ref of template.plain) {
    if (!ref.after) continue
    const value = page[ref.id].current
    for (const cmd of ref.after) {
      const to = cmd.to
      if (!page[to.id]) {
        page[to.id] = {
          id: to.id,
          current: to.current,
        }
      }
      switch (cmd.type) {
        case 'copy':
          page[to.id].current = value
          break
        case 'map':
          page[to.id].current = cmd.fn(value)
          break
        case 'field':
          page[to.id].current[cmd.field] = value
          break
      }
    }
  }
  // for (const id in template.seq) {
  //   const after = template.seq[id]
  //   const value = page[id].current
  //   for (const cmd of after) {
  //     switch (cmd.type) {
  //       case 'copy':
  //         page[cmd.to.id].current = value
  //         break
  //       case 'map':
  //         page[cmd.to.id].current = cmd.fn(value)
  //         break
  //       case 'field':
  //         page[cmd.to.id].current[cmd.field] = value
  //         break
  //     }
  //   }
  // }
  log('pre-final page', page)
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  log('final page', page)
  currentSpawn = parent
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

function log(tag, value) {
  if (SILENT) return
  console.log(tag, JSON.stringify(value, null, 2))
}

// function list({fn, source, key}) {
//   const listTemplate = createTemplate({
//     fn,
//     state: {
//       key: null,
//       value: null,
//     },
//   })
// }
