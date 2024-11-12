import {
  leftPad,
  createDescribe,
  createTest,
  printMethodValues,
  printTable,
} from '../text'
import {forIn} from '../forIn'
import {
  DataDecl,
  BoolDecl,
  Grouping,
  Declarator,
  WordValue,
  CaseItem,
} from './types'
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
  if (isDataDecl(getHash)) return createReader(getHash)
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
function createDedupeReader<T extends Obj>(
  objectToLines: (
    value: T,
  ) => string | Array<string | null | undefined | false>,
) {
  return (value: T) => {
    const linesRaw = objectToLines(value)
    const textLines = Array.isArray(linesRaw) ? linesRaw : [linesRaw]
    return textLines
      .filter((line): line is string => typeof line === 'string')
      .map(line => line.replace(/ /gim, ''))
      .filter(line => !line.includes(`@ts-expect-error`))
      .join(`\n`)
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
    pass,
    tags,
  }: Grouping<T>,
) {
  let caseSerializer: (value: T) => any = value => ({})
  if (tags) {
    caseSerializer = value => {
      const result: any = {}
      forIn(tags, (decl, field) => {
        result[field] = value[decl.id]
      })
      return result
    }
  }
  let dedupeGetter: ((obj: T) => string) | undefined
  const hashGetter = createHashReader(getHash)
  const groupDescriber = createReader(
    describeGroup as DataDecl<
      | string
      | {
          description: string
          noGroup?: boolean | undefined
          largeGroup?: string | null | undefined
        }
    >,
  )
  const passGetter = createReader(pass!, {
    isBool: true,
    defaultVal: true,
  })
  if (filter) {
    casesDefs = casesDefs.filter(filter)
  }

  let renderMode: 'table' | 'text' | 'method' = 'method'
  let createLinesForTestList: (
    values: T[],
    pass: boolean,
    description: string,
  ) => {
    items: Array<CaseItem<T>>
    textLines: string[]
  }
  let mode:
    | {
        type: 'text'
        // passReader?: (obj: T) => boolean
        textValueReader: (obj: T) => WordValue | WordValue[]
      }
    | {
        type: 'table'
      }
    | {
        type: 'method'
      }
  const testLinesSet = new Map<string, any>()
  if (typeof createTestLines === 'object' && createTestLines !== null) {
    if ('type' in createTestLines) {
      switch (createTestLines.type) {
        case 'table': {
          mode = {type: 'table'}
          renderMode = 'table'
          let header: string[] | void
          let fields: Declarator[]
          if (!Array.isArray(createTestLines.fields)) {
            header = Object.keys(createTestLines.fields)
            fields = Object.values(createTestLines.fields)
          } else {
            fields = createTestLines.fields
          }
          const only = fields.map(e => e.name)
          createLinesForTestList = (values: T[]) => ({
            items: [],
            textLines: printTable({
              values,
              only,
              header,
            }),
          })
          break
        }
        case 'text': {
          renderMode = 'text'
          //prettier-ignore
          const renderer: Extract<typeof mode, {type: 'text'}> = mode = {
            type: 'text',
            textValueReader: createReader(createTestLines.value)
          }
          // if ('pass' in createTestLines) {
          //   mode.passReader = createReader(createTestLines.pass!, {
          //     isBool: true,
          //   })
          // }
          const renderVisibleValues = (
            values: WordValue[],
            isPass: boolean,
          ) => {
            const lines: string[] = []
            for (let i = 0; i < values.length; i++) {
              const value = values[i]
              if (value === null || value === undefined) continue
              lines.push(String(value))
            }
            if (lines.length === 0) return []
            if (!isPass) lines.push('//' + '@ts-expect-error')
            return lines
          }
          function createLineBlock(value: T) {
            const linesRaw = renderer.textValueReader(value)
            return renderVisibleValues(
              Array.isArray(linesRaw) ? linesRaw : [linesRaw],
              true,
            )
          }
          if (!dedupeGetter) {
            dedupeGetter = createDedupeReader(createLineBlock)
          }
          createLinesForTestList = (values: T[], pass, description) => {
            const lineBlocks = values.map(createLineBlock)
            const items = values.map((value, i) => {
              const lines = lineBlocks[i]
              return {
                value: caseSerializer(value),
                pass,
                text: lines.join(`\n`),
                description,
              }
            })
            return {
              items,
              textLines: lineBlocks.flat(),
            }
          }
          break
        }
        default:
          //@ts-expect-error
          createTestLines.type
      }
    } else {
      mode = {type: 'method'}
      renderMode = 'method'
      const {
        method,
        shape,
        addExpectError = (obj: T) => !passGetter(obj),
      } = createTestLines
      const readExpectError = createReader(addExpectError, {isBool: true})
      const printShape: Record<
        string,
        string | {field: string; when?: string; markError?: string}
      > = {}
      forIn(shape, (value, key) => {
        printShape[key] = isRef(value)
          ? value.name
          : {
              field: value.field.name,
              when: value.when?.name,
              markError: value.markError?.name,
            }
      })
      if (!dedupeGetter) {
        dedupeGetter = createDedupeReader(value =>
          printMethodValues({
            method,
            values: [value],
            shape: printShape,
            addExpectError: () => false,
            noMultiline: true,
          }),
        )
      }
      createLinesForTestList = (values: T[], pass, description) => {
        const textLines = printMethodValues({
          method,
          values,
          shape: printShape,
          addExpectError: readExpectError,
        })
        return {
          textLines,
          items: values.map((value, i) => ({
            value: caseSerializer(value),
            text: textLines[i],
            pass,
            description,
          })),
        }
      }
    }
  } else {
    if (!dedupeGetter) {
      dedupeGetter = createDedupeReader(createTestLines)
    }
    createLinesForTestList = (values: T[], pass, description) => {
      const lineBlocks = values.map(value =>
        createTestLines(value).filter(line => typeof line === 'string'),
      )
      const items = values.map((value, i) => {
        const lines = lineBlocks[i]
        return {
          value: caseSerializer(value),
          pass,
          text: lines.join(`\n`),
          description,
        }
      })
      return {
        items,
        textLines: lineBlocks.flat(),
      }
    }
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
    if (dedupeGetter) {
      const caseDefHash = dedupeGetter(cur)
      if (testLinesSet.has(caseDefHash)) continue
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
  const resultCasesItems = [] as Array<CaseItem<T>>
  const createTestSuiteItem = ({
    pass,
    items,
    description,
    textLinesFlat,
  }: {
    items: T[]
    pass: boolean
    description: string
    textLinesFlat: string[]
  }) => {
    switch (renderMode) {
      case 'table': {
        const passText = description
          ? pass
            ? ' (pass)'
            : ' (fail)'
          : pass
          ? 'pass'
          : 'fail'
        return [`\n## ${description}${passText}`, ...textLinesFlat].join(`\n`)
      }
      case 'text':
      case 'method': {
        const passText = pass ? '(should pass)' : '(should fail)'
        const blockOpen = items.length === 1 ? null : '{'
        const blockClose = items.length === 1 ? null : '}'
        const itemsLines =
          items.length === 1 ? textLinesFlat : leftPad(textLinesFlat)
        return createTest(`${description} ${passText}`, [
          '//prettier-ignore',
          blockOpen,
          ...itemsLines,
          blockClose,
          'expect(typecheck).toMatchInlineSnapshot()',
        ])
      }
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
      const itemsFull = createLinesForTestList!(itemsPass, true, description)
      testSuiteItems.push(
        createTestSuiteItem({
          items: itemsPass,
          pass: true,
          description,
          textLinesFlat: itemsFull.textLines,
        }),
      )
      resultCasesItems.push(...itemsFull.items)
    }
    if (itemsFail.length > 0) {
      const itemsFull = createLinesForTestList!(itemsFail, false, description)
      testSuiteItems.push(
        createTestSuiteItem({
          items: itemsFail,
          pass: false,
          description,
          textLinesFlat: itemsFull.textLines,
        }),
      )
      resultCasesItems.push(...itemsFull.items)
    }
    const lines = [] as string[]
    if (noGroup || testSuiteItems.length === 1) {
      lines.push(...testSuiteItems)
    } else {
      let line: string
      switch (renderMode) {
        case 'table':
          line = [`# ${description}`, ...leftPad(testSuiteItems)].join(`\n`)
          break
        case 'method':
        case 'text':
          line = createDescribe(description, testSuiteItems)
          break
      }
      lines.push(line)
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
  if (renderMode === 'table') resultCases.push(``)
  const largeGroupsContent = Object.entries(largeGroups).map(
    ([text, items]) => {
      switch (renderMode) {
        case 'table':
          return [`# ${text}`, ...leftPad(items)].join(`\n`)
        case 'text':
        case 'method':
          return createDescribe(text, items)
      }
    },
  )
  const finalLines = [...largeGroupsContent, ...resultCases]
  return {
    finalLines,
    resultCasesItems,
  }
}

const collator = new Intl.Collator('en', {
  caseFirst: 'upper',
  usage: 'sort',
  sensitivity: 'variant',
  numeric: true,
})
function skewHeapSortFieldsComparator<
  Obj extends Record<string, ReadonlyArray<any> | 'string'>,
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
