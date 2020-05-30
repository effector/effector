//@flow

import {onConfigNesting} from './config'
import {createLinkNode} from './forward'
import {sample} from './sample'
import {createEvent} from './createUnit'
import {combine} from './combine'
import {step} from './typedef'
import {callStack} from './caller'
import {is, isFunction} from './is'
import {createNode} from './createNode'
import {addToRegion} from './region'
import {throwError} from './throw'

export function guard(source, config) {
  const meta = {op: 'guard'}
  onConfigNesting(source, (injectedData, userConfig) => {
    meta.config = injectedData
    ;[source, config] = userConfig
  })
  if (!config) {
    config = source
    source = config.source
  }
  const {filter, greedy, name = 'guard'} = config
  const target = config.target || createEvent(name)
  if (!is.unit(source)) source = combine(source)

  if (is.unit(filter)) {
    sample({
      source: filter,
      clock: source,
      target: addToRegion(
        createNode({
          node: [
            step.filter({
              fn: ({guard}) => guard,
            }),
            step.compute({
              fn: ({data}) => data,
            }),
          ],
          child: target,
          meta,
          family: {
            owners: [source, filter, target],
            links: target,
          },
        }),
      ),
      fn: (guard, data) => ({guard, data}),
      greedy,
      name,
    })
  } else {
    if (!isFunction(filter)) throwError('`filter` should be function or unit')
    createLinkNode(source, target, {
      scope: {fn: filter},
      node: [step.filter({fn: callStack})],
      meta,
    })
  }
  return target
}
