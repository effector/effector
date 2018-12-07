//@flow

import {Step, Cmd} from 'effector/graphite/typedef'
import type {TypeDef, GraphiteMeta} from 'effector/stdlib/typedef'

export default {
  event(args: {fullName: string, runner: Function}): GraphiteMeta {
    const unit = Cmd.emit({
      subtype: 'event',
      fullName: args.fullName,
      runner: args.runner,
    })
    const cmd = Step.single(unit)
    const nextSteps = Step.multi([])
    const stepFull = Step.seq([cmd, nextSteps])
    const graphite = {next: nextSteps, seq: stepFull}
    return graphite
  },
  prependEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const unit = Cmd.compute({
      reduce(_, newValue, ctx): mixed {
        return fn(newValue)
      },
    })
    const cmd = Step.single(unit)
    const stepFull = Step.seq([cmd, parentGraphite.seq])
    graphite.next.data.push(stepFull)
    return graphite
  },
  mapEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const unit = Cmd.compute({
      reduce(_, newValue, ctx): mixed {
        return fn(newValue)
      },
    })
    const cmd = Step.single(unit)
    const stepFull = Step.seq([cmd, graphite.seq])
    parentGraphite.next.data.push(stepFull)
    return graphite
  },
  filterEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const unitCompute = Cmd.compute({
      reduce(_, newValue, ctx): mixed {
        return fn(newValue)
      },
    })
    const unitFilter = Cmd.filter({
      filter(result, ctx: TypeDef<'emitCtx', 'ctx'>): boolean {
        return result !== undefined
      },
    })
    const cmdCompute = Step.single(unitCompute)
    const cmdFilter = Step.single(unitFilter)
    const stepFull = Step.seq([cmdCompute, cmdFilter, graphite.seq])
    parentGraphite.next.data.push(stepFull)
    return graphite
  },
}
