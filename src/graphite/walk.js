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
export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const transactions: Array<() => void> = []
  const meta = {}
  meta.stop = false
  meta.transactions = transactions
  meta.currentCtx = ctx
  runStep(seq, ctx, meta)
  for (let i = 0; i < transactions.length; i++) {
    transactions[i]()
  }
  transactions.length = 0
}
function runStep(step, ctx: *, meta) {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  meta.stop = false
  callstack.pushBox(step)
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

  single(step: TypeDef<'single', 'step'>, ctx: CommonCtx, meta) {
    const single: TypeDef<*, 'cmd'> = step.data
    invariant(single.type in cmdVisitor, 'impossible case "%s"', single.type)
    invariant(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type)
    callstack.pushItem(single)
    meta.arg = stepArgVisitor[ctx.type](ctx.data)
    const result = cmdVisitor[single.type](single, ctx, meta)
    callstack.popItem()
    if (transitionVisitor[result.type](result)) {
      meta.stop = false
      meta.currentCtx = result
    } else {
      meta.stop = true
    }
  },
  multi(step, ctx, meta) {
    if (step.data.length === 0) return
    for (let i = 0; i < step.data.length; i++) {
      runStep(step.data[i], ctx, meta)
    }
  },
  seq(steps: TypeDef<'seq', 'step'>, prev: CommonCtx, meta) {
    if (steps.data.length === 0) return
    for (
      let i = 0,
        step,
        currentCtx: TypeDef<
          'compute' | 'emit' | 'filter' | 'update',
          'ctx',
        > = prev;
      i < steps.data.length;
      i++
    ) {
      step = steps.data[i]
      runStep(step, currentCtx, meta)
      if (step.type === 'multi') continue

      if (meta.stop) {
        break
      }
      //Here step.type is always 'single'
      currentCtx = meta.currentCtx
    }
  },
}
const stepArgVisitor = {
  compute: data => data.result,
  emit: data => data.payload,
  run: data => (data, invariant(false, 'RunContext is not supported')),
  filter: data => data.value,
  update: data => data.value,
}
const transitionVisitor = {
  emit: ctx => true,
  filter: ctx => Boolean(ctx.data.isChanged),
  run: ctx => false,
  update: ctx => true,
  compute: ctx => Boolean(ctx.data.isChanged),
}

const cmdVisitor = {
  emit(single: TypeDef<'emit', 'cmd'>, ctx: CommonCtx, meta) {
    const arg = meta.arg

    return Ctx.emit({
      eventName: single.data.fullName,
      payload: arg,
    })
  },
  filter(single: TypeDef<'filter', 'cmd'>, ctx: CommonCtx, meta) {
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
  run(single: TypeDef<'run', 'cmd'>, ctx: CommonCtx, meta) {
    const arg = meta.arg

    const transCtx = single.data.transactionContext
    if (transCtx) meta.transactions.push(transCtx(arg))
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
  update(single: TypeDef<'update', 'cmd'>, ctx: CommonCtx, meta) {
    const arg = meta.arg

    const newCtx = Ctx.update({value: arg})
    single.data.store.current = arg
    return newCtx
  },
  compute(single: TypeDef<'compute', 'cmd'>, ctx: CommonCtx, meta) {
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
      const result = single.data.reduce(undefined, arg, newCtx)
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
}
