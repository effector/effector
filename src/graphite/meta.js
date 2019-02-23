//@flow
import {type TypeDef, createStateRef} from 'effector/stdlib'

import type {Meta, CommonCtx} from './index.h'

export const cloneMeta = (meta: Meta): Meta => {
  const val: typeof meta.val = cloneVals(meta.val)
  const transactions: typeof meta.transactions = []
  const reg: typeof meta.reg = {
    isChanged: meta.reg.isChanged,
    isFailed: meta.reg.isFailed,
  }
  return {
    callstack: meta.callstack.slice(),
    reg,
    stop: meta.stop,
    val,
    //TODO avoid this
    transactions,
    volatile: {runs: {}, runsIDs: []},
  }
}
export const newMeta = (ctx: CommonCtx): Meta => ({
  callstack: [],
  transactions: [],
  stop: false,
  ctx,
  reg: {
    isChanged: true,
    isFailed: false,
  },
  val: stateRefs({
    watch(ctx) {
      // console.log('watch', ctx)
    },
    ctx: null,
    scope: (() => {
      const top = {guard: true}

      const result = {
        full: [top],
        iterate() {
          return new ScopeIterator(result.full)
        },
        get top() {
          return result.full[result.full.length - 1]
        },
        get length() {
          return result.full.length
        },
        push(value) {
          result.full.push(value)
        },
        pop() {
          result.full.pop()
        },
      }
      return result
    })(),
  }),
  volatile: {runs: {}, runsIDs: []},
})

function ScopeIterator(full) {
  this.index = full.length - 1
  this.body = full
}
ScopeIterator.prototype.down = function() {
  if (this.index >= this.body.length) return false
  this.index += 1
  return true
}
ScopeIterator.prototype.value = function() {
  return this.body[this.index]
}
ScopeIterator.prototype.bottom = function() {
  return this.body[this.body.length - 1]
}
ScopeIterator.prototype.up = function() {
  if (this.index <= 0) return false
  this.index -= 1
  return true
}

const cloneVals = obj => {
  const result = {}
  for (const key in obj) {
    result[key] = createStateRef(obj[key].current)
  }
  return result
}

const stateRefs = obj => {
  const result = {}
  for (const key in obj) {
    result[key] = createStateRef(obj[key])
  }
  return result
}
