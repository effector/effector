import {assert} from '../throw'
import {forkPage, setForkPage} from '../kernel'
import type {Scope} from '../unit.h'

/** bind event to scope */
export function scopeBind(
  unit: (...args: any[]) => any,
  {scope, safe}: {scope?: Scope; safe?: true} = {},
) {
  assert(scope || forkPage || safe, 'scopeBind: scope not found')
  const targetForkPage = scope || forkPage!

  return (...args: any[]) => {
    let final: any
    let failed = false

    const lastForkPage = forkPage
    function restoreLastForkPage() {
      setForkPage(lastForkPage)
    }

    setForkPage(targetForkPage)
    try {
      final = unit(...args)
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
