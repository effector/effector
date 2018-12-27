//@flow
import {typeDef} from 'effector/stdlib/typedef'

const type = () => null

export const Step = typeDef(('step': 'step'), {
  single: type(),
  multi: type(),
  seq: type(),
  choose: type(),
})

export const Cmd = typeDef(('cmd': 'cmd'), {
  compute: type(),
  emit: type(),
  run: type(),
  filter: type(),
  update: type(),
})

export const Ctx = typeDef(('ctx': 'ctx'), {
  compute: type(),
  emit: type(),
  run: type(),
  filter: type(),
  update: type(),
})
