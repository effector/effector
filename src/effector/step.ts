import {StateRef, Run, Filter, Compute, Barrier, Check, Mov} from './index.h'
import {nextStepID} from './id'
import {bind2} from './bind'

const cmd = (type: any, hasRef: boolean, data: any): any => ({
  id: nextStepID(),
  type,
  data,
  hasRef,
})

let nextBarrierID = 0

export const barrier: (data: {
  priority?: 'barrier' | 'sampler',
}) => Barrier = ({priority = 'barrier'}) =>
  cmd('barrier', false, {
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
}) => cmd('mov', from === 'store', {from, store, to, target})
export const check: {
  defined(): Check,
  changed({store: StateRef}): Check,
} = {
  defined: () => cmd('check', false, {type: 'defined'}),
  changed: ({store}) => cmd('check', true, {type: 'changed', store}),
}
export const compute: (data: {
  fn: (data: any, scope: {[key: string]: any}) => any,
}) => Compute = bind2(cmd, 'compute', false)
export const filter: (data: {
  fn: (data: any, scope: {[key: string]: any}) => any,
}) => Filter = bind2(cmd, 'filter', false)
export const run: (data: {
  fn: (data: any, scope: {[key: string]: any}) => any,
}) => Run = bind2(cmd, 'run', false)
export const update: (data: {
  store: StateRef,
}) => Mov = ({store}) => mov({from: 'stack', target: store})
