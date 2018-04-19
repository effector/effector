//@flow

import type {Delegate, PendingDelegate} from './index.h'

export class MutableQueue {
 size: number = 0
 head: ?MutableCell<*> = null
 last: ?MutableCell<*> = null

 tag(): 'MutableQueue' {
  return 'MutableQueue'
 }
}

export class PutQueue<A = *> extends MutableQueue {
 head: ?MutableCell<PendingDelegate<A>>
 last: ?MutableCell<PendingDelegate<A>>
}

export class DelegateQueue<A = *> extends MutableQueue {
 head: ?MutableCell<Delegate<A>>
 last: ?MutableCell<Delegate<A>>
}

export class MutableCell<A> {
 value: A
 queue: ?MutableQueue
 next: ?MutableCell<A> = null
 prev: ?MutableCell<A> = null
 constructor(queue: MutableQueue, value: A) {
  this.queue = queue
  this.value = value
 }

 tag(): 'MutableCell' {
  return 'MutableCell'
 }
}
