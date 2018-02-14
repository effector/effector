//@flow
/* eslint-disable no-unused-vars */

import {Stream} from 'most'

declare export
class Subject<T> extends Stream<T> {
  next(value: T): Subject<T>,
}


declare export
function async<T>(): Subject<T>
