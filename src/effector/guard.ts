import {processArgsToConfig} from './config'
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

export function guard(...args: any[]) {
  const meta: Record<string, any> = {op: 'guard'}
  let rawName = 'guard'
  let [[source, config], metadata] = processArgsToConfig(args)
  if (metadata) {
    meta.config = metadata
    if (metadata.name) rawName = metadata.name
  }
  if (!config) {
    config = source
    source = config.source
  }
  const {filter, greedy, clock, name = rawName} = config
  const target = config.target || createEvent(name, meta.config)
  if (!is.unit(source)) source = combine(source)
  if (clock) source = sample({source, clock, greedy})
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
            owners: [source, filter, target, ...[].concat(clock ? clock : [])],
            links: target,
          },
        }),
      ),
      fn: (guard: any, data: any) => ({guard, data}),
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
