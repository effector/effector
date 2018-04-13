//@flow

import type {Int} from './index.h'
import {count} from './int'

export class ID {
 /*::+*/ id: Int
 constructor(int: Int = count()) {
  this.id = int
 }
 inspect() {
  return this.id
 }
}

export function nextID(): ID {
 return new ID()
}
