//@flow

import {combine} from 'effector/effector'
import {createDomain} from 'effector/domain'
import {createStore} from 'effector/store'

describe('raw config', () => {
  const domain = createDomain('')

  it('should set name', () => {
    const foo = createStore(0)
    expect(foo.compositeName?.fullName).toBe('foo')
    const bar = domain.store(0)
    expect(bar.compositeName?.fullName).toBe('bar')
    const e = combine(foo, bar, (a, b) => ({a, b}))
    expect(e.compositeName?.fullName).toBe('combine(foo, bar) → *')
  })

  it('should prefer original name', () => {
    const foo = createStore(0, {name: 'bar'})
    expect(foo.compositeName?.fullName).toBe('bar')
    const bar = domain.store(0, {name: 'foo'})
    expect(bar.compositeName?.fullName).toBe('foo')
  })

  it('should ignore wrong config', () => {
    const a = createStore('h', {})
    //$off
    const b = createStore('h', 23020)
    const config = {option: 0}
    const c = createStore(null, config)
    expect(a.compositeName?.fullName).toBe('a')
    expect(b.compositeName?.fullName).toBe('b')
    expect(c.compositeName?.fullName).toBe('c')

    const d = domain.store('h', {})
    //$off
    const e = domain.store('h', 23020)
    const f = domain.store(null, config)
    //$off
    const g = domain.store('h', 'meme')
    //$off
    const h = domain.store('h', null)
    //$off
    const j = domain.store('h', true)
    //$off
    const k = domain.store('h', false)
    expect(d.compositeName?.fullName).toBe('d')
    expect(e.compositeName?.fullName).toBe('e')
    expect(f.compositeName?.fullName).toBe('f')
  })

  it('should support onCreateStore', () => {
    const domain = createDomain('')
    domain.onCreateStore(store => {
      expect(store.compositeName?.fullName).toBe('foo')
    })
    const foo = domain.store(0)
  })
})
