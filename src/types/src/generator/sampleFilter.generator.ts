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
  every,
  not,
  matchUnion,
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

  const fnType = union({
    oneOf: [
      'no',
      'good untyped',
      'good typed',
      'bad untyped',
      'bad typed',
      'bad return',
    ],
    sort: [
      'no',
      'good untyped',
      'good typed',
      'bad untyped',
      'bad typed',
      'bad return',
    ],
  })
  const sourceType = separate({
    source: {clockType, filterType},
    variant: {
      clock: {
        noClock: {clockType: 'no'},
        hasClock: {},
      },
      filter: {
        boolFilter: {filterType: 'bool'},
        nonBool: {},
      },
    } as const,
    cases: {
      //@ts-expect-error
      noClock: {
        boolFilter: union(['unit']),
        nonBool: union(['unit', 'object', 'tuple']),
      },
      hasClock: {
        boolFilter: union(['no', 'unit']),
        nonBool: union(['no', 'unit', 'object', 'tuple']),
      },
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
        wrong: union(['tooWideObject', 'wrongFieldSmall'] as const),
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

  const badFilter = bool({
    source: {
      targetAny,
      targetVoid,
      clockIsArray: bool({source: {clockType}, true: {clockType: 'array'}}),
      fnType,
      wrongTarget,
    },
    true: [
      {
        targetAny: false,
        targetVoid: false,
        clockIsArray: false,
        wrongTarget: false,
        fnType: 'good untyped',
      },
      {
        targetAny: false,
        targetVoid: false,
        clockIsArray: false,
        wrongTarget: false,
        fnType: 'no',
      },
    ],
  })

  const badFilterType = separate({
    source: {
      isFn: flag({needs: badFilter}),
    },
    variant: {
      byFlag: {
        isFn: {isFn: true},
        isNull: {},
      },
    },
    cases: {
      isFn: value('isFn' as const),
      isNull: value('isNull' as const),
    },
  })

  //@ts-expect-error
  const filterFnType: Separate<
    | 'no'
    | 'infer'
    | 'good untyped'
    | 'good typed'
    | 'bad untyped'
    | 'bad typed'
    | 'bad filter'
  > = separate({
    source: {
      sourceType,
      clockType,
      filterType,
      inferByFilter,
      badFilter,
    },
    variant: {
      src: {
        noSource: {sourceType: 'no'},
        hasSource: {},
      } as const,
      filter: {
        fn: {filterType: 'fn'},
        rest: {},
      } as const,
      infer: {
        infer: {inferByFilter: true},
        noInferNoLooseTypes: {badFilter: true},
        noInfer: {},
      } as const,
    } as const,
    cases: {
      //@ts-expect-error
      noSource: {
        fn: {
          infer: union(['infer']),
          noInferNoLooseTypes: union([
            'good untyped',
            'good typed',
            'bad untyped',
            'bad typed',
            'bad filter',
          ]),
          noInfer: union([
            'good untyped',
            'good typed',
            'bad untyped',
            'bad typed',
          ]),
        },
        rest: union(['no']),
      },
      hasSource: union(['no']),
    },
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
  type TargetType =
    | 'aNum'
    | 'lNum'
    | 'ab'
    | 'aNum'
    | 'aStr'
    | 'voidt'
    | 'anyt'
    | '$ab'
    | 'strt'
    | 'abn'
    | 'lNumStr'
    | 'lNumNum'
    | 'lStr'
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
    correctObject: TargetType[]
    correctObjectWide: TargetType[]
    wrongObject: TargetType[]
    wrongObjectWide: TargetType[]
    correctTuple: TargetType[]
    correctTupleWide: TargetType[]
    wrongTuple: TargetType[]
    wrongTupleWide: TargetType[]
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
  //@ts-expect-error
  const targetValue: Separate<TargetType | TargetType[]> = separate({
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
      //@ts-expect-error
      smallObject: value('aNum'),
      smallTuple: value('lNum'),
      tooWideObject: value('ab'),
      nonNullFieldSmall: value('aNum'),
      wrongFieldSmall: value('aStr'),
      singleVoid: value('voidt'),
      singleAny: value('anyt'),
      single: {
        none: {
          correct: value('$ab'),
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
  const fnCode = separate({
    source: {
      fnType,
      sourceType,
      clockType,
      targetType,
      sourceSubtype,
      inferByFilter,
      filterType,
    },
    variant: {
      dataSources: {
        clockOnly: {sourceType: 'no'},
        nullableField: {sourceSubtype: 'nullableField'},
      } as const,
      infer: {
        inferClockOnly: {
          sourceType: 'no',
          inferByFilter: true,
          targetType: 'unit',
        },
        infer: {inferByFilter: true},
        noInfer: {inferByFilter: false},
      } as const,
      fnType: {
        noFn: {fnType: 'no'},
        goodUntyped: {fnType: 'good untyped'},
        goodTyped: {fnType: 'good typed'},
        badUntyped: {fnType: 'bad untyped'},
        badTyped: {fnType: 'bad typed'},
        badReturn: {fnType: 'bad return'},
      } as const,
      filter: {
        bool: {filterType: 'bool'},
        rest: {},
      } as const,
    },
    cases: {
      clockOnly: {
        inferClockOnly: {
          noFn: value(null),
          goodUntyped: value('(val) => ({a:val.a, b:val.b})'),
          goodTyped: value('(val: AB) => ({a:val.a, b:val.b})'),
          badUntyped: value('(val) => ({a:val.c, b:val.b})'),
          badTyped: value('(val: ABN) => ({a:val.a, b:val.b})'),
          badReturn: value('() => ({a:0, b:1})'),
        },
        noInfer: {
          noFn: value(null),
          goodUntyped: {
            bool: value('(val) => ({a:val.a, b:val.b})'),
            rest: value("(val) => ({a:1, b: val ? val.b : ''})"),
          },
          goodTyped: {
            bool: value('(val: AB) => ({a:val.a, b:val.b})'),
            rest: value("(val: AB | null) => ({a:1, b: val ? val.b : ''})"),
          },
          badUntyped: value('(val) => ({a:val.c, b:val.b})'),
          badTyped: value("(val: ABN) => ({a:val.c, b:''})"),
          badReturn: value(null),
        },
      },
      nullableField: {
        infer: {
          noFn: value(null),
          goodUntyped: value('(val) => ({a: val.a + 1, b: val.b})'),
          goodTyped: value('(val: AB) => ({a: val.a + 1, b: val.b})'),
          badUntyped: value('(val) => ({a: 1 + val.c, b: val.b})'),
          badTyped: value("(val: ABN) => ({a: val.a + 1, b: ''})"),
          badReturn: value("() => 'wrong'"),
        },
        noInfer: {
          noFn: value(null),
          goodUntyped: value('(val) => ({a: 0, b: `${val.b.length}`})'),
          goodTyped: value('(val: AoptB) => ({a: 0, b: `${val.b.length}`})'),
          badUntyped: value('(val) => ({a: val.a + 1, b: val.b})'),
          badTyped: value('(val: AB) => ({a: val.a + 1, b: val.b})'),
          badReturn: value("() => 'wrong'"),
        },
      },
      __: value(null),
    },
  })
  const clockCode = separate({
    source: {clockType, sourceType, fnSecondArg},
    variant: {
      clock: {
        clockOnlySingle: {sourceType: 'no', clockType: 'unit'},
        clockOnlyArray: {sourceType: 'no', clockType: 'array'},
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
      clockOnlySingle: value('nullableAB'),
      clockOnlyArray: value('[ab,nullableAB]'),
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
  const asConst = flag()
  const sourceCode = separate({
    source: {sourceType, sourceSubtype, filterType, inferByFilter, asConst},
    variant: {
      AsourceSubtype: {
        fullObject: {sourceSubtype: 'fullObject'},
        nullableField: {sourceSubtype: 'nullableField'},
        smallObject: {sourceSubtype: 'smallObject'},
        fullTuple: {sourceSubtype: 'fullTuple', asConst: false},
        fullTupleConst: {sourceSubtype: 'fullTuple', asConst: true},
        smallTuple: {sourceSubtype: 'smallTuple', asConst: false},
        smallTupleConst: {sourceSubtype: 'smallTuple', asConst: true},
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
      fullTupleConst: value('[a,b] as const'),
      smallTuple: value('[a]'),
      smallTupleConst: value('[a] as const'),
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
    source: {
      filterType,
      fnSecondArg,
      sourceType,
      sourceSubtype,
      inferByFilter,
      filterFnType,
      badFilterType,
    },
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
      Etype: {
        goodUntyped: {filterFnType: 'good untyped'},
        goodTyped: {filterFnType: 'good typed'},
        badUntyped: {filterFnType: 'bad untyped'},
        badTyped: {filterFnType: 'bad typed'},
        badReturn: {filterFnType: 'bad filter', badFilterType: 'isFn'},
        badFilter: {filterFnType: 'bad filter', badFilterType: 'isNull'},
      },
    },
    cases: {
      fn: {
        //@ts-expect-error
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
            infer: value('(clk): clk is AB => clk !== null'),
            noInfer: {
              goodUntyped: value('(clk) => clk !== null'),
              goodTyped: value('(clk: AB | null) => clk !== null'),
              badUntyped: value('(clk) => clk.a > 0'),
              badTyped: value('(clk: AB) => clk.a > 0'),
              badReturn: value('() => 1'),
              badFilter: value('null'),
            },
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
      sourceIsWiderThatTarget,
      sourceType,
      clockType,
      targetType,
      targetValue,
      fnType,
      filterFnType,
      badFilterType,
    },
    fn({
      sourceIsWiderThatTarget,
      sourceType,
      clockType,
      targetType,
      targetValue,
      fnType,
      filterFnType,
      badFilterType,
    }) {
      if (filterFnType === 'bad filter') {
        if (badFilterType === 'isFn') return 'bad return'
        if (badFilterType === 'isNull') return 'not a function'
      }
      const src = sourceType === 'no' ? '' : sourceType
      const srcClkSep = sourceType === 'no' || clockType === 'no' ? '' : ' + '
      const clk =
        clockType === 'no' ? '' : clockType === 'unit' ? 'clock' : '[clock]'
      const fn = fnType === 'no' ? '' : ', fn'
      const trg = targetValue ? targetType : 'new unit'
      const isWider = sourceIsWiderThatTarget ? 'wide' : 'same'
      return `${src}${srcClkSep}${clk}${fn} -> ${trg} ${isWider}`
    },
  })

  const pass = bool({
    source: {
      wrongTarget,
      sourceType,
      targetType,
      sourceSubtype,
      filterType,
      inferByFilter,
      fnType,
      filterFnType,
    },
    //prettier-ignore
    false: [
      {wrongTarget: true},
      {sourceSubtype: 'nullableField', filterType: 'store', fnType: 'bad typed'},
      {sourceSubtype: 'nullableField', filterType: 'store', fnType: 'bad untyped'},
      {sourceSubtype: 'nullableField', filterType: 'store', fnType: 'bad return'},
      {sourceSubtype: 'nullableField', filterType: 'store', fnType: 'no'},
      {sourceSubtype: 'nullableField', filterType: 'fn', inferByFilter: false, fnType: 'bad typed'},
      {sourceSubtype: 'nullableField', filterType: 'fn', inferByFilter: false, fnType: 'bad untyped'},
      {sourceSubtype: 'nullableField', filterType: 'fn', inferByFilter: false, fnType: 'bad return'},
      {sourceSubtype: 'nullableField', filterType: 'fn', inferByFilter: false, fnType: 'no'},
      {sourceSubtype: 'nullableField', fnType: 'bad typed'},
      {sourceSubtype: 'nullableField', fnType: 'bad untyped'},
      {sourceSubtype: 'nullableField', fnType: 'bad return'},
      {sourceType: 'no', targetType: 'unit', filterType: 'store', fnType: 'bad typed'},
      {sourceType: 'no', targetType: 'unit', filterType: 'store', fnType: 'bad untyped'},
      {sourceType: 'no', targetType: 'unit', filterType: 'store', fnType: 'bad return'},
      {sourceType: 'no', targetType: 'unit', filterType: 'store', fnType: 'no'},
      {sourceType: 'no', targetType: 'unit', filterType: 'fn', fnType: 'bad typed'},
      {sourceType: 'no', targetType: 'unit', filterType: 'fn', fnType: 'bad untyped'},
      {sourceType: 'no', targetType: 'unit', filterType: 'fn', fnType: 'bad return'},
      {sourceType: 'no', targetType: 'unit', filterType: 'fn', inferByFilter: false, fnType: 'no'},
      {sourceType: 'no', fnType: 'bad typed'},
      {sourceType: 'no', fnType: 'bad untyped'},
      {sourceType: 'no', targetType: 'unit', fnType: 'bad return'},
      {sourceType: 'no', filterFnType: 'bad typed'},
      {sourceType: 'no', filterFnType: 'bad untyped'},
      {sourceType: 'no', filterFnType: 'bad filter'},
    ],
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
    file: 'generated/sampleFilter',
    usedMethods: ['createStore', 'createEvent', 'sample'],
    header,
    grouping: {
      pass,
      getHash: [
        inferByFilter,
        sourceIsWiderThatTarget,
        filterType,
        sourceType,
        sourceCode,
        fnType,
        targetType,
        clockType,
        filterFnType,
        badFilterType,
      ],
      tags: {
        inferByFilter,
        sourceIsWiderThatTarget,
        filter: filterType,
        source: sourceType,
        sourceCode,
        target: targetType,
        clock: clockType,
        fn: fnType,
        filterFn: filterFnType,
      },
      describeGroup: computeFn({
        source: {groupTokens, sourceType, filterFnType},
        fn: ({groupTokens, sourceType, filterFnType}) => ({
          largeGroup:
            filterFnType === 'bad filter'
              ? 'bad filter'
              : `${sourceType} source`,
          description: groupTokens,
        }),
      }),

      createTestLines: {
        method: 'sample',
        shape: {
          source: sourceCode,
          clock: clockCode,
          target: {
            field: targetValue,
            markError: separate({
              source: {pass},
              variant: {
                _: {
                  pass: {pass: true},
                },
              },
              cases: {
                pass: value(false),
                __: value<TargetType[]>([
                  'abn',
                  'voidt',
                  'strt',
                  'aStr',
                  'lNumNum',
                ]),
              },
            }),
          },
          filter: {
            field: filterCode,
            markError: matchUnion(filterFnType, [
              'bad filter',
              'bad typed',
              'bad untyped',
            ]),
          },
          fn: fnCode,
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
const $ab = createStore<AB>({a: 0, b: ''})
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
