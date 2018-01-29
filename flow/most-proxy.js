//@flow

import {Stream} from 'flow@most'

declare export
class Proxy<T> {
  attach(stream: Stream<T>): Stream<T>,
  stream: Stream<T>,
}

declare export
function proxy<T> (): Proxy<T>
