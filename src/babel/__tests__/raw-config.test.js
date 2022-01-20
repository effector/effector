import {combine, createDomain, createStore} from 'effector'

const readFullName = unit => unit.compositeName?.fullName

describe('raw config', () => {
  const domain = createDomain('')

  it('should set name', () => {
    const foo = createStore(0)
    expect(readFullName(foo)).toBe('foo')
    const bar = domain.store(0)
    expect(readFullName(bar)).toBe('bar')
    const e = {combine}.combine(foo, bar, (a, b) => ({a, b}))
    expect(readFullName(e)).toBe('combine(foo, bar)')
  })

  it('should prefer original name', () => {
    const foo = createStore(0, {name: 'bar'})
    expect(readFullName(foo)).toBe('bar')
    const bar = domain.store(0, {name: 'foo'})
    expect(readFullName(bar)).toBe('foo')
  })

  it('should ignore wrong config', () => {
    const a = createStore('h', {})

    const b = createStore('h', 23020)
    const config = {option: 0}
    const c = createStore(null, config)
    expect(readFullName(a)).toBe('a')
    expect(readFullName(b)).toBe('b')
    expect(readFullName(c)).toBe('c')

    const d = domain.store('h', {})

    const e = domain.store('h', 23020)
    const f = domain.store(null, config)

    const g = domain.store('h', 'meme')

    const h = domain.store('h', null)

    const j = domain.store('h', true)

    const k = domain.store('h', false)
    expect(readFullName(d)).toBe('d')
    expect(readFullName(e)).toBe('e')
    expect(readFullName(f)).toBe('f')
  })

  it('should support onCreateStore', () => {
    const domain = createDomain('')
    domain.onCreateStore(store => {
      expect(readFullName(store)).toBe('foo')
    })
    const foo = domain.store(0)
  })
})

describe('raw config alias', () => {
  const domain = createDomain('')

  it('should set name', () => {
    const foo = createStore(0)
    expect(readFullName(foo)).toBe('foo')
    const bar = domain.createStore(0)
    expect(readFullName(bar)).toBe('bar')
    const e = {combine}.combine(foo, bar, (a, b) => ({a, b}))
    expect(readFullName(e)).toBe('combine(foo, bar)')
  })

  it('should prefer original name', () => {
    const foo = createStore(0, {name: 'bar'})
    expect(readFullName(foo)).toBe('bar')
    const bar = domain.createStore(0, {name: 'foo'})
    expect(readFullName(bar)).toBe('foo')
  })

  it('should ignore wrong config', () => {
    const a = createStore('h', {})

    const b = createStore('h', 23020)
    const config = {option: 0}
    const c = createStore(null, config)
    expect(readFullName(a)).toBe('a')
    expect(readFullName(b)).toBe('b')
    expect(readFullName(c)).toBe('c')

    const d = domain.createStore('h', {})

    const e = domain.createStore('h', 23020)
    const f = domain.createStore(null, config)

    const g = domain.createStore('h', 'meme')

    const h = domain.createStore('h', null)

    const j = domain.createStore('h', true)

    const k = domain.createStore('h', false)
    expect(readFullName(d)).toBe('d')
    expect(readFullName(e)).toBe('e')
    expect(readFullName(f)).toBe('f')
  })

  it('should support onCreateStore', () => {
    const domain = createDomain('')
    domain.onCreateStore(store => {
      expect(readFullName(store)).toBe('foo')
    })
    const foo = domain.createStore(0)
  })
})
