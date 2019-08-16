//@flow

import {type Gate, createGate} from 'effector-react'
import type {FormApi} from '../'

export function createFormMount<Values: {...}, Errors: {...}>(
  formApi: FormApi<Values, Errors>,
): Gate<{||}> {
  const OnMount = createGate<{||}>('form mount')
  OnMount.close.watch(() => formApi.reset())
  return OnMount
}
