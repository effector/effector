//@flow

import {createStore, createStoreObject} from '..'

describe('createStoreObject', () => {
  test('.defaultState', () => {
    const foo = createStore('')
    const bar = createStore('')
    const store = createStoreObject({foo, bar})
    foo.setState('foo')
    bar.setState('bar')
    expect(foo.defaultState).toEqual('')
    expect(bar.defaultState).toEqual('')
    expect(store.defaultState).toEqual({foo: '', bar: ''})
    expect(store.getState()).toEqual({foo: 'foo', bar: 'bar'})
  })
})
