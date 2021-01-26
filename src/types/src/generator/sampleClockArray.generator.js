const {
  generateCaseSetFile,
  printArray,
  createTest,
  byFields,
  createGroupedCases,
  printBools,
} = require('../generateCaseSetFile')

const grouping = {
  getHash: ({descriptionTokens, noTarget, noClock}) =>
    `${descriptionTokens}${noTarget}${noClock}`,
  describeGroup: ({descriptionTokens, noGroup, largeGroup}) => ({
    description: descriptionTokens,
    noGroup,
    largeGroup,
  }),
  createTestLines: ({methodCode, pass}) => [
    pass ? null : '//@ts-expect-error',
    methodCode,
  ],
  sortByFields: {
    combinable: [false, true],
    fn: [false, true],
    unificationToAny: [false, true],
    fnClockTypeAssertion: [false, true],
    noTarget: [true, false],
    noClock: [true, false],
    fnWithoutArgs: [false, true],
  },
}

const shape = {
  combinable: {
    flag: {},
  },
  fn: {
    flag: {},
  },
  noTarget: {
    flag: {},
  },
  noClock: {
    flag: {},
  },
  secondArgument: {
    flag: {
      needs: 'fn',
      avoid: ['noClock'],
    },
  },
  explicitArgumentTypes: {
    flag: {
      needs: 'fn',
    },
  },
  unificationToAny: {
    flag: {
      avoid: ['noClock'],
    },
  },
  fnClockTypeAssertion: {
    flag: {
      needs: ['fn', 'secondArgument', 'explicitArgumentTypes'],
      avoid: ['noClock'],
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
        none: {noClock: true},
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
        none: {
          value: '',
        },
        noAnyNoFalsePositiveFnClock: {
          permute: {
            items: ['voidt', 'num'],
            amount: {min: 1, max: 2},
            noReorder: true,
          },
        },
        noAny: {
          permute: {
            items: ['voidt', 'str'],
            amount: {min: 1, max: 2},
            noReorder: true,
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
      fn: ({clock}) => clock !== '' && clock.length === 1,
    },
  },
  pass: {
    bool: {
      true: [{noClock: true}, {fnClockTypeAssertion: false}],
      false: {fnClockTypeAssertion: true},
    },
  },
  target: {
    compute: {
      variant: {
        none: {noTarget: true},
        abclock: {combinable: true, fn: true, secondArgument: true},
        ab: {combinable: true},
        aclock: {fn: true, secondArgument: true},
        a: {fn: true, secondArgument: false},
        string: {fn: false},
      },
      cases: {
        none: '',
        abclock: ', target: abclock',
        ab: ', target: abTarget',
        aclock: ', target: aclock',
        a: ', target: aTarget',
        string: ', target: str',
      },
    },
  },
  descriptionTokens: {
    compute: {
      fn(shape) {
        const res = []
        shape.noClock && res.push('noClock')
        shape.noTarget && res.push('noTarget')
        shape.combinable ? res.push('combinable') : res.push('plain')
        shape.fn && res.push('fn')
        shape.secondArgument && res.push('fnClock')
        shape.explicitArgumentTypes && res.push('typedFn')
        // shape.unificationToAny && res.push('unificationToAny')
        shape.fnClockTypeAssertion && res.push('assertFnType')
        // shape.fnWithoutArgs && res.push('fnWithoutArgs')

        return res.join(', ')
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
        combinable: '{a,b}',
      },
    },
  },
  clockCode: {
    compute: {
      fn: ({clock}) => (clock === '' ? '' : `, clock: ${printArray(clock)}`),
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
            assert: 'fnAbClockString',
            keep: 'fnAbClockAny'
          },
          untypedFnClock: '({a,b}, clock) => ({a,b,clock})',
          typed: 'fnAb',
          untyped: '({a,b}) => ({a,b})'
        },
        plain: {
          noArgs: "()=>({a:''})",
          typedFnClock: {
            assert: 'fnAStringClockString',
            keep: 'fnAStringClockAny'
          },
          untypedFnClock: '(a,clock) => ({a,clock})',
          typed: 'fnAString',
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
          `sample({source: ${sourceCode}${clockCode}${target}, fn: ${fnCode}})`,
        noFn: ({sourceCode, clockCode, target}) =>
          `sample({source: ${sourceCode}${clockCode}${target}})`,
      },
    },
  },
  noGroup: {
    true: [
      {noClock: true},
      {unificationToAny: true},
      {fnClockTypeAssertion: true},
    ],
  },
  largeGroup: {
    compute: {
      variant: {
        noClock: {noClock: true},
        hasClock: {},
      },
      cases: {
        noClock: 'no clock',
        hasClock: null,
      },
    },
  },
}

const header = `
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
const fnAbClockString = ({a,b}:AB, clock:string) => ({a,b,clock})
const fnAbClockAny = ({a,b}:AB, clock:any) => ({a,b,clock})
const fnAString = (a:string) => ({a})
const fnAStringClockString = (a:string, clock:string) => ({a,clock})
const fnAStringClockAny = (a:string, clock:any) => ({a,clock})
const fnAb = ({a,b}:AB) => ({a,b})
`

module.exports = {grouping, shape, header}
