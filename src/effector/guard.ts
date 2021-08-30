import {processArgsToConfig} from './config'
import {createLinkNode} from './forward'
import {groupInputs, sample} from './sample'
import {createEvent} from './createUnit'
import {calc, filter} from './step'
import {callStack} from './caller'
import {assertNodeSet, is, isFunction} from './is'
import {createNode} from './createNode'
import {assert} from './throw'

export function guard(...args: any[]) {
  const METHOD = 'guard'
  let [[source, config], metadata] = processArgsToConfig(args)
  const meta: Record<string, any> = {op: METHOD, config: metadata}
  if (!config) {
    config = source
    source = config.source
  }
  let {
    filter: filterFn,
    greedy,
    clock,
    name = metadata && metadata.name ? metadata.name : METHOD,
  } = config
  const target = config.target || createEvent(name, metadata)
  const filterIsUnit = is.unit(filterFn)
  ;[source, clock] = groupInputs(source, clock, METHOD)
  if (clock) {
    assertNodeSet(clock, METHOD, 'clock')
    source = sample({
      source,
      clock,
      greedy,
      fn: filterIsUnit ? null : (source: any, clock: any) => ({source, clock}),
    })
  }
  assertNodeSet(target, METHOD, 'target')
  if (filterIsUnit) {
    sample({
      source: filterFn,
      clock: source,
      target: createNode({
        node: [calc(({guard}) => guard, true), calc(({data}) => data)],
        child: target,
        meta,
        family: {
          owners: [source, filterFn, target, ...[].concat(clock ? clock : [])],
          links: target,
        },
        regional: true,
      }),
      fn: (guard: any, data: any) => ({guard, data}),
      greedy,
      name,
    })
  } else {
    assert(isFunction(filterFn), '`filter` should be function or unit')
    createLinkNode(source, target, {
      scope: {fn: filterFn},
      node: clock
        ? [
            filter({fn: ({source, clock}, {fn}) => fn(source, clock)}),
            calc(({source}) => source),
          ]
        : [filter({fn: callStack})],
      meta,
    })
  }
  return target
}
