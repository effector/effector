//@flow

import type {Unit} from './stdlib'
import {forward, createLinkNode} from './forward'
import {sample} from './sample'
import {createEvent} from './event'
import {is, step, getGraph, createNode} from './stdlib'
import {clearNode} from './clearNode'

export function guard({
  source,
  filter,
  target,
  greedy = false,
  name = null,
}: any) {
  let result
  const meta = {op: 'guard'}

  if (is.unit(filter)) {
    result = sample({
      source: filter,
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
          owners: [source, filter, target],
          links: [target],
        },
      }),
      fn: (guard, data) => ({guard, data}),
      greedy,
      name,
    })
  } else {
    if (typeof filter !== 'function')
      throw Error('`filter` should be function or unit')
    result = createLinkNode(source, target, {
      scope: {fn: filter},
      node: [
        step.filter({
          fn: (upd, {fn}) => fn(upd),
        }),
      ],
      meta,
    })
  }
  const unsub = clearNode.bind(null, result, {})
  unsub.unsubscribe = unsub
  unsub.graphite = result
  return unsub
}
