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
    eventName: event.getType(),
    payload,
    __stepArg: payload,
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
  transition(ctx: CommonCtx): boolean,
}

const command = ({
  emit: {
    cmd: (single, ctx, meta) =>
      Ctx.emit({
        eventName: single.data.fullName,
        payload: meta.arg,
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
      return Ctx.filter({
        value: arg,
        isChanged,
        __stepArg: arg,
      })
    },
    transition: ctx => Boolean(ctx.data.isChanged),
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
        value: meta.arg,
        __stepArg: meta.arg,
      })
    },
    transition: () => true,
  },
  compute: {
    cmd(single, ctx, meta) {
      const arg = meta.arg

      const newCtx = Ctx.compute({
        args: [arg],
        result: null,
        error: null,
        isError: false,
        isNone: true,
        isChanged: true,
        __stepArg: null,
      })
      try {
        const result = single.data.fn(arg)
        newCtx.data.result = newCtx.data.__stepArg = result
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
  },
}: {
  emit: Command<'emit'>,
  filter: Command<'filter'>,
  run: Command<'run'>,
  update: Command<'update'>,
  compute: Command<'compute'>,
})

function iterator(step) {
  return {
    status: {
      child: false,
      sibling: false,
    },
    step,
    stepStack: [],
    stepPositionStack: [],
    child() {
      switch (this.step.type) {
        case 'seq':
          this.stepStack.push(this.step)
          this.stepPositionStack.push(0)
          this.step = this.step.data[0] //too weak consumption
          break
      }
    },
  }
}
