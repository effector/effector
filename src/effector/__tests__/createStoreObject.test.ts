import {createStore, createStoreObject} from 'effector'
let consoleError: any
beforeEach(() => {
  consoleError = console.error
  console.error = () => {}
})
afterEach(() => {
  console.error = consoleError
})

describe('createStoreObject', () => {
  test('.defaultState', () => {
    const foo = createStore('')
    const bar = createStore('')
    const store = createStoreObject({foo, bar, baz: 1})
    foo.setState('foo')
    bar.setState('bar')
    expect(foo.defaultState).toEqual('')
    expect(bar.defaultState).toEqual('')
    expect(store.defaultState).toEqual({foo: '', bar: '', baz: 1})
    expect(store.getState()).toEqual({foo: 'foo', bar: 'bar', baz: 1})
  })
})

describe('createStoreArray', () => {
  test('.defaultState', () => {
    const foo = createStore('')
    const bar = createStore('')
    const store = createStoreObject([foo, bar])
    foo.setState('foo')
    bar.setState('bar')
    expect(foo.defaultState).toEqual('')
    expect(bar.defaultState).toEqual('')
    expect(store.defaultState).toEqual(['', ''])
    expect(store.getState()).toEqual(['foo', 'bar'])
  })
})
