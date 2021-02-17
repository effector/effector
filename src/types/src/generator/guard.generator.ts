import {printArray} from '../runner/text'

const Source = {
  none: {sourceType: 'no'},
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

const grouping = {
  getHash: ({descriptionTokens}: any) => descriptionTokens,
  describeGroup: ({groupTokens, largeGroup}: any) => ({
    largeGroup,
    description: groupTokens,
  }),
  createTestLines: {
    method: 'guard',
    align: true,
    shape: {
      source: 'sourceCode',
      clock: 'clockCode',
      target: 'targetCode',
      filter: 'filterCode',
    },
  },
  sortByFields: {
    inferByFilter: [false, true],
    sourceType: ['unit', 'object', 'tuple', 'no'],
    sourceSubtype: [
      'fullObject',
      'nullableField',
      'smallObject',
      'fullTuple',
      'smallTuple',
    ],
    targetType: ['unit', 'array'],
    targetSubtype: [
      'smallObject',
      'tooWideObject',
      'nonNullFieldSmall',
      'wrongFieldSmall',
      'smallTuple',
    ],
    filterType: ['fn', 'store', 'bool'],
    clockType: ['no', 'unit', 'array'],
    sourceIsWiderThatTarget: [false, true],
    fnSecondArg: [false, true],
  },
  filter(val: any) {
    if (val.sourceSubtype === 'nullableField') {
      if (val.filterType !== 'fn') return false
      if (val.wrongTarget) return false
      if (!val.inferByFilter) return false
      // if (!val.inferByFilter && !val.targetVoid && !val.targetAny) return false
    }
    return true
  },
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
}: any) {
  const op = (value: any) => (permute ? {permute: value} : {value})
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

const shape = {
  clockType: {
    union: ['no', 'unit', 'array'],
  },
  filterType: {
    union: ['fn', 'store', 'bool'],
  },
  sourceType: {
    split: {
      variant: {
        noClock: {clockType: 'no'},
      },
      cases: {
        noClock: {
          union: ['unit', 'object', 'tuple'],
        },
        __: {
          union: ['no', 'unit', 'object', 'tuple'],
        },
      },
    },
  },
  targetType: {
    union: ['unit', 'array'],
  },
  sourceSubtype: {
    split: {
      variants: {
        source: {
          object: Source.object,
          tuple: Source.tuple,
        },
        target: {
          targetUnit: Target.unit,
          // targetArray: Target.array,
        },
      },
      cases: {
        object: {
          targetUnit: {
            union: ['fullObject', 'nullableField', 'smallObject'],
          },
        },
        tuple: {
          targetUnit: {
            union: ['fullTuple', 'smallTuple'],
          },
        },
      },
    },
  },
  noSource: {
    true: Source.none,
  },
  targetVoid: {
    flag: {
      avoid: [
        'noSource',
        {
          true: [
            {sourceSubtype: 'smallTuple'},
            {sourceSubtype: 'nullableField'},
            {sourceSubtype: 'smallObject'},
          ],
        },
      ],
    },
  },
  noTargetAny: {
    true: [
      {sourceSubtype: 'smallTuple'},
      {sourceSubtype: 'nullableField'},
      {sourceSubtype: 'smallObject'},
    ],
  },
  targetAny: {
    split: {
      match: 'targetType',
      cases: {
        unit: {
          flag: {
            avoid: ['targetVoid', 'noSource', 'noTargetAny'],
          },
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
    bool: {
      true: [Source.object, Source.tuple],
      false: [Source.none, Source.unit],
    },
  },
  wrongTarget: {
    flag: {
      needs: ['targetIsTyped'],
      avoid: 'noSource',
    },
  },
  targetSubtype: {
    split: {
      variants: {
        src: {
          smallObject: {sourceSubtype: 'smallObject'},
          nullableField: {sourceSubtype: 'nullableField'},
          smallTuple: {sourceSubtype: 'smallTuple'},
        },
        isCorrect: {
          correct: {wrongTarget: false},
          wrong: {wrongTarget: true},
        },
      },
      cases: {
        smallObject: {
          correct: {
            value: 'smallObject',
          },
          wrong: {
            union: ['tooWideObject', 'wrongFieldSmall'],
          },
        },
        nullableField: {
          correct: {
            value: 'smallObject',
          },
          wrong: {
            value: 'nonNullFieldSmall',
          },
        },
        smallTuple: {
          correct: {
            value: 'smallTuple',
          },
        },
      },
    },
  },
  sourceIsWiderThatTargetCond: {
    true: [
      Source.tuple,
      Source.none,
      {sourceSubtype: 'smallObject'},
      {sourceSubtype: 'smallTuple'},
      {sourceSubtype: 'nullableField'},
      {targetSubtype: 'smallTuple'},
    ],
  },
  sourceIsWiderThatTarget: {
    split: {
      variant: {
        nullableField: {sourceSubtype: 'nullableField'},
      },
      cases: {
        nullableField: {value: true},
        __: {
          flag: {
            needs: ['targetIsTyped'],
            avoid: ['noSource', 'sourceIsWiderThatTargetCond'],
          },
        },
      },
    },
  },
  inferByFilter: {
    flag: {
      needs: [
        {
          compute: {
            variants: {
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
          },
        },
        'targetIsTyped',
      ],
      avoid: {
        true: {
          sourceType: 'unit',
          filterType: 'fn',
          sourceIsWiderThatTarget: true,
        },
      },
    },
  },
  fnSecondArg: {
    flag: {
      needs: {
        true: [
          {
            filterType: 'fn',
            clockType: 'unit',
          },
          {
            filterType: 'fn',
            clockType: 'array',
          },
        ],
      },
      avoid: ['wrongTarget', {true: Source.none}],
    },
  },
  targetValue: {
    split: {
      variants: {
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
          none: Source.none,
          nonTuple: [Source.unit, Source.object],
          tuple: Source.tuple,
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
        smallObject: 'aNum',
        smallTuple: 'lNum',
        tooWideObject: 'ab',
        nonNullFieldSmall: 'aNum',
        wrongFieldSmall: 'aStr',
        singleVoid: 'voidt',
        singleAny: 'anyt',
        single: {
          none: {
            correct: 'numt',
            wrong: 'strt',
          },
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
      fn: ({targetValue}: any) =>
        Array.isArray(targetValue) ? printArray(targetValue) : targetValue,
    },
  },
  clockCode: {
    compute: {
      variants: {
        clock: {
          noClock: {clockType: 'no'},
          clockSingle: {clockType: 'unit'},
          clockArray: {clockType: 'array'},
        },
        fnArg: {
          hasFnSecondArg: {fnSecondArg: true},
          noFnSecondArg: {},
        },
      },
      cases: {
        noClock: null,
        clockSingle: {
          hasFnSecondArg: 'numt',
          noFnSecondArg: 'anyt',
        },
        clockArray: {
          hasFnSecondArg: '[numt,$num]',
          noFnSecondArg: '[anyt]',
        },
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
        sourceSubtype: {
          fullObject: {sourceSubtype: 'fullObject'},
          nullableField: {sourceSubtype: 'nullableField'},
          smallObject: {sourceSubtype: 'smallObject'},
          fullTuple: {sourceSubtype: 'fullTuple'},
          smallTuple: {sourceSubtype: 'smallTuple'},
        },
        Source,
        Filter,
        infer: {
          infer: {inferByFilter: true},
          noInfer: {inferByFilter: false},
        },
      },
      cases: {
        fullObject: '{a,b}',
        nullableField: '{a:aOpt,b}',
        smallObject: '{a}',
        fullTuple: '[a,b]',
        smallTuple: '[a]',
        __: {
          none: null,
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
          object: '{a,b}',
          tuple: '[a,b]',
        },
      },
    },
  },
  filterCode: {
    compute: {
      variants: {
        Filter,
        fnArg: {
          hasFnSecondArg: {fnSecondArg: true},
          noFnSecondArg: {},
        },
        source: {
          none: Source.none,
          fullObject: {sourceSubtype: 'fullObject'},
          nullableField: {sourceSubtype: 'nullableField'},
          smallObject: {sourceSubtype: 'smallObject'},
          fullTuple: {sourceSubtype: 'fullTuple'},
          smallTuple: {sourceSubtype: 'smallTuple'},
          unit: Source.unit,
          object: Source.object,
          tuple: Source.tuple,
        },
        infer: {
          infer: {inferByFilter: true},
          noInfer: {inferByFilter: false},
        },
      },
      cases: {
        fn: {
          hasFnSecondArg: {
            unit: {
              infer: '(val,n): val is AB => n > 0 && val.a !== null',
              noInfer: '(val,n) => val.a > n',
            },
            fullObject: {
              infer: '(val,n): val is AB => val.a > n',
              noInfer: '(val,n) => val.a > n',
            },
            object: {
              infer: '(val,n): val is AB => val.a > n',
              noInfer: '(val,n) => val.a > n',
            },
            nullableField: {
              infer:
                "(val,n): val is AB => typeof val.a === 'number' && val.a > n",
              noInfer: "(val,n) => typeof val.a === 'number' && val.a > n",
            },
            smallObject: {
              infer: '(val,n): val is Astr => val.a > n',
              noInfer: '(val,n) => val.a > n',
            },
            fullTuple: '(val, n) => val[0] > n',
            tuple: '(val, n) => val[0] > n',
            smallTuple: '(val, n) => val[0] > n',
          },
          noFnSecondArg: {
            none: {
              infer: "(n): n is number => typeof n === 'number' && n > 0",
              noInfer: '(n) => n > 0',
            },
            unit: {
              infer: '(val): val is AB => val.a !== null',
              noInfer: '(val) => val.a > 0',
            },
            fullObject: {
              infer: '(val): val is AB => val.a > 0',
              noInfer: '(val) => val.a > 0',
            },
            object: {
              infer: '(val): val is AB => val.a > 0',
              noInfer: '(val) => val.a > 0',
            },
            nullableField: {
              infer:
                "(val): val is AB => typeof val.a === 'number' && val.a > 0",
              noInfer: "(val) => typeof val.a === 'number' && val.a > 0",
            },
            smallObject: {
              infer: '(val): val is Astr => val.a > 0',
              noInfer: '(val) => val.a > 0',
            },
            fullTuple: '(val) => val[0] > 0',
            tuple: '(val) => val[0] > 0',
            smallTuple: '(val) => val[0] > 0',
          },
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
      }: any) =>
        `${inferByFilter} ${sourceType} ${filterType} ${targetType} ${clockType} ${
          sourceIsWiderThatTarget ? 'wide' : 'same'
        }`,
    },
  },
  groupTokens: {
    compute: {
      fn({
        inferByFilter,
        sourceIsWiderThatTarget,
        sourceType,
        targetType,
        clockDescription,
      }: any) {
        const nullable = inferByFilter ? 'nullable ' : ''
        return `${nullable}${sourceType}${clockDescription} -> ${targetType} ${
          sourceIsWiderThatTarget ? 'wide' : 'same'
        }`
      },
    },
  },
  largeGroup: {
    compute: {
      fn: ({sourceType}: any) => `${sourceType} source`,
    },
  },
  pass: {
    bool: {
      true: {wrongTarget: false},
      false: {wrongTarget: true},
    },
  },
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

export default {shape, grouping, header}
