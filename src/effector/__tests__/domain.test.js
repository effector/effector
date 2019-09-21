//@flow

import {createDomain, createEvent, createEffect} from 'effector'
import {spy} from 'effector/fixtures'

describe('domain hooks', () => {
  test('domain.onCreateEvent(fn)', () => {
    const dom = createDomain()
    dom.event()
    const unsub = dom.onCreateEvent(e => spy(e))
    expect(spy).toHaveBeenCalled()
    const e2 = dom.event()
    expect(spy).toHaveBeenLastCalledWith(e2)
    createEvent()
    expect(spy).toHaveBeenCalledTimes(2)
    const e4 = dom.event()
    expect(spy).toHaveBeenLastCalledWith(e4)
    expect(spy).toHaveBeenCalledTimes(3)
    expect(() => {
      unsub()
    }).not.toThrow()
    dom.event()
    expect(spy).toHaveBeenCalledTimes(3)
  })

  test('domain.onCreateEffect(fn)', () => {
    const dom = createDomain()
    dom.effect()
    const unsub = dom.onCreateEffect(e => spy(e))
    expect(spy).toHaveBeenCalled()
    const e2 = dom.effect()
    expect(spy).toHaveBeenLastCalledWith(e2)
    createEffect()
    expect(spy).toHaveBeenCalledTimes(2)
    const e4 = dom.effect()
    expect(spy).toHaveBeenLastCalledWith(e4)
    expect(spy).toHaveBeenCalledTimes(3)
    expect(() => {
      unsub()
    }).not.toThrow()
    dom.effect()
    expect(spy).toHaveBeenCalledTimes(3)
  })

  test('nested domains', () => {
    const spyDom = jest.fn()
    const spySub = jest.fn()
    const dom = createDomain()
    const subdom = dom.domain()
    dom.onCreateEvent(e => spyDom(e))
    subdom.onCreateEvent(e => spySub(e))
    const e1 = dom.event()
    expect(spyDom).toHaveBeenLastCalledWith(e1)
    expect(spySub).not.toHaveBeenCalled()
    const e2 = subdom.event()
    expect(spyDom).toHaveBeenLastCalledWith(e2)
    expect(spySub).toHaveBeenLastCalledWith(e2)
  })
})

describe('domain name', () => {
  test("should return it's own name on domain.getType()", () => {
    expect(createDomain('foo').getType()).toBe('foo')
  })
  test('subdomains should has full path in name', () => {
    const domain = createDomain('dom')
    const subdomain = domain.domain('subdom')
    expect(domain.domain('foo').getType()).toBe('dom/foo')
    expect(subdomain.domain('bar').getType()).toBe('dom/subdom/bar')
  })
  test('empty domain name should be skipped', () => {
    const domain = createDomain('')
    const subdomain = domain.domain('subdom')
    expect(domain.domain('foo').getType()).toBe('foo')
    expect(subdomain.domain('bar').getType()).toBe('subdom/bar')
  })
  describe('empty name support', () => {
    test(
      'createDomain() should' + ' create domain with empty string used as name',
      () => {
        //eslint-disable-next-line max-len
        expect(createDomain().getType()).toBeDefined()
        expect(createDomain().getType()).toBe('')
      },
    )
    test('domain.domain() should fallback to parent domain name', () => {
      const domain = createDomain('dom')
      expect(domain.domain().getType()).toBeDefined()
      expect(domain.domain().getType()).not.toBe('')
      expect(domain.domain().getType()).toBe('dom')
      expect(domain.effect().getType()).not.toBe('dom/')
    })
  })
})
