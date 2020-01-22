import {combine as originalCombine, Store} from 'effector'
import {signalOwn} from './h'

type Tuple<T = unknown> = [T] | T[]
type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
type GetCombinedValue<T> = {
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}

export function map<T, S>(
  store: Store<T>,
  {fn}: {fn: (value: T) => S},
): Store<S> {
  console.error('separate map method is deprecated, use store.map as usual')
  return signalOwn(store.map(fn))
}

export function combine<A extends Combinable, B>({
  source,
  fn,
}: {
  source: A
  fn(source: GetCombinedValue<A>): B
}): Store<B> {
  console.error('separate combine method is deprecated, use common combine method as usual')
  return signalOwn(originalCombine(source, fn))
}
