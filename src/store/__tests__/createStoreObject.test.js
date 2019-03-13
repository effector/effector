//@flow

import {createStore} from '..'
import {createStoreObject} from '../createStoreObject'

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
