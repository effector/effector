//@flow
import invariant from 'invariant'
import {__DEBUG__} from 'effector/flags'
import type {Event} from 'effector/event'
import type {StateRef} from 'effector/stdlib/stateref'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'

import callstack from './callstack'

export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: TypeDef<'seq', 'step'> = event.graphite.seq
  const eventCtx = Ctx.emit({
    __stepArg: payload,
  })
  walkNode(steps, eventCtx)
}

type CommonCtx = TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>
type Reg = {
  isChanged: boolean,
}
type Meta = {
  ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  stop: boolean,
  transactions: Array<() => void>,
  arg: any,
  reg: Reg,
}
export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const meta = {
    transactions: ([]: Array<() => void>),
    stop: false,
    ctx,
    reg: {
      isChanged: true,
    },
  }
  runStep(seq, meta.ctx, meta)
  for (let i = 0; i < meta.transactions.length; i++) {
    meta.transactions[i]()
  }
  meta.transactions.length = 0
}

function runStep(step, ctx: *, meta) {
  if (__DEBUG__) {
    invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  }
  callstack.pushBox(step)
  meta.stop = false
  stepVisitor[step.type](step, ctx, meta)
  callstack.popBox()
}

const stepVisitor = {
  single(step: TypeDef<'single', 'step'>, ctx: CommonCtx, meta: Meta) {
    const single: TypeDef<*, 'cmd'> = step.data
    if (__DEBUG__) {
      invariant(single.type in command, 'impossible case "%s"', single.type)
      invariant(ctx.type in command, 'impossible case "%s"', ctx.type)
    }
    callstack.pushItem(single)
    meta.arg = ctx.data.__stepArg
    meta.ctx = command[single.type].cmd(single, ctx, meta)
    meta.stop = !command[meta.ctx.type].transition(meta.reg)
    callstack.popItem()
  },
  multi(step, ctx, meta) {
    for (let i = 0; i < step.data.length; i++) {
      runStep(step.data[i], ctx, meta)
    }
    meta.stop = false
  },
  seq(steps: TypeDef<'seq', 'step'>, prev: CommonCtx, meta) {
    meta.ctx = prev
    for (let i = 0; i < steps.data.length; i++) {
      runStep(steps.data[i], meta.ctx, meta)
      if (meta.stop) {
        break
      }
    }
  },
  choose(step: TypeDef<'choose', 'step'>, ctx: TypeDef<*, 'ctx'>, meta) {
    const localState: StateRef = step.data.state
    const selector: TypeDef<*, 'step'> = step.data.selector
    const cases: {+[key: string]: TypeDef<*, 'step'>} = step.data.cases
    runStep(selector, ctx, meta)
    const caseName = localState.current
    //optional
    invariant(
      typeof caseName === 'string',
      'incorrect selector "%s" for id %s',
      caseName,
      localState.id,
    )
    let next
    if (caseName in cases) {
      next = cases[caseName]
    } else if ('__' in cases) {
      next = cases.__
    } else {
      console.error('no case "%s" exists', caseName)
      return
    }
    runStep(next, ctx, meta)
  },
}

type Command<tag> = /*:: interface */ {
  cmd(
    single: TypeDef<tag, 'cmd'>,
    ctx: CommonCtx,
    meta: Meta,
  ): TypeDef<tag, 'ctx'>,
  transition(reg: Reg): boolean,
}

const command = ({
  emit: {
    cmd: (single, ctx, meta) =>
      Ctx.emit({
        __stepArg: meta.arg,
      }),
    transition: () => true,
  },
  filter: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      let isChanged = false
      try {
        isChanged = single.data.filter(arg)
      } catch (err) {
        console.error(err)
      }
      meta.reg.isChanged = isChanged
      return Ctx.filter({
        __stepArg: arg,
      })
    },
    transition: reg => Boolean(reg.isChanged),
  },
  run: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      if ('transactionContext' in single.data)
        meta.transactions.push(single.data.transactionContext(arg))
      try {
        single.data.runner(arg)
      } catch (err) {
        console.error(err)
      }
      return Ctx.run({
        args: [arg],
        parentContext: ctx,
      })
    },
    transition: () => false,
  },
  update: {
    cmd(single, ctx, meta) {
      single.data.store.current = meta.arg
      return Ctx.update({
        __stepArg: meta.arg,
      })
    },
    transition: () => true,
  },
  compute: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      const newCtx = Ctx.compute({
        __stepArg: null,
      })
      try {
        const result = single.data.fn(arg)
        newCtx.data.__stepArg = result
        meta.reg.isChanged = result !== undefined
      } catch (err) {
        console.error(err)
        meta.reg.isChanged = false
      }
      return newCtx
    },
    transition: reg => Boolean(reg.isChanged),
  },
}: {
  emit: Command<'emit'>,
  filter: Command<'filter'>,
  run: Command<'run'>,
  update: Command<'update'>,
  compute: Command<'compute'>,
})
