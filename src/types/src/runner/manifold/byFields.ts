import {printArray} from '../text'
import {forIn} from '../forIn'
import {assert} from './assert'

type VariantDef = Record<string, any>

const valid = {
  def: [
    'union',
    'value',
    'true',
    'bool',
    'compute',
    'permute',
    'flag',
    'split',
    'ref',
  ],
  split: ['cases', 'variant', 'match', 'variants'],
  flag: ['needs', 'avoid'],
  permute: [
    'field',
    'items',
    'amount',
    'ignore',
    'unbox',
    'required',
    'noReorder',
  ],
  compute: ['field', 'fn', 'cases', 'variants', 'variant'],
}
function validateConfig(config: any, validFields: string[]) {
  assert(
    typeof config === 'object' && config !== null && !Array.isArray(config),
    `config should be object`,
  )
  const keys = Object.keys(config).filter(key => !validFields.includes(key))
  assert(keys.length === 0, () => `incorrect fields ${printArray(keys)})`)
}
type VariantGroupCfg = {
  type: 'variantGroup'
  name: string
  group: VariantCfg[]
}
type VariantCfg = {
  type: 'variant'
  name: string
  acceptableShapes: Record<string, any>[]
}
function normalizeSplitConfig(splitConfig: SplitConfig) {
  validateConfig(splitConfig, valid.split)
  const {cases, variant} = splitConfig
  let variants = splitConfig.variants
  if (!variants) {
    assert(variant, 'either variant or variants should be defined')
    variants = {_: variant}
  } else {
    assert(!variant, 'either variant or variants should be defined')
  }

  const variantsSeq = Object.entries(variants).map(
    ([variantGroupName, variantGroup]): VariantGroupCfg => ({
      type: 'variantGroup',
      name: variantGroupName,
      group: Object.entries(variantGroup).map(
        ([variantName, variant]): VariantCfg => ({
          type: 'variant',
          name: variantName,
          acceptableShapes: Array.isArray(variant) ? variant : [variant],
        }),
      ),
    }),
  )
  variantsSeq.forEach(group => {
    if (group.group.every(e => e.name !== '__')) {
      group.group.push({
        type: 'variant',
        name: '__',
        acceptableShapes: [{}],
      })
    }
  })
  function processSubcase(
    path: string[],
    caseValue: any,
  ): Array<{
    usedVariantsGroups: VariantGroupCfg[]
    matchedVariants: VariantCfg[]
    operation: Record<string, any>
  }> {
    const usedVariantsGroups = variantsSeq.slice(0, path.length)
    const isLastVariantGroup = variantsSeq.length <= path.length
    const matchedVariants = [...path.entries()].map(([idx, variantName]) => {
      const variantGroupSeq = usedVariantsGroups[idx]
      const variant = variantGroupSeq.group.find(e => e.name === variantName)
      assert(
        variant !== undefined,
        () => `no variant "${[...path, variantName].join(' | ')}"`,
      )
      return variant
    })
    /** if current case is plain value then it assumed to be constant */

    if (typeof caseValue === 'object' && caseValue !== null) {
      const caseKeys = Object.keys(caseValue)
      /** if this is last variant group then current case is constant or operation */
      if (isLastVariantGroup) {
        assert(!Array.isArray(caseValue), 'not implemented')
        /** if current case contains only single field which is valid operation field then it is an operation */
        if (caseKeys.length === 1 && valid.def.includes(caseKeys[0])) {
          return [
            {
              usedVariantsGroups,
              matchedVariants,
              operation: caseValue,
            },
          ]
        } else {
          /** otherwise current case is a value */
          return [
            {
              usedVariantsGroups,
              matchedVariants,
              operation: {value: caseValue},
            },
          ]
        }
      } else {
        assert(!Array.isArray(caseValue), 'not implemented')
        const validBranchNames = variantsSeq[
          usedVariantsGroups.length
        ].group.map(e => e.name)
        /** if branch name is a valid operation field then this is a mistake */
        assert(
          validBranchNames.every(name => !valid.def.includes(name)),
          () => {
            const conflicted = validBranchNames.filter(name =>
              valid.def.includes(name),
            )
            return `branch/op conflict fields ${conflicted.join(',')}`
          },
        )
        if (caseKeys.length === 1 && valid.def.includes(caseKeys[0])) {
          /** if current case contains only single field which is valid operation field then it is an operation */
          return [
            {
              usedVariantsGroups,
              matchedVariants,
              operation: caseValue,
            },
          ]
        } else if (caseKeys.every(key => validBranchNames.includes(key))) {
          /** if current case contains only valid branch names then it is branch selector */
          return caseKeys.flatMap(key =>
            processSubcase([...path, key], caseValue[key]),
          )
        } else {
          /** otherwise current case is a value */
          return [
            {
              usedVariantsGroups,
              matchedVariants,
              operation: {value: caseValue},
            },
          ]
        }
      }
    } else {
      assert(typeof caseValue !== 'function', 'not implemented')

      return [
        {
          usedVariantsGroups,
          matchedVariants,
          operation: {value: caseValue},
        },
      ]
    }
  }
  const caseSeq = Object.entries(cases).flatMap(([caseName, caseValue]) =>
    processSubcase([caseName], caseValue),
  )
  return caseSeq
}

export function byFields(shape: Record<string, any>) {
  // const splitProcessed = Object.entries(shape)
  //   .filter(([, e]) => 'split' in e)
  //   .map(([, value]) => normalizeSplitConfig(value.split))
  const result = valuesByFields([{}], shape)
  // console.log('byFields', result)
  // if (splitProcessed.length > 0) {
  //   console.log('splitProcessed')
  //   console.dir(splitProcessed[0], {depth: null})
  // }
  return result
}

function valuesByFields(
  values: Array<Record<string, any>>,
  shape: Record<string, any>,
) {
  for (const key in shape) {
    const def = shape[key]
    validateConfig(def, valid.def)
    if ('ref' in def) {
      values = computeField(values, {
        field: key,
        fn: scope => scope[def.ref],
      })
    }
    if (def.union) {
      values = permuteField(values, key, {
        items: def.union,
        amount: {min: 1, max: 1},
        unbox: true,
      })
    }
    if ('value' in def) {
      values = computeField(values, {
        field: key,
        fn: () => def.value,
      })
    }
    if (def.true) {
      values = computeField(values, {
        field: key,
        variant: {
          true: def.true,
          false: {},
        },
        cases: {true: true, false: false},
      })
    }
    if (def.bool) {
      const variantDef: Record<string, any> = {}
      forIn(def.bool, (val, field) => {
        if (field !== 'true' && field !== 'false') return
        //@ts-ignore
        variantDef[field] = val
      })
      if (!variantDef.true) variantDef.true = {}
      if (!variantDef.false) variantDef.false = {}
      values = computeField(values, {
        field: key,
        variant: variantDef,
        cases: {true: true, false: false},
      })
    }
    if (def.compute) {
      if (Array.isArray(def.compute)) {
        for (const subCase of def.compute) {
          if (!subCase.field) subCase.field = key
          values = computeField(values, subCase)
        }
      } else {
        if (!def.compute.field) def.compute.field = key
        values = computeField(values, def.compute)
      }
    }
    if (def.permute) {
      values = permuteField(values, def.permute.field || key, def.permute)
    }

    if (def.flag) {
      validateConfig(def.flag, valid.flag)
      const {flag} = def
      const ignoreChecks = [] as Array<(value: any) => boolean>
      const computedFields = {} as Record<string, any>
      let computedCount = 0
      if (flag.needs) {
        const needs = Array.isArray(flag.needs) ? flag.needs : [flag.needs]
        for (let i = 0; i < needs.length; i++) {
          const value = needs[i]
          if (typeof value === 'string') continue
          const computedField = `${key}__${computedCount++}`
          computedFields[computedField] = value
          needs[i] = computedField
        }
        ignoreChecks.push(item => {
          if (!item[key]) return true
          return needs.every((field: any) => !!item[field])
        })
      }
      if (flag.avoid) {
        const avoid = Array.isArray(flag.avoid) ? flag.avoid : [flag.avoid]
        for (let i = 0; i < avoid.length; i++) {
          const value = avoid[i]
          if (typeof value === 'string') continue
          const computedField = `${key}__${computedCount++}`
          computedFields[computedField] = value
          avoid[i] = computedField
        }
        ignoreChecks.push(item => {
          if (!item[key]) return true
          return !avoid.some((field: any) => !!item[field])
        })
      }
      if (computedCount > 0) {
        values = valuesByFields(values, computedFields)
      }
      values = permuteField(values, key, {
        items: [false, true],
        amount: {min: 1, max: 1},
        unbox: true,
        ignore:
          ignoreChecks.length > 0
            ? (item: any) => ignoreChecks.every(fn => fn(item))
            : null,
      })
    }
    if (def.split) {
      const normalizedSplit = normalizeSplitConfig(def.split)
      values = values.flatMap(value => {
        for (const item of normalizedSplit) {
          const areAccepted = areMatchedVariantsAccepted(
            value,
            item.matchedVariants,
          )
          if (areAccepted)
            return valuesByFields([value], {[key]: item.operation})
        }
        /** when no declaration is matched return value untouched */
        return [value]
      })
    }
  }
  return values
}
function areMatchedVariantsAccepted(value: any, matchedVariants: VariantCfg[]) {
  for (const variantItem of matchedVariants) {
    const isAccepted = isOneOfShapesAccepted(
      value,
      variantItem.acceptableShapes,
    )
    if (!isAccepted) return false
  }
  return true
}
function isOneOfShapesAccepted(
  value: any,
  acceptableShapes: Record<string, any>[],
) {
  for (const item of acceptableShapes) {
    if (isShapeAccepted(value, item)) return true
  }
  return false
}
function isShapeAccepted(value: any, acceptableShape: Record<string, any>) {
  for (const key in acceptableShape) {
    const acceptableValue = acceptableShape[key]
    if (!(key in value) || value[key] !== acceptableValue) return false
  }
  return true
}
type SplitConfig = {
  cases: Record<string, any>
  match?: string | Record<string, any>
  variant?: Record<string, any>
  variants?: Record<string, Record<string, any>>
}
function computeField(
  values: Array<object>,
  config:
    | {
        field: string
        cases: any
        variant: VariantDef
      }
    | {
        field: string
        fn: (value: any) => any
      }
    | {
        field: string
        cases: any
        variants: Record<string, VariantDef>
      },
) {
  validateConfig(config, valid.compute)
  const {field} = config
  if ('fn' in config) {
    return values.map(val => ({...val, [field]: config.fn(val)}))
  }
  const variants: Record<string, VariantDef> =
    'variants' in config ? config.variants : {_: config.variant}
  const normalizedVariants = normalizeSplitConfig({
    variants,
    cases: config.cases,
  })
  return values.flatMap(value => {
    for (const item of normalizedVariants) {
      const areAccepted = areMatchedVariantsAccepted(
        value,
        item.matchedVariants,
      )
      if (areAccepted) return valuesByFields([value], {[field]: item.operation})
    }
    /** when no declaration is matched return value untouched */
    return [value]
  })
}
function permuteField(values: Array<object>, field: string, config: any): any {
  if (Array.isArray(config)) {
    return permuteField(values, field, {
      items: config,
      amount: {min: config.length, max: config.length},
    })
  }
  validateConfig(config, valid.permute)
  const {
    items,
    amount: {min = 0, max = items.length - 1} = {},
    ignore,
    unbox,
    required = [],
    noReorder = false,
  } = config
  const results = []
  if (typeof items === 'function') {
    for (const value of values) {
      const valueItems = items(value)
      for (const combination of selectFromNToM(
        valueItems,
        min,
        max,
        noReorder,
      )) {
        if (required.length > 0) {
          if (!required.every((e: any) => combination.includes(e))) continue
        }
        results.push(
          ...values.map(val => ({
            ...val,
            [field]: unbox ? combination[0] : combination,
          })),
        )
      }
    }
  } else {
    for (const combination of selectFromNToM(items, min, max, noReorder)) {
      if (required.length > 0) {
        if (!required.every((e: any) => combination.includes(e))) continue
      }
      results.push(
        ...values.map(val => ({
          ...val,
          [field]: unbox ? combination[0] : combination,
        })),
      )
    }
  }
  if (ignore) return results.filter(ignore)
  return results
}
function selectFromNToM<T>(
  items: T[],
  from: number,
  to: number,
  noReorder: boolean,
) {
  const result = [] as T[][]
  const fn = noReorder ? selectNNoReorder : selectN
  for (let i = from; i < Math.min(to + 1, items.length + 1); i++) {
    result.push(...fn(items, i))
  }
  return result
}
function selectNNoReorder<T>(items: T[], n: number): T[][] {
  if (n > items.length) return [[]]
  if (n === 0) return [[]]
  if (n === 1) return items.map(item => [item])
  const result = []
  const subItems = [...items]
  for (let i = 0; i < items.length; i++) {
    subItems.splice(i, 1)
    result.push(
      ...selectNNoReorder(subItems, n - 1)
        .map(nested => [items[i], ...nested])
        .filter(
          selection => [...new Set(selection)].length === selection.length,
        ),
    )
  }
  return result
}
function selectN<T>(items: T[], n: number): T[][] {
  if (n === 0) return [[]]
  if (n === 1) return items.map(item => [item])
  const result = []
  for (let i = 0; i < items.length; i++) {
    const subItems = [...items]
    subItems.splice(i, 1)
    result.push(
      ...selectN(subItems, n - 1).map(nested => [items[i], ...nested]),
    )
  }
  return result
}

function computeCaseIfMatch(
  value: Record<string, unknown>,
  matcher: Record<string, unknown>,
  fn: string | ((value: any) => string),
) {
  for (const field in matcher) {
    const matcherValue = matcher[field]
    const valueField = value[field]
    if (matcherValue === false) {
      if (valueField !== false && valueField !== undefined) return
    }
    if (matcherValue !== valueField) return
  }
  if (typeof fn === 'function') return fn(value)
  return fn
}

function matchDeep({
  variants: variantGroups,
  cases,
}: {
  variants: any
  cases: any
}) {
  const matchCases: {
    matcher: Record<string, unknown>
    variantCase: string | ((value: any) => string)
  }[] = []
  const variantGroupsNames = Object.keys(variantGroups)
  if (variantGroupsNames.length === 0) return () => {}
  function iterateVariantGroup(index: number, matcherParts: any[], cases: any) {
    const isLastVariant = index === variantGroupsNames.length - 1
    const variantGroupName = variantGroupsNames[index]
    const variantGroup = variantGroups[variantGroupName]
    forIn(variantGroup, (variant, variantName) => {
      if (Array.isArray(variant)) {
        for (const alt of variant) {
          //@ts-ignore
          matchVariant(alt, variantName)
        }
      } else {
        //@ts-ignore
        matchVariant(variant, variantName)
      }
      function matchVariant(variant: any, variantName: string) {
        assert(
          variant !== undefined,
          `case ${variantName} exists but nod defined`,
        )
        const childMatcherParts = [...matcherParts, variant]
        const variantCase = cases[variantName]
        if (variantCase === undefined) return
        if (
          isLastVariant ||
          typeof variantCase !== 'object' ||
          variantCase === null
        ) {
          matchCases.push({
            matcher: Object.assign({}, ...[...childMatcherParts].reverse()),
            variantCase,
          })
          return
        }
        iterateVariantGroup(index + 1, childMatcherParts, variantCase)
      }
    })
  }
  iterateVariantGroup(0, [], cases)
  return (value: Record<string, unknown>) => {
    for (const {matcher, variantCase} of matchCases) {
      const computedResult = computeCaseIfMatch(value, matcher, variantCase)
      if (computedResult !== undefined) return computedResult
    }
  }
}
