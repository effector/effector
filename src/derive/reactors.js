//@flow

import {addToArray} from './util'
import {detach} from './detach'
import {REACTOR} from '../kind/case/derive'

export class Reactor {
 _governor: Reactor | null = null
 _parent: *
 react: *
 _active = false
 _reacting = false
 /*::;+*/ kind = REACTOR
 constructor(parent: *, react: *) {
  this._parent = parent
  this.react = react
 }
 start() {
  this._active = true

  addToArray(this._parent._activeChildren, this)

  this._parent.get()
 }

 _force(nextValue: *) {
  this._reacting = true
  try {
   this.react(nextValue)
  } finally {
   this._reacting = false
  }
 }

 force() {
  this._force(this._parent.get())
 }

 stop() {
  detach(this._parent, this)
  this._active = false
 }
}
