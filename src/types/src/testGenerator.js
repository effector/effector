//@ts-check
const {promises} = require('fs')
const {resolve} = require('path')

/**
fn:
- with fn with second argument
- with fn without second argument
- without fn

source:
- unit
- combinable

target:
- without target
- unit
- array of units


clock array kinds:
  no unification to any:
- [voidt, stringt]
- [stringt, voidt]
  unification to any:
- [voidt, anyt, stringt]
- [voidt, stringt, anyt]
- [anyt, voidt, stringt]
- [anyt, stringt, voidt]
- [stringt, voidt, anyt]
- [stringt, anyt, voidt]
*/

function generateCase({
  description,
  pass,
  clock: clockItems,
  combinable,
  fn,
  secondArgument,
  explicitArgumentTypes,
  unificationToAny,
  fnClockTypeAssertion,
}) {
  description = `${description} (should ${pass ? 'pass' : 'fail'})`
  const clock = printArray(clockItems)
  const headers = []
  let body = []
  const footer = ['expect(typecheck).toMatchInlineSnapshot()']
  if (combinable) {
    if (fn && secondArgument) {
      headers.push(
        'const target = createEvent<{a: string; b: number; clock: any}>()',
      )
    } else {
      headers.push('const target = createEvent<{a: string; b: number}>()')
    }
    if (fn && secondArgument && explicitArgumentTypes) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: ({a, b}: {a: string; b: number}, clock: ${
          fnClockTypeAssertion ? 'string' : 'any'
        }) => ({a, b, clock}),
  target,
})`,
      ]
    } else if (fn && secondArgument && !explicitArgumentTypes) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: ({a, b}, clock) => ({a, b, clock}),
  target,
})`,
      ]
    } else if (fn && !secondArgument && explicitArgumentTypes) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: ({a, b}: {a: string; b: number}) => ({a, b}),
  target,
})`,
      ]
    } else if (fn && !secondArgument && !explicitArgumentTypes) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: ({a, b}) => ({a, b}),
  target,
})`,
      ]
    } else if (!fn) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  target,
})`,
      ]
    }
  } else {
    if (fn && secondArgument) {
      headers.push('const target = createEvent<{a: string; clock: any}>()')
    } else if (fn && !secondArgument) {
      headers.push('const target = createEvent<{a: string}>()')
    } else if (!fn) {
      headers.push('const target = createEvent<string>()')
    }
    if (fn && secondArgument && explicitArgumentTypes) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: (a: string, clock: ${
          fnClockTypeAssertion ? 'string' : 'any'
        }) => ({a, clock}),
  target,
})`,
      ]
    } else if (fn && secondArgument && !explicitArgumentTypes) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: (a, clock) => ({a, clock}),
  target,
})`,
      ]
    } else if (fn && !secondArgument && explicitArgumentTypes) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: (a: string) => ({a}),
  target,
})`,
      ]
    } else if (fn && !secondArgument && !explicitArgumentTypes) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: (a) => ({a}),
  target,
})`,
      ]
    } else if (!fn) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  target,
})`,
      ]
    }
  }
  return wrapText(`test('${description}', () => {`, [
    ...headers,
    ...body,
    ...footer,
  ])
}

function generateCases({
  description,
  pass,
  clock,
  combinable,
  fn,
  secondArgument,
  explicitArgumentTypes,
  unificationToAny,
  fnClockTypeAssertion,
}) {
  const cases = []
  if (!unificationToAny) {
    for (const clockItem of clock) {
      cases.push(
        generateCase({
          description: `${description}, single ${printArray([clockItem])}`,
          pass,
          clock: [clockItem],
          combinable,
          fn,
          secondArgument,
          explicitArgumentTypes,
          unificationToAny,
          fnClockTypeAssertion,
        }),
      )
    }
  }
  for (const permutation of permute(clock)) {
    cases.push(
      generateCase({
        description: `${description} ${printArray(permutation)}`,
        pass,
        clock: permutation,
        combinable,
        fn,
        secondArgument,
        explicitArgumentTypes,
        unificationToAny,
        fnClockTypeAssertion,
      }),
    )
  }
  return wrapText(`describe('${description}', () => {`, [...cases])
}
function printArray(array) {
  return `[${array.join(', ')}]`
}
function wrapText(firstLine, lines) {
  return [firstLine, ...leftPad(lines), '})'].join(`\n`)
}
function leftPad(lines) {
  return lines
    .join(`\n`)
    .split(`\n`)
    .map(line => `  ${line}`)
}
function permute(items) {
  if (items.length === 0) return [[]]
  if (items.length === 1) return [[items[0]]]
  if (items.length === 2)
    return [
      [items[0], items[1]],
      [items[1], items[0]],
    ]
  const result = []
  for (let i = 0; i < items.length; i++) {
    const head = items[i]
    const tail = [...items]
    tail.splice(i, 1)
    const subresults = permute(tail)
    for (const subresult of subresults) {
      result.push([head, ...subresult])
    }
  }
  return result
}

const generatedCases = generateCaseSet({
  groupBy: ['fn', 'combinable'],
  groupDescriptions: {
    fn: val => (val ? 'fn' : 'no fn'),
    combinable: val => (val ? 'combinable source' : 'plain source'),
  },
  ignore: [
    item =>
      item.fnClockTypeAssertion &&
      (!item.fn || !item.secondArgument || !item.explicitArgumentTypes),
  ],
  shape: {
    combinable: boolField(),
    fn: boolField(),
    secondArgument: boolField(),
    explicitArgumentTypes: boolField(),
    unificationToAny: boolField(),
    fnClockTypeAssertion: boolField(),
    pass: dependent(({fnClockTypeAssertion}) => !fnClockTypeAssertion),
    clock: dependent(({unificationToAny, fnClockTypeAssertion}) =>
      unificationToAny
        ? ['anyt', 'voidt', fnClockTypeAssertion ? 'numt' : 'stringt']
        : ['voidt', fnClockTypeAssertion ? 'numt' : 'stringt'],
    ),
    description: dependent(shape => {
      const res = []
      shape.combinable ? res.push('combinable') : res.push('plain')
      shape.fn && res.push('fn')
      shape.secondArgument && res.push('fnClock')
      shape.explicitArgumentTypes && res.push('typedFn')
      shape.unificationToAny && res.push('unificationToAny')
      shape.fnClockTypeAssertion && res.push('assertFnType')

      return res.join(', ')
    }),
  },
})

writeTestSuite('clockArrayGen', generatedCases)

function boolField() {
  return {type: 'bool'}
}
function dependent(config) {
  if (typeof config === 'function') config = {fn: config, resultType: 'plain'}
  return {
    type: 'dependent',
    fn: config.fn,
    resultType: config.resultType || 'plain',
  }
}
function groupBy(field, descriptionFn) {
  return {type: 'groupBy', field, descriptionFn}
}

function generateCaseSet({
  groupBy = [],
  ignore = [],
  groupDescriptions = {},
  shape,
}) {
  groupBy = groupBy.map(val => (typeof val === 'string' ? {field: val} : val))
  const groupByFields = groupBy.map(({field}) => field)
  const valueSet = {}
  const plainShape = {}
  const generationSeq = []
  for (const fieldName in shape) {
    const field = shape[fieldName]
    if (field && field.type) {
      switch (field.type) {
        case 'bool': {
          valueSet[fieldName] = [false, true]
          break
        }
        case 'dependent': {
          generationSeq.push(shape => ({
            ...shape,
            [fieldName]: field.fn(shape),
          }))
          break
        }
      }
    } else {
      plainShape[fieldName] = shape[fieldName]
    }
  }
  let results = [{...plainShape}]
  for (const field in valueSet) {
    const newResults = []
    for (const value of valueSet[field]) {
      newResults.push(...results.map(val => ({...val, [field]: value})))
    }
    results = newResults
  }

  const resultsFlat = results
    .map(item => {
      item = generationSeq.reduce((item, fn) => fn(item), item)
      return item
    })
    .filter(item => {
      if (ignore.length === 0) return true
      return ignore.every(fn => !fn(item))
    })
  const testSuite = []
  for (const resultItem of resultsFlat) {
    const groupValues = groupBy.map(({field}) => ({
      field,
      value: resultItem[field],
    }))
    if (groupValues.length === 0) {
      testSuite.push({type: 'item', value: resultItem})
    } else {
      let currentParent = testSuite
      for (let i = 0; i < groupValues.length; i++) {
        const {field, value} = groupValues[i]
        let newParent = currentParent.find(
          e => e.type === 'group' && e.name === field && e.value === value,
        )
        if (!newParent) {
          newParent = {
            type: 'group',
            name: field,
            value,
            child: [],
          }
          currentParent.push(newParent)
        }
        currentParent = newParent.child
        if (i === groupValues.length - 1) {
          currentParent.push({type: 'item', value: resultItem})
        }
      }
    }
  }
  const testSuiteText = iterateSuite(testSuite).join(`\n`)
  return testSuiteText
  function iterateSuite(suite) {
    const results = []
    for (const item of suite) {
      switch (item.type) {
        case 'item': {
          results.push(generateCases(item.value))
          break
        }
        case 'group': {
          const descriptionFn = groupDescriptions[item.name]
          let description = `${item.name}: ${item.value}`
          if (descriptionFn) description = descriptionFn(item.value)
          if (item.child.length === 0) continue
          results.push(
            wrapText(
              `describe('${description}', () => {`,
              iterateSuite(item.child),
            ),
          )
          break
        }
      }
    }
    return results
  }
}

async function writeTestSuite(file, suite) {
  const content = `/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'

const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)

${suite}`

  const srcRoot = resolve(
    __dirname,
    '..',
    '__tests__',
    'effector',
    'sample',
    'generated',
  )
  const fullFileName = resolve(srcRoot, `${file}.test.ts`)
  await promises.writeFile(fullFileName, content)
}
