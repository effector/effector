import {StoreWritable, combine, createEvent, createStore} from 'effector'

export function createField(field: string, initialValue: any) {
  const trigger = createEvent<any>()
  const value = createStore(initialValue).on(trigger, (_, e) => e)
  return {trigger, value, field}
}

export function createFieldset(fn: () => ReturnType<typeof createField>[]) {
  const reset = createEvent()
  const shape = {} as Record<string, StoreWritable<any>>
  const fieldList = fn()
  for (const item of fieldList) {
    const {field, value} = item
    value.reset(reset)
    shape[field] = value
  }
  const fieldset = combine(shape)
  return {shape, fieldset, reset}
}

export function topLevelFactory(fn: any) {
  return fn()
}
