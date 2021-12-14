import {getMeta, getOwners, getLinks} from '../getter'
import {is} from '../is'
import {assert} from '../throw'
import type {Store} from '../unit.h'
import type {Node} from '../index.h'
import {add, forEach, includes} from '../collection'
import {STORE} from '../tag'

export function traverseStores(
  root: Node,
  fn: (node: Node, sid: string) => void,
) {
  const list = [] as Node[]
  ;(function visit(node) {
    if (includes(list, node)) return
    add(list, node)
    if (getMeta(node, 'op') === STORE && getMeta(node, 'sid')) {
      fn(node, getMeta(node, 'sid'))
    }
    forEach(node.next, visit)
    forEach(getOwners(node), visit)
    forEach(getLinks(node), visit)
  })(root)
}

export function normalizeValues(
  values: Map<Store<any>, any> | Array<[any, any]> | Record<string, any>,
  assertEach?: (key, value) => void,
) {
  if (Array.isArray(values)) values = new Map(values)
  if (values instanceof Map) {
    const result = {} as Record<string, any>
    forEach(values, (value, key) => {
      assert(is.unit(key), 'Map key should be a unit')
      if (assertEach) assertEach(key, value)
      assert(key.sid, 'unit should have a sid')
      assert(!(key.sid! in result), 'duplicate sid found')
      result[key.sid!] = value
    })
    return result
  }
  return values
}
