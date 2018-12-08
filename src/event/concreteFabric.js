//@flow
//@jsx fx

import fx from 'effector/stdlib/fx'
import type {TypeDef, GraphiteMeta} from 'effector/stdlib/typedef'

export default {
  event(args: {fullName: string, runner: Function}): GraphiteMeta {
    const nextSteps = <multi />
    const stepFull = (
      <seq>
        <single>
          <emit subtype="event" fullName={args.fullName} runner={args.runner} />
        </single>
        {nextSteps}
      </seq>
    )
    const graphite = {next: nextSteps, seq: stepFull}
    return graphite
  },
  prependEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const stepFull = (
      <seq>
        <single>
          <compute reduce={(_, newValue, ctx) => fn(newValue)} />
        </single>
        {parentGraphite.seq}
      </seq>
    )
    graphite.next.data.push(stepFull)
    return graphite
  },
  mapEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const stepFull = (
      <seq>
        <single>
          <compute reduce={(_, newValue, ctx) => fn(newValue)} />
        </single>
        {graphite.seq}
      </seq>
    )
    parentGraphite.next.data.push(stepFull)
    return graphite
  },
  filterEvent(args: {|
    fn: Function,
    graphite: GraphiteMeta,
    parentGraphite: GraphiteMeta,
  |}): GraphiteMeta {
    const {fn, graphite, parentGraphite} = args
    const stepFull = (
      <seq>
        <single>
          <compute reduce={(_, newValue, ctx) => fn(newValue)} />
        </single>
        <single>
          <filter
            filter={(result, ctx: TypeDef<'emitCtx', 'ctx'>) =>
              result !== undefined
            }
          />
        </single>
        {graphite.seq}
      </seq>
    )
    parentGraphite.next.data.push(stepFull)
    return graphite
  },
}
