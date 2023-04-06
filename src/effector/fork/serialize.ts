import type {Scope, Store} from '../unit.h'
import {forIn, includes} from '../collection'
import {assert} from '../throw'
import {traverseStores} from './util'
import {getGraph, getMeta} from '../getter'

const noopSerializer = (x: any) => x
/**
 serialize state on server
 */
export function serialize(
  scope: Scope,
  config: {ignore?: Array<Store<any>>; onlyChanges?: boolean} = {},
) {
  if (scope.warnSerialize) {
    console.error(
      'There is a store without sid in this scope, its value is omitted',
    )
  }
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
  if ('onlyChanges' in config && !config.onlyChanges) {
    assert(scope.cloneOf, 'scope should be created from domain')
    traverseStores(getGraph(scope.cloneOf), (node, sid) => {
      if (
        !(sid in result) &&
        !includes(ignoredStores, sid) &&
        !getMeta(node, 'isCombine') &&
        getMeta(node, 'serialize') !== 'ignore'
      )
        result[sid] = scope.getState(node as any)
    })
  }
  return result
}
