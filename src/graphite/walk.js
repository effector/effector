//@flow
import invariant from 'invariant'
import type {Event} from 'effector/event'
import type {StateRef} from 'effector/stdlib/stateref'
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
const printFull = (full, tag = '') => {
  const items = full.map(print)
  const itemsText = items.join(', ')
  console.log(`${tag} [${itemsText}]`)
}
const callstack = {
  box: [],
  item: [],
  full: [],
  pushItem(item) {
    this.item.push(item)
    this.full.push(item)
    dev: {
      // printFull(this.full)
      // printFull(this.item, '(cmd)')
    }
  },
  popItem() {
    this.item.pop()
    this.full.pop()
    dev: {
      // printFull(this.full)
      // printFull(this.item, '(cmd)')
    }
  },
  pushBox(box) {
    this.box.push(box)
    this.full.push(box)
    dev: {
      // printFull(this.full)
      // printFull(this.box, '(box)')
    }
  },
  popBox() {
    this.box.pop()
    this.full.pop()
    dev: {
      // printFull(this.full)
      // printFull(this.box, '(box)')
    }
  },
}
export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const transactions: Array<() => void> = []
  const meta = {}
  meta.transactions = transactions
  runStep(seq, ctx, meta)
  for (let i = 0; i < transactions.length; i++) {
    transactions[i]()
  }
}
function runStep(step, ctx: *, meta) {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  callstack.pushBox(step)
  const result = stepVisitor[step.type](step, ctx, meta)
  callstack.popBox()
  return result
}
const stepVisitor = {
  choose(step: TypeDef<'choose', 'step'>, ctx: TypeDef<*, 'ctx'>, meta) {
    const ref: StateRef = step.data.ref
    const selector: TypeDef<*, 'step'> = step.data.selector
    const cases: {+[key: string]: TypeDef<*, 'step'>} = step.data.cases
    const selectorChainResult = runStep(selector, ctx, meta)
    // if (!selectorChainResult) {
    //   return
    // }
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
    return runStep(next, ctx, meta)
  },

  single(
    step: TypeDef<'single', 'step'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    meta,
  ) {
    const single: TypeDef<*, 'cmd'> = step.data
    invariant(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type)
    invariant(single.type in cmdVisitor, 'impossible case "%s"', single.type)
    const arg = stepArgVisitor[ctx.type](ctx.data)
    callstack.pushItem(single)
    const result = cmdVisitor[single.type](arg, single, ctx, meta)
    callstack.popItem()
    if (!result) {
      return
    }
    return (result: any)
  },
  multi(step, currentCtx, meta) {
    if (step.data.length === 0) return
    for (let i = 0, result; i < step.data.length; i++) {
      result = runStep(step.data[i], currentCtx, meta)
    }
  },
  seq(
    steps: TypeDef<'seq', 'step'>,
    prev: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    meta,
  ) {
    if (steps.data.length === 0) return
    for (
      let i = 0,
        step,
        stepResult,
        isMulti,
        currentCtx: TypeDef<
          'compute' | 'emit' | 'filter' | 'update',
          'ctx',
        > = prev;
      i < steps.data.length;
      i++
    ) {
      step = steps.data[i]
      isMulti = step.type === ('multi': 'multi')
      stepResult = runStep(step, currentCtx, meta)
      if (isMulti) continue
      if (stepResult === undefined) break
      currentCtx = stepResult
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

const cmdVisitor = {
  emit(
    arg: any,
    single: TypeDef<'emit', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    meta,
  ) {
    return Ctx.emit({
      eventName: single.data.fullName,
      payload: arg,
    })
  },
  filter(
    arg: any,
    single: TypeDef<'filter', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    meta,
  ) {
    let isChanged = false
    try {
      isChanged = single.data.filter(arg, ctx)
    } catch (err) {
      console.error(err)
    }
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
    meta,
  ) {
    const transCtx = single.data.transactionContext
    if (transCtx) meta.transactions.push(transCtx(arg))
    try {
      single.data.runner(arg)
    } catch (err) {
      console.error(err)
    }
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
    meta,
  ) {
    const newCtx = Ctx.update({value: arg})
    single.data.store.current = arg
    return newCtx
  },
  compute(
    arg: any,
    single: TypeDef<'compute', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    meta,
  ) {
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
    if (!newCtx.data.isChanged) return
    return newCtx
  },
}
