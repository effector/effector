import {getMeta, getOwners, getLinks} from '../getter'
import {is} from '../is'
import {assert} from '../throw'
import type {Store, Effect, ValuesMap, HandlersMap} from '../unit.h'
import type {Node, Unit} from '../index.h'
import {add, forEach, includes} from '../collection'
import {STORE} from '../tag'

export function traverseStores(
  root: Node,
  fn: (node: Node, sid: string | null) => void,
  needSidlessStores: true,
): void
export function traverseStores(
  root: Node,
  fn: (node: Node, sid: string) => void,
): void
export function traverseStores(
  root: Node,
  fn: (node: Node, sid: string) => void,
  needSidlessStores?: boolean,
) {
  const list = [] as Node[]
  ;(function visit(node) {
    if (includes(list, node)) return
    add(list, node)
    if (getMeta(node, 'op') === STORE) {
      if (needSidlessStores || getMeta(node, 'sid')) {
        fn(node, getMeta(node, 'sid'))
      }
    }
    forEach(node.next, visit)
    forEach(getOwners(node), visit)
    forEach(getLinks(node), visit)
  })(root)
}

type StoreOrEffect = Store<any> | Effect<any, any, any>

export function normalizeValues(
  values: ValuesMap | HandlersMap,
  assertEach?: (key: StoreOrEffect, value: any) => void,
) {
  const mapOrRecordValues: Map<StoreOrEffect, any> | Record<string, any> =
    Array.isArray(values) ? new Map(values as [StoreOrEffect, any][]) : values
  const unitMap = new Map<Unit<any>, any>()
  let hasSidDoubles = false
  if (mapOrRecordValues instanceof Map) {
    const sidMap = {} as Record<string, any>
    forEach(mapOrRecordValues, (value, key) => {
      assert(
        (is.unit as (val: unknown) => val is StoreOrEffect)(key),
        'Map key should be a unit',
      )
      if (assertEach) assertEach(key, value)
      if (key.sid) {
        if (key.sid in sidMap) hasSidDoubles = true
        sidMap[key.sid!] = value
      }
      unitMap.set(key, value)
    })
    return {sidMap, unitMap, hasSidDoubles}
  }
  return {sidMap: mapOrRecordValues, unitMap}
}
