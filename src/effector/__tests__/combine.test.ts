import {
  combine,
  createStore,
  createEffect,
  sample,
  createEvent,
  EffectResult,
  createDomain,
  fork,
  allSettled,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  )
}
describe('combine cases', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine({R, G, B})
    expect(store.getState()).toEqual({R: 233, G: 88, B: 1})
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine([R, G, B])
    expect(store.getState()).toEqual([233, 88, 1])
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    const store = combine({Color})
    expect(store.getState()).toEqual({Color: '#e95801'})
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    const store = combine([Color])
    expect(store.getState()).toEqual(['#e95801'])
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine({R, G, B}, ({R, G, B}) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine([R, G, B], ([R, G, B]) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store = combine({Color}, ({Color}) => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store = combine([Color], ([Color]) => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    const store = combine(Color, Color => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine(R, G, B, (R, G, B) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine(R, G, B)
    expect(store.getState()).toEqual([233, 88, 1])
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    const store = combine(Color)
    expect(store.getState()).toEqual(['#e95801'])
  })
  test('combine(...primitives)', () => {
    const store = combine(1, [false], {value: 'a'})
    expect(store.getState()).toEqual([1, [false], {value: 'a'}])
  })
  test('combine([primitives])', () => {
    const store = combine([1, [false], {value: 'a'}])
    expect(store.getState()).toEqual([1, [false], {value: 'a'}])
  })
  test('combine(Store, primitive)', () => {
    const Color = createStore('#e95801')
    const store = combine(Color, '#e95801')
    expect(store.getState()).toEqual(['#e95801', '#e95801'])
  })
})

it('deduplicate outputs', async () => {
  const fn = jest.fn()
  const fetchApi = createEffect(async () => {
    await new Promise(rs => setTimeout(rs, 10))
    return [{name: 'physics', id: 1}]
  })
  const data = createStore([] as EffectResult<typeof fetchApi>).on(
    fetchApi.done,
    (_, {result}) => result,
  )
  const lessonIndex = createStore(0)
  const lesson = combine(
    data,
    lessonIndex,
    (data, index) => data[index] || null,
  )
  const lessonWithPending = combine(
    lesson,
    fetchApi.pending,
    (lesson, pending) => ({lesson, pending}),
  )
  sample(lessonWithPending).updates.watch(data => fn(data))

  await fetchApi()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "lesson": null,
        "pending": true,
      },
      Object {
        "lesson": Object {
          "id": 1,
          "name": "physics",
        },
        "pending": false,
      },
    ]
  `)
})

it('skip first duplicated update', () => {
  const fn = jest.fn()
  const changedToken = createEvent<string>()

  const $token = createStore('').on(changedToken, (_, token) => token)
  const $token2 = createStore('').on(changedToken, (_, token) => token)

  const websocketUrl = combine($token, () => null)
  websocketUrl.watch(fn)
  changedToken('token')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      null,
    ]
  `)
})

it('updates consistently', () => {
  const fn = jest.fn()
  const e = createEvent<string>()

  const s1 = createStore('').on(e, (_, m) => m)
  const s2 = createStore('').on(e, (_, m) => m)
  let i = 0
  //prettier-ignore
  const combined = combine(s1, s2, (_, m): (string | null | void) => {
    i+=1
    switch (i) {
      case 1: return null
      //a
      case 2: return m
      //return the same value twice
      //b
      case 3:
      //c
      case 4: return 'noop'
      //d
      case 5: return m
      //return undefined
      //e
      case 6: return
      //f
      case 7: return m
      //return undefined and then return same state
      //g
      case 8: return
      //h
      case 9: return (() => combined.getState())()
      //i, j
      default: return m
    }
  })
  combined.watch(fn)
  e('a')
  e('b')
  e('c')
  e('d')
  e('e')
  e('f')
  e('g')
  e('h')
  e('i')
  e('j')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      null,
      "a",
      "noop",
      "d",
      "f",
      "i",
      "j",
    ]
  `)
})

describe('validations', () => {
  it('validate amount of arguments', () => {
    expect(() => {
      //@ts-expect-error
      combine()
    }).toThrowErrorMatchingInlineSnapshot(
      `"expect first argument be an object"`,
    )
  })

  it('validate shape', () => {
    expect(() => {
      combine(null)
    }).toThrowErrorMatchingInlineSnapshot(`"shape should be an object"`)
    expect(() => {
      combine('text')
    }).toThrowErrorMatchingInlineSnapshot(`"shape should be an object"`)
    expect(() => {
      combine(0, () => {})
    }).toThrowErrorMatchingInlineSnapshot(`"shape should be an object"`)
  })

  it('doesn`t allow events or other units in shape', () => {
    expect(() => {
      combine({a: createEvent()})
    }).toThrowErrorMatchingInlineSnapshot(
      `"combine expects a store in a field a"`,
    )
    expect(() => {
      combine({a: createEffect()})
    }).toThrowErrorMatchingInlineSnapshot(
      `"combine expects a store in a field a"`,
    )
    expect(() => {
      combine({a: createDomain()})
    }).toThrowErrorMatchingInlineSnapshot(
      `"combine expects a store in a field a"`,
    )
  })
  it('doesn`t allow undefined in shape', () => {
    expect(() => {
      combine({a: undefined})
    }).toThrowErrorMatchingInlineSnapshot(
      `"combine expects a store in a field a"`,
    )
  })
})

it('doesn`t leak internal variables to transform function', () => {
  const fn = jest.fn()
  const inc = createEvent()
  const a = createStore(0).on(inc, x => x + 1)
  const combined = combine({a}, (...args) => {
    fn(args)
    return 0
  })
  combined.watch(() => {})
  inc()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "a": 0,
        },
      ],
      Array [
        Object {
          "a": 1,
        },
      ],
    ]
  `)
})

describe('doesn`t fail with slice is not a function', () => {
  test('array', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const $a = createStore(0).on(inc, x => x + 1)
    const combined = combine([$a], (array: any) => {
      const mainSlice = array.slice
      array.slice = (...args: any[]) => {
        fn('slice')
        return mainSlice.apply(array, args)
      }
      return array[0] + 1
    })
    inc()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`Array []`)
  })

  test('combine + map', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const $a = createStore(0).on(inc, x => x + 1)
    const $b = createStore(0).on(inc, x => x + 1)
    const combined = combine([$a, $b]).map((array: any) => {
      const mainSlice = array.slice
      array.slice = (...args: any[]) => {
        fn('slice')
        return mainSlice.apply(array, args)
      }
      return array[0] + 1
    })
    inc()
    inc()
    inc()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`Array []`)
  })
})

describe('don`t reuse values from user', () => {
  test('with sample (more convenient)', () => {
    const triggerA = createEvent()
    const triggerB = createEvent()
    const foo = createStore(0)
    const bar = createStore(0).on(triggerB, x => x + 10)
    const combined = createStore({foo: 0, bar: 0}).on(
      combine({foo, bar}),
      (_, x) => x,
    )
    sample({
      clock: triggerA,
      source: combined,
      target: combined,
      fn: ({foo, bar}) => ({
        foo: foo + 1,
        bar: bar + 1,
      }),
    })

    triggerA()
    expect(combined.getState()).toEqual({foo: 1, bar: 1})
    triggerB()
    expect(combined.getState()).toEqual({foo: 0, bar: 10})
    triggerA()
    expect(combined.getState()).toEqual({foo: 1, bar: 11})
    triggerB()
    expect(combined.getState()).toEqual({foo: 0, bar: 20})
  })
  test('with on (less convenient)', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const triggerA = createEvent()
    const triggerB = createEvent()
    const foo = createStore(0)
    const bar = createStore(0).on(triggerB, x => x + 10)
    const combined = createStore({foo: 0, bar: 0}).on(
      combine({foo, bar}),
      (_, x) => x,
    )
    combined.on(triggerA, ({foo, bar}) => ({
      foo: foo + 1,
      bar: bar + 1,
    }))
    warn.mockRestore()

    triggerA()
    expect(combined.getState()).toEqual({foo: 1, bar: 1})
    triggerB()
    expect(combined.getState()).toEqual({foo: 0, bar: 10})
    triggerA()
    expect(combined.getState()).toEqual({foo: 1, bar: 11})
    triggerB()
    expect(combined.getState()).toEqual({foo: 0, bar: 20})
  })
})

describe('fn retriggers', () => {
  test('dont retrigger combine fn on allSettled calls', async () => {
    const fn = jest.fn()
    const inc = createEvent()
    const $a = createStore(0).on(inc, a => a + 1)
    const $comb = combine($a, a => {
      fn(a)
      return a
    })
    $comb.watch(() => {})
    const scope = fork({values: [[$a, 10]]})
    await allSettled(inc, {scope})
    expect(argumentHistory(fn)).toEqual([0, 11])
  })
  test('dont retrigger combine fn on getState calls', () => {
    const fn = jest.fn()
    const $a = createStore(0)
    const $comb = combine($a, a => {
      fn(a)
      return a
    })

    const scope = fork({values: [[$a, 10]]})
    scope.getState($comb)
    expect(argumentHistory(fn)).toEqual([0, 10])
  })
  test('dont retrigger combine fn on getState + allSettled calls', async () => {
    const fn = jest.fn()
    const inc = createEvent()
    const $a = createStore(0).on(inc, a => a + 1)
    const $comb = combine($a, a => {
      fn(a)
      return a
    })

    const scope = fork({values: [[$a, 10]]})
    scope.getState($comb)
    await allSettled(inc, {scope})
    expect(argumentHistory(fn)).toEqual([0, 10, 11])
  })
})
