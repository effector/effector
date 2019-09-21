//@flow

import {createEvent, createStore, split, type Event} from 'effector'

it('split event by matching conditions', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const source: Event<string[]> = createEvent()
  const {emptyList, oneElement, commonList} = split(source, {
    emptyList: list => list.length === 0,
    oneElement: list => list.length === 1,
    commonList: list => list.length > 1,
  })
  emptyList.watch(list => fn1(list))
  commonList.watch(list => fn2(list))
  source([])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).not.toBeCalled()
  source(['1'])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).not.toBeCalled()
  source(['foo', 'bar'])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(1)
})

it('has default case __', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const source: Event<string[]> = createEvent()
  const {emptyList, oneElement, __: commonList} = split(source, {
    emptyList: list => list.length === 0,
    oneElement: list => list.length === 1,
  })
  emptyList.watch(list => fn1(list))
  commonList.watch(list => fn2(list))
  source([])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).not.toBeCalled()
  source(['1'])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).not.toBeCalled()
  source(['foo', 'bar'])
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(1)
})
