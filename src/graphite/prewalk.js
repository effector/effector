//@flow
import invariant from 'invariant'
import type {TypeDef} from 'effector/stdlib'

type List = {
  +v: any,
  +l: number,
  +n: List | null,
}
export function splitWalk(seq: TypeDef<*, 'step'>) {
  function nodeRaw(value, next: any, level: number): List {
    return {v: value, n: next, l: level}
  }
  function node(value: any, parent: List = node.none): List {
    return nodeRaw(value, parent, parent.l + 1)
  }
  node.none = nodeRaw(null, null, 0)
  const cmdVIS = {
    selector: data => data.obj.type,
    visitor: {
      emit({obj, ctx}) {
        ctx.purePhase.push(obj)
      },
      compute({obj, ctx}) {
        ctx.purePhase.push(obj)
      },
      filter({obj, ctx}) {
        ctx.purePhase.push(obj)
      },
      update({obj, ctx}) {
        ctx.purePhase.push(obj)
      },
      run({obj, ctx}) {
        ctx.runPhase.push(obj)
        ctx.run.push(obj)
      },
    },
  }
  function pushToParent(newCtx, ctx) {
    // if (newCtx.purePhase.length > 0) {
    ctx.purePhase.push(newCtx.purePhase)
    // }
    // if (newCtx.runPhase.length > 0) {
    ctx.runPhase.push(newCtx.runPhase)
    // }
  }

  const stepVIS = {
    selector: data => data.obj.type,
    visitor: {
      single({obj, ctx}) {
        switcher({obj: obj.data, ctx}, cmdVIS)
      },
      multi({obj, ctx}) {
        if (obj.data.length === 0) return
        const newCtx = {
          purePhase: [],
          runPhase: [],
          run: ctx.run,
        }
        for (let i = 0; i < obj.data.length; i++) {
          const item = obj.data[i]
          switcher({obj: item, ctx: newCtx}, stepVIS)
        }
        pushToParent(newCtx, ctx)
      },
      seq({obj, ctx}) {
        if (obj.data.length === 0) return
        let newCtx = ctx
        let parent
        for (let i = 0; i < obj.data.length; i++) {
          parent = newCtx
          newCtx = {
            purePhase: [],
            runPhase: [],
            run: ctx.run,
          }
          const item = obj.data[i]
          switcher({obj: item, ctx: newCtx}, stepVIS)
          pushToParent(newCtx, parent)
        }
      },
      query(data) {},
    },
  }
  const groupVIS = {
    selector: data => data.obj.group,
    visitor: {
      step(data) {
        switcher(data, stepVIS)
      },
      cmd(data) {
        switcher(data, cmdVIS)
      },
    },
  }
  const runPhase = []
  const purePhase = []
  const run = []
  switcher({obj: seq, ctx: {purePhase, runPhase, run}}, groupVIS)
  const itemVIS = {
    selector: data => data.obj.type,
    visitor: {
      emit({obj, ctx}) {
        ctx.pure.push(obj)
      },
      compute({obj, ctx}) {
        ctx.pure.push(obj)
      },
      filter({obj, ctx}) {
        ctx.pure.push(obj)
      },
      update({obj, ctx}) {
        // console.log([...ctx.stack])
        ctx.write.push(obj)
      },
      run(data) {
        invariant(false, 'unexpected run')
      },
    },
  }
  const pureVIS = {
    selector: data => (Array.isArray(data.obj) ? 'list' : 'node'),
    visitor: {
      list({obj, ctx}) {
        ctx.depth += 1
        const stackSize = ctx.stack.length
        for (let i = 0; i < obj.length; i++) {
          switcher({obj: obj[i], ctx}, pureVIS)
        }
        ctx.stack.length = stackSize
        ctx.depth -= 1
      },
      node({obj, ctx}) {
        ctx.stack.push(obj)
        switcher({obj, ctx}, itemVIS)
      },
    },
  }
  const pure = []
  const write = []
  switcher({obj: purePhase, ctx: {pure, write, stack: [], depth: 0}}, pureVIS)
  return {runPhase, purePhase, pure, write, run}
}

function switcher(
  data: {obj: any, ctx: {[string]: any}},
  {
    visitor,
    selector,
    optional = false,
  }: {
    visitor: {[string]: (data: {obj: any, ctx: {[string]: any}}) => void},
    selector: (data: {obj: any, ctx: {[string]: any}}) => string,
    optional?: boolean,
  },
) {
  const variant = selector(data)
  if (optional) {
    if (variant in visitor) return (0, visitor[variant])(data)
  } else {
    invariant(variant in visitor, '"%s" not found in visitor', variant)
    return (0, visitor[variant])(data)
  }
}
