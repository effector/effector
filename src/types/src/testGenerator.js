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
  - [voidt, str]
  - [str, voidt]
    unification to any:
  - [voidt, anyt, str]
  - [voidt, str, anyt]
  - [anyt, voidt, str]
  - [anyt, str, voidt]
  - [str, voidt, anyt]
  - [str, anyt, voidt]
  */

generateCaseSetFile({
  file: 'clockArrayGen',
  dir: 'sample/generated',
  usedMethods: ['createStore', 'createEvent', 'sample'],
  header: `
type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<AB>()
const aclock = createEvent<{a: string; clock: any}>()
const abclock = createEvent<{a: string; b: number; clock: any}>()
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
                  items: ['voidt', 'num'],
                  amount: {min: 1, max: 2},
                },
              },
              noAny: {
                permute: {
                  items: ['voidt', 'str'],
                  amount: {min: 1, max: 2},
                },
              },
              withAnyNoFalsePositiveFnClock: {
                permute: ['anyt', 'voidt', 'num'],
              },
              withAny: {
                permute: ['anyt', 'voidt', 'str'],
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
              abclock: 'abclock',
              ab: 'abTarget',
              aclock: 'aclock',
              a: 'aTarget',
              string: 'str',
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
                noArgs: "()=>({a:'',b:2})",
                typedFnClock: {
                  assert: '({a,b}:AB, clock:string) => ({a,b,clock})',
                  keep: '({a,b}:AB, clock:any) => ({a,b,clock})'
                },
                untypedFnClock: '({a,b}, clock) => ({a,b,clock})',
                typed: '({a,b}:AB) => ({a,b})',
                untyped: '({a,b}) => ({a,b})'
              },
              plain: {
                noArgs: "()=>({a:''})",
                typedFnClock: {
                  assert: '(a:string, clock:string) => ({a,clock})',
                  keep: '(a:string, clock:any) => ({a,clock})'
                },
                untypedFnClock: '(a,clock) => ({a,clock})',
                typed: '(a:string) => ({a})',
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
              hasFn: ({sourceCode, clockCode, fnCode, target}) =>
                `sample({source: ${sourceCode}, clock: ${clockCode}, fn: ${fnCode}, target: ${target}})`,
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
      createTestLines: ({methodCode, pass}) => [
        pass ? null : '//@ts-expect-error',
        methodCode,
      ],
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
      number: 'num',
      void: 'voidt',
      string: 'str',
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
        a: ['a_str', 'abn', 'ab', 'a_str_b_num', 'a_str_b_str'],
        ab: ['a_str', 'abn'],
        tuple_a: ['l_str', 'l_num_num', 'l_num_str'],
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
          isPairOfSourceFields: {
            compute: {
              variant: sourceVariants,
              cases: {
                objectSolo: false,
                objectPair: true,
                tupleSolo: false,
                tuplePair: true,
              },
            },
          },
          fnText: {
            //prettier-ignore
            compute: {
              variants: {
                fnVariants,
                source: {
                  object: {sourceType: 'object'},
                  tuple: {sourceType: 'tuple'},
                },
                sourceObject: {
                  solo: {isPairOfSourceFields: false},
                  pair: {isPairOfSourceFields: true},
                }
              },
              cases: {
                fnWithoutArgs: "() => ({a: 2, b: ''})",
                noFalsePositiveFnClock: {
                  object: {
                    solo: '({a}: AN, cl: string) => ({a, b: cl})',
                    pair: '({a}: AB, cl: string) => ({a, b: cl})'
                  },
                  tuple: {
                    solo: '([a]: [number], cl: string) => ({a, b: cl})',
                    pair: '([a]: [number, string], cl: string) => ({a, b: cl})',
                  }
                },
                noFalsePositiveFnSource_fnClock: {
                  object: {
                    solo: "({a}: AS, cl: number) => ({a: cl, b: a})",
                    pair: "({a, b}: ABN, cl: number) => ({a: b + cl, b: ''})"
                  },
                  tuple: {
                    solo: '([a]: [string], cl: number) => ({a: cl, b: a})',
                    pair: "([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''})",
                  }
                },
                typedFnClock: {
                  object: {
                    solo: "({a}: AN, cl: number) => ({a: a + cl, b: ''})",
                    pair: '({a, b}: AB, cl: number) => ({a: a + cl, b})'
                  },
                  tuple: {
                    solo: "([a]: [number], cl: number) => ({a: a + cl, b: ''})",
                    pair: '([a, b]: [number, string], cl: number) => ({a: a + cl, b})',
                  }
                },
                noFalsePositiveFnSource: {
                  object: {
                    solo: "({a}: AS) => ({a: 0, b: a})",
                    pair: "({b}: ABN) => ({a: b, b: ''})"
                  },
                  tuple: {
                    solo: '([a]: [string]) => ({a: 2, b: a})',
                    pair: "([,b]: [number, number]) => ({a: b, b: ''})",
                  }
                },
                typedNoFnClock: {
                  object: {
                    solo: "({a}: AN) => ({a, b: ''})",
                    pair: '({a, b}: AB) => ({a, b})'
                  },
                  tuple: {
                    solo: "([a]: [number]) => ({a, b: ''})",
                    pair: '([a, b]: [number, string]) => ({a, b})',
                  }
                },
                fnClock: {
                  object: {
                    solo: "({a}, cl) => ({a: a + cl, b: ''})",
                    pair: '({a, b}, cl) => ({a: a + cl, b})'
                  },
                  tuple: {
                    solo: "([a], cl) => ({a: a + cl, b: ''})",
                    pair: '([a, b], cl) => ({a: a + cl, b})',
                  }
                },
                noFnClock: {
                  object: {
                    solo: "({a}) => ({a, b: ''})",
                    pair: '({a, b}) => ({a, b})'
                  },
                  tuple: {
                    solo: "([a]) => ({a, b: ''})",
                    pair: '([a, b]) => ({a, b})',
                  }
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
                    items: ['a_num', 'a_str', 'abn', 'ab'],
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
        return [pass ? null : '/*@ts-expect-error*/', methodCall].filter(
          Boolean,
        )
      }
      return {
        description: 'combinable',
        cases: resultCases,
      }
    }
    const pairs = [
      ['number', 'numStr', true],
      ['number', 'void', true],
      ['string', 'number', false],
      ['string', 'numStr', false],
      ['number', 'strBool', false],
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
/** used as valid source type */
type AN = {a: number}
/** used as invalid source type */
type AS = {a: string}
/** used as valid source type */
type AB = {a: number; b: string}
/** used as invalid source type */
type ABN = {a: number; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const numStr = createEvent<number | string>()
const strBool = createEvent<string | boolean>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<AN>()
const a_str = createEvent<AS>()
const ab = createEvent<AB>()
const abn = createEvent<ABN>()
const l_num = createEvent<[number]>()
const l_str = createEvent<[string]>()
const l_num_str = createEvent<[number, string]>()
const l_num_num = createEvent<[number, number]>()
`,
})

generateCaseSetFile({
  shape: {},
  generateCases({}) {
    const Source = {
      unit: {sourceType: 'unit'},
      object: {sourceType: 'object'},
      tuple: {sourceType: 'tuple'},
    }
    const Filter = {
      fn: {filterType: 'fn'},
      store: {filterType: 'store'},
      bool: {filterType: 'bool'},
    }
    const Target = {
      unit: {targetType: 'unit'},
      array: {targetType: 'array'},
    }
    function permuteTargets({
      permute = false,
      correctObject,
      correctObjectWide,
      wrongObject,
      wrongObjectWide,
      correctTuple,
      correctTupleWide,
      wrongTuple,
      wrongTupleWide,
    }) {
      const op = val => (permute ? {permute: val} : {compute: {fn: () => val}})
      return {
        nonTuple: {
          correct: {
            same: op(correctObject),
            wide: op(correctObjectWide),
          },
          wrong: {
            same: op(wrongObject),
            wide: op(wrongObjectWide),
          },
        },
        tuple: {
          correct: {
            same: op(correctTuple),
            wide: op(correctTupleWide),
          },
          wrong: {
            same: op(wrongTuple),
            wide: op(wrongTupleWide),
          },
        },
      }
    }
    const casesDefs = byFields([{}], {
      shape: {
        clockType: {
          union: ['no', 'unit', 'array'],
        },
        filterType: {
          union: ['fn', 'store', 'bool'],
        },
        sourceType: {
          union: ['unit', 'object', 'tuple'],
        },
        targetType: {
          union: ['unit', 'array'],
        },
        targetVoid: {flag: {}},
        targetAny: {
          split: {
            match: 'targetType',
            cases: {
              unit: {
                flag: {avoid: 'targetVoid'},
              },
              array: {flag: {}},
            },
          },
        },
        targetIsTyped: {
          compute: {
            variants: {
              Target,
              targetType: {
                nonAny: {targetAny: false, targetVoid: false},
                any: [{targetAny: true}, {targetVoid: true}],
              },
            },
            cases: {
              array: true,
              unit: {
                nonAny: true,
                any: false,
              },
            },
          },
        },
        combinable: {
          compute: {
            variant: {
              yes: [Source.object, Source.tuple],
              no: Source.unit,
            },
            cases: {yes: true, no: false},
          },
        },
        canInferByFilter: {
          compute: {
            variants: {
              filter: {
                store: {filterType: 'store'},
                nonStore: [{filterType: 'fn'}, {filterType: 'bool'}],
              },
              source: {
                plain: {combinable: false},
                combinable: {combinable: true},
              },
            },
            cases: {
              store: false,
              nonStore: {
                plain: true,
                combinable: false,
              },
            },
          },
        },
        wrongTarget: {
          flag: {
            needs: ['targetIsTyped'],
          },
        },
        sourceIsWiderThatTarget: {
          flag: {
            needs: ['targetIsTyped'],
            // avoid: ['wrongTarget']
          },
        },
        inferByFilter: {
          flag: {
            needs: ['canInferByFilter', 'targetIsTyped'],
            avoid: [],
          },
        },
        targetValue: {
          split: {
            variants: {
              targetKind: {
                singleVoid: {targetType: 'unit', targetVoid: true},
                singleAny: {targetType: 'unit', targetAny: true},
                single: {targetType: 'unit'},
                manyAnyVoid: {
                  targetType: 'array',
                  targetVoid: true,
                  targetAny: true,
                },
                manyVoid: {targetType: 'array', targetVoid: true},
                manyAny: {targetType: 'array', targetAny: true},
                many: {targetType: 'array'},
              },
              source: {
                nonTuple: [Source.unit, Source.object],
                tuple: {sourceType: 'tuple'},
              },
              target: {
                correct: {wrongTarget: false},
                wrong: {wrongTarget: true},
              },
              sourceWidth: {
                wide: {sourceIsWiderThatTarget: true},
                same: {sourceIsWiderThatTarget: false},
              },
            },
            cases: {
              singleVoid: 'voidt',
              singleAny: 'anyt',
              single: {
                nonTuple: {
                  correct: {
                    wide: 'aNum',
                    same: 'ab',
                  },
                  wrong: {
                    wide: 'aStr',
                    same: 'abn',
                  },
                },
                tuple: {
                  correct: {
                    wide: 'lNum',
                    same: 'lNumStr',
                  },
                  wrong: {
                    wide: 'lStr',
                    same: 'lNumNum',
                  },
                },
              },
              manyAnyVoid: permuteTargets({
                correctObject: ['ab', 'anyt', 'voidt'],
                correctObjectWide: ['aNum', 'anyt', 'voidt'],
                wrongObject: ['abn', 'anyt', 'voidt'],
                wrongObjectWide: ['aStr', 'anyt', 'voidt'],
                correctTuple: ['lNumStr', 'anyt', 'voidt'],
                correctTupleWide: ['lNum', 'anyt', 'voidt'],
                wrongTuple: ['lNumNum', 'anyt', 'voidt'],
                wrongTupleWide: ['lStr', 'anyt', 'voidt'],
              }),
              manyVoid: permuteTargets({
                correctObject: ['ab', 'voidt'],
                correctObjectWide: ['aNum', 'voidt'],
                wrongObject: ['abn', 'voidt'],
                wrongObjectWide: ['aStr', 'voidt'],
                correctTuple: ['lNumStr', 'voidt'],
                correctTupleWide: ['lNum', 'voidt'],
                wrongTuple: ['lNumNum', 'voidt'],
                wrongTupleWide: ['lStr', 'voidt'],
              }),
              manyAny: permuteTargets({
                correctObject: ['ab', 'anyt'],
                correctObjectWide: ['aNum', 'anyt'],
                wrongObject: ['abn', 'anyt'],
                wrongObjectWide: ['aStr', 'anyt'],
                correctTuple: ['lNumStr', 'anyt'],
                correctTupleWide: ['lNum', 'anyt'],
                wrongTuple: ['lNumNum', 'anyt'],
                wrongTupleWide: ['lStr', 'anyt'],
              }),
              many: permuteTargets({
                correctObject: ['ab'],
                correctObjectWide: ['aNum'],
                wrongObject: ['abn'],
                wrongObjectWide: ['aStr', 'ab'],
                correctTuple: ['lNumStr'],
                correctTupleWide: ['lNum', 'lNumStr'],
                wrongTuple: ['lNumNum'],
                wrongTupleWide: ['lStr', 'lNumStr'],
              }),
            },
          },
        },
        targetCode: {
          compute: {
            fn: ({targetValue}) =>
              Array.isArray(targetValue)
                ? printArray(targetValue)
                : targetValue,
          },
        },
        clockCode: {
          compute: {
            variant: {
              noClock: {clockType: 'no'},
              clockSingle: {clockType: 'unit'},
              clockArray: {clockType: 'array'},
            },
            cases: {
              noClock: '',
              clockSingle: 'clock: anyt, ',
              clockArray: 'clock: [anyt], ',
            },
          },
        },
        clockDescription: {
          compute: {
            variant: {
              noClock: {clockType: 'no'},
              clockSingle: {clockType: 'unit'},
              clockArray: {clockType: 'array'},
            },
            cases: {
              noClock: '',
              clockSingle: ' + clock',
              clockArray: ' + [clock]',
            },
          },
        },
        sourceCode: {
          split: {
            variants: {
              Source,
              Filter,
              infer: {
                infer: {inferByFilter: true},
                noInfer: {inferByFilter: false},
              },
            },
            cases: {
              unit: {
                fn: {
                  infer: 'abNull',
                  noInfer: 'ab',
                },
                bool: {
                  infer: 'nullableAB',
                  noInfer: 'ab',
                },
                store: 'ab',
              },
              tuple: '[a, b]',
              object: '{a, b}',
            },
          },
        },
        filterCode: {
          compute: {
            variants: {
              Filter,
              Source,
              infer: {
                infer: {inferByFilter: true},
                noInfer: {inferByFilter: false},
              },
            },
            cases: {
              fn: {
                unit: {
                  infer: '(val): val is AB => val.a !== null',
                  noInfer: '(val) => val.a > 0',
                },
                object: {
                  infer: '(val): val is AB => val.a > 0',
                  noInfer: '(val) => val.a > 0',
                },
                tuple: '(val) => val[0] > 0',
              },
              store: '$filter',
              bool: 'Boolean',
            },
          },
        },
        descriptionTokens: {
          compute: {
            fn: ({
              inferByFilter,
              sourceIsWiderThatTarget,
              filterType,
              sourceType,
              targetType,
              clockType,
            }) =>
              `${sourceType} ${filterType} ${targetType} ${clockType} ${
                sourceIsWiderThatTarget ? 'wide' : 'same'
              }`,
          },
        },
        groupTokens: {
          compute: {
            fn: ({
              inferByFilter,
              sourceIsWiderThatTarget,
              filterType,
              sourceType,
              targetType,
              targetVoid,
              clockDescription,
            }) =>
              `${sourceType}${clockDescription} -> ${targetType} ${
                sourceIsWiderThatTarget ? 'wide' : 'same'
              }`,
          },
        },
        largeGroup: {
          compute: {
            fn: ({
              inferByFilter,
              sourceIsWiderThatTarget,
              filterType,
              sourceType,
              targetType,
              targetVoid,
              clockType,
            }) => `${filterType} filter, ${clockType} clock`,
          },
        },
        pass: {
          compute: {
            variant: {
              pass: {wrongTarget: false},
              fail: {wrongTarget: true},
            },
            cases: {
              pass: true,
              fail: false,
            },
          },
        },
        methodCode: {
          compute: {
            fn({filterType, sourceCode, clockCode, filterCode, targetCode}) {
              return `guard({source: ${sourceCode}, ${clockCode}target: ${targetCode}, filter: ${filterCode}})`
            },
          },
        },
      },
    })
    function printBools(shape) {
      let result = ''
      for (const key in shape) {
        if (shape[key]) result += `, ${key}`
      }
      return result
    }
    const resultCases = createGroupedCases(casesDefs, {
      getHash: ({descriptionTokens}) => descriptionTokens,
      describeGroup: ({groupTokens, largeGroup}) => ({
        largeGroup,
        description: groupTokens,
      }),
      createTestLines: ({methodCode, pass}) => [
        pass ? null : '//@ts-expect-error',
        methodCode,
      ],
    })
    return {
      description: '-',
      noGroup: true,
      cases: resultCases,
    }
  },
  file: 'guardGen',
  dir: 'generated',
  usedMethods: ['createStore', 'createEvent', 'guard'],
  header: `

type AB = {a: number; b: string}
type ABN = {a: number; b: number}
const $filter = createStore(true)
const a = createStore(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
const ab = createEvent<AB>()
const nullableAB = createEvent<AB | null>()
const abNull = createEvent<{a: number | null; b: string}>()
const aNum = createEvent<{a: number}>()
const aStr = createEvent<{a: string}>()
const lNum = createEvent<[number]>()
const lStr = createEvent<[string]>()
const lNumStr = createEvent<[number, string]>()
const lNumNum = createEvent<[number, number]>()
const abn = createEvent<ABN>()
`,
})
