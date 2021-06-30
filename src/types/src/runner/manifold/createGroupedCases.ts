import {
  leftPad,
  createDescribe,
  createTest,
  printMethodValues,
  printTable,
} from '../text'
import {forIn} from '../forIn'
import {DataDecl, BoolDecl, Grouping, Declarator} from './types'
import {isDataDecl, isBoolDecl, assertRef, isRef} from './isRef'
import {assert} from './assert'

type Obj = Record<string, any>

function createReader<T, O extends Obj>(
  item: ((obj: O) => T) | DataDecl<T> | T,
  config?: {defaultVal?: T; isBool: never},
): (obj: O) => T
function createReader<O extends Obj>(
  item: ((obj: O) => boolean) | BoolDecl | boolean,
  config?: {defaultVal?: boolean; isBool: true},
): (obj: O) => boolean
function createReader<T, O extends Obj>(
  item: ((obj: O) => T) | DataDecl<T> | T,
  {defaultVal, isBool = false}: {defaultVal?: T; isBool?: boolean} = {},
) {
  if (typeof item === 'function')
    return item as Exclude<typeof item, T & Function>
  if ((isBool && !isBoolDecl(item)) || (!isBool && !isDataDecl(item))) {
    return (obj: O) => {
      return item
    }
  }
  assertRef(item)
  return (obj: O) => {
    const result = obj[item.name]
    if (result === undefined) {
      if (defaultVal !== undefined) return defaultVal
      throw Error(`no field "${item.name}"`)
    }
    return result
  }
}
function createHashReader<T extends Obj>(getHash: Grouping<T>['getHash']) {
  if (typeof getHash === 'function' || isDataDecl(getHash))
    return createReader(getHash)
  const declList = Array.isArray(getHash) ? getHash : Object.values(getHash)
  declList.forEach(value => {
    assertRef(value)
  })
  return (obj: T) => {
    const values: string[] = []
    declList.forEach(decl => {
      const value = obj[decl.name]
      assert(value !== undefined, `undefined getHash for ${decl.name}`)
      values.push(String(value))
    })
    return values.join(' ')
  }
}
export function createGroupedCases<T extends Obj>(
  casesDefs: T[],
  {
    createTestLines,
    getHash,
    describeGroup,
    sortByFields,
    filter,
    dedupeHash,
    pass,
  }: Grouping<T>,
) {
  const hashGetter = createHashReader(getHash)
  const groupDescriber = createReader(describeGroup)
  const passGetter = createReader(pass!, {
    isBool: true,
    defaultVal: true,
  })
  if (filter) {
    casesDefs = casesDefs.filter(filter)
  }

  let renderToTable = false
  let createLinesForTestList: (values: T[]) => string[]
  const testLinesSet = new Map<string, any>()
  if (typeof createTestLines === 'object' && createTestLines !== null) {
    if ('type' in createTestLines) {
      renderToTable = true
      let header: string[] | void
      let fields: Declarator[]
      if (!Array.isArray(createTestLines.fields)) {
        header = Object.keys(createTestLines.fields)
        fields = Object.values(createTestLines.fields)
      } else {
        fields = createTestLines.fields
      }
      const only = fields.map(e => e.name)
      createLinesForTestList = (values: T[]) =>
        printTable({
          values,
          only,
          header,
        })
    } else {
      const {
        method,
        shape,
        addExpectError = (obj: T) => !passGetter(obj),
      } = createTestLines
      const readExpectError = createReader(addExpectError, {isBool: true})
      const printShape: Record<
        string,
        string | {field: string; when: string}
      > = {}
      forIn(shape, (value, key) => {
        printShape[key] = isRef(value)
          ? value.name
          : {field: value.field.name, when: value.when.name}
      })
      //prettier-ignore
      createLinesForTestList = (values: T[]) => printMethodValues({
        method,
        values,
        shape: printShape,
        addExpectError: readExpectError,
      })
    }
  } else {
    createLinesForTestList = (values: T[]) =>
      values.flatMap(item =>
        createTestLines(item).filter(line => typeof line === 'string'),
      )
  }
  const isAafterB = (sortByFields &&
    skewHeapSortFieldsComparator(sortByFields))!
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
      //@ts-ignore
      e.__casesDefsID = id
    })
  }
  type Group = {
    itemsPass: T[]
    itemsFail: T[]
    description: string
    largeGroup: string | null
    noGroup: boolean
  }

  const defsGroups = new Map<string, Group>()
  let cur
  while ((cur = casesDefsPending.shift())) {
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
    const hash = hashGetter(cur)
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
    ;(passGetter(cur) ? set.itemsPass : set.itemsFail).push(cur)
    const description = groupDescriber(cur)
    if (typeof description === 'string') {
      set.description = description
    } else {
      set.noGroup = description.noGroup ?? false
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
  const createTestSuiteItem = ({
    pass,
    items,
    description,
  }: {
    items: T[]
    pass: boolean
    description: string
  }) => {
    const itemsFlat = createLinesForTestList(items)
    if (renderToTable) {
      const passText = description
        ? pass
          ? ' (pass)'
          : ' (fail)'
        : pass
        ? 'pass'
        : 'fail'
      return [`\n## ${description}${passText}`, ...itemsFlat].join(`\n`)
    } else {
      const passText = pass ? '(should pass)' : '(should fail)'
      const blockOpen = items.length === 1 ? null : '{'
      const blockClose = items.length === 1 ? null : '}'
      const itemsLines = items.length === 1 ? itemsFlat : leftPad(itemsFlat)
      return createTest(`${description} ${passText}`, [
        '//prettier-ignore',
        blockOpen,
        ...itemsLines,
        blockClose,
        'expect(typecheck).toMatchInlineSnapshot()',
      ])
    }
  }
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
      testSuiteItems.push(
        createTestSuiteItem({items: itemsPass, pass: true, description}),
      )
    }
    if (itemsFail.length > 0) {
      testSuiteItems.push(
        createTestSuiteItem({items: itemsFail, pass: false, description}),
      )
    }
    const lines = [] as string[]
    if (noGroup || testSuiteItems.length === 1) {
      lines.push(...testSuiteItems)
    } else {
      lines.push(
        renderToTable
          ? [`# ${description}`, ...leftPad(testSuiteItems)].join(`\n`)
          : createDescribe(description, testSuiteItems),
      )
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
  if (renderToTable) resultCases.push(``)
  return [
    ...Object.entries(largeGroups).map(([text, items]) =>
      renderToTable
        ? [`# ${text}`, ...leftPad(items)].join(`\n`)
        : createDescribe(text, items),
    ),
    ...resultCases,
  ]
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
        prioritySet: [...prioritySet].reverse(),
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
