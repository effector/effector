const {generateCaseSetFile, printArray} = require('../generateCaseSetFile')

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

const grouping = {
  getHash: ({descriptionTokens}) => descriptionTokens,
  describeGroup: ({groupTokens, largeGroup}) => ({
    largeGroup,
    description: groupTokens,
  }),
  createTestLines: ({methodCode, pass}) => [
    pass ? null : '//@ts-expect-error',
    methodCode,
  ],
  sortByFields: {
    inferByFilter: [false, true],
    sourceType: ['unit', 'object', 'tuple'],
    targetType: ['unit', 'array'],
    filterType: ['fn', 'store', 'bool'],
    clockType: ['no', 'unit', 'array'],
    sourceIsWiderThatTarget: [false, true],
    fnSecondArg: [false, true],
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
}) {
  const op = value => (permute ? {permute: value} : {value})
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
    bool: {
      true: [Source.object, Source.tuple],
      false: Source.unit,
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
      avoid: {
        true: {sourceType: 'tuple'},
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
      avoid: 'wrongTarget',
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
        noClock: '',
        clockSingle: {
          hasFnSecondArg: 'clock: numt, ',
          noFnSecondArg: 'clock: anyt, ',
        },
        clockArray: {
          hasFnSecondArg: 'clock: [numt, $num], ',
          noFnSecondArg: 'clock: [anyt], ',
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
        fnArg: {
          hasFnSecondArg: {fnSecondArg: true},
          noFnSecondArg: {},
        },
        Source,
        infer: {
          infer: {inferByFilter: true},
          noInfer: {inferByFilter: false},
        },
      },
      cases: {
        fn: {
          hasFnSecondArg: {
            unit: {
              infer: '(val, n): val is AB => n > 0 && val.a !== null',
              noInfer: '(val, n) => val.a > n',
            },
            object: {
              infer: '(val, n): val is AB => val.a > n',
              noInfer: '(val, n) => val.a > n',
            },
            tuple: '(val, n) => val[0] > n',
          },
          noFnSecondArg: {
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
        filterType,
        sourceType,
        targetType,
        targetVoid,
        clockDescription,
      }) {
        const nullable = inferByFilter ? 'nullable ' : ''
        return `${nullable}${sourceType}${clockDescription} -> ${targetType} ${
          sourceIsWiderThatTarget ? 'wide' : 'same'
        }`
      },
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
      }) => `${sourceType} source`,
    },
  },
  pass: {
    bool: {
      true: {wrongTarget: false},
      false: {wrongTarget: true},
    },
  },
  methodCode: {
    compute: {
      fn({filterType, sourceCode, clockCode, filterCode, targetCode}) {
        return `guard({source: ${sourceCode}, ${clockCode}target: ${targetCode}, filter: ${filterCode}})`
      },
    },
  },
}

const header = `
type AB = {a: number; b: string}
type ABN = {a: number; b: number}
const $filter = createStore(true)
const a = createStore(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
const numt = createEvent<number>()
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

module.exports = {shape, grouping, header}
