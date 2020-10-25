import {Domain, Store, combine} from 'effector'

export function createField(root: Domain, field: string, initialValue: any) {
  const trigger = root.createEvent<any>()
  const value = root.createStore(initialValue).on(trigger, (_, e) => e)
  return {trigger, value, field}
}

export function createFieldset(
  root: Domain,
  fn: () => ReturnType<typeof createField>[],
) {
  const reset = root.createEvent()
  const shape = {} as Record<string, Store<any>>
  const fieldList = fn()
  for (const item of fieldList) {
    const {field, value} = item
    value.reset(reset)
    shape[field] = value
  }
  const fieldset = combine(shape)
  return {shape, fieldset, reset}
}
