//@flow

import invariant from 'invariant'
import {isDerivable} from './types'

import {Reactor} from './reactors'
import typeof {derive} from './derivation'

export type ReactorOpts = {
 once: boolean,
 skipFirst: boolean,
 from: *,
 until: *,
 when: *,
}

export function reactorFabric<T>(
 derive: derive<T>,
 derivable: *,
 f: Function,
 options: $Shape<$Exact<ReactorOpts>>,
) {
 invariant(
  typeof f === 'function',
  'the first argument to .react must be a function',
 )
 const opts: ReactorOpts = {once: false, skipFirst: false, ...options}

 let skipFirst = opts.skipFirst

 // wrap reactor so f doesn't get a .this context, and to allow
 // stopping after one reaction if desired.
 const reactor = new Reactor(derivable, val => {
  if (skipFirst) {
   skipFirst = false
   return
  }
  f(val)
  if (!opts.once) return
  reactor.stop()
  controller.stop()
 })

 function assertCondition(condition, name) {
  if (isDerivable(condition)) {
   return condition
  }
  if (typeof condition === 'function') {
   return condition
  }
  if (typeof condition === 'undefined') {
   return condition
  }
  throw Error(
   `react ${name} condition must be derivable or function, got: ${JSON.stringify(
    condition,
   )}`,
  )
 }

 function getCondition(condition: *, def) {
  if (!condition) return def
  if (typeof condition === 'function') return condition(derivable)
  return condition.get()
 }
 // listen to from condition, starting the reactor controller
 // when appropriate
 const $from = assertCondition(opts.from, 'from')
 // listen to when and until conditions, starting and stopping the
 // reactor as appropriate, and stopping this controller when until
 // condition becomes true
 const $until = assertCondition(opts.until, 'until')
 const $when = assertCondition(opts.when, 'when')

 const $conds = derive(() => ({
  from: getCondition($from, true),
  until: getCondition($until, false),
  when: getCondition($when, true),
 }))

 let started = false

 const controller = new Reactor($conds, (conds: *) => {
  if (conds.from) {
   started = true
  }
  if (!started) return
  if (conds.until) {
   reactor.stop()
   controller.stop()
  } else if (conds.when) {
   if (!reactor._active) {
    reactor.start()
    reactor.force()
   }
  } else if (reactor._active) {
   reactor.stop()
  }
 })
 controller.start()
 controller.force()

 reactor._governor = controller
}
