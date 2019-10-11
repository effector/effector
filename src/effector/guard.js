//@flow

import type {Unit} from './stdlib'
import {createLinkNode} from './forward'
import {sample} from './sample'
import {createEvent} from './event'
import {is, step, createNode} from './stdlib'

export function guard(source: any, config: any) {
  if (!config) {
    config = source
    source = config.source
  }
  const {filter, greedy, name = 'guard'} = config
  const target = config.target || createEvent(name)
  const meta = {op: 'guard'}
  if (is.unit(filter)) {
    sample({
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
    createLinkNode(source, target, {
      scope: {fn: filter},
      node: [
        step.filter({
          fn: (upd, {fn}) => fn(upd),
        }),
      ],
      meta,
    })
  }
  return target
}
