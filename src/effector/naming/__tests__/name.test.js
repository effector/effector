//@flow

import {
  createEvent,
  createStore,
  createStoreObject,
  createDomain,
} from 'effector'
import {storeNaming, unitObjectName} from '..'

const rootDomain = createDomain('')

describe('.map support', () => {
  it('should support event.map', () => {
    const foo = createEvent()
    const bar = foo.map({
      name: 'Bar',
      fn: x => x,
    })
    expect(bar.shortName).toBe('Bar')
  })
  it('should support store.map', () => {
    const foo = createStore(0)
    const bar = foo.map({
      name: 'Bar',
      fn: x => x + 1,
    })
    expect(bar.shortName).toBe('Bar')
  })
})

describe('naming', () => {
  describe('domain', () => {
    test('value store', () => {
      const domain = rootDomain.domain('form')
      const firstName = domain.store('')
      const lastName = domain.store('')
      //babel does this
      //storeNaming({firstName, lastName})

      expect(firstName.domainName?.fullName).toBe('form')
      expect(lastName.domainName?.fullName).toBe('form')
      expect(firstName.compositeName?.fullName).toBe('form/firstName')
      expect(lastName.compositeName?.fullName).toBe('form/lastName')
    })

    // unclear behaviour
    test('object store', () => {
      const domain = rootDomain.domain('form')
      const firstName = domain.store('')
      const lastName = domain.store('')
      const formObject = createStoreObject({firstName, lastName})

      storeNaming({formObject})
      //TODO fix naming issue
      //should be:
      //expect(formObject.compositeName?.fullName).toBe('form/formObject')
      //expect(firstName.compositeName?.fullName)
      //.toBe('form/formObject/firstName')
      //expect(lastName.compositeName?.fullName)
      //.toBe('form/formObject/lastName')
      expect(formObject.compositeName?.fullName).toBe('formObject')
      expect(firstName.compositeName?.fullName).toBe('formObject/firstName')
      expect(lastName.compositeName?.fullName).toBe('formObject/lastName')
    })
  })

  test("doesn't accept wrong types", () => {
    const spy = jest.spyOn(global.console, 'warn')
    const foo = createEvent('foo')
    const i = 1
    storeNaming({foo, i})
    expect(spy).toHaveBeenNthCalledWith(
      1,
      'effector: Key "%s" must be store but instead received %s',
      'foo',
      'event',
      foo,
    )
    expect(spy).toHaveBeenNthCalledWith(
      2,
      'effector: Key "%s" must be store but instead received %s',
      'i',
      '"number"',
      i,
    )
    spy.mockRestore()
  })

  test('value store', () => {
    const firstName = createStore('')
    const lastName = createStore('')
    //babel does this
    //storeNaming({firstName, lastName})

    expect(firstName.compositeName?.fullName).toBe('firstName')
    expect(lastName.compositeName?.fullName).toBe('lastName')
  })

  test('object store', () => {
    const firstName = createStore('')
    const lastName = createStore('')
    const form = createStoreObject({firstName, lastName})
    const app = createStoreObject({form})

    storeNaming({app})

    expect(form.compositeName?.fullName).toBe('app/form')
    expect(firstName.compositeName?.fullName).toBe('app/form/firstName')
    expect(lastName.compositeName?.fullName).toBe('app/form/lastName')
  })

  test('unnamed object store', () => {
    const firstName = createStore('')
    const lastName = createStore('')
    //babel does this
    //storeNaming({firstName, lastName})
    const form = createStoreObject({firstName, lastName})
    const app = createStoreObject({form})

    expect(app.compositeName?.fullName).toBe(
      'combine(combine(firstName, lastName))',
    )
    expect(form.compositeName?.fullName).toBe('combine(firstName, lastName)')
    expect(firstName.compositeName?.fullName).toBe('firstName')
    expect(lastName.compositeName?.fullName).toBe('lastName')
  })
})

describe('naming scheme', () => {
  test('storeObjectArrayName', () => {
    expect(unitObjectName([1, 2, 3])).toBe('combine(1, 2, 3)')
  })

  test('storeObjectName', () => {
    expect(
      unitObjectName({
        a: 1,
        b: 2,
        c: 3,
      }),
    ).toBe('combine(1, 2, 3)')
  })

  test('storeObjectArrayName doesnt breaks maximum', () => {
    const mock = Array.from({length: 100}, (_, i) => i.toString(36))
    const obj2 = mock.slice(0, 25)
    expect(unitObjectName(mock)).toBe(`combine(${obj2.join(', ')})`)
  })

  test('storeObjectName doesnt breaks maximum', () => {
    const mock = Array.from({length: 100}, (_, i) => i.toString(36))
    const obj = mock.reduce((acc, v) => ({...acc, [v]: v}), {})
    const obj2 = Object.values(obj).slice(0, 25)
    expect(unitObjectName(obj)).toBe(`combine(${obj2.join(', ')})`)
  })
})
