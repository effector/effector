import {
  attach,
  combine,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  createApi,
  forward,
  guard,
  merge,
  restore,
  sample,
  split,
} from 'effector'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (
      String(message).includes('forward') ||
      String(message).includes('guard')
    )
      return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

test('attach', () => {
  expect(() => {
    const korben = createEffect()
    const dallas = attach({effect: korben})
  }).not.toThrow()
})
test('combine', () => {
  expect(() => {
    const b = combine({}, () => {})
  }).not.toThrow()
})
test('createDomain', () => {
  expect(() => {
    const c = createDomain()
  }).not.toThrow()
})
test('createEffect', () => {
  expect(() => {
    const d = createEffect()
  }).not.toThrow()
})
test('createEvent', () => {
  expect(() => {
    const e = createEvent()
  }).not.toThrow()
})
test('createStore', () => {
  expect(() => {
    const f = createStore(null)
  }).not.toThrow()
})
test('createApi', () => {
  expect(() => {
    const $store = createStore(null)
    const g = createApi($store, {})
  }).not.toThrow()
})
test('forward', () => {
  expect(() => {
    const event = createEvent()
    const h = forward({from: event, to: event})
  }).not.toThrow()
})
test('guard', () => {
  expect(() => {
    const event = createEvent()
    const i = guard(event, {filter: Boolean})
  }).not.toThrow()
})
test('merge', () => {
  expect(() => {
    const event = createEvent()
    const j = merge([event])
  }).not.toThrow()
})
test('restore', () => {
  expect(() => {
    const event = createEvent()
    const k = restore(event, null)
  }).not.toThrow()
})
test('sample', () => {
  expect(() => {
    const event = createEvent()
    const m = sample({clock: event, source: event})
  }).not.toThrow()
})
test('split', () => {
  expect(() => {
    const event = createEvent()
    const n = split(event, {})
  }).not.toThrow()
})
