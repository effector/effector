//@flow

import {combine, createStore, createDomain} from 'effector'

describe('raw config', () => {
  const domain = createDomain()

  it('should set name', () => {
    const foo = createStore(0)
    expect(foo.compositeName.fullName).toBe('foo')
    const bar = domain.store(0)
    expect(bar.compositeName.fullName).toBe('bar')
    const e = combine(foo, bar, (a, b) => ({a, b}))
    expect(e.compositeName.fullName).toBe('combine(foo, bar) → *')
  })

  it('should prefer original name', () => {
    const foo = createStore(0, {name: 'bar'})
    expect(foo.compositeName.fullName).toBe('bar')
    const bar = domain.store(0, {name: 'foo'})
    expect(bar.compositeName.fullName).toBe('foo')
  })

  it('should ignore wrong config', () => {
    const a = createStore('h', {})
    const b = createStore('h', 23020)
    const config = {option: 0}
    const c = createStore(null, config)
    expect(a.compositeName.fullName).toBe('a')
    expect(b.compositeName.fullName).toBe('b')
    expect(c.compositeName.fullName).toBe('c')

    const d = domain.store('h', {})
    const e = domain.store('h', 23020)
    const f = domain.store(null, config)
    expect(d.compositeName.fullName).toBe('d')
    expect(e.compositeName.fullName).toBe('e')
    expect(f.compositeName.fullName).toBe('f')
  })

  it('should support onCreateStore', () => {
    const domain = createDomain()
    domain.onCreateStore(store => {
      expect(store.compositeName.fullName).toBe('foo')
    })
    const foo = domain.store(0)
  })
})
