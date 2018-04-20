//@flow

import invariant from 'invariant'

import type {Delegate, PendingDelegate} from './index.h'

import {DelegateQueue, PutQueue, MutableCell, MutableQueue} from './queue'

import type {AVar} from './class'

declare export function writeAVar<B>(avar: AVar<any>, value: B): AVar<B>
export function writeAVar(avar: AVar<any>, value: any) {
 avar.value = value
 // if (value === undefined || value === null)

 return avar
}

function erase<A>(avar: AVar<A>) {
 return writeAVar(avar, null)
}

declare export function putLast<A>(
 queue: PutQueue<A>,
 value: PendingDelegate<A>,
): MutableCell<PendingDelegate<A>>
declare export function putLast<A>(
 queue: DelegateQueue<A>,
 value: Delegate<A>,
): MutableCell<Delegate<A>>
// declare function putLast<A>(
//  queue: MutableQueue,
//  value: Delegate<A>,
// ): MutableCell<A>
export function putLast<A>(queue: MutableQueue, value: A) {
 const cell = new MutableCell(queue, value)
 switch (queue.size) {
  case 0:
   queue.head = cell
   break
  case 1: {
   const {head} = queue
   invariant(head, 'no head')
   cell.prev = head
   head.next = cell
   queue.last = cell
   break
  }
  default: {
   const {last} = queue
   invariant(last, 'no last')
   cell.prev = last
   last.next = cell
   queue.last = cell
  }
 }
 queue.size++
 return cell
}

declare function takeLast<A>(queue: PutQueue<A>): PendingDelegate<A> | null
declare function takeLast<A>(queue: DelegateQueue<A>): Delegate<A> | null
declare function takeLast<A>(queue: MutableQueue): A | null
function takeLast<A>(queue: MutableQueue): A | null {
 let cell
 switch (queue.size) {
  case 0:
   return null
  case 1:
   cell = queue.head
   queue.head = null
   break
  case 2: {
   const {head} = queue
   invariant(head, 'no head')
   cell = queue.last
   head.next = null
   queue.last = null
   break
  }
  default: {
   const {last} = queue
   invariant(last, 'no last')
   cell = last
   const {prev} = last
   invariant(prev, 'no prev')
   prev.next = null
   queue.last = prev
  }
 }
 invariant(cell, 'no cell')
 /*::;(cell: MutableCell<*>)*/
 cell.prev = null
 cell.queue = null
 queue.size--
 return cell.value
}

declare function takeHead<A>(queue: PutQueue<A>): PendingDelegate<A> | null
declare function takeHead<A>(queue: DelegateQueue<A>): Delegate<A> | null
declare function takeHead<A>(queue: MutableQueue): A | null
function takeHead<A>(queue: MutableQueue): A | null {
 let cell
 switch (queue.size) {
  case 0:
   return null
  case 1:
   cell = queue.head
   queue.head = null
   break
  case 2: {
   const {last} = queue
   invariant(last, 'no last')
   cell = queue.head
   last.prev = null
   queue.head = last
   queue.last = null
   break
  }
  default: {
   cell = queue.head
   invariant(cell, 'no cell')
   const {next} = cell
   invariant(next, 'no next')
   next.prev = null
   queue.head = next
  }
 }
 invariant(cell, 'no cell')
 cell.next = null
 cell.queue = null
 queue.size--
 return cell.value
}

export function deleteCell<A>(cell: MutableCell<A>) {
 if (cell.queue == null) {
  return
 }
 if (cell.queue.last === cell) {
  takeLast(cell.queue)
  return
 }
 if (cell.queue.head === cell) {
  takeHead(cell.queue)
  return
 }
 if (cell.prev) {
  cell.prev.next = cell.next
 }
 if (cell.next) {
  cell.next.prev = cell.prev
 }
 cell.queue.size--
 cell.queue = null
 //$off hard cast is valid here as we deleting that cell
 cell.value = null
 cell.next = null
 cell.prev = null
}

export function drainVar<A>(avar: AVar<A>) {
 if (avar.draining) {
  return
 }

 const {puts, takes, reads} = avar
 let p: ?PendingDelegate<A>
 let r: ?Delegate<A>
 let t: ?Delegate<A>
 let value
 let rsize

 avar.draining = true

 while (1) {
  p = null
  r = null
  t = null
  value = avar.value
  rsize = reads.size

  if (avar.error != null) {
   value = avar.error
   while ((p = takeHead(puts))) {
    runEff(value, p.next, p.error)
   }
   while ((r = takeHead(reads))) {
    runEff(value, r)
   }
   while ((t = takeHead(takes))) {
    runEff(value, t)
   }
   break
  }

  // Process the next put. We do not immediately invoke the callback
  // because we want to preserve ordering. If there are takes/reads
  // we want to run those first.
  if ((null === value || undefined === value) && (p = takeHead(puts))) {
   writeAVar(avar, (value = p.value))
  }

  if (null !== value && undefined !== value) {
   // We go ahead and queue up the next take for the same reasons as
   // above. Invoking the read callbacks can affect the mutable queue.
   t = takeHead(takes)
   // We only want to process the reads queued up before running these
   // callbacks so we guard on rsize.
   while (rsize-- && (r = takeHead(reads))) {
    runEff(value, r)
   }
   if (null !== t && undefined !== t) {
    erase(avar)
    runEff(value, t)
   }
  }

  if (null !== p && undefined !== p) {
   //  console.log('fn p value', value)
   runEff(void 0, p.next, p.error)
  }

  // Callbacks could have queued up more items so we need to guard on the
  // actual mutable properties.
  if (
   ((null === avar.value || undefined === avar.value) && puts.size === 0)
   || (null !== avar.value && undefined !== avar.value && takes.size === 0)
  ) {
   break
  }
 }

 avar.draining = false
}

export function drainErase<A>(avar: AVar<A>) {
 drainVar(erase(avar))
}

function runEff<T>(value: T, eff: Delegate<T>, onError?: Delegate<Error>) {
 try {
  eff(value)
 } catch (error) {
  (onError || doThrow)(error)
 }
}

function doThrow(error: Error) {
 setTimeout(() => {
  throw error
 }, 0)
}
