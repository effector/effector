//@flow

import type {Event} from 'effector/event'
import {type TypeDef, Ctx, type StateRef, createStateRef} from 'effector/stdlib'
import {__DEV__, __DEBUG__} from 'effector/flags'
import type {CommonCtx, Meta, Stage, Command} from './index.h'
declare var __step: TypeDef<*, 'step'>
declare var __single: any
export function walkEvent<T>(payload: T, event: Event<T>) {
  walkNode(
    event.graphite.seq,
    Ctx.emit({
      __stepArg: payload,
    }),
  )
}
function getStage(def: TypeDef<*, *>): Stage {
  if (def.type === 'run') return 'effect'
  if (def.type === 'combine') return 'combine'
  return 'solo'
}

export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const meta: Meta = {
    callstack: [],
    transactions: [],
    tr: {},
    tc: {},
    replay: false,
    stop: false,
    ctx,
    reg: {
      isChanged: true,
    },
    val: {},
    arg: null,
  }
  runStep(seq, meta.ctx, meta)
  for (const id in meta.tr) {
    replay(meta.tr[id])
  }
  for (let i = 0; i < meta.transactions.length; i++) {
    meta.transactions[i]()
  }
  meta.transactions.length = 0
}
function replay({meta, ctx}) {
  meta.replay = true
  meta.stop = false
  meta.arg = ctx.data.__stepArg
  meta.ctx = command.run.cmd(meta)
  meta.stop = true
}
function runStep(step, ctx: *, meta) {
  meta.stop = false
  meta.callstack.push(step)
  stepVisitor[step.type](ctx, meta)
  meta.callstack.pop()
}

function cloneMeta(meta: Meta): Meta {
  return {
    tr: meta.tr,
    tc: meta.tc,
    replay: true,
    callstack: meta.callstack.slice(),
    ctx: meta.ctx,
    reg: meta.reg,
    stop: meta.stop,
    val: meta.val,
    //TODO avoid this
    transactions: meta.transactions,
    arg: meta.arg,
  }
}

const commonStepVisitor = {
  single(ctx: CommonCtx, meta: Meta) {
    if (!meta.replay) {
      if (__step.data.type === 'run') {
        meta.tr[__step.data.id] = {
          ctx,
          meta: cloneMeta(meta),
        }
        meta.stop = true
        return
      }
    }
    meta.arg = ctx.data.__stepArg
    meta.ctx = command[__step.data.type].cmd(meta)
    meta.stop = !command[meta.ctx.type].transition(meta.reg)
  },
  multi(ctx, meta) {
    const items = __step.data.slice()
    for (let i = 0; i < items.length; i++) {
      runStep(items[i], ctx, meta)
    }
    meta.stop = false
  },
  seq(prev: CommonCtx, meta) {
    meta.ctx = prev
    const items = __step.data.slice()
    for (let i = 0; i < items.length; i++) {
      runStep(items[i], meta.ctx, meta)
      if (meta.stop) {
        break
      }
    }
  },
  combine(ctx, meta: Meta) {
    const id = String(__step.data.id)
    const part = +__step.data.part
    const arr = (meta.tc[id] = meta.tc[id] || [])
    arr[part] = {
      ctx,
      meta: cloneMeta(meta),
    }
    meta.stop = true
  },
}
const stepVisitor = {}
stepVisitor.single = commonStepVisitor.single
stepVisitor.multi = commonStepVisitor.multi
stepVisitor.seq = commonStepVisitor.seq

if (__DEBUG__) {
  const LOOP_TIMEOUT = 5e3
  const infiniteLoopProtection = start => {
    if (Date.now() - start > LOOP_TIMEOUT) {
      throw new Error('infinite loop protection')
    }
  }
  const stepVisitorNext = {
    loop(ctx: TypeDef<*, 'ctx'>, meta) {
      const VAL = 'current'
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
      const data: StepData = __step.data
      const branch: Fun = data.branch
      const iterator: Fun = data.iterator

      const source: StateRef = data.source
      const until = using(data.until, meta)
      const selector = using(data.selector, meta)
      const item = using(data.item, meta)

      const now = Date.now()

      while (until[VAL]) {
        if (__DEV__) {
          infiniteLoopProtection(now)
        }
        item[VAL] = source[VAL][selector[VAL]]
        runStep(branch, ctx, meta)
        runStep(iterator, ctx, meta)
      }

      function using(opts, meta): StateRef {
        const name = String(opts.name)
        if ('reset' in opts) {
          if (!(name in meta.val)) {
            meta.val[name] = createStateRef(opts.reset)
          }
          meta.val[name][VAL] = opts.reset
        }
        return meta.val[name]
      }
    },
    choose(ctx: TypeDef<*, 'ctx'>, meta) {
      type Cases = {+[key: string]: TypeDef<*, 'step'>}
      const cases: Cases = __step.data.cases
      runStep(__step.data.selector, ctx, meta)
      const caseName = String(__step.data.state.current)
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
  stepVisitor.loop = stepVisitorNext.loop
  stepVisitor.choose = stepVisitorNext.choose
}

const command = ({
  emit: {
    cmd: meta =>
      Ctx.emit({
        __stepArg: meta.arg,
      }),
    transition: () => true,
  },
  filter: {
    cmd(meta) {
      const ctx = Ctx.filter({
        __stepArg: meta.arg,
      })
      const runCtx = tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        val: meta.val,
        fn: __single.filter,
      })
      meta.reg.isChanged = Boolean(runCtx.result)
      return ctx
    },
    transition: reg => Boolean(reg.isChanged),
  },
  run: {
    cmd(meta) {
      const ctx = Ctx.run({})

      if ('transactionContext' in __single)
        meta.transactions.push(__single.transactionContext(meta.arg))
      tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        val: meta.val,
        fn: __single.runner,
      })
      return ctx
    },
    transition: () => false,
  },
  update: {
    cmd(meta) {
      let store
      if ('val' in __single) {
        store = meta.val[__single.val] =
          meta.val[__single.val] || createStateRef(null)
      } else {
        store = __single.store
      }
      store.current = meta.arg
      return Ctx.update({
        __stepArg: meta.arg,
      })
    },
    transition: () => true,
  },
  compute: {
    cmd(meta) {
      const newCtx = Ctx.compute({
        __stepArg: null,
      })
      const runCtx = tryRun({
        err: false,
        result: (null: any),
        arg: meta.arg,
        val: meta.val,
        fn: __single.fn,
      })
      meta.reg.isChanged = !runCtx.err
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
