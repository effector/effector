import {
  Store,
  combine,
  createEvent,
  createStore,
  Effect,
  createEffect,
  sample,
} from 'effector'

export function createField(field: string, initialValue: any) {
  const trigger = createEvent<any>()
  const value = createStore(initialValue).on(trigger, (_, e) => e)
  return {trigger, value, field}
}

export function createFieldset(fn: () => ReturnType<typeof createField>[]) {
  const reset = createEvent()
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

export function createOperation(effect: Effect<void, number>) {
  const $value = createStore<number | null>(null)
  const run = createEvent()
  const execute = createEffect(async () => {
    const result = await effect()
    return result
  })

  sample({
    clock: run,
    target: execute,
  })
  sample({
    clock: execute.doneData,
    target: $value,
  })

  return {$value, run}
}
