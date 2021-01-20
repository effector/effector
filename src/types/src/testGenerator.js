//@ts-check

const {
  generateCaseSetFile,
  boolField,
  printArray,
  createTest,
  byFields,
  createGroupedCases,
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
  dir: 'sample/generated',
  usedMethods: ['createStore', 'createEvent', 'sample'],
  header: `
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<{a: string; b: number}>()
const aclockTarget = createEvent<{a: string; clock: any}>()
const abclockTarget = createEvent<{a: string; b: number; clock: any}>()
const stringTarget = createEvent<string>()
`,
  groupBy: [],
  groupDescriptions: {},
  ignore: [],
  shape: {
    combinable: boolField(),
  },
  generateCases(config) {
    const casesDefs = byFields([config], {
      shape: {
        fn: {
          flag: {},
        },
        secondArgument: {
          flag: {
            needs: 'fn',
          },
        },
        explicitArgumentTypes: {
          flag: {
            needs: 'fn',
          },
        },
        unificationToAny: {
          flag: {},
        },
        fnClockTypeAssertion: {
          flag: {
            needs: ['fn', 'secondArgument', 'explicitArgumentTypes'],
          },
        },
        fnWithoutArgs: {
          flag: {
            needs: 'fn',
            avoid: [
              'fnClockTypeAssertion',
              'secondArgument',
              'explicitArgumentTypes',
            ],
          },
        },
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
              pass: true,
              fail: false,
            },
          },
        },
        target: {
          compute: {
            variant: {
              abclock: {combinable: true, fn: true, secondArgument: true},
              ab: {combinable: true},
              aclock: {fn: true, secondArgument: true},
              a: {fn: true, secondArgument: false},
              string: {fn: false},
            },
            cases: {
              abclock: 'abclockTarget',
              ab: 'abTarget',
              aclock: 'aclockTarget',
              a: 'aTarget',
              string: 'stringTarget',
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
        sourceCode: {
          compute: {
            variant: {
              plain: {combinable: false},
              combinable: {combinable: true},
            },
            cases: {
              plain: 'a',
              combinable: '{a, b}',
            },
          },
        },
        clockCode: {
          compute: {
            fn: ({clock}) => printArray(clock),
          },
        },
        //prettier-ignore
        fnCode: {
          compute: {
            variants: {
              shape: {
                plain: {combinable: false, fn: true},
                shape: {combinable: true, fn: true},
              },
              fn: {
                noArgs: {fnWithoutArgs: true},
                typedFnClock: {secondArgument: true, explicitArgumentTypes: true},
                untypedFnClock: {secondArgument: true, explicitArgumentTypes: false},
                typed: {explicitArgumentTypes: true},
                untyped: {explicitArgumentTypes: false},
              },
              clock: {
                assert: {fnClockTypeAssertion: true},
                keep: {fnClockTypeAssertion: false},
              }
            },
            cases: {
              shape: {
                noArgs: "() => ({a: '', b: 2})",
                typedFnClock: {
                  assert: '({a, b}: {a: string; b: number}, clock: string) => ({a, b, clock})',
                  keep: '({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock})'
                },
                untypedFnClock: '({a, b}, clock) => ({a, b, clock})',
                typed: '({a, b}: {a: string; b: number}) => ({a, b})',
                untyped: '({a, b}) => ({a, b})'
              },
              plain: {
                noArgs: "() => ({a: ''})",
                typedFnClock: {
                  assert: '(a: string, clock: string) => ({a, clock})',
                  keep: '(a: string, clock: any) => ({a, clock})'
                },
                untypedFnClock: '(a, clock) => ({a, clock})',
                typed: '(a: string) => ({a})',
                untyped: '(a) => ({a})',
              }
            },
          },
        },
        methodCode: {
          compute: {
            variant: {
              hasFn: {fn: true},
              noFn: {fn: false},
            },
            cases: {
              hasFn: ({sourceCode, clockCode, fnCode, target}) => `sample({
  source: ${sourceCode},
  clock: ${clockCode},
  fn: ${fnCode},
  target: ${target},
})`,
              noFn: ({sourceCode, clockCode, target}) =>
                `sample({source: ${sourceCode}, clock: ${clockCode}, target: ${target}})`,
            },
          },
        },
        noGroup: {
          compute: {
            variant: {
              yes: [{unificationToAny: true}, {fnClockTypeAssertion: true}],
              no: {},
            },
            cases: {yes: true, no: false},
          },
        },
      },
    })
    const resultCases = createGroupedCases(casesDefs, {
      getHash: ({descriptionTokens}) => descriptionTokens,
      describeGroup: ({descriptionTokens, noGroup}) => ({
        description: descriptionTokens,
        noGroup,
      }),
      createTestLines: ({methodCode}) => [methodCode],
    })
    return {
      description: config.combinable ? 'combinable' : 'plain',
      noGroup: true,
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
      const resultCases = createGroupedCases(casesDefs, {
        createTestLines,
        getHash: cur =>
          `${cur.sourceDescription} ${cur.fn ? cur.fnDescription : ''}`,
        describeGroup: cur =>
          `source:${cur.sourceDescription}${
            cur.fn ? `, fn:${cur.fnDescription}` : ''
          }`,
      })
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
  dir: 'sample/generated',
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
