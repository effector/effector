import {createEvent, createStore, createDomain, combine, sample} from 'effector'
import {debug} from 'patronum'
import {unitObjectName} from '../naming'
import {argumentHistory} from 'effector/fixtures'

const rootDomain = createDomain('')

describe('.map support', () => {
  it('should support event.map', () => {
    const foo = createEvent()
    const bar = foo.map({
      //@ts-expect-error untyped feature
      name: 'Bar',
      //@ts-expect-error
      fn: x => x,
    })
    expect(bar.shortName).toBe('Bar')
  })
  it('should support store.map', () => {
    const foo = createStore(0)
    const bar = foo.map({
      //@ts-expect-error untyped feature
      name: 'Bar',
      //@ts-expect-error
      fn: x => x + 1,
    })
    expect(bar.shortName).toBe('Bar')
  })
})

describe('naming', () => {
  describe('domain', () => {
    test('value store', () => {
      const domain = rootDomain.createDomain('form')
      const firstName = domain.createStore('')
      const lastName = domain.createStore('')

      expect(firstName.compositeName?.fullName).toBe('form/firstName')
      expect(lastName.compositeName?.fullName).toBe('form/lastName')
    })
  })

  test('value store', () => {
    const firstName = createStore('')
    const lastName = createStore('')

    expect(firstName.compositeName?.fullName).toBe('firstName')
    expect(lastName.compositeName?.fullName).toBe('lastName')
  })

  test('unnamed object store', () => {
    const firstName = createStore('')
    const lastName = createStore('')
    const form = {combine}.combine({firstName, lastName})
    const app = {combine}.combine({form})

    expect(app.compositeName?.fullName).toBe(
      'combine(combine(firstName, lastName))',
    )
    expect(form.compositeName?.fullName).toBe('combine(firstName, lastName)')
    expect(firstName.compositeName?.fullName).toBe('firstName')
    expect(lastName.compositeName?.fullName).toBe('lastName')
  })
})

describe('naming scheme', () => {
  test('storeObjectArrayName', () => {
    expect(unitObjectName([1, 2, 3])).toBe('combine(1, 2, 3)')
  })

  test('storeObjectName', () => {
    expect(
      unitObjectName({
        a: 1,
        b: 2,
        c: 3,
      }),
    ).toBe('combine(1, 2, 3)')
  })

  test('storeObjectArrayName doesnt breaks maximum', () => {
    const mock = Array.from({length: 100}, (_, i) => i.toString(36))
    const obj2 = mock.slice(0, 25)
    expect(unitObjectName(mock)).toBe(`combine(${obj2.join(', ')})`)
  })

  test('storeObjectName doesnt breaks maximum', () => {
    const mock = Array.from({length: 100}, (_, i) => i.toString(36))
    const obj = mock.reduce((acc, v) => ({...acc, [v]: v}), {})
    const obj2 = Object.values(obj).slice(0, 25)
    expect(unitObjectName(obj)).toBe(`combine(${obj2.join(', ')})`)
  })
})

it('support combine', () => {
  const a = createStore(0)
  const b = createStore(1)
  const ab = combine([a, b])
  expect(ab.shortName).toBe('ab')
  expect(ab.getState()).toEqual([0, 1])
})

describe('sample support', () => {
  test('sample(source, clock)', () => {
    const source = createStore(0)
    const clock = createEvent()
    const sampled = sample(source, clock)
    expect(sampled.shortName).toBe('sampled')
  })
  test('sample(config)', () => {
    const source = createStore(0)
    const clock = createEvent()
    const sampled = sample({source, clock})
    expect(sampled.shortName).toBe('sampled')
  })
  test('sample(config) with explicit name', () => {
    const source = createStore(0)
    const clock = createEvent()
    const sampled = sample({source, clock, name: 'foo'})
    expect(sampled.shortName).toBe('foo')
  })
})

describe('sample support', () => {
  let fn: jest.SpyInstance
  let fnGroup: jest.SpyInstance
  beforeEach(() => {
    fn = jest.spyOn(console, 'info').mockImplementation(() => {})
    fnGroup = jest.spyOn(console, 'groupCollapsed').mockImplementation(() => {})
  })
  afterEach(() => {
    fn.mockRestore()
    fnGroup.mockRestore()
  })
  test('sample with new unit', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = sample({source: $source, clock})
    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] target",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with target return', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = createEvent()
    const targetReturn = sample({source: $source, clock, target})

    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] targetReturn",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with target unit', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = createEvent()
    sample({source: $source, clock, target})
    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] /src/effector/__tests__/naming.test.ts:171:4",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with explicit name', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = createEvent()
    sample({source: $source, clock, target, name: 'sample name'})
    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] sample name",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with no name or loc', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = createEvent()
    ;({_: sample})._({source: $source, clock, target})
    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] ",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with explicit name and target unit', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const targetReturn = sample({
      source: $source,
      clock,
      name: 'prioritized name',
    })

    debug({trace: true}, targetReturn)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] prioritized name",
        "<- [event] prioritized name",
        "<- [sample] prioritized name",
        "<- [event] clock",
      ]
    `)
  })
  test('sample with explicit name and new unit', () => {
    const $source = createStore(0)
    const clock = createEvent()
    const target = createEvent()
    const targetReturn = sample({
      source: $source,
      clock,
      target,
      name: 'prioritized name',
    })

    debug({trace: true}, target)
    clock()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "[event] target",
        "<- [event] target",
        "<- [sample] prioritized name",
        "<- [event] clock",
      ]
    `)
  })
})
