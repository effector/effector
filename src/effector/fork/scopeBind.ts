import {forkPage, isKernelContext, setForkPage} from '../kernel'
import {assert} from '../validate'
import type {Scope} from '../unit.h'

/** bind event to scope */
export function scopeBind(
  unit: (x: any) => any,
  {scope, safe}: {scope?: Scope; safe?: true} = {},
) {
  assert(
    scope || forkPage || safe || isKernelContext,
    'scopeBind: scope not found',
  )

  const targetForkPage = scope || forkPage!

  return (x: any) => {
    let final: any
    let failed = false

    const lastForkPage = forkPage
    function restoreLastForkPage() {
      setForkPage(lastForkPage)
    }

    setForkPage(targetForkPage)
    try {
      final = unit(x)
    } catch (err) {
      final = err
      failed = true
    }
    restoreLastForkPage()

    if (failed) throw final

    if (final instanceof Promise) {
      final.then(restoreLastForkPage, restoreLastForkPage)
    }

    return final
  }
}
