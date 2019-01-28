//@flow

import type {Event} from 'effector/event'
import {type TypeDef, Ctx, type StateRef, createStateRef} from 'effector/stdlib'
import {__DEV__, __DEBUG__} from 'effector/flags'
import type {CommonCtx, Meta, Reg, Command} from './index.h'

export function walkEvent<T>(payload: T, event: Event<T>) {
  walkNode(
    event.graphite.seq,
    Ctx.emit({
      __stepArg: payload,
    }),
  )
}

export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const meta = {
    transactions: [],
    stop: false,
    ctx,
    reg: {
      isChanged: true,
    },
    val: {},
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
const LOOP_TIMEOUT = 5e3
const infiniteLoopProtection = start => {
  if (Date.now() - start > LOOP_TIMEOUT) {
    throw new Error('infinite loop protection')
  }
}
const stepVisitor = {
  single(step: TypeDef<'single', 'step'>, ctx: CommonCtx, meta: Meta) {
    meta.arg = ctx.data.__stepArg
    meta.ctx = command[step.data.type].cmd(step.data, meta)
    meta.stop = !command[meta.ctx.type].transition(meta.reg)
  },
  multi(step, ctx, meta) {
    const items = step.data.slice()
    for (let i = 0; i < items.length; i++) {
      runStep(items[i], ctx, meta)
    }
    meta.stop = false
  },
  seq(steps: TypeDef<'seq', 'step'>, prev: CommonCtx, meta) {
    meta.ctx = prev
    const items = steps.data.slice()
    for (let i = 0; i < items.length; i++) {
      runStep(items[i], meta.ctx, meta)
      if (meta.stop) {
        break
      }
    }
  },
  loop(step: TypeDef<'loop', 'step'>, ctx: TypeDef<*, 'ctx'>, meta) {
    type Fun = TypeDef<*, 'step'>
    type Using = {
      name: string,
      reset?: any,
    }
    type StepData = {
      branch: Fun,
      iterator: Fun,
      source: StateRef,
      until: Using,
      selector: Using,
      item: Using,
    }
    const data: StepData = step.data
    const branch: Fun = data.branch
    const iterator: Fun = data.iterator

    const source: StateRef = data.source
    const until = using(data.until, meta)
    const selector = using(data.selector, meta)
    const item = using(data.item, meta)

    const now = Date.now()

    while (until.current) {
      if (__DEV__) {
        infiniteLoopProtection(now)
      }
      item.current = source.current[selector.current]
      runStep(branch, ctx, meta)
      runStep(iterator, ctx, meta)
    }

    function using(opts, meta): StateRef {
      const name = String(opts.name)
      if ('reset' in opts) {
        if (!(name in meta.val)) {
          meta.val[name] = createStateRef(opts.reset)
        }
        meta.val[name].current = opts.reset
      }
      return meta.val[name]
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
        val: meta.val,
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
        val: meta.val,
        fn: single.data.runner,
      })
      return ctx
    },
    transition: () => false,
  },
  update: {
    cmd(single, meta) {
      let store
      if ('val' in single.data) {
        store = meta.val[single.data.val] =
          meta.val[single.data.val] || createStateRef(null)
      } else {
        store = single.data.store
      }
      store.current = meta.arg
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
        val: meta.val,
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
    ctx.result = ctx.fn.call(null, ctx.arg, ctx.val)
  } catch (err) {
    console.error(err)
    ctx.err = true
  }
  return ctx
}
