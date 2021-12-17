import {Value} from '../runner/manifold/types'
import {
  computeFn,
  union,
  value,
  computeVariant,
  computeVariants,
  bool,
  separate,
  flag,
  config,
  permute,
  sortOrder,
} from '../runner/manifold/operators'

const header = `
type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const strClk = createEvent<string>()
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

export default () => {
  const noSource = flag({sort: [false, true]})
  const clockArray = flag({sort: [false, true], needs: noSource})
  const combinable = flag({sort: [false, true], avoid: noSource})
  const fn = flag({sort: [false, true]})
  const noTarget = flag({sort: [true, false]})
  const noClock = flag({sort: [true, false], avoid: noSource})
  const secondArgument = flag({
    needs: fn,
    avoid: [noClock, noSource],
  })
  const explicitArgumentTypes = flag({
    needs: fn,
  })
  const unificationToAny = flag({
    sort: [false, true],
    avoid: [noClock, noSource],
  })
  const fnClockTypeAssertion = flag({
    sort: [false, true],
    needs: [fn, secondArgument, explicitArgumentTypes],
    avoid: noClock,
  })
  const fnWithoutArgs = flag({
    sort: [true, false],
    needs: fn,
    avoid: [fnClockTypeAssertion, secondArgument, explicitArgumentTypes],
  })
  const clock = separate({
    source: {noClock, noSource, unificationToAny, fnClockTypeAssertion},
    variant: {
      _: {
        none: {noClock: true},
        only: {noSource: true},
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
    },
    cases: {
      none: value(null),
      only: separate({
        source: {fnWithoutArgs, fn, clockArray},
        variant: {
          fn: {
            noArgs: {fnWithoutArgs: true},
            noFn: {fn: false},
            fn: {},
          },
          amount: {
            singleClock: {clockArray: false},
            manyClocks: {clockArray: true},
          },
        },
        cases: {
          noArgs: {
            singleClock: union(['voidt', 'num', 'strClk', 'anyt']),
            manyClocks: permute({
              items: ['voidt', 'num', 'strClk', 'anyt'],
              amount: {min: 1, max: 2},
              noReorder: true,
            }),
          },
          noFn: {
            singleClock: union(['strClk', 'anyt']),
            manyClocks: permute({
              items: ['strClk', 'anyt'],
              amount: {min: 1, max: 2},
              noReorder: true,
            }),
          },
          fn: {
            singleClock: union(['strClk', 'anyt']),
            manyClocks: permute({
              items: ['strClk', 'anyt'],
              amount: {min: 1, max: 2},
              noReorder: true,
            }),
          },
        },
      }),
      noAnyNoFalsePositiveFnClock: permute({
        items: ['voidt', 'num'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
      noAny: permute({
        items: ['voidt', 'str'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
      withAnyNoFalsePositiveFnClock: permute({
        items: ['anyt', 'voidt', 'num'],
      }),
      withAny: permute({
        items: ['anyt', 'voidt', 'str'],
      }),
    },
  })
  const pass = bool({
    sort: [true, false],
    source: {
      noClock,
      noSource,
      fnClockTypeAssertion,
      unificationToAny,
      clockAnyOnly: computeFn({
        source: {clock},
        fn: ({clock}) =>
          Array.isArray(clock) && clock.length === 1 && clock[0] === 'anyt',
      }),
    },
    true: [
      {noClock: true},
      {noSource: true},
      {fnClockTypeAssertion: false},
      {fnClockTypeAssertion: true, unificationToAny: true, clockAnyOnly: true},
    ],
  })
  const target = computeVariant({
    source: {noTarget, combinable, fn, secondArgument},
    variant: {
      none: {noTarget: true},
      abclock: {combinable: true, fn: true, secondArgument: true},
      ab: {combinable: true},
      aclock: {fn: true, secondArgument: true},
      a: {fn: true, secondArgument: false},
      string: {fn: false},
    },
    cases: {
      none: null,
      abclock: 'abclock',
      ab: 'abTarget',
      aclock: 'aclock',
      a: 'aTarget',
      string: 'str',
    },
  })
  const descriptionTokens = computeFn({
    source: {
      fnClockTypeAssertion,
      combinable,
      noTarget,
      noSource,
      noClock,
      fn,
      secondArgument,
    },
    fn(shape) {
      const res = []
      if (shape.fnClockTypeAssertion) {
        shape.combinable ? res.push('combinable') : res.push('plain')
        shape.noTarget && res.push('noTarget')
      }
      shape.noSource && res.push('noSource')
      shape.noClock && res.push('noClock')
      if (!shape.fnClockTypeAssertion) {
        shape.fn && res.push('fn')
        shape.secondArgument && res.push('fnClock')
      }
      return res.join(', ')
    },
  })
  const sourceCode = computeVariant({
    source: {noSource, combinable},
    variant: {
      none: {noSource: true},
      plain: {combinable: false},
      combinable: {combinable: true},
    },
    cases: {
      none: null,
      plain: 'a',
      combinable: '{a,b}',
    },
  })
  //@ts-expect-error
  const fnCode: Value<string> = separate({
    source: {
      noSource,
      fn,
      combinable,
      fnWithoutArgs,
      secondArgument,
      explicitArgumentTypes,
      fnClockTypeAssertion,
    },
    variant: {
      shape: {
        none: {noSource: true, fn: true},
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
      },
    },
    cases: {
      //@ts-expect-error
      none: {
        noArgs: value("()=>({a:'',b:2})"),
        typed: value('fnAString'),
        untyped: value('(a) => ({a})'),
      },
      shape: {
        noArgs: value("()=>({a:'',b:2})"),
        typedFnClock: {
          assert: value('fnAbClockString'),
          keep: value('fnAbClockAny'),
        },
        untypedFnClock: value('({a,b}, clock) => ({a,b,clock})'),
        typed: value('fnAb'),
        untyped: value('({a,b}) => ({a,b})'),
      },
      plain: {
        noArgs: value("()=>({a:''})"),
        typedFnClock: {
          assert: value('fnAStringClockString'),
          keep: value('fnAStringClockAny'),
        },
        untypedFnClock: value('(a,clock) => ({a,clock})'),
        typed: value('fnAString'),
        untyped: value('(a) => ({a})'),
      },
    },
  })
  const noGroup = bool({
    source: {noClock, noSource, unificationToAny},
    true: [{noClock: true}, {noSource: true}, {unificationToAny: true}],
  })
  const largeGroup = computeVariant({
    source: {fnClockTypeAssertion, noSource},
    variant: {
      fnAssertion: {fnClockTypeAssertion: true},
      noSource: {noSource: true},
      __: {},
    },
    cases: {
      fnAssertion: 'fn clock assertion',
      noSource: 'clock only',
      __: null,
    },
  })
  sortOrder([
    pass,
    clockArray,
    combinable,
    noSource,
    fn,
    unificationToAny,
    fnClockTypeAssertion,
    noTarget,
    noClock,
    fnWithoutArgs,
  ])
  config({
    header,
    file: 'generated/sampleClockArray',
    usedMethods: ['createStore', 'createEvent', 'sample'],
    grouping: {
      getHash: {descriptionTokens, noTarget, noClock, noSource},
      pass,
      tags: {
        hasSource: bool({
          source: {noSource},
          true: {noSource: false},
        }),
        hasFn: fn,
        hasClock: bool({
          source: {noClock},
          true: {noClock: false},
        }),
        hasTarget: bool({
          source: {noTarget},
          true: {noTarget: false},
        }),
        clockArray,
        combinable,
      },
      describeGroup: computeFn({
        source: {descriptionTokens, noGroup, largeGroup},
        fn: ({descriptionTokens, noGroup, largeGroup}) => ({
          description: descriptionTokens,
          noGroup,
          largeGroup,
        }),
      }),
      createTestLines: {
        method: 'sample',
        shape: {
          source: sourceCode,
          clock,
          target,
          fn: fnCode,
        },
      },
    },
  })
}
