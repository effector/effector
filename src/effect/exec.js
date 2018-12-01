//@flow

import {Future} from './future'
import type {Thunk, Callbacks} from './index.h'

export const exec = <Args, Done, Fail>(
  args: Args,
  cbs: Callbacks<Args, Done, Fail>,
): Future<Args, Done, Fail> => {
  declare var throwSymbol: Fail
  declare var doneSymbol: Promise<Done> & Done
  let syncError: Fail /*:: = throwSymbol*/
  let req: Promise<Done> | Done /*:: = doneSymbol*/
  let successSync = false
  const future = new Future(args)
  try {
    req = cbs[2](args)
    successSync = true
  } catch (err) {
    syncError = err
  }
  if (successSync === false) {
    future.cache = () => undefined
    future.anyway = () => Promise.resolve(undefined)
    ;(future: any).then = (rs, rj) => Promise.reject(syncError).then(rs, rj)
    cbs[1]({error: syncError, params: args})
    return future
  }
  if (
    typeof req === 'object'
    && req !== null
    && typeof req.then === 'function'
  ) {
    const then: Promise<Done> = (req: any)
    future.anyway = () =>
      new Promise(rs => {
        then.then(
          () => {
            rs()
          },
          () => {
            rs()
          },
        )
      })
    ;(future: any).then = (rs, rj) => then.then(rs, rj)
    then.then(
      result => {
        future.cache = () => result
        cbs[0]({result, params: args})
      },
      error => void cbs[1]({error, params: args}),
    )
    return future
  }
  const done: Done = (req: any)
  future.cache = () => done
  future.anyway = () => Promise.resolve(undefined)
  ;(future: any).then = (rs, rj) => Promise.resolve(done).then(rs, rj)
  cbs[0]({result: done, params: args})
  return future
}
