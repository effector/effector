//@flow

import {createEvent, createStore, combine, launch} from 'effector'
import {argumentHistory} from 'effector/fixtures'

import {createTemplate, spawn, setSilent} from '../createTemplate'

test('region templates', () => {
  const fn = jest.fn()

  const trigger = createEvent()

  const template = createTemplate({
    name: 'region template',
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

      combined.watch(e => fn(e))
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

test('map support', () => {
  // setSilent(false)
  const fnj = jest.fn()
  const fn = e => {
    // console.log('fn', JSON.stringify(e, null, 2))
    fnj(e)
  }
  const trigger = createEvent()
  const external = createStore('x').on(trigger, (_, e) => e)

  const template = createTemplate({
    name: 'map parent',
    state: {pageName: ''},
    fn({pageName}) {
      const combined = combine({external, pageName})

      const mapped = combined.map(({external, pageName}) => ({
        external,
        name: pageName,
      }))

      const nested = createTemplate({
        name: 'map child',
        state: {index: -1},
        fn({index}) {
          const nestedCombined = combine(
            mapped,
            index,
            ({external, name}, index) => ({
              external,
              name,
              index,
            }),
          )

          nestedCombined.watch(e => fn(e))
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

  expect(argumentHistory(fnj)).toMatchInlineSnapshot(`
Array [
  Object {
    "external": "x",
    "index": 0,
    "name": "A",
  },
  Object {
    "external": "x",
    "index": 1,
    "name": "A",
  },
  Object {
    "external": "x",
    "index": 0,
    "name": "B",
  },
  Object {
    "external": "x",
    "index": 1,
    "name": "B",
  },
  Object {
    "external": "y",
    "index": 0,
    "name": "A",
  },
  Object {
    "external": "y",
    "index": 1,
    "name": "A",
  },
  Object {
    "external": "y",
    "index": 0,
    "name": "B",
  },
  Object {
    "external": "y",
    "index": 1,
    "name": "B",
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

              nestedCombined.watch(e => fn(e))
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
    "index": 0,
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
        name: 'single parent',
        state: {pageName: ''},
        fn({pageName}) {
          const combined = combine({external, pageName})

          const nested = createTemplate({
            name: 'many childs',
            state: {index: -1},
            fn({index}) {
              const nestedCombined = combine(
                combined,
                index,
                ({external}, index) => ({
                  external,
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
  },
  Object {
    "external": "x",
    "index": 1,
  },
  Object {
    "external": "y",
    "index": 0,
  },
  Object {
    "external": "y",
    "index": 1,
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
