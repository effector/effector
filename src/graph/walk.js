//@flow

import type {Graph} from './index.h'

export function* walk<Item, Yield>(
 graph: Graph<Item>,
 walker: Generator<Yield, void, [Item, Item]>,
): Generator<Yield, void, void> {
 for (const [key, values] of graph) {
  for (const e of values) {
   const result = walker.next([key, e])
   if (!result.done) yield result.value
   else return
  }
 }
}
