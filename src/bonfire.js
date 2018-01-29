//@flow

import {type ID, createIDType} from './id'

const nextID = createIDType()
export class Bonfire<Field, State> {
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
): Bonfire<Field, State> {
  const result = new Bonfire
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
  bonfire: Bonfire<Field, State>
): {
  bonfire: Bonfire<Field, State>,
  parent: State,
} {
  const value = bonfire.getter(parent)
  const nextValueRaw = updater(parent, value)
  let nextValue: $NonMaybeType<Field>
  if (nextValueRaw === undefined)
    nextValue = bonfire.defaultValue
  else
    nextValue = nextValueRaw
  if (nextValue === value) return {
    bonfire,
    parent,
  }
  const nextState = bonfire.setter(parent, nextValue)
  const result = new Bonfire
  result.id = bonfire.id
  result.seq = bonfire.seq + 1
  result.value = nextValue
  return {
    bonfire: result,
    parent: nextState,
  }
}
