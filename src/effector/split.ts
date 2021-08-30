import type {Event} from './unit.h'
import type {NodeUnit, Cmd} from './index.h'
import {is, isFunction, isObject} from './is'
import {forIn, includes} from './collection'
import {addRefOp, createStateRef} from './stateRef'
import {createLinkNode} from './forward'
import {processArgsToConfig} from './config'
import {compute, filter, calc, read} from './step'
import {createNode} from './createNode'
import {launch} from './kernel'
import {getStoreState} from './getter'
import {assert} from './throw'
import {createEvent} from './createUnit'
import {applyTemplate} from './template'

const launchCase = (
  scopeTargets: Record<string, NodeUnit>,
  field: string,
  data: any,
  stack: any,
) => {
  const target = scopeTargets[field]
  if (target) {
    launch({
      target,
      params: Array.isArray(target) ? target.map(() => data) : data,
      defer: true,
      stack,
    })
  }
}

export function split(...args: any[]): any {
  let targets: Record<string, Event<any> | NodeUnit>
  let [[source, match], metadata] = processArgsToConfig(args)
  const knownCases = !match
  if (knownCases) {
    targets = source.cases
    match = source.match
    source = source.source
  }
  const matchIsUnit = is.store(match)
  const matchIsFunction = !is.unit(match) && isFunction(match)
  const matchIsShape = !matchIsUnit && !matchIsFunction && isObject(match)
  if (!targets!) targets = {}
  if (!knownCases) {
    assert(matchIsShape, 'match should be an object')
    forIn(match, (_, key) => (targets[key] = createEvent(metadata)))
    targets.__ = createEvent(metadata)
  }
  const owners = new Set(
    ([] as NodeUnit[]).concat(source, Object.values(targets)),
  )
  const caseNames = Object.keys(
    matchIsUnit || matchIsFunction ? targets : match,
  )
  let splitterSeq: Array<Cmd | false>
  if (matchIsUnit || matchIsFunction) {
    if (matchIsUnit) owners.add(match)
    splitterSeq = [
      matchIsUnit && read(getStoreState(match), false, true),
      compute({
        safe: matchIsUnit,
        filter: true,
        fn(data, scopeTargets, stack) {
          const value = String(matchIsUnit ? stack.a : match(data))
          launchCase(
            scopeTargets,
            includes(caseNames, value) ? value : '__',
            data,
            stack,
          )
        },
      }),
    ]
  } else if (matchIsShape) {
    const lastValues = createStateRef({})
    lastValues.type = 'shape'
    const units = [] as string[]
    let needBarrier: boolean
    forIn(match, (storeOrFn: any, key) => {
      if (is.unit(storeOrFn)) {
        needBarrier = true
        units.push(key)
        owners.add(storeOrFn)
        const updater = createLinkNode(storeOrFn, [], {
          node: [read(lastValues), calc((upd, _, {a}) => (a[key] = upd))],
        })
        if (is.store(storeOrFn)) {
          lastValues.current[key] = storeOrFn.getState()
          const storeRef = getStoreState(storeOrFn)
          addRefOp(lastValues, {from: storeRef, field: key, type: 'field'})
          applyTemplate('splitMatchStore', storeRef, updater)
        }
      }
    })
    if (needBarrier!) {
      applyTemplate('splitBase', lastValues)
    }
    splitterSeq = [
      needBarrier! && read(lastValues, false, true),
      filter({
        fn(data, scopeTargets, stack) {
          for (let i = 0; i < caseNames.length; i++) {
            const caseName = caseNames[i]
            const caseValue = includes(units, caseName)
              ? stack.a[caseName]
              : match[caseName](data)
            if (caseValue) {
              launchCase(scopeTargets, caseName, data, stack)
              return
            }
          }
          launchCase(scopeTargets, '__', data, stack)
        },
      }),
    ]
  } else {
    assert(false, 'expect match to be unit, function or object')
  }
  createNode({
    meta: {op: 'split'},
    parent: source,
    scope: targets,
    node: splitterSeq!,
    family: {owners: Array.from(owners)},
    regional: true,
  })
  if (!knownCases) return targets
}
