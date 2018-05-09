//@flow

import {addToArray} from './util'
import {detach} from './detach'
import {REACTOR} from '../kind/case/derive'
import type {Box} from './index.h'

export class Reactor {
 _governor: Reactor | null = null
 _parent: Box<any>
 react: *
 _active = false
 _reacting = false
 /*::;+*/ kind = REACTOR
 constructor(parent: Box<any>, react: *) {
  this._parent = parent
  this.react = react
 }
 start() {
  this._active = true

  addToArray(this._parent.activeChildren, this)

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
