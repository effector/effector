//@flow

import {createStore, createStoreObject} from '..'

describe('createStoreObject', () => {
  test('.defaultState', () => {
    const foo = createStore('')
    const bar = createStore('')
    const store = createStoreObject({foo, bar})
    foo.setState('foo')
    bar.setState('bar')
    expect(store.defaultState).toBe({foo: '', bar: ''})
  })
})
