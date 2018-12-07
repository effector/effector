//@flow

import {createDomain} from 'effector/domain'
import {createEvent} from 'effector/event'
import {createStore, createStoreObject} from 'effector/store'
import {storeNaming} from '../setStoreName'

const rootDomain = createDomain()

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

      expect(formObject.compositeName?.fullName).toBe('form/formObject')
      expect(firstName.compositeName?.fullName).toBe(
        'form/formObject/firstName',
      )
      expect(lastName.compositeName?.fullName).toBe('form/formObject/lastName')
    })
  })

  test("doesn't accept wrong types", () => {
    const foo = createEvent()
    const i = 1
    storeNaming({foo, i})
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
