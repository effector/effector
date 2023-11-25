import {assert} from '../throw'
import {forkPage, setForkPage, isWatch, setIsWatch} from '../kernel'
import type {Scope} from '../unit.h'
import {is} from '../is'

/** bind event to scope */
export function scopeBind(
  unit: (x: any) => any,
  {scope, safe}: {scope?: Scope; safe?: true} = {},
) {
  assert(scope || forkPage || safe, 'scopeBind: scope not found')
  const savedForkPage = scope || forkPage!

  return (x: any) => {
    let final: any
    let failed = false

    const lastForkPage = forkPage
    const lastIsWatch = isWatch
    setForkPage(savedForkPage)
    setIsWatch(true)
    try {
      final = unit(x)
    } catch (err) {
      final = err
      failed = true
    }
    setIsWatch(lastIsWatch)
    setForkPage(lastForkPage)

    if (failed) throw final

    if (final instanceof Promise && !is.effect(unit)) {
      throw Error(
        'scopeBind: arbitary async callback is not supported, use an effect instead',
      )
    }

    return final
  }
}
