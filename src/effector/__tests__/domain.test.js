//@flow

import {
  createDomain,
  clearNode,
  createStore,
  createEvent,
  createEffect,
  createApi,
  restore,
} from 'effector'
import {spy, argumentHistory} from 'effector/fixtures'

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
  test('create* aliases', () => {
    const fn = jest.fn()
    const domain = createDomain()
    domain.onCreateEvent(fn)
    domain.onCreateEffect(fn)
    domain.onCreateStore(fn)
    domain.onCreateDomain(fn)
    const event = domain.createEvent()
    const effect = domain.createEffect()
    const store = domain.createStore(null)
    const subdomain = domain.createDomain()
    expect(argumentHistory(fn)).toEqual([event, effect, store, subdomain])
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
describe('config', () => {
  test('domain.effect(config)', async() => {
    const fn = jest.fn()
    const domain = createDomain()
    const fx = domain.effect({
      name: 'fx1',
      handler: fn,
    })
    await fx('payload')
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "payload",
      ]
    `)
  })
})
describe('domain ownership', () => {
  test('reference example', () => {
    const fn = jest.fn()
    const add = createEvent()
    const source = createStore([]).on(add, (list, item) => [...list, item])
    const mappedA = source.map(list => list.length)
    const mappedB = source.map(list => list.length)
    mappedA.watch(e => fn(e))
    add('a')
    clearNode(mappedB)
    add('b')
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })
  test('edge case with domains', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const add = domain.event()
    const source = domain.store([]).on(add, (list, item) => [...list, item])
    const mappedA = source.map(list => list.length)
    const mappedB = source.map(list => list.length)
    mappedA.watch(e => fn(e))
    add('a')
    clearNode(mappedB)
    add('b')
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })
  test('clearNode(domain) should work as usual', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const add = domain.event()
    const source = domain.store([]).on(add, (list, item) => [...list, item])
    const mappedA = source.map(list => list.length)
    const mappedB = source.map(list => list.length)
    mappedA.watch(e => fn(e))
    add('a')
    clearNode(domain)
    add('b')

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `)
  })
})

describe('indirect child support', () => {
  it('support createApi', () => {
    const fn = jest.fn()
    const domain = createDomain()
    domain.onCreateEvent(e => fn(e))
    const position = domain.createStore(0)
    const {moveLeft, moveRight} = createApi(position, {
      moveLeft: x => x - 1,
      moveRight: x => x + 1,
    })
    expect(argumentHistory(fn)).toEqual([moveLeft, moveRight])
  })
  it('support restore', () => {
    const fn = jest.fn()
    const domain = createDomain()
    domain.onCreateStore(e => fn(e))
    const source = domain.createEvent()
    const store = restore(source, null)
    expect(argumentHistory(fn)).toEqual([store])
  })
  it('support prepend', () => {
    const fn = jest.fn()
    const domain = createDomain()
    domain.onCreateEvent(e => fn(e))
    const source = domain.createEvent()
    const prepended = source.prepend(() => {})
    expect(argumentHistory(fn)).toEqual([source, prepended])
  })
})
