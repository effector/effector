import {is, assert} from '../validate'
import type {ValuesMap, HandlersMap, Store} from '../unit.h'
import {createScope} from './createScope'
import {forEach} from '../collection'
import {getMeta} from '../getter'

export function fork(config?: {values?: ValuesMap; handlers?: HandlersMap}) {
  const scope = createScope()

  if (config) {
    const values = config.values
    if (values) {
      const mapOrRecordValues = Array.isArray(values)
        ? new Map(values as [Store<any>, any][])
        : values
      const sidMap = scope.values.sidMap
      if (mapOrRecordValues instanceof Map) {
        forEach(mapOrRecordValues, (value, store) => {
          assert(
            is.store(store) && is.targetable(store),
            'Values map can contain only writable stores as keys',
          )
          scope.values.idMap[store.stateRef.id] = value
          const sid = store.sid
          if (sid) {
            if (sid in sidMap) scope.hasSidDoubles = true
            sidMap[sid] = value
            /**
             * If store values were provided as tuple or map,
             * but unit has sid anyway, we should add it to sidIdMap,
             *
             * It is needed to avoid issues, if there are duplicated sids in the code + values is a tuple or map
             */
            scope.sidIdMap[sid] = store.stateRef.id

            const serialize = getMeta(store, 'serialize')
            if (serialize === 'ignore') {
              scope.sidSerializeSettings.set(sid, {ignore: true})
            }
          }
        })
      } else {
        scope.fromSerialize = true
        Object.assign(sidMap, mapOrRecordValues)
      }
    }
    const handlers = config.handlers
    if (handlers) {
      assert(
        handlers instanceof Map || Array.isArray(handlers),
        '"handlers" could be array or map with effect',
        'fork',
      )
      const mapValues = Array.isArray(handlers) ? new Map(handlers) : handlers
      forEach(mapValues, (value, key) => {
        assert(is.effect(key), 'Handlers map can contain only effects as keys')
      })
      scope.handlers = mapValues
    }
  }
  return scope
}
