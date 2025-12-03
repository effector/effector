import {
  is,
  createDomain,
  createEffect,
  attach,
  createStore,
  createEvent,
  fork,
} from 'effector'

it('should return false for common effects', () => {
  const domain = createDomain()
  const domainFx = domain.createEffect()
  const commonFx = createEffect()

  expect(is.attached(domainFx)).toBeFalsy()
  expect(is.attached(commonFx)).toBeFalsy()
})

it('should return false for another units', () => {
  const domain = createDomain()
  const $store = createStore(0)
  const event = createEvent()

  expect(is.attached(domain)).toBeFalsy()
  expect(is.attached(event)).toBeFalsy()
  expect(is.attached($store)).toBeFalsy()
})

it('should return true for really attached effects', () => {
  const $source = createStore(0)
  const fx = createEffect()
  const copyFx = attach({effect: fx})
  const withSourceFx = attach({source: $source, effect: fx})
  const noParentFx = attach({
    source: $source,
    async effect(_: number) {
      return 1
    },
  })

  expect(is.attached(copyFx)).toBeTruthy()
  expect(is.attached(withSourceFx)).toBeTruthy()
  expect(is.attached(noParentFx)).toBeTruthy()
})

test('is.targetable', () => {
  const event = createEvent()
  const fx = createEffect()
  const $store = createStore(0)
  const domain = createDomain()
  const scope = fork()
  const mappedEvent = event.map(() => null)
  const $mapped = $store.map(() => null)

  expect(is.targetable(event)).toBe(true)
  expect(is.targetable(fx)).toBe(true)
  expect(is.targetable($store)).toBe(true)

  expect(is.targetable(mappedEvent)).toBe(false)
  expect(is.targetable($mapped)).toBe(false)

  expect(is.targetable(domain)).toBe(false)
  expect(is.targetable(scope)).toBe(false)
})

// https://github.com/effector/effector/issues/1292
describe('is.unit should not match plain objects with "kind" field', () => {
  test('plain object with "kind" field is not a unit', () => {
    const objWithKind = {kind: 'store'}
    const objWithInvalidKind = {kind: 'foo'}
    const objWithKindStore = {kind: createStore(0)}

    expect(is.unit(objWithKind)).toBe(false)
    expect(is.unit(objWithInvalidKind)).toBe(false)
    expect(is.unit(objWithKindStore)).toBe(false)
  })

  test('real units are still recognized', () => {
    const event = createEvent()
    const $store = createStore(0)
    const fx = createEffect()
    const domain = createDomain()
    const scope = fork()

    expect(is.unit(event)).toBe(true)
    expect(is.unit($store)).toBe(true)
    expect(is.unit(fx)).toBe(true)
    expect(is.unit(domain)).toBe(true)
    expect(is.unit(scope)).toBe(true)
  })
})
