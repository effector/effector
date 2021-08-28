import {processArgsToConfig} from './config'
import {createLinkNode} from './forward'
import {sample} from './sample'
import {createEvent} from './createUnit'
import {combine} from './combine'
import {step} from './typedef'
import {callStack} from './caller'
import {assertNodeSet, is, isFunction, isVoid} from './is'
import {createNode} from './createNode'
import {assert} from './throw'
import {merge} from './merge'

export function guard(...args: any[]) {
  let [[source, config], metadata] = processArgsToConfig(args)
  const meta: Record<string, any> = {op: 'guard', config: metadata}
  if (!config) {
    config = source
    source = config.source
  }
  let {
    filter,
    greedy,
    clock,
    name = metadata && metadata.name ? metadata.name : 'guard',
  } = config
  const target = config.target || createEvent(name, metadata)
  const filterIsUnit = is.unit(filter)
  let needToCombine = true
  if (isVoid(source)) {
    assertNodeSet(clock, 'guard', 'clock')
    if (Array.isArray(clock)) {
      clock = merge(clock)
    }
    source = clock
    needToCombine = false
  }
  if (needToCombine && !is.unit(source)) source = combine(source)
  if (clock) {
    assertNodeSet(clock, 'guard', 'clock')
    source = sample({
      source,
      clock,
      greedy,
      fn: filterIsUnit ? null : (source: any, clock: any) => ({source, clock}),
    })
  }
  assertNodeSet(target, 'guard', 'target')
  if (filterIsUnit) {
    sample({
      source: filter,
      clock: source,
      target: createNode({
        node: [
          step.compute({fn: ({guard}) => guard, filter: true, safe: true}),
          step.compute({fn: ({data}) => data, safe: true}),
        ],
        child: target,
        meta,
        family: {
          owners: [source, filter, target, ...[].concat(clock ? clock : [])],
          links: target,
        },
        regional: true,
      }),
      fn: (guard: any, data: any) => ({guard, data}),
      greedy,
      name,
    })
  } else {
    assert(isFunction(filter), '`filter` should be function or unit')
    createLinkNode(source, target, {
      scope: {fn: filter},
      node: clock
        ? [
            step.filter({fn: ({source, clock}, {fn}) => fn(source, clock)}),
            step.compute({fn: ({source}) => source, safe: true}),
          ]
        : [step.filter({fn: callStack})],
      meta,
    })
  }
  return target
}
