//@flow

import {addToArray} from './util'
import {detach} from './detach'
import {REACTOR} from '../kind/case/derive'
import type {Box} from './index.h'
import type {Derivation} from './derivation'

export class Reactor {
 _governor: Reactor | null = null
 parent: Derivation<any>
 react: *
 _active = false
 _reacting = false
 /*::;+*/ kind = REACTOR
 constructor(parent: Derivation<any>, react: *) {
  this.parent = parent
  this.react = react
 }
 start() {
  this._active = true

  addToArray(this.parent.activeChildren, this)

  this.parent.get()
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
  this._force(this.parent.get())
 }

 stop() {
  detach(this.parent, this)
  this._active = false
 }
}
