import type {DataCarrier} from './unit.h'
import type {Cmd, Stack} from './index.h'
import {is, isFunction, isObject, assertTarget} from './is'
import {add, forIn, includes} from './collection'
import {addRefOp, createStateRef} from './stateRef'
import {createLinkNode} from './forward'
import {processArgsToConfig} from './config'
import {compute, userFnCall, calc, read} from './step'
import {createNode} from './createNode'
import {launch} from './kernel'
import {getStoreState} from './getter'
import {assert} from './throw'
import {createEvent} from './createUnit'
import {applyTemplate} from './template'
import {createSampling} from './sample'
import {addActivator} from './lazy'

const launchCase = (
  scopeTargets: Record<string, DataCarrier>,
  field: string,
  data: any,
  stack: Stack,
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

export function split(...args: any[]) {
  const METHOD = 'split'
  let targets: Record<string, DataCarrier>
  let clock: void | DataCarrier | DataCarrier[]
  let [[source, match], metadata] = processArgsToConfig(args)
  const configForm = !match
  if (configForm) {
    targets = source.cases
    match = source.match
    clock = source.clock
    source = source.source
  }
  const matchIsUnit = is.store(match)
  const matchIsFunction = !is.unit(match) && isFunction(match)
  const matchIsShape = !matchIsUnit && !matchIsFunction && isObject(match)
  assert(is.unit(source), 'source must be a unit')
  if (!targets!) targets = {}
  if (!configForm) {
    assert(matchIsShape, 'match should be an object')
    forIn(
      match,
      (_, key) =>
        (targets[key] = createEvent({
          derived: true,
          named: `cases.${key}`,
          and: metadata,
        })),
    )
    targets.__ = createEvent({
      derived: true,
      named: 'cases.__',
      and: metadata,
    })
  } else {
    forIn(targets, (target, field) =>
      assertTarget(METHOD, target, `cases.${field}`),
    )
  }
  const owners = new Set(
    ([] as DataCarrier[]).concat(source, clock || [], Object.values(targets)),
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
        pure: !matchIsUnit,
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
    forIn(match, (storeOrFn, key) => {
      if (is.unit(storeOrFn)) {
        needBarrier = true
        add(units, key)
        // @ts-expect-error
        owners.add(storeOrFn)
        const updater = createLinkNode(
          storeOrFn,
          [],
          [read(lastValues), calc((upd, _, {a}) => (a[key] = upd))],
        )
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
      userFnCall((data, scopeTargets, stack) => {
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
      }, true),
    ]
  } else {
    assert(false, 'expect match to be unit, function or object')
  }
  const ownersArray = Array.from(owners)
  const splitterNode = createNode({
    meta: {op: METHOD},
    parent: clock ? [] : source,
    scope: targets,
    node: splitterSeq!,
    family: {owners: ownersArray},
    regional: true,
  })
  splitterNode.lazy = {
    alwaysActive: false,
    usedBy: 0,
    activate: [],
  }
  const targetsArray = Object.values(targets)
  const incomingUnits = ownersArray.filter(unit => !targetsArray.includes(unit))
  addActivator(targetsArray, [...incomingUnits, splitterNode])
  if (clock) {
    createSampling(
      METHOD,
      clock,
      source,
      null,
      splitterNode,
      null,
      METHOD,
      metadata,
      /* non-batched */
      false,
      false,
      false,
    )
  }
  if (!configForm) return targets
}
