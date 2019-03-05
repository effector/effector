//@flow

import {type Effect, createEffect, createEvent} from 'effector'
import {type FormApi, createFormApi} from '../'

describe('createFormApi', () => {
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

  const submitEvent = createEvent<{|
    firstName: string,
    lastName: string,
  |}>()

  submitEvent.watch(params => expect(params).toMatchSnapshot())

  test('submitEffect', () => {
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
      submitEffect,
    })
    form.submitted.watch(a => expect(a).toMatchSnapshot())
    form.api.firstName('bar')
    form.handleSubmit()
  })

  test('submitEvent', () => {
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
      submitEvent,
    })
    form.submitted.watch(a => expect(a).toMatchSnapshot())
    form.api.firstName('foo')
    form.handleSubmit()
  })

  test('validate', () => {
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
    form.handleSubmit()
    form.api.firstName('foobar')
    form.handleSubmit()
  })
})
