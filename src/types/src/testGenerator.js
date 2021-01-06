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
}) {
  description = `${description} (should ${pass ? 'pass' : 'fail'})`
  const clock = printArray(clockItems)
  const headers = [
    'const voidt = createEvent()',
    'const stringt = createEvent<string>()',
  ]
  if (unificationToAny) {
    headers.push('const anyt = createEvent<any>()')
  }
  let body = []
  const footer = ['expect(typecheck).toMatchInlineSnapshot()']
  if (combinable) {
    headers.push(`const a = createStore('')`, 'const b = createStore(0)')
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
        `  fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
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
    headers.push(`const a = createStore('')`)
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
        `  fn: (a: string, clock: any) => ({a, clock}),
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

const testCases = []
const clockUni = ['anyt', 'voidt', 'stringt']
const clockNoUni = ['voidt', 'stringt']
testCases.push(
  `/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'`,
  wrapText(`describe('plain source', () => {`, [
    generateCases({
      description: 'plain',
      pass: true,
      clock: clockNoUni,
      combinable: false,
      fn: false,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'plain, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: false,
      fn: false,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),

    generateCases({
      description: 'plain, fn',
      pass: true,
      clock: clockNoUni,
      combinable: false,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'plain, fn, secondArgument',
      pass: true,
      clock: clockNoUni,
      combinable: false,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'plain, fn, explicitArgumentTypes',
      pass: true,
      clock: clockNoUni,
      combinable: false,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: true,
      unificationToAny: false,
    }),
    generateCases({
      description: 'plain, fn, secondArgument, explicitArgumentTypes',
      pass: true,
      clock: clockNoUni,
      combinable: false,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: true,
      unificationToAny: false,
    }),

    generateCases({
      description: 'plain, fn, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: false,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),
    generateCases({
      description: 'plain, fn, secondArgument, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: false,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),
    generateCases({
      description: 'plain, fn, explicitArgumentTypes, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: false,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: true,
      unificationToAny: true,
    }),
    generateCases({
      description:
        'plain, fn, secondArgument, explicitArgumentTypes, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: false,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: true,
      unificationToAny: true,
    }),
  ]),
  wrapText(`describe('combinable source', () => {`, [
    generateCases({
      description: 'combinable',
      pass: true,
      clock: clockNoUni,
      combinable: true,
      fn: false,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'combinable, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: true,
      fn: false,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),

    generateCases({
      description: 'combinable, fn',
      pass: true,
      clock: clockNoUni,
      combinable: true,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'combinable, fn, secondArgument',
      pass: true,
      clock: clockNoUni,
      combinable: true,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: false,
      unificationToAny: false,
    }),
    generateCases({
      description: 'combinable, fn, explicitArgumentTypes',
      pass: true,
      clock: clockNoUni,
      combinable: true,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: true,
      unificationToAny: false,
    }),
    generateCases({
      description: 'combinable, fn, secondArgument, explicitArgumentTypes',
      pass: true,
      clock: clockNoUni,
      combinable: true,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: true,
      unificationToAny: false,
    }),

    generateCases({
      description: 'combinable, fn, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: true,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),
    generateCases({
      description: 'combinable, fn, secondArgument, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: true,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: false,
      unificationToAny: true,
    }),
    generateCases({
      description: 'combinable, fn, explicitArgumentTypes, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: true,
      fn: true,
      secondArgument: false,
      explicitArgumentTypes: true,
      unificationToAny: true,
    }),
    generateCases({
      description:
        'combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny',
      pass: true,
      clock: clockUni,
      combinable: true,
      fn: true,
      secondArgument: true,
      explicitArgumentTypes: true,
      unificationToAny: true,
    }),
  ]),
)

console.log(testCases.join(`\n`))
