//@flow

// import type {Stream} from 'most'
// import {createStore, applyMiddleware, combineReducers, type Middleware, type Store, type Reducer} from 'redux'
import {combineReducers, type Reducer} from 'redux'
import {getStore, createReducer} from '../../lib'

test.skip('func instance', () => {
  interface IData {
    $call: () => string,
    tag: string,
    fn(): string,
  }
  class CData implements IData {
    $call: () => string
    tag: string
    fn(): string {
      return this.tag
    }
    constructor(tag: string) {
      this.tag = tag
    }
  }
  function inst(): string {
    console.log(this)
    return this.fn()
  }
  // Object.setPrototypeOf(inst, CData.prototype)
  // inst.prototype.fn = function() {
  //   return this.cdata.fn()
  // }
  function Data(tag: string): IData {
    const src = new CData(tag)
    const subInst = inst.bind(src)
    const reinst = Object.setPrototypeOf(subInst, src)
    Object.assign(reinst, src)
    return reinst
  }
  const data = Data('test')
  // console.log(data.__proto__)
  expect(data()).toBe('test')
  data.tag = 'not test'
  expect(data.fn()).not.toBe('test')
  expect(data.tag).not.toBe('test')

  const nextData = Data('xxx')
  expect(data()).toBe('test')
  expect(nextData()).toBe('xxx')
  // console.log(data.__proto__)
  // console.log(data)
})

test('create store', () => {
  const store = getStore('ok', (state, pl) => state)
  console.log(store)
  expect(store).toBeDefined()
  const event1 = store.event('event1')
  expect(event1).toBeDefined()
  const act = event1({foo: 'bar'})
})

describe('getType', () => {
  test('event', () => {
    const store = getStore('getTypeStore', (state, pl) => state)
    const event1 = store.event('event1')
    expect(event1.getType()).toBe('getTypeStore/event1')
    const act = event1('foo')
    expect(act.type).toBe(event1.getType())
  })
  test('effect', async() => {
    const fn = jest.fn()
    const fnEvent = jest.fn()
    const store = getStore('getTypeStore', (state, pl) => (fn(pl), state))
    store.update$
      .map(({data}) => data)
      .observe(fnEvent)
    const effect1 = store.effect('effect1')
    const fromUse = effect1.use((foo: 'foo') => Promise.resolve(foo))
    expect(fromUse).toBe(effect1)
    console.log(fromUse)
    console.log(effect1)
    expect(effect1.getType()).toBe('getTypeStore/effect1')
    effect1('foo')
    await effect1('foo').done()
    effect1.use((foo: 'foo') => Promise.reject(foo))
    await effect1('foo').fail()
    expect(fnEvent.mock.calls).toHaveLength(4)
    const [run1, done, run2, fail] = unwrapActions(fnEvent.mock.calls)
    expect(run1.type).toBe('getTypeStore/effect1')
    expect(run2.type).toBe('getTypeStore/effect1')
    expect(done.type).toBe('getTypeStore/effect1 done')
    expect(fail.type).toBe('getTypeStore/effect1 fail')
  })
})

function unwrapActions<T>(actionLog: $ReadOnlyArray<[T]>): T[] {
  return actionLog.map(([x]) => x)
}

function cleanActionLog([unused, ...actionLog]) {
  return unwrapActions(actionLog)
}

test('execution correctness', async() => {
  const fn = jest.fn()
  const fnEpic = jest.fn()
  const fnEpicDone = jest.fn()
  const store = getStore('ok', (state, pl) => (fn(pl), state))
  const send = store.dispatch
  const message = store.effect('eff1')
  const event = store.event('evn1')
  const act1 = message({foo: 'bar', meta: 'first'})
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(0)
  expect(act1).toBeDefined()
  const prom = act1.done()
  await act1.dispatched()
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(1)
  send(act1)
  expect(prom instanceof Promise).toBeTruthy()
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(1)
  message.epic(
    (data$) => data$.map(
      ({data}) => event({...data, evt: true})
    )
      .tap(fnEpic)
  )
  message.done.epic(
    data$ => data$.map(
      ({data}) => fnEpicDone(data)
    )
  )
  send(message({foo: 'bar', meta: 'first'}))
  send(message({foo: 'bar', meta: 'second'}))
  await send(message({foo: 'bar', meta: 'third'})).dispatched()
  expect(fnEpic).toHaveBeenCalledTimes(3)
  // await delay({}, 2e3)
  // const actionLog = cleanActionLog(fn.mock.calls)
  // expect(actionLog).toHaveLength(6)
  // logs: {
  //   console.log(actionLog)
  // }
})

test('event.watch', async() => {
  const fn = jest.fn()
  const fnDeb = jest.fn()
  const defStore = {foo: 'bar'}
  const store = getStore('watchStore', (state = defStore) => state)
  const event = store.event('watched')
  const nextEvent = store.event('next')
  event.watch(async(data) => {
    fnDeb(data)
    await new Promise(rs => setTimeout(rs, 300))
    const result = nextEvent(data)
    return result
  })
  nextEvent.watch((data, store) => fn(data, store))

  store.dispatch(event('run'))

  // await event('run').dispatched()
  await new Promise(rs => setTimeout(rs, 500))
  expect(fnDeb).toHaveBeenCalledTimes(1)
  expect(fn).toHaveBeenLastCalledWith('run', defStore)

  event.watch(() => Promise.reject())
  await store.dispatch(event('run')).dispatched()
})

test('await event().send()', async() => {
  const fn = jest.fn()
  const fnPl = jest.fn()
  const defStore = {foo: 'bar'}
  const store = getStore('event().send()', (state = defStore, pl) => (fnPl(pl), state))

  const event = store.event('watched')
  event.watch(e => (console.log(e), fn(e)))

  event('a')
  const act = event('b')
  act.send()
  const payload = await act.send()
  expect(payload).toBe('b')
  expect(fn).toHaveBeenCalledTimes(1)
  // expect(cleanActionLog(fnPl.mock.calls)).toEqual(['b'])
})

test('call watch once', async() => {
  const fnWatch = jest.fn()
  const fnEpic = jest.fn()
  const fnPl = jest.fn()
  const defStore = {foo: 'bar'}
  const store = getStore('once', (state = defStore, pl) => (fnPl(pl), state))
  const event = store.event('probe')
  event.watch(fnWatch)
  event.epic(data$ => data$.map(fnEpic))
  await event('a').send()
  await event('b').send()
  expect(fnPl).toHaveBeenCalledTimes(3)
  expect(fnWatch).toHaveBeenCalledTimes(2)
  expect(fnEpic).toHaveBeenCalledTimes(2)
})

test('reducer', async() => {
  const red: Reducer<{foo: 'bar'}> = createReducer({foo:{foo: 'bar'},inj: 'inj'})
  expect(typeof red === 'function').toBeTruthy()
  const store = getStore('foo', combineReducers({red}))
  const substore = store.subdomain('bar')
  const event = store.event('event')
  const subevent = substore.event('sub')
  await store.injector.importReducer('inj', () => Promise.resolve(() => 'inj'))
  red.on(event, (data) => data)
  await event('ee').send()
  await subevent('run').send()
  expect(store.stateGetter()).toHaveProperty('inj', 'inj')
})
