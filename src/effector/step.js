//@flow
import type {
  StateRef,
  Run,
  Filter,
  Compute,
  Barrier,
  Check,
  Mov,
} from './index.h'
import {nextStepID} from './id'

const cmd = (type: any, hasRef: boolean) => (data: any): any => ({
  id: nextStepID(),
  type,
  data,
  hasRef,
})

let nextBarrierID = 0

export const barrier: (data: {
  priority?: 'barrier' | 'sampler',
}) => Barrier = ({priority = 'barrier'}) =>
  cmd('barrier', false)({
    barrierID: ++nextBarrierID,
    priority,
  })
export const mov: (data: {
  from?: 'value' | 'store' | 'stack' | 'a' | 'b',
  to?: 'stack' | 'a' | 'b',
  store?: any,
  target?: any,
}) => Mov = ({
  from = 'store',
  store,
  target,
  to = target ? 'store' : 'stack',
}) => cmd('mov', from === 'store')({from, store, to, target})
export const check: {
  defined(): Check,
  changed({store: StateRef}): Check,
} = {
  defined: () => cmd('check', false)({type: 'defined'}),
  changed: ({store}) => cmd('check', true)({type: 'changed', store}),
}
export const compute: (data: {
  fn: (data: any, scope: {[string]: any}) => any,
}) => Compute = cmd('compute', false)
export const filter: (data: {
  fn: (data: any, scope: {[string]: any}) => any,
}) => Filter = cmd('filter', false)
export const run: (data: {
  fn: (data: any, scope: {[string]: any}) => any,
}) => Run = cmd('run', false)
export const update: (data: {
  store: StateRef,
}) => Mov = ({store}) => mov({from: 'stack', target: store})
