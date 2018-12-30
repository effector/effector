//@flow
// import invariant from 'invariant'
import type {Event} from 'effector/event'
// import type {StateRef} from 'effector/stdlib/stateref'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'

export function walkEvent<T>(payload: T, event: Event<T>) {
  walkNode(
    event.graphite.seq,
    Ctx.emit({
      __stepArg: payload,
    }),
  )
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
    transactions: [],
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
  meta.stop = false
  stepVisitor[step.type](step, ctx, meta)
}

const stepVisitor = {
  single(step: TypeDef<'single', 'step'>, ctx: CommonCtx, meta: Meta) {
    meta.arg = ctx.data.__stepArg
    meta.ctx = command[step.data.type].cmd(step.data, meta)
    meta.stop = !command[meta.ctx.type].transition(meta.reg)
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
    type Cases = {+[key: string]: TypeDef<*, 'step'>}
    const cases: Cases = step.data.cases
    runStep(step.data.selector, ctx, meta)
    const caseName = String(step.data.state.current)
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
  cmd(single: TypeDef<tag, 'cmd'>, meta: Meta): TypeDef<tag, 'ctx'>,
  transition(reg: Reg): boolean,
}

const command = ({
  emit: {
    cmd: (single, meta) =>
      Ctx.emit({
        __stepArg: meta.arg,
      }),
    transition: () => true,
  },
  filter: {
    cmd(single, meta) {
      const ctx = Ctx.filter({
        __stepArg: meta.arg,
      })
      const runCtx = tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        fn: single.data.filter,
      })
      meta.reg.isChanged = Boolean(runCtx.result)
      return ctx
    },
    transition: reg => Boolean(reg.isChanged),
  },
  run: {
    cmd(single, meta) {
      const ctx = Ctx.run({})

      if ('transactionContext' in single.data)
        meta.transactions.push(single.data.transactionContext(meta.arg))
      tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        fn: single.data.runner,
      })
      return ctx
    },
    transition: () => false,
  },
  update: {
    cmd(single, meta) {
      single.data.store.current = meta.arg
      return Ctx.update({
        __stepArg: meta.arg,
      })
    },
    transition: () => true,
  },
  compute: {
    cmd(single, meta) {
      const newCtx = Ctx.compute({
        __stepArg: null,
      })
      const runCtx = tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        fn: single.data.fn,
      })
      meta.reg.isChanged = !runCtx.err && runCtx.result !== undefined
      if (!runCtx.err) {
        newCtx.data.__stepArg = runCtx.result
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

function tryRun(ctx) {
  try {
    ctx.result = ctx.fn(ctx.arg)
  } catch (err) {
    console.error(err)
    ctx.err = true
  }
  return ctx
}
