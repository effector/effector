//@flow

import invariant from 'invariant'

import {createEvent, type Event} from 'effector/event'
import {
 cmd as Cmd,
 ctx as Ctx,
 step as Step,
} from 'effector/datatype/FullDatatype.bs'
import type {Store} from './index.h'
import * as Kind from '../kind'
import {createRef, type Ref} from '../ref/createRef'

export class StepBox</*::+*/ Mode: 'seq' | 'par'> {
 depth: number = 0
 mod: 'seq' | 'par' = 'seq'
 /*::;+*/ prime = Step.seq([])
 current = this.prime
 modeSeq(): StepBox<'seq'> {
  if (this.mod === 'par') {
   const {prime} = this
   const next = Step.seq([])
   prime.data.push(next)
   this.current = next
  }
  this.mod = 'seq'
  return /*::toSeq(*/ this /*::)*/
 }
 modePar(): StepBox<'par'> {
  if (this.mod === 'seq') {
   const {prime} = this
   const next = Step.multi()
   prime.data.push(next)
   this.current = next
  }
  this.mod = 'par'
  return /*::toPar(*/ this /*::)*/
 }
 push(step: Cmd.Cmd) {
  const solo = Step.single(step)
  this.current.data.push(solo)
 }
 compute(reduce: (oldValue: any, newValue: any, ctx: any) => any): this {
  const step = Cmd.compute({reduce})
  const solo = Step.single(step)
  return this
 }
 filter(filt: (value: any, ctx: any) => boolean): this {
  const step = Cmd.filter({filter: filt})
  const solo = Step.single(step)
  return this
 }
 run(data: {
  transactionContext?: (data: any) => () => void,
  runner(ctx: any): any,
 }): this {
  const step = Cmd.run(data)
  const solo = Step.single(step)
  return this
 }
 emit(
  subtype: 'event' | 'effect',
  fullName: string,
  runner: (ctx: any) => any,
 ): this {
  const step = Cmd.emit({subtype, fullName, runner})
  const solo = Step.single(step)
  return this
 }
 update(store: Ref<any>): this {
  const step = Cmd.update({store})
  const solo = Step.single(step)
  return this
 }
 // step(...fabs: Array<(api: StepBox<*>) => StepBox<*>>) {
 //  fabs.map(f => f(this))
 //  return this
 // }
 // seq(...fabs: Array<(api: StepBox<*>) => StepBox<*>>) {
 //  fabs.map(f => f(this))
 //  return this
 // }
}

/*::
declare function toPar(stepBox: StepBox<'seq'>): StepBox<'par'>;
declare function toPar(stepBox: StepBox<'par'>): StepBox<'par'>;
declare function toPar(stepBox: StepBox<'par' | 'seq'>): StepBox<'par'>;
declare function toSeq(stepBox: StepBox<'seq'>): StepBox<'seq'>;
declare function toSeq(stepBox: StepBox<'par'>): StepBox<'seq'>;
declare function toSeq(stepBox: StepBox<'par' | 'seq'>): StepBox<'seq'>;
*/
