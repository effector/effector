import {reactive} from 'vue-next'
import * as v8 from 'v8'

import {clone} from '../lib/clone'

jest.mock('vue', () => require('vue-next'))

/**
 * The jsdom environment of jest has no `structuredClone`. The copy through the value
 * serializer of v8 keeps the same set of types, so it stands in for it; the
 * objects it builds belong to the realm of node, hence the checks by tag
 * instead of `instanceof`.
 */
const structuredCloneStub = (value: unknown) =>
  v8.deserialize(v8.serialize(value))

const tagOf = (value: unknown) => Object.prototype.toString.call(value)

const own = typeof structuredClone === 'function' ? structuredClone : undefined

afterEach(() => {
  if (own) {
    ;(globalThis as any).structuredClone = own
  } else {
    delete (globalThis as any).structuredClone
  }
})

describe('with structuredClone', () => {
  beforeEach(() => {
    ;(globalThis as any).structuredClone = structuredCloneStub
  })

  test('copies the value instead of sharing it', () => {
    const source = {user: {name: 'John'}}
    const copy = clone(source)

    expect(copy).toEqual(source)
    expect(copy).not.toBe(source)
    expect(copy.user).not.toBe(source.user)
  })

  test('keeps Map, Set and Date', () => {
    const source = {
      tags: new Set(['effector']),
      meta: new Map([['author', 'John']]),
      created: new Date('2020-01-01T00:00:00.000Z'),
    }
    const copy = clone(source)

    expect(tagOf(copy.tags)).toBe('[object Set]')
    expect([...copy.tags]).toEqual(['effector'])
    expect(tagOf(copy.meta)).toBe('[object Map]')
    expect([...copy.meta]).toEqual([['author', 'John']])
    expect(tagOf(copy.created)).toBe('[object Date]')
    expect(copy.created.getTime()).toBe(source.created.getTime())
    expect(copy.created).not.toBe(source.created)
  })

  test('copies the raw value of a reactive proxy', () => {
    const source = reactive({tags: new Set(['effector'])})
    const copy = clone(source)

    expect(tagOf(copy.tags)).toBe('[object Set]')
    expect([...copy.tags]).toEqual(['effector'])
  })

  test('falls back on a value it cannot serialize', () => {
    const onSubmit = () => {}
    const copy = clone({onSubmit, name: 'John'})

    expect(copy.name).toBe('John')
    expect(copy.onSubmit).toBe(onSubmit)
  })
})

describe('without structuredClone', () => {
  beforeEach(() => {
    delete (globalThis as any).structuredClone
  })

  test('copies the value with deepCopy', () => {
    const source = {user: {name: 'John'}}
    const copy = clone(source)

    expect(copy).toEqual(source)
    expect(copy.user).not.toBe(source.user)
  })

  test('copies the raw value of a reactive proxy', () => {
    const source = reactive({user: {name: 'John'}})
    const copy = clone(source)

    expect(copy).toEqual({user: {name: 'John'}})
  })
})
