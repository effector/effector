//@flow
import {typeDef} from 'effector/stdlib/typedef'

const type = () => null

export const Step = typeDef(('step': 'step'), {
  single: type(),
  multi: type(),
  seq: type(),
})

export const Cmd = typeDef(('cmd': 'cmd'), {
  compute: type(),
  emit: type(),
  run: type(),
  filter: type(),
  update: type(),
})

export const Ctx = typeDef(('ctx': 'ctx'), {
  compute: (args, result, error, isError, isNone, isChanged) => ({
    args,
    result,
    error,
    isError,
    isNone,
    isChanged,
  }),
  emit: (eventName, payload) => ({eventName, payload}),
  run: (args, parentContext) => ({args, parentContext}),
  filter: (value, isChanged) => ({value, isChanged}),
  update: value => ({value}),
})
