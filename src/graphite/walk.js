//@flow
import invariant from 'invariant'
import type {Event} from 'effector/event'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'

export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: TypeDef<'seq', 'step'> = event.graphite.seq
  const eventCtx = Ctx.emit({
    eventName: event.getType(),
    payload,
  })
  walkNode(steps, eventCtx)
}
const print = e => `${e.type} ${e.id}`
const printFull = full => {
  // const items = full.map(print)
  // const itemsText = items.join(', ')
  // console.log(`[${itemsText}]`)
}
const callstack = {
  box: [],
  item: [],
  full: [],
  pushItem(item) {
    this.item.push(item)
    this.full.push(item)
    dev: {
      printFull(this.full)
    }
  },
  popItem() {
    this.item.pop()
    this.full.pop()
    dev: {
      printFull(this.full)
    }
  },
  pushBox(box) {
    this.box.push(box)
    this.full.push(box)
    dev: {
      printFull(this.full)
    }
  },
  popBox() {
    this.box.pop()
    this.full.pop()
    dev: {
      printFull(this.full)
    }
  },
}
export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const transactions: Array<() => void> = []
  runStep(seq, ctx, transactions)
  for (let i = 0; i < transactions.length; i++) {
    transactions[i]()
  }
}
function runStep(step, ctx, transactions) {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  return stepVisitor[step.type](step, ctx, transactions)
}
const stepVisitor = {
  single(
    step: TypeDef<'single', 'step'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions,
  ) {
    const single: TypeDef<*, 'cmd'> = step.data
    callstack.pushBox(step)
    invariant(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type)
    invariant(single.type in cmdVisitor, 'impossible case "%s"', single.type)
    const arg = stepArgVisitor[ctx.type](ctx.data)
    const result = cmdVisitor[single.type](arg, single, ctx, transactions)
    callstack.popBox()
    if (!result) {
      return
    }
    return (result: any)
  },
  multi(step, currentCtx, transactions) {
    if (step.data.length === 0) return
    callstack.pushBox(step)
    for (let i = 0, result; i < step.data.length; i++) {
      result = runStep(step.data[i], currentCtx, transactions)
    }
    callstack.popBox()
  },
  seq(
    steps: TypeDef<'seq', 'step'>,
    prev: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    if (steps.data.length === 0) return
    callstack.pushBox(steps)
    let currentCtx: TypeDef<
      'compute' | 'emit' | 'filter' | 'update',
      'ctx',
    > = prev
    let step
    for (let i = 0; i < steps.data.length; i++) {
      step = steps.data[i]
      const isMulti = step.type === ('multi': 'multi')
      const stepResult = runStep(step, currentCtx, transactions)
      if (isMulti) continue
      if (stepResult === undefined) break
      currentCtx = stepResult
    }
    callstack.popBox()
  },
}

const stepArgVisitor = {
  compute: data => data.result,
  emit: data => data.payload,
  run: data => (data, invariant(false, 'RunContext is not supported')),
  filter: data => data.value,
  update: data => data.value,
}

const cmdVisitor = {
  emit(
    arg: any,
    single: TypeDef<'emit', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    callstack.pushItem(single)
    callstack.popItem()
    return Ctx.emit({
      eventName: single.data.fullName,
      payload: arg,
    })
  },
  filter(
    arg: any,
    single: TypeDef<'filter', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    callstack.pushItem(single)
    let isChanged = false
    try {
      isChanged = single.data.filter(arg, ctx)
    } catch (err) {
      console.error(err)
    }
    callstack.popItem()
    if (!!isChanged) {
      return Ctx.filter({
        value: arg,
        isChanged,
      })
    }
  },
  run(
    arg: any,
    single: TypeDef<'run', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    callstack.pushItem(single)
    const transCtx = single.data.transactionContext
    if (transCtx) transactions.push(transCtx(arg))
    try {
      single.data.runner(arg)
    } catch (err) {
      console.error(err)
    }
    callstack.popItem()
    /*
    const run = Ctx.run({
      args: [arg],
      parentContext: ctx,
    })
    */
  },
  update(
    arg: any,
    single: TypeDef<'update', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    callstack.pushItem(single)
    const newCtx = Ctx.update({value: arg})
    single.data.store.current = arg
    callstack.popItem()
    return newCtx
  },
  compute(
    arg: any,
    single: TypeDef<'compute', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    callstack.pushItem(single)
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
      newCtx.data.isError = true
      newCtx.data.error = err
      newCtx.data.isChanged = false
    }
    callstack.popItem()
    if (!newCtx.data.isChanged) return
    return newCtx
  },
}
