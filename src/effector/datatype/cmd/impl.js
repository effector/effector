//@flow

import * as Type from './index.h'
import * as Name from './type'
import type {Atom} from '../../atom'

class Cmd {
 /*:: type: any;*/
 /*::+*/ data: any
 constructor(data: any) {
  this.data = data
 }
}

class Compute extends Cmd {}
class Run extends Cmd {}
class Emit extends Cmd {}
class Filter extends Cmd {}
class Update extends Cmd {}

Object.defineProperty(Compute.prototype, 'type', {
 value: Name.COMPUTE,
 configurable: true,
})

Object.defineProperty(Run.prototype, 'type', {
 value: Name.RUN,
 configurable: true,
})

Object.defineProperty(Emit.prototype, 'type', {
 value: Name.EMIT,
 configurable: true,
})

Object.defineProperty(Filter.prototype, 'type', {
 value: Name.FILTER,
 configurable: true,
})

Object.defineProperty(Update.prototype, 'type', {
 value: Name.UPDATE,
 configurable: true,
})

export function compute(data: {
 reduce(oldValue: any, newValue: any, ctx: any): any,
}): Type.Compute {
 return new Compute(data)
}

export function run(data: {runner(ctx: any): any}): Type.Run {
 return new Run(data)
}

export function emit(data: {
 +subtype: 'event' | 'effect',
 +fullName: string,
 runner(ctx: any): any,
}): Type.Emit {
 return new Emit(data)
}

export function filter(data: {
 filter(value: any, ctx: any): boolean,
}): Type.Filter {
 return new Filter(data)
}

export function update(data: {store: Atom<any>}): Type.Update {
 return new Update(data)
}
