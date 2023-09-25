import {createStore, createEvent, forward} from 'effector'
import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('forward')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

it('support spread of units', () => {
  const fn = jest.fn()
  const set = createEvent<number>()
  const a = createEvent()
  const b = createEvent()
  const store = createStore(0)
    .on(set, (_, x) => x)
    .reset(a, b)

  store.updates.watch(fn)

  set(1)
  a()
  set(2)
  b()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      1,
      0,
      2,
      0,
    ]
  `)
})

it('support array of units', () => {
  const fn = jest.fn()
  const set = createEvent<number>()
  const a = createEvent()
  const b = createEvent()
  const store = createStore(0)
    .on(set, (_, x) => x)
    .reset([a, b])

  store.updates.watch(fn)

  set(1)
  a()
  set(2)
  b()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      1,
      0,
      2,
      0,
    ]
  `)
})

describe('reset before computation', () => {
  test('reset before computation', () => {
    const fn = jest.fn()
    const A = createEvent<string>()
    const B = A.map(d => `${d}->B`)

    const target = createStore('init')
      .reset(B)
      .on(A, (state, d) => `${state} + ${d}`)

    target.watch(e => {
      fn(e)
    })

    A('[1]')
    A('[2]')

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "init",
        "init + [1]",
        "init",
        "init + [2]",
        "init",
      ]
    `)
  })

  it("doesnt depend on methods' ordering", () => {
    const fn = jest.fn()
    const A = createEvent<string>()
    const B = A.map(d => `${d}->B`)

    const target = createStore('init')
      .on(A, (state, d) => `${state} + ${d}`)
      .reset(B)

    target.watch(e => {
      fn(e)
    })

    A('[1]')
    A('[2]')

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "init",
        "init + [1]",
        "init",
        "init + [2]",
        "init",
      ]
    `)
  })
})

describe('computation before reset', () => {
  test('computation before reset', () => {
    const fn = jest.fn()
    const A = createEvent<string>()
    const B = A.map(d => `${d}->B`)

    const target = createStore('init')
      .reset(A)
      .on(B, (state, d) => `${state} + ${d}`)

    target.watch(e => {
      fn(e)
    })

    A('[1]')
    A('[2]')

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "init",
        "init + [1]->B",
        "init",
        "init + [2]->B",
      ]
    `)
  })

  it("doesnt depend on methods' ordering", () => {
    const fn = jest.fn()
    const A = createEvent<string>()
    const B = A.map(d => `${d}->B`)

    const target = createStore('init')
      .on(B, (state, d) => `${state} + ${d}`)
      .reset(A)

    target.watch(e => {
      fn(e)
    })

    A('[1]')
    A('[2]')

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "init",
        "init + [1]->B",
        "init",
        "init + [2]->B",
      ]
    `)
  })
})

test('late forwarding', () => {
  const A = createStore('A')
  const B = createStore('B')
  const reset = createEvent()

  A.reset(reset)
  B.reset(reset)

  forward({from: A, to: B})

  //@ts-expect-error
  A.setState('C')
  reset() // reset

  expect(A.getState()).toMatchInlineSnapshot(`"A"`)
  expect(B.getState()).toMatchInlineSnapshot(`"B"`)

  reset() // reset again

  expect(A.getState()).toMatchInlineSnapshot(`"A"`)
  expect(B.getState()).toMatchInlineSnapshot(`"B"`)
})

describe('dependencies of resettable stores', () => {
  test('dependencies of resettable stores', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const fnA = jest.fn()
    const fnB = jest.fn()
    const run = createEvent<string>()
    const reset = run.map(d => `${d}->reset`)
    const A = createStore('A')
    const B = createStore('B(A)').on(A, (_, d) => `B(${d})`)

    A.on(run, (state, d) => `${d}(${state})`).reset(reset)
    B.on(run, (state, d) => `${d}(${state})`).reset(reset)
    warn.mockRestore()

    A.watch(e => {
      fnA(e)
    })
    B.watch(e => {
      fnB(e)
    })
    run('run')
    run('run')

    expect(argumentHistory(fnA)).toMatchInlineSnapshot(`
      Array [
        "A",
        "run(A)",
        "A",
        "run(A)",
        "A",
      ]
    `)

    expect(argumentHistory(fnB)).toMatchInlineSnapshot(`
      Array [
        "B(A)",
        "run(B(A))",
        "B(A)",
        "B(run(A))",
        "B(A)",
        "run(B(A))",
        "B(A)",
        "B(run(A))",
        "B(A)",
      ]
    `)
  })
})
