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
  fnWithoutArgs,
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
    } else if (
      fn &&
      !secondArgument &&
      !explicitArgumentTypes &&
      !fnWithoutArgs
    ) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: ({a, b}) => ({a, b}),
  target,
})`,
      ]
    } else if (
      fn &&
      !secondArgument &&
      !explicitArgumentTypes &&
      fnWithoutArgs
    ) {
      body = [
        `sample({
  source: {a, b},
  clock: ${clock},`,
        `  fn: () => ({a: '', b: 2}),
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
    } else if (
      fn &&
      !secondArgument &&
      !explicitArgumentTypes &&
      !fnWithoutArgs
    ) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: (a) => ({a}),
  target,
})`,
      ]
    } else if (
      fn &&
      !secondArgument &&
      !explicitArgumentTypes &&
      fnWithoutArgs
    ) {
      body = [
        `sample({
  source: a,
  clock: ${clock},`,
        `  fn: () => ({a: ''}),
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
function matchSomeOfBoolFields(value, shape) {
  for (const field in shape) {
    if (value[field] === shape[field]) return true
  }
  return false
}
const generatedCases = generateCaseSet({
  groupBy: ['fn', 'combinable'],
  groupDescriptions: {
    fn: val => (val ? 'fn' : 'no fn'),
    combinable: val => (val ? 'combinable source' : 'plain source'),
  },
  ignore: [
    item =>
      !item.fn &&
      matchSomeOfBoolFields(item, {
        fnClockTypeAssertion: true,
        secondArgument: true,
        explicitArgumentTypes: true,
        fnWithoutArgs: true,
      }),
    item =>
      item.fnClockTypeAssertion &&
      matchSomeOfBoolFields(item, {
        fn: false,
        secondArgument: false,
        explicitArgumentTypes: false,
      }),
    item =>
      item.fnWithoutArgs &&
      matchSomeOfBoolFields(item, {
        fn: false,
        fnClockTypeAssertion: true,
        secondArgument: true,
        explicitArgumentTypes: true,
      }),
  ],
  shape: {
    combinable: boolField(),
    fn: boolField(),
    secondArgument: boolField(),
    explicitArgumentTypes: boolField(),
    unificationToAny: boolField(),
    fnClockTypeAssertion: boolField(),
    fnWithoutArgs: boolField(),
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
      shape.fnWithoutArgs && res.push('fnWithoutArgs')

      return res.join(', ')
    }),
  },
  generateCases({
    description,
    pass,
    clock,
    combinable,
    fn,
    secondArgument,
    explicitArgumentTypes,
    unificationToAny,
    fnClockTypeAssertion,
    fnWithoutArgs,
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
            fnWithoutArgs,
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
          fnWithoutArgs,
        }),
      )
    }
    return {
      description,
      cases,
    }
  },
})

writeTestSuite({
  file: 'clockArrayGen',
  suite: generatedCases,
  usedMethods: ['createStore', 'createEvent', 'sample'],
  header: `
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)
`,
})
function byFields({shape = {}, items = []}) {
  function byField(field, def, items) {}
}
function computeField(values, {field, fn}) {
  return values.map(val => ({...val, [field]: fn(val)}))
}
function permuteField(
  values,
  {field, items, amount: {min = 0, max = items.length - 1} = {}, ignore},
) {
  const combinations = selectFromNToM(items, min, max)
  const results = []
  for (const combination of selectFromNToM(items, min, max)) {
    results.push(...values.map(val => ({...val, [field]: combination})))
  }
  if (ignore) return results.filter(ignore)
  return results
  function selectFromNToM(items, from, to) {
    const result = []
    for (let i = from; i < Math.min(to + 1, items.length); i++) {
      result.push(...selectN(items, i))
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
}
const arrayTargetCaseSet = generateCaseSet({
  groupBy: ['combinable'],
  groupDescriptions: {
    fn: val => (val ? 'fn' : 'no fn'),
    combinable: val => (val ? 'combinable source' : 'plain source'),
  },
  ignore: [],
  shape: {
    combinable: boolField(),
    source: 'number',
    clock: 'any',
    variables: {
      number: 'numt',
      void: 'voidt',
      string: 'stringt',
      any: 'anyt',
    },
  },
  generateCases({source, clock, variables, combinable}) {
    if (combinable) {
      const targetCases = ['a_num', 'a_str', 'a_num_b_num', 'a_num_b_str']
      const sourceCases = ['a', 'ab']
      const failCases = {
        a: ['a_str', 'a_num_b_num', 'a_num_b_str'],
        ab: ['a_str', 'a_num_b_str'],
      }
      let casesDefs = permuteField([{clock: 'any'}], {
        field: 'source',
        items: ['a', 'ab'],
        amount: {min: 1, max: 1},
      })
      casesDefs = permuteField(casesDefs, {
        field: 'target',
        items: ['a_num', 'a_str', 'a_num_b_num', 'a_num_b_str'],
        amount: {min: 1, max: 2},
      })
      casesDefs = computeField(casesDefs, {
        field: 'pass',
        fn({source: [source], target}) {
          return failCases[source].every(failCase => !target.includes(failCase))
        },
      })
      return {
        description: 'combinable',
        cases: casesDefs.map(({source, clock, target, pass}) => {
          const getText = item => variables[item] || item
          const printTargets = target.join(',')
          const sourceTargets = target.map(getText).join(', ')
          const sourceText = source === 'a' ? '{a:num}' : '{a:num, b:num}'
          const sourceCode = source === 'a' ? '{a: $num}' : '{a: $num, b: $num}'
          const description = `sample({source:${sourceText},clock:${clock},target:[${printTargets}]}) (should ${
            pass ? 'pass' : 'fail'
          })`
          const methodCall = `sample({source: ${sourceCode}, clock: ${getText(
            clock,
          )}, target: [${sourceTargets}]})`
          return wrapText(
            `test('${description}', () => {`,
            [
              pass
                ? '//prettier-ignore'
                : '/*@ts-expect-error*/ //prettier-ignore',
              methodCall,
              'expect(typecheck).toMatchInlineSnapshot()',
            ].filter(Boolean),
          )
        }),
      }
    }
    const pairs = [
      ['number', 'numberString', true],
      ['number', 'void', true],
      ['string', 'number', false],
      ['string', 'numberString', false],
      ['number', 'stringBoolean', false],
      ['string', 'void', false],
      ['string', 'any', false],
    ]
      .map(([a, b, pass]) => [
        {items: [a, b], pass},
        {items: [b, a], pass},
      ])
      .flat()
    const singleCases = [
      {items: ['number'], pass: true},
      {items: ['void'], pass: true},
      {items: ['string'], pass: false},
    ]
    return {
      description: 'basic cases',
      cases: [...singleCases, ...pairs].map(({items, pass}) => {
        const getText = item => variables[item] || item
        const printTargets = items.join(',')
        const sourceTargets = items.map(getText).join(', ')
        const description = `sample({source:${source},clock:${clock},target:[${printTargets}]}) (should ${
          pass ? 'pass' : 'fail'
        })`
        const methodCall = `sample({source: ${getText(
          source,
        )}, clock: ${getText(clock)}, target: [${sourceTargets}]})`
        return wrapText(
          `test('${description}', () => {`,
          [
            pass ? null : '//@ts-expect-error',
            methodCall,
            'expect(typecheck).toMatchInlineSnapshot()',
          ].filter(Boolean),
        )
      }),
    }
  },
})

writeTestSuite({
  file: 'arrayTargetGen',
  suite: arrayTargetCaseSet,
  usedMethods: ['createStore', 'createEvent', 'sample', 'combine'],
  header: `
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const numberString = createEvent<number | string>()
const stringBoolean = createEvent<string | boolean>()
const $num = createStore<number>(0)
const a_num = createEvent<{a: number}>()
const a_str = createEvent<{a: string}>()
const a_num_b_num = createEvent<{a: number; b: number}>()
const a_num_b_str = createEvent<{a: number; b: string}>()
`,
})

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
  generateCases,
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
          const generated = generateCases(item.value)
          if (Array.isArray(generated)) {
            for (const {description, cases} of generated) {
              if (cases.length > 0)
                results.push(
                  wrapText(`describe('${description}', () => {`, [...cases]),
                )
            }
          } else if (generated) {
            const {description, cases} = generated
            if (cases.length > 0)
              results.push(
                wrapText(`describe('${description}', () => {`, [...cases]),
              )
          }
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

async function writeTestSuite({file, suite, usedMethods = [], header = ''}) {
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
    'sample',
    'generated',
  )
  const fullFileName = resolve(srcRoot, `${file}.test.ts`)
  await promises.writeFile(fullFileName, content)
}
