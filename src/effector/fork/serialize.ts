import type {Scope, Store} from '../unit.h'
import {assert} from '../validate'
import {forEach, forIn, includes} from '../collection'
import {printErrorWithStack} from '../throw'

const noopSerializer = (x: any) => x
/**
 serialize state on server
 */
export function serialize(
  scope: Scope,
  config: {ignore?: Array<Store<any>>} = {},
) {
  if (scope.warnSerializeTraces.size) {
    console.error(
      'serialize: One or more stores dont have sids, their values are omitted',
    )
    forEach(scope.warnSerializeTraces, stack => {
      printErrorWithStack('store should have sid or `serialize: ignore`', stack)
    })
  }
  assert(!scope.hasSidDoubles, 'duplicate sid found in this scope')
  const ignoredStores = config.ignore ? config.ignore.map(({sid}) => sid) : []
  const result = {} as Record<string, any>
  forIn(scope.values.sidMap, (value, sid) => {
    if (includes(ignoredStores, sid)) return
    const id = scope.sidIdMap[sid]
    const serializeSettings = scope.sidSerializeSettings.get(sid) ?? {
      ignore: false,
      write: noopSerializer,
    }
    if (serializeSettings.ignore) return
    const serializer = serializeSettings.write
    // if (!scope.changedStores.has(id)) return
    if (id && id in scope.reg) {
      result[sid] = serializer(scope.reg[id].current)
    } else {
      result[sid] = serializer(value)
    }
  })
  return result
}
