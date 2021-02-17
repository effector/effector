import {promises} from 'fs'
import {resolve} from 'path'
import {sortListBySkewHeap} from './runner/heap'
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
function createGroupedCases(
  casesDefs,
  {createTestLines, getHash, describeGroup, sortByFields, filter},
) {
  if (filter) {
    casesDefs = casesDefs.filter(filter)
  }
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
    return sortListBySkewHeap(list, isAafterB)
  }
  const casesDefsPending = sortList([...casesDefs])
  if (sortByFields) {
    // forIn(sortByFields, prioritySet => {
    //   prioritySet.reverse()
    // })
    casesDefsPending.forEach((e, id) => {
      e.__casesDefsID = id
    })
  }
  // console.log(...casesDefs)
  // console.log(...casesDefsPending)
  const defsGroups = new Map()
  let cur
  while ((cur = casesDefsPending.pop())) {
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
  const descriptions = {} as Record<string, any>
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
    const testSuiteItems = []
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
    const lines = []
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
  ],
  split: ['cases', 'variant', 'match', 'variants'],
  flag: ['needs', 'need', 'avoid'],
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

function byFields(values, {shape = {}}) {
  for (const key in shape) {
    const def = shape[key]
    validateConfig(def, valid.def)
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
      const ignoreChecks = []
      const computedFields = {}
      let computedCount = 0
      if (flag.need) flag.needs = flag.need
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
        values = byFields(values, {shape: computedFields})
      }
      values = permuteField(values, key, {
        items: [false, true],
        amount: {min: 1, max: 1},
        unbox: true,
        ignore:
          ignoreChecks.length > 0
            ? item => ignoreChecks.every(fn => fn(item))
            : null,
      })
    }
    if (def.split) {
      values = splitField(values, key, def.split)
    }
  }
  return values
}

function splitField(values, field, config) {
  validateConfig(config, valid.split)
  const {cases, variant, match = variant, variants} = config
  if (variants) {
    const variantGroupNames = Object.keys(variants)
    function buildFullCases(depth, currentCases) {
      const isLastGroup = depth === variantGroupNames.length - 1
      const casesFull = {}
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
          if (
            caseKeys.every(key => {
              switch (key) {
                case 'compute':
                case 'split':
                case 'union':
                case 'flag':
                case 'permute':
                  return true
                default:
                  return false
              }
            })
          ) {
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
      function processCaseName(caseName) {
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
  const result = []
  let matcher
  if (typeof match === 'object' && match !== null) {
    const matchCases = {}
    for (const key in match) matchCases[key] = key
    matcher = matchDeep({
      variants: {_: match},
      cases: matchCases,
    })
  } else if (typeof match === 'string') {
    matcher = item => item[match]
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
          byFields([value], {shape: {[field]: subCase}}),
        ),
      )
    } else {
      result.push(...byFields([value], {shape: {[field]: currentCase}}))
    }
  }
  return result
}
function computeField(values, config) {
  validateConfig(config, valid.compute)
  let {field, fn, cases, variants, variant} = config
  if (cases) {
    fn = variants
      ? matchDeep({variants, cases})
      : matchDeep({variants: {_: variant}, cases})
  }
  return values.map(val => ({...val, [field]: fn(val)}))
}
function permuteField(values, field, config) {
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
function selectFromNToM(items, from, to, noReorder) {
  const result = []
  const fn = noReorder ? selectNNoReorder : selectN
  for (let i = from; i < Math.min(to + 1, items.length + 1); i++) {
    result.push(...fn(items, i))
  }
  return result
}
function selectNNoReorder(items, n) {
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
function selectN(items, n) {
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

function skewHeapSortFieldsComparator<
  Obj extends Record<string, ReadonlyArray<any>>
>(sortByFields: Obj) {
  const fields = [] as Array<{
    field: keyof Obj
    isVoidFalse: boolean
    prioritySet: ReadonlyArray<any>
  }>
  forIn(sortByFields, (prioritySet, field) => {
    const isVoidFalse =
      prioritySet.includes(false) && !prioritySet.includes(undefined)
    fields.push({
      field,
      isVoidFalse,
      prioritySet: [...prioritySet], //.reverse(),
    })
  })
  return function isAafterB(a: any, b: any) {
    for (let i = 0; i < fields.length; i++) {
      const {field, isVoidFalse, prioritySet} = fields[i]
      let aVal = a[field]
      let bVal = b[field]
      if (isVoidFalse) {
        if (aVal === undefined) aVal = false
        if (bVal === undefined) bVal = false
      }
      if (aVal === bVal) continue
      const ai = prioritySet.indexOf(aVal)
      const bi = prioritySet.indexOf(bVal)
      const hasA = ai !== -1
      const hasB = bi !== -1
      if (hasA && !hasB) return false
      if (!hasA && hasB) return true
      if (!hasA && !hasB) continue
      return ai > bi
    }
    const idDiff = a.__casesDefsID - b.__casesDefsID
    if (idDiff !== 0) return idDiff > 0
    console.count('indifferentiated elements')
    console.log(a, b)
    return false
  }
}
