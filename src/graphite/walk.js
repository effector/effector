//@flow
import invariant from 'invariant'
import type {Event} from 'effector/event'
import type {StateRef} from 'effector/stdlib/stateref'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'

import callstack from './callstack'

export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: TypeDef<'seq', 'step'> = event.graphite.seq
  const eventCtx = Ctx.emit({
    eventName: event.getType(),
    payload,
  })
  walkNode(steps, eventCtx)
}

type CommonCtx = TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>
type Meta = {
  ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  stop: boolean,
  transactions: Array<() => void>,
  arg: any,
}
export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const meta = {
    transactions: ([]: Array<() => void>),
    stop: false,
    ctx,
  }
  runStep(seq, ctx, meta)
  for (let i = 0; i < meta.transactions.length; i++) {
    meta.transactions[i]()
  }
  meta.transactions.length = 0
}
function runStep(step, ctx: *, meta) {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  callstack.pushBox(step)
  meta.stop = false
  stepVisitor[step.type](step, ctx, meta)
  callstack.popBox()
}
const stepVisitor = {
  choose(step: TypeDef<'choose', 'step'>, ctx: TypeDef<*, 'ctx'>, meta) {
    const ref: StateRef = step.data.ref
    const selector: TypeDef<*, 'step'> = step.data.selector
    const cases: {+[key: string]: TypeDef<*, 'step'>} = step.data.cases
    runStep(selector, ctx, meta)
    const caseName = ref.current
    //optional
    invariant(
      typeof caseName === 'string',
      'incorrect selector "%s" for id %s',
      caseName,
      ref.id,
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

  single(step: TypeDef<'single', 'step'>, ctx: CommonCtx, meta: Meta) {
    const single: TypeDef<*, 'cmd'> = step.data
    invariant(single.type in command, 'impossible case "%s"', single.type)
    invariant(ctx.type in command, 'impossible case "%s"', ctx.type)
    callstack.pushItem(single)
    meta.arg = command[ctx.type].stepArg(ctx.data)
    meta.ctx = command[single.type].cmd(single, ctx, meta)
    meta.stop = !command[meta.ctx.type].transition(meta.ctx)
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
}

type Command<tag> = /*:: interface */ {
  cmd(
    single: TypeDef<tag, 'cmd'>,
    ctx: CommonCtx,
    meta: Meta,
  ): TypeDef<tag, 'ctx'>,
  transition(ctx: CommonCtx): boolean,
  stepArg(data: any): any,
}

const command = ({
  emit: {
    cmd: (single, ctx, meta) =>
      Ctx.emit({
        eventName: single.data.fullName,
        payload: meta.arg,
      }),
    transition: ctx => true,
    stepArg: data => data.payload,
  },
  filter: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      let isChanged = false
      try {
        isChanged = single.data.filter(arg, ctx)
      } catch (err) {
        console.error(err)
      }
      return Ctx.filter({
        value: arg,
        isChanged,
      })
    },
    transition: ctx => Boolean(ctx.data.isChanged),
    stepArg: data => data.value,
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
    transition: ctx => false,
    stepArg: data => invariant(false, 'RunContext is not supported'),
  },
  update: {
    cmd(single, ctx, meta) {
      single.data.store.current = meta.arg
      return Ctx.update({value: meta.arg})
    },
    transition: ctx => true,
    stepArg: data => data.value,
  },
  compute: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      const newCtx = Ctx.compute({
        args: [undefined, arg, ctx],
        result: null,
        error: null,
        isError: false,
        isNone: true,
        isChanged: true,
      })
      try {
        const result = single.data.fn(undefined, arg, newCtx)
        newCtx.data.result = result
        newCtx.data.isNone = result === undefined
      } catch (err) {
        console.error(err)
        newCtx.data.isError = true
        newCtx.data.error = err
        newCtx.data.isChanged = false
      }
      return newCtx
    },
    transition: ctx => Boolean(ctx.data.isChanged),
    stepArg: data => data.result,
  },
}: {
  emit: Command<'emit'>,
  filter: Command<'filter'>,
  run: Command<'run'>,
  update: Command<'update'>,
  compute: Command<'compute'>,
})
