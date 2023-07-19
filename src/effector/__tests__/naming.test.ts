import {createEvent, createStore, createDomain, combine, sample} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {unitObjectName} from '../naming'

const rootDomain = createDomain('')

describe('.map support', () => {
  it('should support event.map', () => {
    const foo = createEvent()
    const bar = foo.map({
      name: 'Bar',
      fn: x => x,
    })
    expect(bar.shortName).toBe('Bar')
  })
  it('should support store.map', () => {
    const foo = createStore(0)
    const bar = foo.map({
      name: 'Bar',
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

describe('getType deprecation', () => {
  const fn = jest.fn()
  const originalConsoleError = console.error
  beforeEach(() => {
    console.error = fn
  })
  afterEach(() => {
    console.error = originalConsoleError
  })
  test('getType deprecation', () => {
    const event = createEvent()
    event.getType()
    expect(argumentHistory(fn)[0]).toMatchInlineSnapshot(
      `"getType is deprecated, use compositeName.fullName instead"`,
    )
  })
})
