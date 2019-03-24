//@flow

import * as React from 'react'
import {createFormApi} from '../'
import {createFormField} from '../react'

const form = createFormApi({
  fields: {
    firstName: '',
    lastName: 0,
  },
})

test('createFormField', () => {
  const Field = createFormField(form)
  const a = <Field name="firstName">{value => {}}</Field>
  const b = <Field name="lastName">{value => {}}</Field>
})
