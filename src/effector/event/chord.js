//@flow
import {
  step,
  createGraph,
  nextBarrierID,
  createStateRef,
  readRef,
  writeRef,
  type StateRef,
} from 'effector/stdlib'

import type {Event} from './index.h'
import {createEvent} from './createEvent'
import {forward} from './forward'

type CombinationScope = {
  key: string,
  target: StateRef,
  isFresh: StateRef,
  pending: StateRef,
  total: string[],
}

export const chord = (obj: Object) => {
  const node = [
    step.tap({
      fn(upd, {target, isFresh, pending, total}: CombinationScope) {
        if (!readRef(isFresh)) return
        writeRef(isFresh, false)
        writeRef(target, {})
        writeRef(pending, total.slice())
      },
    }),
    step.tap({
      fn(upd, {target, key}: CombinationScope) {
        readRef(target)[key] = upd
      },
    }),
    step.tap({
      fn(upd, {pending, key}: CombinationScope) {
        writeRef(pending, readRef(pending).filter(e => e !== key))
      },
    }),
    step.barrier({barrierID: nextBarrierID()}),
    step.tap({
      fn(upd, {isFresh}: CombinationScope) {
        writeRef(isFresh, true)
      },
    }),
    step.filter({
      fn: (upd, {pending}: CombinationScope) => readRef(pending).length === 0,
    }),
    step.compute({
      fn: (upd, {target}: CombinationScope) => readRef(target),
    }),
  ]

  const target = createStateRef({})
  const isFresh = createStateRef(true)
  const total = Object.keys(obj)
  const pending = createStateRef(total.slice())
  const result: Event<any> = createEvent('chord')
  for (const key in obj) {
    forward({
      from: obj[key],
      to: createGraph({
        scope: {key, target, isFresh, total, pending},
        node,
        child: [result],
      }),
    })
  }

  return result
}
