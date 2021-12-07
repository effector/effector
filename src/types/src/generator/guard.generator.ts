import {printArray} from '../runner/text'
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
  sortOrder,
  fmt,
} from '../runner/manifold/operators'
import {Separate} from 'runner/manifold/types'

export default () => {
  const clockType = union({
    oneOf: ['no', 'unit', 'array'],
    sort: ['no', 'unit', 'array'],
  })
  const filterType = union({
    oneOf: ['fn', 'store', 'bool'],
    sort: ['fn', 'store', 'bool'],
  })
  const sourceType = separate({
    source: {clockType},
    variant: {_: {noClock: {clockType: 'no'}}} as const,
    cases: {
      noClock: union(['unit', 'object', 'tuple']),
      __: union(['no', 'unit', 'object', 'tuple']),
    },
    sort: ['unit', 'object', 'tuple', 'no'],
  })
  const targetType = union({oneOf: ['unit', 'array'], sort: ['unit', 'array']})
  const sourceSubtype = separate({
    source: {sourceType, targetType},
    variant: {
      source: {
        object: {sourceType: 'object'},
        tuple: {sourceType: 'tuple'},
      },
      target: {
        targetUnit: {targetType: 'unit'},
      },
    } as const,
    cases: {
      //@ts-ignore
      object: {
        targetUnit: union(['fullObject', 'nullableField', 'smallObject']),
      },
      tuple: {
        targetUnit: union(['fullTuple', 'smallTuple']),
      },
    },
    sort: [
      'fullObject',
      'nullableField',
      'smallObject',
      'fullTuple',
      'smallTuple',
    ],
  })

  const noSource = bool({
    source: {sourceType},
    true: {sourceType: 'no'},
  })

  const targetVoid = flag({
    avoid: [
      noSource,
      bool({
        source: {sourceSubtype},
        true: [
          {sourceSubtype: 'smallTuple'},
          {sourceSubtype: 'nullableField'},
          {sourceSubtype: 'smallObject'},
        ],
      }),
    ],
  })
  const noTargetAny = bool({
    source: {sourceSubtype},
    true: [
      {sourceSubtype: 'smallTuple'},
      {sourceSubtype: 'nullableField'},
      {sourceSubtype: 'smallObject'},
    ],
  })

  const targetAny = separate({
    source: {targetType},
    variant: {
      _: {
        unit: {targetType: 'unit'},
        array: {targetType: 'array'},
      } as const,
    },
    cases: {
      unit: flag({avoid: [targetVoid, noSource, noTargetAny]}),
      array: flag(),
    },
  })
  const targetIsTyped = computeVariant({
    source: {targetAny, targetVoid, targetType},
    variant: {
      array: {targetType: 'array'},
      nonAny: {
        targetAny: false,
        targetVoid: false,
        targetType: 'unit',
      },
      any: [
        {targetAny: true, targetType: 'unit'},
        {targetVoid: true, targetType: 'unit'},
      ],
    } as const,
    cases: {
      array: true,
      nonAny: true,
      any: false,
    },
  })
  const combinable = bool({
    source: {sourceType},
    true: [{sourceType: 'object'}, {sourceType: 'tuple'}],
  })
  const wrongTarget = flag({
    needs: targetIsTyped,
    avoid: noSource,
  })
  const targetSubtype = separate({
    source: {sourceSubtype, wrongTarget},
    variant: {
      src: {
        smallObject: {sourceSubtype: 'smallObject'},
        nullableField: {sourceSubtype: 'nullableField'},
        smallTuple: {sourceSubtype: 'smallTuple'},
      },
      isCorrect: {
        correct: {wrongTarget: false},
        wrong: {wrongTarget: true},
      },
    } as const,
    cases: {
      smallObject: {
        correct: value('smallObject' as const),
        wrong: union(['tooWideObject', 'wrongFieldSmall']),
      },
      nullableField: {
        correct: value('smallObject' as const),
        wrong: value('nonNullFieldSmall' as const),
      },
      smallTuple: {
        correct: value('smallTuple' as const),
      },
    },
    sort: [
      'smallObject',
      'tooWideObject',
      'nonNullFieldSmall',
      'wrongFieldSmall',
      'smallTuple',
    ],
  })
  const sourceIsWiderThatTargetCond = bool({
    source: {sourceType, sourceSubtype, targetSubtype},
    true: [
      {sourceType: 'tuple'},
      {sourceType: 'no'},
      {sourceSubtype: 'smallObject'},
      {sourceSubtype: 'smallTuple'},
      {sourceSubtype: 'nullableField'},
      {targetSubtype: 'smallTuple'},
    ],
  })
  const sourceIsWiderThatTarget = separate({
    source: {sourceSubtype},
    variant: {
      _: {
        nullableField: {sourceSubtype: 'nullableField'},
      },
    } as const,
    cases: {
      nullableField: value(true),
      __: flag({
        needs: targetIsTyped,
        avoid: [noSource, sourceIsWiderThatTargetCond],
      }),
    },
    sort: [false, true],
  })

  const inferByFilter = flag({
    needs: [
      computeVariants({
        source: {filterType, sourceSubtype, combinable},
        variant: {
          filter: {
            store: {filterType: 'store'},
            nonStore: [{filterType: 'fn'}, {filterType: 'bool'}],
          },
          source: {
            nullableField: {sourceSubtype: 'nullableField'},
            plain: {combinable: false},
            combinable: {combinable: true},
          },
        },
        cases: {
          store: false,
          nonStore: {
            nullableField: true,
            plain: true,
            combinable: false,
          },
        },
      }),
      targetIsTyped,
    ],
    avoid: bool({
      source: {sourceType, filterType, sourceIsWiderThatTarget},
      true: {
        sourceType: 'unit',
        filterType: 'fn',
        sourceIsWiderThatTarget: true,
      },
    }),
    sort: [false, true],
  })
  const fnSecondArg = flag({
    needs: [
      bool({
        source: {filterType, clockType},
        true: [
          {filterType: 'fn', clockType: 'unit'},
          {filterType: 'fn', clockType: 'array'},
        ],
      }),
    ],
    avoid: [
      wrongTarget,
      bool({
        source: {sourceType},
        true: {sourceType: 'no'},
      }),
    ],
    sort: [false, true],
  })
  function permuteTargets({
    correctObject,
    correctObjectWide,
    wrongObject,
    wrongObjectWide,
    correctTuple,
    correctTupleWide,
    wrongTuple,
    wrongTupleWide,
  }: {
    correctObject: string[]
    correctObjectWide: string[]
    wrongObject: string[]
    wrongObjectWide: string[]
    correctTuple: string[]
    correctTupleWide: string[]
    wrongTuple: string[]
    wrongTupleWide: string[]
  }) {
    return {
      nonTuple: {
        correct: {
          same: value(correctObject),
          wide: value(correctObjectWide),
        },
        wrong: {
          same: value(wrongObject),
          wide: value(wrongObjectWide),
        },
      },
      tuple: {
        correct: {
          same: value(correctTuple),
          wide: value(correctTupleWide),
        },
        wrong: {
          same: value(wrongTuple),
          wide: value(wrongTupleWide),
        },
      },
    }
  }
  //@ts-ignore
  const targetValue: Separate<string | string[]> = separate({
    source: {
      targetType,
      targetSubtype,
      targetVoid,
      targetAny,
      sourceType,
      wrongTarget,
      sourceIsWiderThatTarget,
    },
    variant: {
      targetKind: {
        smallObject: {targetSubtype: 'smallObject'},
        smallTuple: {targetSubtype: 'smallTuple'},
        tooWideObject: {targetSubtype: 'tooWideObject'},
        nonNullFieldSmall: {targetSubtype: 'nonNullFieldSmall'},
        wrongFieldSmall: {targetSubtype: 'wrongFieldSmall'},
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
        none: {sourceType: 'no'},
        nonTuple: [{sourceType: 'unit'}, {sourceType: 'object'}],
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
    } as const,
    cases: {
      //@ts-ignore
      smallObject: value('aNum'),
      smallTuple: value('lNum'),
      tooWideObject: value('ab'),
      nonNullFieldSmall: value('aNum'),
      wrongFieldSmall: value('aStr'),
      singleVoid: value('voidt'),
      singleAny: value('anyt'),
      single: {
        none: {
          correct: value('numt'),
          wrong: value('strt'),
        },
        nonTuple: {
          correct: {
            wide: value('aNum'),
            same: value('ab'),
          },
          wrong: {
            wide: value('aStr'),
            same: value('abn'),
          },
        },
        tuple: {
          correct: {
            wide: value('lNum'),
            same: value('lNumStr'),
          },
          wrong: {
            wide: value('lStr'),
            same: value('lNumNum'),
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
  })
  const targetCode = computeFn({
    source: {targetValue},
    fn({targetValue}) {
      return Array.isArray(targetValue) ? printArray(targetValue) : targetValue
    },
  })
  const clockCode = separate({
    source: {clockType, fnSecondArg},
    variant: {
      clock: {
        noClock: {clockType: 'no'},
        clockSingle: {clockType: 'unit'},
        clockArray: {clockType: 'array'},
      } as const,
      fnArg: {
        hasFnSecondArg: {fnSecondArg: true},
        noFnSecondArg: {},
      },
    },
    cases: {
      noClock: value(null),
      clockSingle: {
        hasFnSecondArg: value('numt'),
        noFnSecondArg: value('anyt'),
      },
      clockArray: {
        hasFnSecondArg: value('[numt,$num]'),
        noFnSecondArg: value('[anyt]'),
      },
    },
  })
  const clockDescription = computeVariant({
    source: {clockType},
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
  })
  const sourceCode = separate({
    source: {sourceType, sourceSubtype, filterType, inferByFilter},
    variant: {
      AsourceSubtype: {
        fullObject: {sourceSubtype: 'fullObject'},
        nullableField: {sourceSubtype: 'nullableField'},
        smallObject: {sourceSubtype: 'smallObject'},
        fullTuple: {sourceSubtype: 'fullTuple'},
        smallTuple: {sourceSubtype: 'smallTuple'},
      } as const,
      Bsource: {
        none: {sourceType: 'no'},
        unit: {sourceType: 'unit'},
        object: {sourceType: 'object'},
        tuple: {sourceType: 'tuple'},
      } as const,
      Cfilter: {
        fn: {filterType: 'fn'},
        store: {filterType: 'store'},
        boolFn: {filterType: 'bool'},
      } as const,
      Dinfer: {
        infer: {inferByFilter: true},
        noInfer: {inferByFilter: false},
      },
    },
    cases: {
      fullObject: value('{a,b}'),
      nullableField: value('{a:aOpt,b}'),
      smallObject: value('{a}'),
      fullTuple: value('[a,b]'),
      smallTuple: value('[a]'),
      __: {
        none: value<string | null>(null),
        unit: {
          fn: {
            infer: value('abNull'),
            noInfer: value('ab'),
          },
          boolFn: {
            infer: value('nullableAB'),
            noInfer: value('ab'),
          },
          store: value('ab'),
        },
        object: value('{a,b}'),
        tuple: value('[a,b]'),
      },
    },
  })
  const filterCode: Separate<string> = separate({
    source: {filterType, fnSecondArg, sourceType, sourceSubtype, inferByFilter},
    variant: {
      Afilter: {
        fn: {filterType: 'fn'},
        store: {filterType: 'store'},
        boolFn: {filterType: 'bool'},
      },
      BfnArg: {
        hasFnSecondArg: {fnSecondArg: true},
        noFnSecondArg: {},
      },
      Csource: {
        none: {sourceType: 'no'},
        fullObject: {sourceSubtype: 'fullObject'},
        nullableField: {sourceSubtype: 'nullableField'},
        smallObject: {sourceSubtype: 'smallObject'},
        fullTuple: {sourceSubtype: 'fullTuple'},
        smallTuple: {sourceSubtype: 'smallTuple'},
        unit: {sourceType: 'unit'},
        object: {sourceType: 'object'},
        tuple: {sourceType: 'tuple'},
      },
      Dinfer: {
        infer: {inferByFilter: true},
        noInfer: {inferByFilter: false},
      },
    },
    cases: {
      fn: {
        //@ts-ignore
        hasFnSecondArg: {
          unit: {
            infer: value('(val,n): val is AB => n > 0 && val.a !== null'),
            noInfer: value('(val,n) => val.a > n'),
          },
          fullObject: {
            infer: value('(val,n): val is AB => val.a > n'),
            noInfer: value('(val,n) => val.a > n'),
          },
          object: {
            infer: value('(val,n): val is AB => val.a > n'),
            noInfer: value('(val,n) => val.a > n'),
          },
          nullableField: {
            infer: value(
              "(val,n): val is AB => typeof val.a === 'number' && val.a > n",
            ),
            noInfer: value("(val,n) => typeof val.a === 'number' && val.a > n"),
          },
          smallObject: {
            infer: value('(val,n): val is Astr => val.a > n'),
            noInfer: value('(val,n) => val.a > n'),
          },
          fullTuple: value('(val, n) => val[0] > n'),
          tuple: value('(val, n) => val[0] > n'),
          smallTuple: value('(val, n) => val[0] > n'),
        },
        noFnSecondArg: {
          none: {
            infer: value("(n): n is number => typeof n === 'number' && n > 0"),
            noInfer: value('(n) => n > 0'),
          },
          unit: {
            infer: value('(val): val is AB => val.a !== null'),
            noInfer: value('(val) => val.a > 0'),
          },
          fullObject: {
            infer: value('(val): val is AB => val.a > 0'),
            noInfer: value('(val) => val.a > 0'),
          },
          object: {
            infer: value('(val): val is AB => val.a > 0'),
            noInfer: value('(val) => val.a > 0'),
          },
          nullableField: {
            infer: value(
              "(val): val is AB => typeof val.a === 'number' && val.a > 0",
            ),
            noInfer: value("(val) => typeof val.a === 'number' && val.a > 0"),
          },
          smallObject: {
            infer: value('(val): val is Astr => val.a > 0'),
            noInfer: value('(val) => val.a > 0'),
          },
          fullTuple: value('(val) => val[0] > 0'),
          tuple: value('(val) => val[0] > 0'),
          smallTuple: value('(val) => val[0] > 0'),
        },
      },
      store: value('$filter'),
      boolFn: value('Boolean'),
    },
  })

  const groupTokens = computeFn({
    source: {
      inferByFilter,
      sourceIsWiderThatTarget,
      sourceType,
      targetType,
      clockDescription,
    },
    fn({
      inferByFilter,
      sourceIsWiderThatTarget,
      sourceType,
      targetType,
      clockDescription,
    }) {
      const nullable = inferByFilter ? 'nullable ' : ''
      return `${nullable}${sourceType}${clockDescription} -> ${targetType} ${
        sourceIsWiderThatTarget ? 'wide' : 'same'
      }`
    },
  })

  sortOrder([
    inferByFilter,
    sourceType,
    sourceSubtype,
    targetType,
    targetSubtype,
    filterType,
    clockType,
    sourceIsWiderThatTarget,
    fnSecondArg,
  ])

  config({
    file: 'generated/guard',
    usedMethods: ['createStore', 'createEvent', 'guard'],
    header,
    grouping: {
      pass: bool({source: {wrongTarget}, true: {wrongTarget: false}}),
      getHash: [
        inferByFilter,
        sourceIsWiderThatTarget,
        filterType,
        sourceType,
        targetType,
        clockType,
      ],
      tags: {
        inferByFilter,
        sourceIsWiderThatTarget,
        filter: filterType,
        source: sourceType,
        target: targetType,
        clock: clockType,
      },
      describeGroup: computeFn({
        source: {groupTokens, sourceType},
        fn: ({groupTokens, sourceType}) => ({
          largeGroup: `${sourceType} source`,
          description: groupTokens,
        }),
      }),

      createTestLines: {
        method: 'guard',
        shape: {
          source: sourceCode,
          clock: clockCode,
          target: targetCode,
          filter: filterCode,
        },
      },
    },
  })
}

const header = `
type Astr = {a: string}
type AB = {a: number; b: string}
type AoptB = {a: number | null; b: string}
type ABN = {a: number; b: number}
const $filter = createStore(true)
const a = createStore(0)
const aOpt = createStore<number | null>(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
const numt = createEvent<number>()
const strt = createEvent<number>()
const $num = createStore(0)
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
`
