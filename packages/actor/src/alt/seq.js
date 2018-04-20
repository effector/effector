//@flow

import {type PlainActorSystem, defaultActorSystem} from './system'

export type Seq = Generator<void, void, void>
export type SeqM = (...seq: Seq[]) => Seq

// export function* map(a: Seq, b: Seq, f: SeqM) {
//  let aDone = false,
//    bDone = false,
//    fDone = false
//  const fSeq = f(a, b)
//  do {
//   const aVal = a.next()
//   const bVal = b.next()
//   aDone = aVal.done
//   bDone = bVal.done
//   fDone = fDone.done
//  } while (aDone === false && bDone === false)
// }

export function seq(system: PlainActorSystem = defaultActorSystem) {
 if (system.isDispatching) return
 system.isDispatching = true
 for (const _ of forPendingActors(system.pending));
 system.isDispatching = false
}

function* forPendingActors(pending): Seq {
 for (const {inbox, reducer, state} of untilEnd(pending)) {
  yield* forActorEvents(inbox, reducer, state)
 }
}

function* forActorEvents(inbox, reducer, state): Seq {
 for (const event of untilEnd(inbox)) {
  yield* forReducer(event, reducer, state)
 }
}

function* forReducer(event, reducer, state): Seq {
 for (const fn of reducer) {
  yield fn(state.get(), event, state.set)
 }
}

function* untilEnd<T>(set: Set<T>): Iterable<T> {
 do {
  for (const e of [...set]) {
   set.delete(e)
   yield e
  }
 } while (set.size > 0)
}

// function* use<T>(set: Set<T>): Iterable<T> {
//  for (const e of [...set]) {
//   set.delete(e)
//   yield e
//  }
// }
