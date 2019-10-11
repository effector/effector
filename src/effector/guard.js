//@flow

import type {Unit} from './stdlib'
import {forward, createLinkNode} from './forward'
import {sample} from './sample'
import {createEvent} from './event'
import {is, step, getGraph, createNode} from './stdlib'
import {clearNode} from './clearNode'

export function guard({
  source,
  when,
  target,
  greedy = false,
  name = null,
}: any) {
  let result
  const meta = {op: 'guard'}

  if (is.unit(when)) {
    result = sample({
      source: when,
      clock: source,
      target: createNode({
        node: [
          step.filter({
            fn: ({guard}) => guard,
          }),
          step.compute({
            fn: ({data}) => data,
          }),
        ],
        child: [target],
        meta,
        family: {
          type: 'crosslink',
          owners: [source, when, target],
          links: [target],
        },
      }),
      fn: (guard, data) => ({guard, data}),
      greedy,
      name,
    })
  } else {
    if (typeof when !== 'function')
      throw Error('`when` should be function or unit')
    result = createLinkNode(source, target, {
      scope: {fn: when},
      node: [
        step.filter({
          fn: (upd, {fn}) => fn(when),
        }),
      ],
      meta,
    })
  }
  const unsub = clearNode.bind(null, result, {})
  unsub.unsubscribe = unsub
  return unsub
}
