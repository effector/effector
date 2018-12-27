//@flow

import type {Callbacks} from './index.h'

export const exec = <Args, Done, Fail>(
  args: Args,
  cbs: Callbacks<Args, Done, Fail>,
): Promise<Done> => {
  declare var throwSymbol: Fail
  declare var doneSymbol: Promise<Done> & Done
  let syncError: Fail /*:: = throwSymbol*/
  let req: Promise<Done> | Done /*:: = doneSymbol*/
  let successSync = false
  let fpromise
  try {
    req = cbs[2](args)
    successSync = true
  } catch (err) {
    syncError = err
  }
  if (successSync === false) {
    fpromise = new Promise((_, rj) => {
      rj(syncError)
    })
    //TODO deprecate this
    //$off
    fpromise.cache = () => undefined
    const anyway = Promise.resolve(undefined)
    //$off
    fpromise.anyway = () => anyway
    cbs[1]({error: syncError, params: args})
    return fpromise
  }
  if (
    typeof req === 'object'
    && req !== null
    && typeof req.then === 'function'
  ) {
    const then: Promise<Done> = (req: any)
    fpromise = then.then(
      result => {
        //$off
        fpromise.cache = () => result
        cbs[0]({result, params: args})
        return result
      },
      error => {
        cbs[1]({error, params: args})
        throw error
      },
    )
    const anyway = fpromise.then(() => {}, () => {})
    //$off
    fpromise.anyway = () => anyway
    return fpromise
  }
  const done: Done = (req: any)
  fpromise = new Promise(rs => {
    rs(done)
  })
  //$off
  fpromise.cache = () => done
  const anyway = Promise.resolve(undefined)
  //$off
  fpromise.anyway = () => anyway
  cbs[0]({result: done, params: args})
  return fpromise
}
