//@flow

import {Step, Cmd} from 'effector/graphite/typedef'
import type {Ref} from '../ref/createRef'

export function compute(
  reduce: (oldValue: any, newValue: any, ctx: any) => any,
) {
  return Cmd.compute({reduce})
}
export function filter(filt: (value: any, ctx: any) => boolean) {
  return Cmd.filter({filter: filt})
}

export function run(data: {
  transactionContext?: (data: any) => () => void,
  runner(ctx: any): any,
}) {
  return Cmd.run(data)
}
export function emit(
  subtype: 'event' | 'effect',
  fullName: string,
  runner: (ctx: any) => any,
) {
  return Cmd.emit({subtype, fullName, runner})
}
export function update(store: Ref<any>) {
  return Cmd.update({store})
}
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
      const next = Step.multi([])
      prime.data.push(next)
      this.current = next
    }
    this.mod = 'par'
    return /*::toPar(*/ this /*::)*/
  }
  push(step: Cmd.Cmd): this {
    const solo = Step.single(step)
    this.current.data.push(solo)
    return this
  }
  compute(reduce: (oldValue: any, newValue: any, ctx: any) => any): this {
    this.push(compute(reduce))
    return this
  }
  filter(filt: (value: any, ctx: any) => boolean): this {
    this.push(filter(filt))
    return this
  }
  run(data: {
    transactionContext?: (data: any) => () => void,
    runner(ctx: any): any,
  }): this {
    this.push(run(data))
    return this
  }
  emit(
    subtype: 'event' | 'effect',
    fullName: string,
    runner: (ctx: any) => any,
  ): this {
    this.push(emit(subtype, fullName, runner))
    return this
  }
  update(store: Ref<any>): this {
    this.push(update(store))
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
