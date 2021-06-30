import {printArray} from '../text'
import {assert} from './assert'
import {CtxConfig, Declarator, ExecutionPlan} from './types'
import {isDeclarator} from './isRef'

type ValueCtx = {
  value: Record<string, any>
  executedIds: string[]
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
function normalizeSplitConfig(def: {
  variant: Record<string, Record<string, unknown> | Record<string, unknown>[]>
  cases: Record<string, Declarator | Record<string, unknown>>
}) {
  const {cases, variant: variants} = def

  const variantsSeq: VariantGroupCfg[] = Object.entries(variants).map(
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
    caseValue:
      | Declarator
      | Record<string, Declarator | Record<string, unknown>>,
  ): Array<{
    usedVariantsGroups: VariantGroupCfg[]
    matchedVariants: VariantCfg[]
    operation: Declarator
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
    assert(
      !isLastVariantGroup || isDeclarator(caseValue),
      'deepest case should contain only declarators',
    )
    /** if current case is plain value then it assumed to be constant */
    if (isDeclarator(caseValue))
      return [
        {
          usedVariantsGroups,
          matchedVariants,
          operation: caseValue,
        },
      ]
    if (typeof caseValue === 'object' && caseValue !== null) {
      const caseKeys = Object.keys(caseValue)
      assert(!Array.isArray(caseValue), 'not implemented')
      const validBranchNames = variantsSeq[usedVariantsGroups.length].group.map(
        e => e.name,
      )
      if (caseKeys.every(key => validBranchNames.includes(key))) {
        /** if current case contains only valid branch names then it is branch selector */
        return caseKeys.flatMap(key =>
          processSubcase(
            [...path, key],
            caseValue[key] as Record<
              string,
              Declarator | Record<string, unknown>
            >,
          ),
        )
      } else {
        /** otherwise current case is a value */
        throw Error('not implemented')
        // return [
        //   {
        //     usedVariantsGroups,
        //     matchedVariants,
        //     operation: {value: caseValue},
        //   },
        // ]
      }
    } else {
      assert(typeof caseValue !== 'function', 'not implemented')
      throw Error('not implemented')
      // return [
      //   {
      //     usedVariantsGroups,
      //     matchedVariants,
      //     operation: {value: caseValue},
      //   },
      // ]
    }
  }
  const caseSeq = Object.entries(cases).flatMap(([caseName, caseValue]) =>
    processSubcase(
      [caseName],
      caseValue as
        | Declarator
        | Record<string, Declarator | Record<string, unknown>>,
    ),
  )
  return caseSeq
}
let currCfg: {
  cfg: CtxConfig
  plan: ExecutionPlan
  items: Record<string, Declarator>
  namesToIds: Record<string, string>
  // executedIds: Set<string>
  // pendingIds: Set<string>
}
export function byFields(
  plan: ExecutionPlan,
  config: CtxConfig,
  items: Record<string, Declarator>,
) {
  const prevCfg = currCfg
  const shapeIds = Object.keys(items)
  const namesToIds: Record<string, string> = {}
  const idsToNames: Record<string, string> = {}
  for (const id of shapeIds) {
    const item = items[id]
    idsToNames[id] = item.name
    namesToIds[item.name] = id
  }
  currCfg = {
    cfg: config,
    plan,
    items,
    namesToIds,
    // executedIds: new Set(),
    // pendingIds: new Set(),
  }
  try {
    let values: ValueCtx[] = [{value: {}, executedIds: []}]
    for (const key in plan.shape) {
      const def = plan.shape[key]
      values = addFieldToValues(values, key, def)
    }
    return values
  } finally {
    currCfg = prevCfg
  }
}

function addFieldToValues(values: ValueCtx[], key: string, def: Declarator) {
  switch (def.kind) {
    case 'union': {
      values = permuteField(values, key, {
        items: def.variants as readonly any[],
        amount: {min: 1, max: 1},
        unbox: true,
      })
      break
    }
    case 'value': {
      values = values.map(
        (val): ValueCtx => ({
          executedIds: [...val.executedIds, key],
          value: {...val.value, [key]: def.value},
        }),
      )
      break
    }
    case 'permute': {
      values = permuteField(values, key, {
        items: def.permute.items,
        amount: def.permute.amount,
        noReorder: def.permute.noReorder,
        unbox: false,
      })
      break
    }
    case 'bool': {
      values = processBranches(values, key, {
        variant: {
          _: def.bool.true
            ? {
                true: def.bool.true,
                false: {},
              }
            : {
                false: def.bool.false!,
                true: {},
              },
        },
        cases: {true: def.decls.true, false: def.decls.false},
      })
      break
    }
    case 'fn': {
      values = values.map(
        (val): ValueCtx => ({
          executedIds: [...val.executedIds, key],
          value: {...val.value, [key]: def.fn(val.value)},
        }),
      )
      break
    }
    case 'computeVariant': {
      values = processBranches(values, key, def)
      break
    }
    case 'flag': {
      values = permuteField(values, key, {
        items(val) {
          if (
            def.needs.every(id => !!val[id]) &&
            def.avoid.every(id => !val[id])
          )
            return [false, true]
          return [false]
        },
        amount: {min: 1, max: 1},
        unbox: true,
      })
      break
    }
    case 'separate': {
      values = processBranches(values, key, def)
      break
    }
  }
  return values
}

function processBranches(
  values: ValueCtx[],
  key: string,
  def: {
    variant: Record<string, Record<string, unknown> | Record<string, unknown>[]>
    cases: Record<string, Declarator | Record<string, unknown>>
  },
) {
  const normalizedSplit = normalizeSplitConfig(def)
  return values.flatMap(value => {
    for (const item of normalizedSplit) {
      const areAccepted = areMatchedVariantsAccepted(
        value.value,
        item.matchedVariants,
      )
      if (areAccepted) return addFieldToValues([value], key, item.operation)
    }
    /** when no declaration is matched return value untouched */
    return [value]
  })
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

function permuteField(
  values: ValueCtx[],
  field: string,
  config: {
    items: readonly any[] | ((val: any) => readonly any[])
    unbox: boolean
    amount?: {min: number; max: number}
    ignore?: ((val: any) => boolean) | null
    noReorder?: boolean
  },
): ValueCtx[] {
  const {
    items,
    amount: {min = 0, max = items.length - 1} = {},
    ignore,
    unbox,
    noReorder = false,
  } = config
  let results: ValueCtx[]
  if (typeof items === 'function') {
    results = values.flatMap(value => {
      return selectFromNToM(items(value.value), min, max, noReorder).map(
        (combination): ValueCtx => ({
          executedIds: [...value.executedIds, field],
          value: {
            ...value.value,
            [field]: unbox ? combination[0] : combination,
          },
        }),
      )
    })
  } else {
    results = selectFromNToM(items, min, max, noReorder).flatMap(combination =>
      values.map(
        (val): ValueCtx => ({
          executedIds: [...val.executedIds, field],
          value: {
            ...val.value,
            [field]: unbox ? combination[0] : combination,
          },
        }),
      ),
    )
  }
  if (ignore) return results.filter(ignore)
  return results
}
function selectFromNToM<T>(
  items: readonly T[],
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
function selectNNoReorder<T>(items: readonly T[], n: number): T[][] {
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
function selectN<T>(items: readonly T[], n: number): T[][] {
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
