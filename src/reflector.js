//@flow

import {type ID, createIDType} from './id'

const nextID = createIDType()
export class Reflector<Field, State> {
  id: ID
  seq: number
  value: $ReadOnly<Field>
  defaultValue: $ReadOnly<Field>
  getter: (parent: State) => Field
  setter: (parent: State, value: Field) => State
}

export function init<Field, State>(
  defaultValue: Field,
  getter: (parent: State) => Field,
  setter: (parent: State, value: Field) => State
): Reflector<Field, State> {
  const result = new Reflector
  result.id = nextID()
  result.seq = 0
  result.value = defaultValue
  result.defaultValue = defaultValue
  result.getter = getter
  result.setter = setter
  return result
}

export function update<Field, State>(
  parent: State,
  updater: (
    // ( (parent: State, value: Field) => void ) |
    // ( (parent: State, value: Field) => Field )
    (parent: State, value: Field) => ( $NonMaybeType<Field> | void)
  ),
  reflector: Reflector<Field, State>
): {
  reflector: Reflector<Field, State>,
  parent: State,
} {
  const value = reflector.getter(parent)
  const nextValueRaw = updater(parent, value)
  let nextValue: $NonMaybeType<Field>
  if (nextValueRaw === undefined)
    nextValue = reflector.defaultValue
  else
    nextValue = nextValueRaw
  if (nextValue === value) return {
    reflector,
    parent,
  }
  const nextState = reflector.setter(parent, nextValue)
  const result = new Reflector
  result.id = reflector.id
  result.seq = reflector.seq + 1
  result.value = nextValue
  return {
    reflector: result,
    parent: nextState,
  }
}
