//@flow

import {CHANGED} from '../status'
import type {Reactor} from '../reactors'

export function runReactor(instance: Reactor) {
 if (instance._reacting || !instance._active) return
 if (instance._governor !== null) {
  runReactor(instance._governor)
 }
 // maybe the reactor was stopped by the parent
 if (!instance._active) return
 const nextValue = instance.parent.get()
 if (instance.parent.status === CHANGED) {
  instance._force(nextValue)
 }
}
