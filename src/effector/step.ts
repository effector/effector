import {
  StateRef,
  Run,
  Filter,
  Compute,
  Barrier,
  CheckDefined,
  CheckChanged,
  MovValueToRegister,
  MovValueToStore,
  MovStoreToRegister,
  MovStoreToStore,
  MovRegisterToStore,
} from './index.h'
import {nextStepID} from './id'
import {bind} from './bind'
import {BARRIER, FILTER, STACK, STORE} from './tag'
import {Stack} from './kernel'

const cmd = (
  type: 'check' | 'compute' | 'filter' | 'mov' | 'barrier',
  data: any,
): any => ({
  id: nextStepID(),
  type,
  data,
})

let nextBarrierID = 0

export const barrier = ({
  priority = BARRIER,
}: {
  priority?: 'barrier' | 'sampler'
}): Barrier =>
  cmd(BARRIER, {
    barrierID: ++nextBarrierID,
    priority,
  })
export const mov: {
  <T>(data: {from: 'value'; store: T; target: StateRef}): MovValueToStore<T>
  <T>(data: {
    from: 'value'
    to: 'stack' | 'a' | 'b'
    store: T
  }): MovValueToRegister<T>
  (data: {from: 'a' | 'b' | 'stack'; target: StateRef}): MovRegisterToStore
  (data: {
    from: 'a' | 'b' | 'stack'
    to: 'a' | 'b' | 'stack'
  }): MovRegisterToStore
  (data: {store: StateRef; target: StateRef}): MovStoreToStore
  (data: {store: StateRef; to: 'stack' | 'a' | 'b'}): MovStoreToRegister
  (data: {store: StateRef}): MovStoreToRegister
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
}: {
  from?: 'value' | 'store' | 'stack' | 'a' | 'b'
  to?: 'stack' | 'a' | 'b' | 'store'
  store?: StateRef
  target?: StateRef
}) => cmd('mov', {from, store, to, target})
export const check = {
  defined: (): CheckDefined => cmd('check', {type: 'defined'}),
  changed: ({store}: {store: StateRef}): CheckChanged =>
    cmd('check', {type: 'changed', store}),
}
export const compute: (data: {
  fn(data: any, scope: {[key: string]: any}, stack: Stack): any
}) => Compute = bind(cmd, 'compute')
export const filter: (data: {
  fn(data: any, scope: {[key: string]: any}, stack: Stack): any
}) => Filter = bind(cmd, FILTER)
export const run: (data: {
  fn(data: any, scope: {[key: string]: any}, stack: Stack): any
}) => Run = bind(cmd, 'run')
export const update = ({store}: {store: StateRef}) =>
  mov({from: STACK, target: store})
