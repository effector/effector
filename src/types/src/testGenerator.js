//@ts-check

const {
  generateCaseSetFile,
  matchSomeOfBoolFields,
  boolField,
  dependent,
  printArray,
  permute,
  createTest,
  byFields,
  createDescribe,
} = require('./generateCaseSetFile')

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

generateCaseSetFile({
  file: 'clockArrayGen',
  usedMethods: ['createStore', 'createEvent', 'sample'],
  header: `
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)
`,
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
  generateCases(config) {
    const {
      combinable,
      fn,
      secondArgument,
      explicitArgumentTypes,
      unificationToAny,
      fnClockTypeAssertion,
      fnWithoutArgs,
    } = config
    const casesDefs = byFields([config], {
      shape: {
        clock: {
          split: {
            match: {
              noAnyNoFalsePositiveFnClock: {
                unificationToAny: false,
                fnClockTypeAssertion: true,
              },
              noAny: {unificationToAny: false},
              withAnyNoFalsePositiveFnClock: {
                unificationToAny: true,
                fnClockTypeAssertion: true,
              },
              withAny: {unificationToAny: true},
            },
            cases: {
              noAnyNoFalsePositiveFnClock: {
                permute: {
                  items: ['voidt', 'numt'],
                  amount: {min: 1, max: 2},
                },
              },
              noAny: {
                permute: {
                  items: ['voidt', 'stringt'],
                  amount: {min: 1, max: 2},
                },
              },
              withAnyNoFalsePositiveFnClock: {
                permute: ['anyt', 'voidt', 'numt'],
              },
              withAny: {
                permute: ['anyt', 'voidt', 'stringt'],
              },
            },
          },
        },
        isSingle: {
          compute: {
            fn: ({clock}) => clock.length === 1,
          },
        },
        pass: {
          compute: {
            variant: {
              pass: {fnClockTypeAssertion: false},
              fail: {fnClockTypeAssertion: true},
            },
            cases: {
              pass: 'pass',
              fail: 'fail',
            },
          },
        },
        descriptionTokens: {
          compute: {
            fn(shape) {
              const res = []
              shape.combinable ? res.push('combinable') : res.push('plain')
              shape.fn && res.push('fn')
              shape.secondArgument && res.push('fnClock')
              shape.explicitArgumentTypes && res.push('typedFn')
              shape.unificationToAny && res.push('unificationToAny')
              shape.fnClockTypeAssertion && res.push('assertFnType')
              shape.fnWithoutArgs && res.push('fnWithoutArgs')

              return res.join(', ')
            },
          },
        },
        description: {
          compute: {
            variant: {
              single: {isSingle: true},
              many: {isSingle: false},
            },
            cases: {
              single: ({descriptionTokens, clock}) =>
                `${descriptionTokens}, single ${printArray(clock)}`,
              many: ({descriptionTokens, clock}) =>
                `${descriptionTokens} ${printArray(clock)}`,
            },
          },
        },
      },
    })
    const resultCases = casesDefs.map(
      ({
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
      }) => {
        description = `${description} (should ${pass})`
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
            headers.push(
              'const target = createEvent<{a: string; clock: any}>()',
            )
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
        return createTest(description, [...headers, ...body, ...footer])
      },
    )
    return {
      description: config.description,
      cases: resultCases,
    }
  },
})

generateCaseSetFile({
  groupBy: [],
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
      const fnVariants = {
        fnWithoutArgs: {fnWithoutArgs: true},
        //typed
        noFalsePositiveFnClock: {
          typedFn: true,
          fnClock: true,
          noFalsePositiveFnClock: true,
        },
        noFalsePositiveFnSource_fnClock: {
          typedFn: true,
          fnClock: true,
          noFalsePositiveFnSource: true,
        },
        typedFnClock: {typedFn: true, fnClock: true},
        noFalsePositiveFnSource: {
          typedFn: true,
          fnClock: false,
          noFalsePositiveFnSource: true,
        },
        typedNoFnClock: {typedFn: true, fnClock: false},
        //non typed
        fnClock: {typedFn: false, fnClock: true},
        noFnClock: {typedFn: false, fnClock: false},
      }
      const sourceVariants = {
        objectSolo: {sourceType: 'object', source: 'a'},
        objectPair: {sourceType: 'object', source: 'ab'},
        tupleSolo: {sourceType: 'tuple', source: 'tuple_a'},
        tuplePair: {sourceType: 'tuple', source: 'tuple_aa'},
      }

      const failCases = {
        a: ['a_num', 'a_num_b_num', 'a_num_b_str'],
        ab: ['a_str', 'a_num_b_num'],
        tuple_a: ['l_str'],
        tuple_aa: ['l_num', 'l_str', 'l_num_num'],
      }
      const casesDefs = byFields([{clock: 'number'}], {
        shape: {
          source: {
            union: ['a', 'ab', 'tuple_a', 'tuple_aa'],
          },
          sourceType: {
            compute: {
              variant: {
                object: [{source: 'a'}, {source: 'ab'}],
                tuple: [{source: 'tuple_a'}, {source: 'tuple_aa'}],
              },
              cases: {
                object: 'object',
                tuple: 'tuple',
              },
            },
          },
          fn: {
            flag: {},
          },
          fnClock: {
            flag: {
              needs: 'fn',
            },
          },
          typedFn: {
            flag: {
              needs: 'fn',
            },
          },
          noFalsePositiveFnClock: {
            flag: {
              needs: ['fn', 'typedFn', 'fnClock'],
            },
          },
          noFalsePositiveFnSource: {
            flag: {
              needs: ['fn', 'typedFn'],
              avoid: ['noFalsePositiveFnClock'],
            },
          },
          fnWithoutArgs: {
            flag: {
              needs: ['fn'],
              avoid: [
                'fnClock',
                'typedFn',
                'noFalsePositiveFnClock',
                'noFalsePositiveFnSource',
              ],
            },
          },
          fnText: {
            //prettier-ignore
            compute: {
              variants: {
                fnVariants,
                source: {
                  objectVal: {sourceType: 'object'},
                  tupleSolo: {sourceType: 'tuple', source: 'tuple_a'},
                  tuplePair: {sourceType: 'tuple', source: 'tuple_aa'},
                },
              },
              cases: {
                fnWithoutArgs: "() => ({a: 2, b: ''})",
                noFalsePositiveFnClock: {
                  objectVal: '({a}: {a: number; b: string}, cl: string) => ({a, b: cl})',
                  tupleSolo: '([a]: [number], cl: string) => ({a, b: cl})',
                  tuplePair: '([a]: [number, string], cl: string) => ({a, b: cl})',
                },
                noFalsePositiveFnSource_fnClock: {
                  objectVal: "({a, b}: {a: number; b: number}, cl: number) => ({a: b + cl, b: ''})",
                  tupleSolo: '([a]: [string], cl: number) => ({a: cl, b: a})',
                  tuplePair: "([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''})",
                },
                typedFnClock: {
                  objectVal: '({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b})',
                  tupleSolo: "([a]: [number], cl: number) => ({a: a + cl, b: ''})",
                  tuplePair: '([a, b]: [number, string], cl: number) => ({a: a + cl, b})',
                },
                noFalsePositiveFnSource: {
                  objectVal: "({b}: {a: number; b: number}) => ({a: b, b: ''})",
                  tupleSolo: '([a]: [string]) => ({a: 2, b: a})',
                  tuplePair: "([,b]: [number, number]) => ({a: b, b: ''})",
                },
                typedNoFnClock: {
                  objectVal: '({a, b}: {a: number; b: string}) => ({a, b})',
                  tupleSolo: "([a]: [number]) => ({a, b: ''})",
                  tuplePair: '([a, b]: [number, string]) => ({a, b})',
                },
                fnClock: {
                  objectVal: '({a, b}, cl) => ({a: a + cl, b})',
                  tupleSolo: "([a], cl) => ({a: a + cl, b: ''})",
                  tuplePair: '([a, b], cl) => ({a: a + cl, b})',
                },
                noFnClock: {
                  objectVal: '({a, b}) => ({a, b})',
                  tupleSolo: "([a]) => ({a, b: ''})",
                  tuplePair: '([a, b]) => ({a, b})',
                },
              },
            }
          },
          fnDescription: {
            compute: {
              variant: fnVariants,
              cases: {
                fnWithoutArgs: '() => ...',
                noFalsePositiveFnClock: '(src, clk: wrong) => ...',
                noFalsePositiveFnSource_fnClock: '(src: wrong, clk) => ...',
                typedFnClock: '(src: t, clk: t) => ...',
                noFalsePositiveFnSource: '(src: wrong) => ...',
                typedNoFnClock: '(src: t) => ...',
                fnClock: '(src, cl) => ...',
                noFnClock: '(src) => ...',
              },
            },
          },
          sourceDescription: {
            compute: {
              variant: sourceVariants,
              cases: {
                objectSolo: '{a}',
                objectPair: '{a,b}',
                tupleSolo: '[a]',
                tuplePair: '[a,b]',
              },
            },
          },
          sourceCode: {
            compute: {
              variant: sourceVariants,
              cases: {
                objectSolo: '{a: $num}',
                objectPair: '{a: $num, b: $str}',
                tupleSolo: '[$num]',
                tuplePair: '[$num, $str]',
              },
            },
          },
          target: {
            split: {
              match: {
                object: [{fn: true}, {sourceType: 'object'}],
                tuple: {sourceType: 'tuple'},
              },
              cases: {
                tuple: {
                  permute: {
                    items: ['l_num', 'l_str', 'l_num_str', 'l_num_num'],
                    amount: {min: 1, max: 2},
                  },
                },
                object: {
                  permute: {
                    items: ['a_num', 'a_str', 'a_num_b_num', 'a_num_b_str'],
                    amount: {min: 1, max: 2},
                  },
                },
              },
            },
          },
          pass: {
            compute: {
              variant: {
                noFalsePositive: [
                  {noFalsePositiveFnSource: true},
                  {noFalsePositiveFnClock: true},
                ],
                fn: {fn: true},
                default: {},
              },
              cases: {
                noFalsePositive: false,
                fn: ({target}) =>
                  failCases.ab.every(failCase => !target.includes(failCase)),
                default: ({source, target}) =>
                  failCases[source].every(
                    failCase => !target.includes(failCase),
                  ),
              },
            },
          },
        },
      })
      const casesDefsPending = [...casesDefs]
      const defsGroups = new Map()
      let cur
      while ((cur = casesDefsPending.pop())) {
        const hash = `${cur.sourceDescription} ${
          cur.fn ? cur.fnDescription : ''
        }`
        let set = defsGroups.get(hash)
        if (!set) {
          set = {itemsPass: [], itemsFail: [], description: ''}
          defsGroups.set(hash, set)
        }
        ;(cur.pass ? set.itemsPass : set.itemsFail).push(cur)
        const description = `source:${cur.sourceDescription}${
          cur.fn ? `, fn:${cur.fnDescription}` : ''
        }`
        set.description = description
      }
      const resultCases = []
      for (const {description, itemsPass, itemsFail} of defsGroups.values()) {
        if (itemsPass.length === 0 && itemsFail.length === 0) continue
        const testSuiteItems = []
        if (itemsPass.length > 0) {
          testSuiteItems.push(
            createTest(`${description} (should pass)`, [
              ...itemsPass.map(createTestLines).flat(),
              'expect(typecheck).toMatchInlineSnapshot()',
            ]),
          )
        }
        if (itemsFail.length > 0) {
          testSuiteItems.push(
            createTest(`${description} (should fail)`, [
              ...itemsFail.map(createTestLines).flat(),
              'expect(typecheck).toMatchInlineSnapshot()',
            ]),
          )
        }
        resultCases.push(createDescribe(description, testSuiteItems))
      }
      function createTestLines({
        sourceCode,
        sourceDescription,
        clock,
        target,
        pass,
        fn,
        fnText,
        fnDescription,
        fnClock,
        typedFn,
        noFalsePositiveFnClock,
        fnWithoutArgs,
      }) {
        const getText = item => variables[item] || item
        const printTargets = target.join(',')
        const sourceTargets = target.map(getText).join(', ')
        const methodCall = `sample({source: ${sourceCode}, clock: ${getText(
          clock,
        )}, ${fn ? `fn: ${fnText}, ` : ''}target: [${sourceTargets}]})`
        return [
          pass || methodCall.length > 76 ? null : '/*@ts-expect-error*/',
          methodCall,
        ]
      }
      return {
        description: 'combinable',
        cases: resultCases,
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
        return createTest(description, [
          pass ? null : '//@ts-expect-error',
          methodCall,
          'expect(typecheck).toMatchInlineSnapshot()',
        ])
      }),
    }
  },
  file: 'arrayTargetGen',
  usedMethods: ['createStore', 'createEvent', 'sample', 'combine'],
  header: `
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const numberString = createEvent<number | string>()
const stringBoolean = createEvent<string | boolean>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<{a: number}>()
const a_str = createEvent<{a: string}>()
const a_num_b_num = createEvent<{a: number; b: number}>()
const a_num_b_str = createEvent<{a: number; b: string}>()
const l_num = createEvent<[number]>()
const l_str = createEvent<[string]>()
const l_num_str = createEvent<[number, string]>()
const l_num_num = createEvent<[number, number]>()
`,
})
