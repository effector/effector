//@flow

import {type TypeDef, type StateRef, createStateRef} from 'effector/stdlib'
import {__DEV__, __DEBUG__} from 'effector/flags'
import {cloneMeta} from './meta'
declare var __step: TypeDef<*, 'step'>

export function extendWalk(runStep: *, stepVisitor: *) {
  if (__DEBUG__) {
    const LOOP_TIMEOUT = 5e3
    const infiniteLoopProtection = start => {
      if (Date.now() - start > LOOP_TIMEOUT) {
        throw new Error('infinite loop protection')
      }
    }

    const stepVisitorNext = {
      combine(ctx, meta) {
        const id = String(__step.data.id)
        const part = +__step.data.part
        const next = __step.data.next
        const arr = (meta.tc[id] = meta.tc[id] || [])
        arr[part] = {
          ctx,
          meta: cloneMeta(meta),
          next,
          data: {
            id,
            part,
            keys: __step.data.keys,
            stateReader: __step.data.stateReader,
            shape: __step.data.shape,
          },
        }
        meta.stop = true
      },
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
}
