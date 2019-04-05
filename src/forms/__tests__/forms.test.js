//@flow

import faker from 'faker'
import {type Effect, createEffect, createEvent, restoreEvent} from 'effector'
import {createFormApi} from '../'

describe('createFormApi', () => {
  test('submitEffect', () => {
    const submitEffect: Effect<
      {|
        firstName: string,
        lastName: string,
      |},
      string,
      number,
    > = createEffect()
    submitEffect.use(async() => 'foo')

    submitEffect.watch(params => expect(params).toMatchSnapshot())

    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
      submitEffect,
    })
    form.submitted.watch(a => expect(a).toMatchSnapshot('submitted'))
    form.api.firstName('bar')
    form.handleSubmit()
  })

  test('submitEvent', () => {
    const submitEvent = createEvent<{|
      firstName: string,
      lastName: string,
    |}>()
    submitEvent.watch(params => expect(params).toMatchSnapshot())
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
      submitEvent,
    })
    form.submitted.watch(a => expect(a).toMatchSnapshot('submitted'))
    form.api.firstName('foo')
    form.handleSubmit()
  })

  test('validate', () => {
    const submitEvent = createEvent<{|
      firstName: string,
      lastName: string,
    |}>()
    submitEvent.watch(params => expect(params).toMatchSnapshot())
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
      validate({firstName, lastName}, data) {
        if (firstName.length < 6) return {firstName: 'First name is too short.'}
        return {}
      },
      submitEvent,
    })
    form.submitted.watch(a => expect(a).toMatchSnapshot('submitted'))
    form.handleSubmit()
    form.api.firstName('foobar')
    form.handleSubmit()
  })

  test('initial values', () => {
    faker.seed(0xdeadbeef)
    const submitEvent = createEvent<{|
      firstName: string,
      lastName: string,
    |}>()
    const generate = createEvent()
    const initialValues = restoreEvent(generate, {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }).map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }))
    const form = createFormApi({
      initialValues,
      fields: {
        firstName: '',
        lastName: '',
      },
      submitEvent,
    })
    initialValues.watch(values =>
      expect(values).toMatchSnapshot('initial values'),
    )
    form.values.watch(values => expect(values).toMatchSnapshot('values'))
    generate(1)
    form.api.firstName('Alan')
    generate(2)
    generate(3)
  })
})
