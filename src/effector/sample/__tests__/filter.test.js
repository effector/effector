import {sample, createStore, createEvent, createApi} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('support filter with events', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const tag = createStore('tag')
  const locked = createStore(false)

  const sampled = sample({
    source: {tag, locked},
    clock: trigger,
    filter: ({locked}) => !locked,
  })

  tag.on(trigger, (_, newTag) => newTag)

  const {lock, unlock} = createApi(locked, {
    lock: () => true,
    unlock: () => false,
  })

  sampled.watch(({tag}) => {
    fn(tag)
  })

  trigger('A')
  trigger('B')
  lock()
  trigger('C')
  trigger('D')
  unlock()
  trigger('E')
  expect(argumentHistory(fn)).toEqual(['A', 'B', 'E'])
})
it('support filter with stores', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const clock = createStore(0)
  const tag = createStore('tag')
  const locked = createStore(false)

  const sampled = sample({
    source: {tag, locked},
    clock,
    filter: ({locked}) => !locked,
  })

  tag.on(trigger, (_, newTag) => newTag)
  clock.on(trigger, x => x + 1)

  const {lock, unlock} = createApi(locked, {
    lock: () => true,
    unlock: () => false,
  })

  sampled.watch(({tag}) => {
    fn(tag)
  })

  trigger('A')
  trigger('B')
  lock()
  trigger('C')
  trigger('D')
  unlock()
  trigger('E')
  expect(argumentHistory(fn)).toEqual(['tag', 'A', 'B', 'E'])
})

it('support filter with target', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const target = createEvent()
  const tag = createStore('tag')
  const locked = createStore(false)

  sample({
    source: {tag, locked},
    clock: trigger,
    filter: ({locked}) => !locked,
    target,
  })

  tag.on(trigger, (_, newTag) => newTag)

  const {lock, unlock} = createApi(locked, {
    lock: () => true,
    unlock: () => false,
  })

  target.watch(({tag}) => {
    fn(tag)
  })

  trigger('A')
  trigger('B')
  lock()
  trigger('C')
  trigger('D')
  unlock()
  trigger('E')
  expect(argumentHistory(fn)).toEqual(['A', 'B', 'E'])
})

test('throw error when initial store state is discarded', () => {
  const foo = createStore(0)
  const bar = createStore(1)

  expect(() => {
    sample({
      source: foo,
      clock: bar,
      filter: () => false,
    })
  }).toThrowErrorMatchingInlineSnapshot(
    `"cannot create store without initial state"`,
  )
})

test('dont throw error when target store is provided', () => {
  const foo = createStore(0)
  const bar = createStore(1)
  const target = createStore(1)

  expect(() => {
    sample({
      source: foo,
      clock: bar,
      filter: () => false,
      target,
    })
  }).not.toThrow()
})
