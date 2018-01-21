//@flow

/*::
import {either} from 'fp-ts'
*/
import type {Act} from './act'

export type Done<A, D> = {
  params: A,
  result: D,
  seq: number,
}
export type Fail<A, E> = {
  params: A,
  error: E,
  seq: number,
}

export type Result<A, D, E> = either.Either<Fail<A, E>, Done<A, D>>
export type ResultAct<A, D, E> = either.Either<
  Act<Fail<A, E>, 'async/fail'>,
  Act<Done<A, D>, 'async/done'>,
>
