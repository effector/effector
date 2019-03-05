//@flow

import {type Gate, createGate} from 'effector-react'
import type {FormApi} from '../'

export function createFieldGate<Values: {}, Errors: {}>(
  formApi: FormApi<Values, Errors>,
): $ObjMap<Values, <V>(V) => Gate<{|value: V|}>> {
  const gate: {[key: string]: Gate<{|value: any|}>} = {}
  const fields = formApi.values.getState()
  for (const key in fields) {
    gate[key] = createGate(key)
    gate[key].state.watch(({value}) => {
      if (value) formApi.api[key](value)
    })
  }
  return gate
}
