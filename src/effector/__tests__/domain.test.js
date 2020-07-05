import {
  createDomain,
  clearNode,
  createStore,
  createEvent,
  createEffect,
  createApi,
  restore,
  attach,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

describe('domain hooks', () => {
  test('domain.onCreateEvent(fn)', () => {
    const fn = jest.fn()
    const dom = createDomain()
    dom.createEvent()
    const unsub = dom.onCreateEvent(e => fn(e))
    expect(fn).toHaveBeenCalled()
    const e2 = dom.createEvent()
    expect(fn).toHaveBeenLastCalledWith(e2)
    createEvent()
    expect(fn).toHaveBeenCalledTimes(2)
    const e4 = dom.createEvent()
    expect(fn).toHaveBeenLastCalledWith(e4)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(() => {
      unsub()
    }).not.toThrow()
    dom.createEvent()
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('domain.onCreateEffect(fn)', () => {
    const fn = jest.fn()
    const dom = createDomain()
    dom.createEffect()
    const unsub = dom.onCreateEffect(e => fn(e))
    expect(fn).toHaveBeenCalled()
    const e2 = dom.createEffect()
    expect(fn).toHaveBeenLastCalledWith(e2)
    createEffect()
    expect(fn).toHaveBeenCalledTimes(2)
    const e4 = dom.createEffect()
    expect(fn).toHaveBeenLastCalledWith(e4)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(() => {
      unsub()
    }).not.toThrow()
    dom.createEffect()
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('nested domains', () => {
    const spyDom = jest.fn()
    const spySub = jest.fn()
    const dom = createDomain()
    const subdom = dom.createDomain()
    dom.onCreateEvent(e => spyDom(e))
    subdom.onCreateEvent(e => spySub(e))
    const e1 = dom.createEvent()
    expect(spyDom).toHaveBeenLastCalledWith(e1)
    expect(spySub).not.toHaveBeenCalled()
    const e2 = subdom.createEvent()
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
    const subdomain = domain.createDomain('subdom')
    expect(domain.createDomain('foo').getType()).toBe('dom/foo')
    expect(subdomain.createDomain('bar').getType()).toBe('dom/subdom/bar')
  })
  test('empty domain name should be skipped', () => {
    const domain = createDomain('')
    const subdomain = domain.createDomain('subdom')
    expect(domain.createDomain('foo').getType()).toBe('foo')
    expect(subdomain.createDomain('bar').getType()).toBe('subdom/bar')
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
    test('domain.createDomain() should fallback to parent domain name', () => {
      const domain = createDomain('dom')
      expect(domain.createDomain().getType()).toBeDefined()
      expect(domain.createDomain().getType()).not.toBe('')
      expect(domain.createDomain().getType()).toBe('dom')
      expect(domain.createEffect().getType()).not.toBe('dom/')
    })
  })
})
describe('config', () => {
  test('domain.createEffect(config)', async () => {
    const fn = jest.fn()
    const domain = createDomain()
    const fx = domain.createEffect({
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
    const add = domain.createEvent()
    const source = domain
      .createStore([])
      .on(add, (list, item) => [...list, item])
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
    const add = domain.createEvent()
    const source = domain
      .createStore([])
      .on(add, (list, item) => [...list, item])
    const mappedA = source.map(list => list.length)
    source.map(list => list.length)
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
  test('domain should own its hooks', () => {
    const domain = createDomain()
    clearNode(domain)
    //this mean onCreateEvent hook will be erased together with domain itself
    expect(domain.hooks.event.graphite.scope).toBe(null)
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
  describe('support attach', () => {
    test('with source', () => {
      const fn = jest.fn()
      const domain = createDomain()
      domain.onCreateEffect(e => fn(e))
      const source = domain.createStore(null)
      const fx = domain.createEffect()
      const attached = attach({
        source,
        effect: fx,
        mapParams: _ => _,
      })
      expect(argumentHistory(fn)).toEqual([fx, attached])
    })
    test('without source', () => {
      const fn = jest.fn()
      const domain = createDomain()
      domain.onCreateEffect(e => fn(e))
      const fx = domain.createEffect()
      const attached = attach({
        effect: fx,
        mapParams: _ => _,
      })
      expect(argumentHistory(fn)).toEqual([fx, attached])
    })
  })
})

test('parent assignment', () => {
  const fn = jest.fn()
  const domain = createDomain()
  domain.onCreateEffect(fx => {
    domain.hooks.event(fx.doneData)
  })
  domain.onCreateStore(store => {
    fn(store.shortName)
  })
  const fx = domain.createEffect()
  const store = restore(fx.doneData, {})
  expect(argumentHistory(fn)).toEqual(['store'])
})
