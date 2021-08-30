import type {
  StateRef,
  Compute,
  MovValueToRegister,
  MovValueToStore,
  MovStoreToRegister,
  MovStoreToStore,
  MovRegisterToStore,
} from './index.h'
import {nextStepID} from './id'
import {EFFECT, REG_A, SAMPLER, STACK, STORE} from './tag'
import type {BarrierPriorityTag, Stack} from './kernel'

const cmd = (
  type: 'compute' | 'mov',
  data: any,
  priority?: BarrierPriorityTag | false,
  batch?: boolean,
) => {
  const result: any = {
    id: nextStepID(),
    type,
    data,
  }
  if (priority) {
    result.order = {priority}
    if (batch) result.order.barrierID = ++nextBarrierID
  }
  return result
}

let nextBarrierID = 0

export const mov: {
  <T>(data: {
    from: 'value'
    store: T
    target: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag
  }): MovValueToStore<T>
  <T>(data: {
    from: 'value'
    to: 'stack' | 'a' | 'b'
    store: T
    batch?: boolean
    priority?: BarrierPriorityTag
  }): MovValueToRegister<T>
  (data: {
    from: 'a' | 'b' | 'stack'
    target: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag
  }): MovRegisterToStore
  (data: {
    from: 'a' | 'b' | 'stack'
    to: 'a' | 'b' | 'stack'
    batch?: boolean
    priority?: BarrierPriorityTag
  }): MovRegisterToStore
  (data: {
    store: StateRef
    target: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag
  }): MovStoreToStore
  (data: {
    store: StateRef
    to: 'stack' | 'a' | 'b'
    batch?: boolean
    priority?: BarrierPriorityTag | false
  }): MovStoreToRegister
  (data: {
    store: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag | false
  }): MovStoreToRegister
  // (data: {
  //   from?: 'value' | 'store' | 'stack' | 'a' | 'b'
  //   to?: 'stack' | 'a' | 'b' | 'store'
  //   store?: StateRef
  //   target?: StateRef
  // }): Mov
} = ({
  from = STORE,
  store,
  target,
  to = target ? STORE : STACK,
  batch,
  priority,
}: {
  from?: 'value' | 'store' | 'stack' | 'a' | 'b'
  to?: 'stack' | 'a' | 'b' | 'store'
  store?: StateRef
  target?: StateRef
  batch?: boolean
  priority?: BarrierPriorityTag | false
}) => cmd('mov', {from, store, to, target}, priority, batch)

export const compute = ({
  fn,
  batch,
  priority,
  safe = false,
  filter = false,
}: {
  fn?: (data: any, scope: {[key: string]: any}, stack: Stack) => any
  batch?: boolean
  priority?: BarrierPriorityTag | false
  safe?: boolean
  filter?: boolean
}): Compute => cmd('compute', {fn, safe, filter}, priority, batch)

export const filter = ({
  fn,
}: {
  fn(data: any, scope: {[key: string]: any}, stack: Stack): any
}) => compute({fn, filter: true})

export const run = ({
  fn,
}: {
  fn(data: any, scope: {[key: string]: any}, stack: Stack): any
}) => compute({fn, priority: EFFECT})

export const calc = (
  fn: (data: any, scope: {[key: string]: any}, stack: Stack) => any,
  filter?: boolean,
  isEffect?: boolean,
) => compute({fn, safe: true, filter, priority: isEffect && EFFECT})

/**
 * `read(ref, true, true)`: **reg.stack** with **sampler** batch
 *
 * `read(ref, true, false)`: **reg.stack** without batch
 *
 * `read(ref, false, true)`: **reg.a** with **sampler** batch
 *
 * `read(ref, false, false)`: **reg.a** without batch
 *
 */
export const read = (
  store: StateRef,
  toStack?: boolean,
  samplerPriority?: boolean,
) =>
  mov({
    store,
    to: toStack ? STACK : REG_A,
    priority: samplerPriority && SAMPLER,
    batch: true,
  })

export const step = {mov, compute, filter, run}
