import {assert} from '../throw'
import {forkPage, setForkPage} from '../kernel'
import type {Scope} from '../unit.h'

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
    setForkPage(savedForkPage)
    try {
      final = unit(x)
    } catch (err) {
      final = err
      failed = true
    }
    setForkPage(lastForkPage)

    if (failed) throw final

    if (final instanceof Promise) {
      function restore() {
        setForkPage(lastForkPage)
      }
      final.then(restore, restore)
    }

    return final
  }
}
