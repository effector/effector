import {promises} from 'fs'
import {resolve} from 'path'
import {
  leftPad,
  wrapText,
  createDescribe,
  createTest,
  printMethod,
  printMethodValues,
  printArray,
} from './runner/text'
import {forIn} from './runner/forIn'

export {generateCaseSetFile, byFields, createGroupedCases}

type VariantDef = Record<string, any>

function createGroupedCases(
  casesDefs,
  {createTestLines, getHash, describeGroup, sortByFields, filter, dedupeHash},
) {
  if (filter) {
    casesDefs = casesDefs.filter(filter)
  }
  const testLinesSet = new Map<string, any>()
  let align = false
  if (typeof createTestLines === 'object' && createTestLines !== null) {
    const {method, shape, addExpectError = true} = createTestLines
    align = createTestLines.align || align
    createTestLines = (value: any) => [
      printMethod({
        method,
        shape,
        addExpectError,
        value,
      }),
    ]
    if (align) {
      createTestLines = (values: any[]) =>
        printMethodValues({
          method,
          values,
          shape,
          addExpectError,
          align,
        })
    }
  }
  const isAafterB = sortByFields && skewHeapSortFieldsComparator(sortByFields)
  function sortList<T>(list: T[]) {
    if (!sortByFields) return [...list]
    return [...list].sort((a, b) => {
      const ab = isAafterB(a, b)
      const ba = isAafterB(b, a)
      if (!ab && !ba) return 0
      if (ab && ba) return 0
      return ab ? -1 : 1
    })
  }
  const casesDefsPending = sortList([...casesDefs])
  if (sortByFields) {
    casesDefsPending.forEach((e, id) => {
      e.__casesDefsID = id
    })
  }
  type Group = {
    itemsPass: any[]
    itemsFail: any[]
    description: string
    largeGroup: string | null
    noGroup: boolean
  }
  const defsGroups = new Map<string, Group>()
  let cur
  while ((cur = casesDefsPending.pop())) {
    // console.log('cur', cur)
    if (dedupeHash) {
      const caseDefHash = dedupeHash(cur)
      if (testLinesSet.has(caseDefHash)) {
        // console.log(`duplicated dedupeHash "${caseDefHash}"`, {
        //   cur,
        //   saved: testLinesSet.get(caseDefHash),
        // })
        continue
      }
      testLinesSet.set(caseDefHash, cur)
    }
    const hash = getHash(cur)
    let set = defsGroups.get(hash)
    if (!set) {
      set = {
        itemsPass: [],
        itemsFail: [],
        description: '',
        largeGroup: null,
        noGroup: false,
      }
      defsGroups.set(hash, set)
    }
    ;(cur.pass ? set.itemsPass : set.itemsFail).push(cur)
    const description = describeGroup(cur)
    if (typeof description === 'string') {
      set.description = description
    } else {
      set.noGroup = description.noGroup
      set.description = description.description
      set.largeGroup = description.largeGroup || null
    }
  }
  const descriptions = {} as Record<string, Group>
  for (const [hash, group] of [...defsGroups]) {
    const text = `${group.largeGroup || ''} ${group.description}`
    if (text in descriptions) {
      defsGroups.delete(hash)
      const {itemsPass, itemsFail} = descriptions[text]
      itemsPass.splice(itemsPass.length, 0, ...group.itemsPass)
      itemsFail.splice(itemsFail.length, 0, ...group.itemsFail)
      continue
    }
    descriptions[text] = group
  }
  const largeGroups = {} as Record<string, string[]>
  const resultCases = [] as string[]
  for (let {
    description,
    itemsPass,
    itemsFail,
    noGroup,
    largeGroup,
  } of defsGroups.values()) {
    if (itemsPass.length === 0 && itemsFail.length === 0) continue
    const testSuiteItems = [] as string[]
    if (itemsPass.length > 0) {
      //itemsPass = sortList(itemsPass)
      const blockOpen = itemsPass.length === 1 ? null : '{'
      const blockClose = itemsPass.length === 1 ? null : '}'
      const itemsFlat = align
        ? createTestLines(itemsPass)
        : itemsPass.flatMap(item => createTestLines(item).filter(Boolean))
      const items = itemsPass.length === 1 ? itemsFlat : leftPad(itemsFlat)
      testSuiteItems.push(
        createTest(`${description} (should pass)`, [
          '//prettier-ignore',
          blockOpen,
          ...items,
          blockClose,
          'expect(typecheck).toMatchInlineSnapshot()',
        ]),
      )
    }
    if (itemsFail.length > 0) {
      //itemsFail = sortList(itemsFail)
      const blockOpen = itemsFail.length === 1 ? null : '{'
      const blockClose = itemsFail.length === 1 ? null : '}'
      const itemsFlat = align
        ? createTestLines(itemsFail)
        : itemsFail.flatMap(item => createTestLines(item).filter(Boolean))
      const items = itemsFail.length === 1 ? itemsFlat : leftPad(itemsFlat)
      testSuiteItems.push(
        createTest(`${description} (should fail)`, [
          '//prettier-ignore',
          blockOpen,
          ...items,
          blockClose,
          'expect(typecheck).toMatchInlineSnapshot()',
        ]),
      )
    }
    const lines = [] as string[]
    if (noGroup || testSuiteItems.length === 1) {
      lines.push(...testSuiteItems)
    } else {
      lines.push(createDescribe(description, testSuiteItems))
    }
    if (largeGroup !== null) {
      if (!(largeGroup in largeGroups)) {
        largeGroups[largeGroup] = []
      }
      largeGroups[largeGroup].push(...lines)
    } else {
      resultCases.push(...lines)
    }
  }
  return [
    ...Object.entries(largeGroups).map(([text, items]) =>
      createDescribe(text, items),
    ),
    ...resultCases,
  ]
}

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
  if (typeof config !== 'object' || config === null || Array.isArray(config))
    throw Error(`config should be object`)
  const keys = Object.keys(config).filter(key => !validFields.includes(key))
  if (keys.length > 0) throw Error(`incorrect fields ${printArray(keys)})`)
}

function byFields(values: Array<object>, shape: Record<string, any>) {
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
      const variantDef = {}
      forIn(def.bool, (val, field) => {
        if (field !== 'true' && field !== 'false') return
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
          return needs.every(field => !!item[field])
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
          return !avoid.some(field => !!item[field])
        })
      }
      if (computedCount > 0) {
        values = byFields(values, computedFields)
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
      values = splitField(values, key, def.split)
    }
  }
  return values
}
type SplitConfig = {
  cases: Record<string, any>
  match?: string | Record<string, any>
  variant?: Record<string, any>
  variants?: Record<string, Record<string, any>>
}
function splitField(values: Array<object>, field: string, config: SplitConfig) {
  validateConfig(config, valid.split)
  const {cases, variant, match = variant, variants} = config
  if (variants) {
    const variantGroupNames = Object.keys(variants)
    function buildFullCases(depth: number, currentCases) {
      const isLastGroup = depth === variantGroupNames.length - 1
      const casesFull = {} as Record<string, any>
      const variantGroupName = variantGroupNames[depth]
      const variantGroup = variants[variantGroupName]
      function processCase(currentCase) {
        // if current case is plain value then it assumed to be constant value
        if (
          (typeof currentCase !== 'object' || currentCase === null) &&
          typeof currentCase !== 'function'
        ) {
          return {
            compute: {
              fn: () => currentCase,
            },
          }
        }
        if (isLastGroup) {
          return currentCase
        }
        const caseKeys = Object.keys(currentCase)
        const nextGroupName = variantGroupNames[depth + 1]
        const nextGroup = variants[nextGroupName]
        // if next group is string selector or function
        if (
          Array.isArray(nextGroup) ||
          typeof nextGroup !== 'object' ||
          nextGroup === null
        ) {
          // if current case contains only operation names in keys
          // then it is already an operation
          if (caseKeys.every(key => valid.def.includes(key))) {
            return currentCase
          }
          // if not every case keys is valid operation name then it is
          // a case record
          return {
            split: {
              match: nextGroup,
              cases: buildFullCases(depth + 1, currentCase),
            },
          }
        }
        const validBranchNames = [...Object.keys(nextGroup), '__']
        // if current case contains invalid branch name then it is an operation
        if (!caseKeys.every(key => validBranchNames.includes(key))) {
          return currentCase
        }
        // create operation for next group in current case
        return {
          split: {
            match: nextGroup,
            cases: buildFullCases(depth + 1, currentCase),
          },
        }
      }
      function processCaseName(caseName: string) {
        const currentCase = currentCases[caseName]
        if (currentCase === undefined) return
        if (Array.isArray(currentCase)) {
          casesFull[caseName] = currentCase.map(childCase =>
            processCase(childCase),
          )
        } else {
          casesFull[caseName] = processCase(currentCase)
        }
      }
      for (const caseName in variantGroup) {
        processCaseName(caseName)
      }
      processCaseName('__')
      return casesFull
    }
    return splitField(values, field, {
      match: variants[variantGroupNames[0]],
      cases: buildFullCases(0, cases),
    })
  }
  const result = [] as object[]
  let matcher
  if (typeof match === 'object' && match !== null) {
    const matchCases = {} as Record<string, string>
    for (const key in match) matchCases[key] = key
    matcher = matchDeep({
      variants: {_: match},
      cases: matchCases,
    })
  } else if (typeof match === 'string') {
    matcher = (item: any) => item[match]
  } else {
    matcher = match
  }
  for (const value of values) {
    const matchedCaseName = matcher(value)
    let currentCase = cases[matchedCaseName]
    if (!matchedCaseName || !cases[matchedCaseName]) {
      currentCase = cases.__
    }
    if (!currentCase) {
      result.push(value)
      continue
    }
    if (Array.isArray(currentCase)) {
      result.push(
        ...currentCase.flatMap(subCase =>
          byFields([value], {[field]: subCase}),
        ),
      )
    } else {
      result.push(...byFields([value], {[field]: currentCase}))
    }
  }
  return result
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
  let fn: (value: any) => any
  if ('fn' in config) {
    fn = config.fn
  } else if ('variants' in config) {
    const {variants, cases} = config
    fn = matchDeep({variants, cases})
  } else {
    const {variant, cases} = config
    fn = matchDeep({variants: {_: variant}, cases})
  }
  return values.map(val => ({...val, [field]: fn(val)}))
}
function permuteField(values: Array<object>, field: string, config) {
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
          if (!required.every(e => combination.includes(e))) continue
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
        if (!required.every(e => combination.includes(e))) continue
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

function computeCaseIfMatch(value, matcher, fn) {
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

function matchDeep({variants: variantGroups, cases}) {
  const matchCases = []
  const variantGroupsNames = Object.keys(variantGroups)
  if (variantGroupsNames.length === 0) return () => {}
  function iterateVariantGroup(index, matcherParts, cases) {
    const isLastVariant = index === variantGroupsNames.length - 1
    forIn(variantGroups[variantGroupsNames[index]], (variant, variantName) => {
      if (Array.isArray(variant)) {
        for (const alt of variant) {
          matchVariant(alt, variantName)
        }
      } else {
        matchVariant(variant, variantName)
      }
      function matchVariant(variant, variantName) {
        if (variant === undefined)
          throw Error(`case ${variantName} exists but nod defined`)
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
  return value => {
    for (const {matcher, variantCase} of matchCases) {
      const computedResult = computeCaseIfMatch(value, matcher, variantCase)
      if (computedResult !== undefined) return computedResult
    }
  }
}

async function generateCaseSetFile(config: {
  file: string
  dir: string
  usedMethods: string[]
  header: string
  shape?: Record<string, any>[]
  generateCases(
    shape: Record<string, any>,
  ): {description: string; noGroup?: boolean; cases: string[]}
}) {
  const {
    file,
    dir,
    usedMethods = [],
    header = '',
    shape = [{}],
    generateCases,
  } = config

  const suite = shape
    .flatMap(value => {
      const results = []
      const generated = generateCases(value)
      if (Array.isArray(generated)) {
        for (const {description, cases, noGroup} of generated) {
          if (cases.length > 0) {
            if (noGroup) {
              results.push(cases.join(`\n`))
            } else {
              results.push(
                wrapText(`describe('${description}', () => {`, [...cases]),
              )
            }
          }
        }
      } else if (generated) {
        const {description, cases, noGroup} = generated
        if (cases.length > 0) {
          if (noGroup) {
            results.push(cases.join(`\n`))
          } else {
            results.push(
              wrapText(`describe('${description}', () => {`, [...cases]),
            )
          }
        }
      }
      return results
    })
    .join(`\n`)
  const content = `/* eslint-disable no-unused-vars */
import {${usedMethods.join(', ')}} from 'effector'
const typecheck = '{global}'

${header.trim()}

${suite}`

  const srcRoot = resolve(
    __dirname,
    '..',
    '__tests__',
    'effector',
    ...dir.split('/'),
  )
  const fullFileName = resolve(srcRoot, `${file}.test.ts`)
  await promises.writeFile(fullFileName, content)
}

const collator = new Intl.Collator('en', {
  caseFirst: 'upper',
  usage: 'sort',
  sensitivity: 'variant',
  numeric: true,
})
function skewHeapSortFieldsComparator<
  Obj extends Record<string, ReadonlyArray<any> | 'string'>
>(sortByFields: Obj) {
  const fields = [] as Array<
    | {
        field: keyof Obj
        isVoidFalse: boolean
        type: 'prioritySet'
        prioritySet: ReadonlyArray<any>
      }
    | {
        field: keyof Obj
        isVoidFalse: boolean
        type: 'string'
      }
  >
  forIn(sortByFields, (prioritySet: ReadonlyArray<any> | 'string', field) => {
    if (prioritySet === 'string') {
      fields.push({
        field,
        isVoidFalse: false,
        type: 'string',
      })
    } else {
      const isVoidFalse =
        prioritySet.includes(false) && !prioritySet.includes(undefined)
      fields.push({
        field,
        isVoidFalse,
        type: 'prioritySet',
        prioritySet: [...prioritySet], //.reverse(),
      })
    }
  })
  return function isAafterB(a: any, b: any) {
    for (let i = 0; i < fields.length; i++) {
      const item = fields[i]
      const {field, isVoidFalse} = item
      let aVal = a[field]
      let bVal = b[field]
      if (isVoidFalse) {
        if (aVal === undefined) aVal = false
        if (bVal === undefined) bVal = false
      }
      if (aVal === bVal) continue
      switch (item.type) {
        case 'prioritySet': {
          const {prioritySet} = item
          const ai = prioritySet.indexOf(aVal)
          const bi = prioritySet.indexOf(bVal)
          const hasA = ai !== -1
          const hasB = bi !== -1
          if (hasA && !hasB) return false
          if (!hasA && hasB) return true
          if (!hasA && !hasB) continue
          return ai > bi
        }
        case 'string': {
          return collator.compare(aVal, bVal) > 0
        }
      }
    }
    const idDiff = a.__casesDefsID - b.__casesDefsID
    if (idDiff !== 0) return idDiff > 0
    console.count('indifferentiated elements')
    console.log(a, b)
    return false
  }
}
