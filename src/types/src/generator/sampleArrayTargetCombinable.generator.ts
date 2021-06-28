import {
  computeFn,
  union,
  value,
  computeVariant,
  computeVariants,
  separate,
  flag,
  permute,
  config,
  bool,
  sortOrder,
} from '../runner/manifold/operators'
import {Ref} from '../runner/manifold/types'

const variables = {
  number: 'num',
  void: 'voidt',
  string: 'str',
  any: 'anyt',
}
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

const failCases = {
  a: ['a_str', 'abn', 'ab', 'a_str_b_num', 'a_str_b_str'],
  ab: ['a_str', 'abn'],
  tuple_a: ['l_str', 'l_num_num', 'l_num_str'],
  tuple_aa: ['l_str', 'l_num_num'],
}

export default () => {
  const source = union({
    oneOf: ['a', 'ab', 'tuple_a', 'tuple_aa'],
    sort: ['ab', 'a', 'tuple_aa', 'tuple_a'],
  })
  const hasClock = flag({sort: [false, true]})
  const sourceType = computeVariant({
    source: {source},
    variant: {
      object: [{source: 'a'}, {source: 'ab'}],
      tuple: [{source: 'tuple_a'}, {source: 'tuple_aa'}],
    },
    cases: {
      object: 'object',
      tuple: 'tuple',
    } as const,
  })
  const fn = flag({name: 'fn', sort: [false, true]})
  const fnClock = flag({needs: [fn, hasClock]})
  const typedFn = flag({needs: [fn]})
  const noFalsePositiveFnClock = flag({
    needs: [fn, typedFn, fnClock, hasClock],
  })
  const noFalsePositiveFnSource = flag({
    needs: [fn, typedFn],
    avoid: noFalsePositiveFnClock,
  })
  const noFalsePositive = bool({
    source: {noFalsePositiveFnSource, noFalsePositiveFnClock},
    true: [{noFalsePositiveFnSource: true}, {noFalsePositiveFnClock: true}],
  })
  const fnWithoutArgs = flag({
    needs: fn,
    avoid: [fnClock, typedFn, noFalsePositiveFnClock, noFalsePositiveFnSource],
  })
  const isPairOfSourceFields = bool({
    source: {sourceType, source},
    true: [
      {sourceType: 'object', source: 'ab'},
      {sourceType: 'tuple', source: 'tuple_aa'},
    ],
  })
  const fnText = computeVariants({
    source: {
      fnWithoutArgs,
      typedFn,
      fnClock,
      noFalsePositiveFnClock,
      noFalsePositiveFnSource,
      sourceType,
      isPairOfSourceFields,
    },
    variant: {
      fnVariants,
      source: {
        object: {sourceType: 'object'},
        tuple: {sourceType: 'tuple'},
      },
      sourceObject: {
        solo: {isPairOfSourceFields: false},
        pair: {isPairOfSourceFields: true},
      },
    },
    cases: {
      fnWithoutArgs: 'fn.noArgs',
      noFalsePositiveFnClock: {
        object: {
          solo: 'fn.assertSecond.object.solo',
          pair: 'fn.assertSecond.object.pair',
        },
        tuple: {
          solo: 'fn.assertSecond.tuple.solo',
          pair: 'fn.assertSecond.tuple.pair',
        },
      },
      noFalsePositiveFnSource_fnClock: {
        object: {
          solo: 'fn.assertFirst.object.solo',
          pair: 'fn.assertFirst.object.pair',
        },
        tuple: {
          solo: 'fn.assertFirst.tuple.solo',
          pair: 'fn.assertFirst.tuple.pair',
        },
      },
      typedFnClock: {
        object: {
          solo: 'fn.typedSrcClock.object.solo',
          pair: 'fn.typedSrcClock.object.pair',
        },
        tuple: {
          solo: 'fn.typedSrcClock.tuple.solo',
          pair: 'fn.typedSrcClock.tuple.pair',
        },
      },
      noFalsePositiveFnSource: {
        object: {
          solo: 'fn.assertFirstOnly.object.solo',
          pair: 'fn.assertFirstOnly.object.pair',
        },
        tuple: {
          solo: 'fn.assertFirstOnly.tuple.solo',
          pair: 'fn.assertFirstOnly.tuple.pair',
        },
      },
      typedNoFnClock: {
        object: {
          solo: 'fn.typedSrc.object.solo',
          pair: 'fn.typedSrc.object.pair',
        },
        tuple: {
          solo: 'fn.typedSrc.tuple.solo',
          pair: 'fn.typedSrc.tuple.pair',
        },
      },
      fnClock: {
        object: {
          solo: "({a},cl) => ({a:a+cl,b:''})",
          pair: '({a,b},cl) => ({a:a+cl,b})',
        },
        tuple: {
          solo: "([a],cl) => ({a:a+cl,b:''})",
          pair: '([a,b],cl) => ({a:a+cl,b})',
        },
      },
      noFnClock: {
        object: {
          solo: "({a}) => ({a,b:''})",
          pair: '({a,b}) => ({a,b})',
        },
        tuple: {
          solo: "([a]) => ({a,b:''})",
          pair: '([a,b]) => ({a,b})',
        },
      },
    },
    sort: 'string',
  })
  const fnDescription = computeVariant({
    name: 'fnDescription',
    source: {
      fnWithoutArgs,
      typedFn,
      fnClock,
      noFalsePositiveFnClock,
      noFalsePositiveFnSource,
    },
    variant: fnVariants,
    cases: {
      fnWithoutArgs: 'untyped',
      noFalsePositiveFnClock: 'assert',
      noFalsePositiveFnSource_fnClock: 'assert',
      typedFnClock: 'typed',
      noFalsePositiveFnSource: 'assert',
      typedNoFnClock: 'typed',
      fnClock: 'untyped',
      noFnClock: 'untyped',
    } as const,
    sort: [undefined as any, 'untyped', 'typed', 'assert'],
  })
  const sourceDescription = computeVariant({
    name: 'sourceDescription',
    source: {sourceType, source},
    variant: {
      objectSolo: {sourceType: 'object', source: 'a'},
      objectPair: {sourceType: 'object', source: 'ab'},
      tupleSolo: {sourceType: 'tuple', source: 'tuple_a'},
      tuplePair: {sourceType: 'tuple', source: 'tuple_aa'},
    },
    cases: {
      objectSolo: 'same',
      objectPair: 'wide',
      tupleSolo: 'same',
      tuplePair: 'wide',
    } as const,
    sort: 'string',
  })
  const sourceCode = computeVariant({
    source: {sourceType, source},
    variant: {
      objectSolo: {sourceType: 'object', source: 'a'},
      objectPair: {sourceType: 'object', source: 'ab'},
      tupleSolo: {sourceType: 'tuple', source: 'tuple_a'},
      tuplePair: {sourceType: 'tuple', source: 'tuple_aa'},
    },
    cases: {
      objectSolo: '{a:$num}',
      objectPair: '{a:$num,b:$str}',
      tupleSolo: '[$num]',
      tuplePair: '[$num,$str]',
    },
  })
  //@ts-ignore
  const target: Ref<string[], 'separate'> = separate({
    source: {fn, sourceType},
    variant: {
      _: {
        object: [{fn: true}, {sourceType: 'object'}],
        tuple: {sourceType: 'tuple'},
      },
    },
    cases: {
      tuple: permute({
        items: ['l_num', 'l_str', 'l_num_str', 'l_num_num'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
      object: permute({
        items: ['a_num', 'a_str', 'abn', 'ab'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
    },
  })
  const clockText = value('num' as const)
  const targetText = computeFn({
    source: {target},
    fn({target}) {
      return target.map(
        //@ts-ignore
        (item: keyof typeof variables) => variables[item] || item,
      )
    },
  })
  const pass = computeFn({
    source: {
      target,
      noFalsePositive,
      fn,
      source,
    },
    fn({noFalsePositive, fn, target, source}) {
      if (noFalsePositive) return false
      if (fn) return failCases.ab.every(failCase => !target.includes(failCase))
      return failCases[source as keyof typeof failCases].every(
        failCase => !target.includes(failCase),
      )
    },
  })
  sortOrder([hasClock, source, sourceDescription, fnDescription, fnText, fn])
  config({
    header,
    file: 'generatedNew/sampleArrayTarget',
    usedMethods: ['createStore', 'createEvent', 'sample', 'combine'],
    grouping: {
      pass,
      createTestLines: {
        method: 'sample',
        shape: {
          source: sourceCode,
          clock: {
            field: clockText,
            when: hasClock,
          },
          target: targetText,
          fn: {
            field: fnText,
            when: fn,
          },
        },
      },
      getHash: (cur: any) =>
        `${cur.sourceDescription} ${cur.fn ? cur.fnDescription : ''}`,
      describeGroup: (cur: any) =>
        `source:${cur.sourceDescription}${
          cur.fn ? `, fn:${cur.fnDescription}` : ''
        }`,
    },
  })
}

const header = `
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

const fn = {
  noArgs: () => ({a:2,b:''}),
  assertFirst: {
    object: {
      solo: ({a}:AS, cl:number) => ({a: cl, b: a}),
      pair: ({a,b}:ABN, cl:number) => ({a:b+cl,b:''})
    },
    tuple: {
      solo: ([a]:[string], cl:number) => ({a:cl,b:a}),
      pair: ([a,b]:[number,number], cl:number) => ({a:b+cl,b:''}),
    }
  },
  assertFirstOnly: {
    object: {
      solo: ({a}:AS) => ({a:0,b:a}),
      pair: ({b}:ABN) => ({a:b,b:''}),
    },
    tuple: {
      solo: ([a]:[string]) => ({a:2,b:a}),
      pair: ([,b]:[number,number]) => ({a:b,b:''}),
    }
  },
  assertSecond: {
    object: {
      solo: ({a}:AN, cl:string) => ({a,b:cl}),
      pair: ({a}:AB, cl:string) => ({a,b:cl}),
    },
    tuple: {
      solo: ([a]:[number], cl:string) => ({a,b:cl}),
      pair: ([a]:[number,string], cl:string) => ({a,b:cl}),
    }
  },
  typedSrc: {
    object: {
      solo: ({a}:AN) => ({a,b:''}),
      pair: ({a,b}:AB) => ({a,b})
    },
    tuple: {
      solo: ([a]:[number]) => ({a,b:''}),
      pair: ([a,b]:[number,string]) => ({a,b}),
    }
  },
  typedSrcClock: {
    object: {
      solo: ({a}:AN, cl:number) => ({a:a+cl,b:''}),
      pair: ({a,b}:AB, cl:number) => ({a:a+cl,b})
    },
    tuple: {
      solo: ([a]:[number], cl:number) => ({a:a+cl,b:''}),
      pair: ([a,b]:[number,string], cl:number) => ({a:a+cl,b}),
    }
  },
}

`
