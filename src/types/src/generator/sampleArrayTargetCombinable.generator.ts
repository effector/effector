import {
  exec,
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
  Ref,
} from '../runner/declarator'

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

export default exec(() => {
  const source = union(['a', 'ab', 'tuple_a', 'tuple_aa'], 'source')
  const hasClock = flag({name: 'hasClock'})
  const sourceType = computeVariant({
    name: 'sourceType',
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
  const fn = flag({name: 'fn'})
  const fnClock = flag({name: 'fnClock', needs: [fn, hasClock]})
  const typedFn = flag({name: 'typedFn', needs: [fn]})
  const noFalsePositiveFnClock = flag({
    name: 'noFalsePositiveFnClock',
    needs: [fn, typedFn, fnClock, hasClock],
  })
  const noFalsePositiveFnSource = flag({
    name: 'noFalsePositiveFnSource',
    needs: [fn, typedFn],
    avoid: noFalsePositiveFnClock,
  })
  const noFalsePositive = bool({
    name: 'noFalsePositive',
    source: {noFalsePositiveFnSource, noFalsePositiveFnClock},
    true: [{noFalsePositiveFnSource: true}, {noFalsePositiveFnClock: true}],
    // false: {},
  })
  const fnWithoutArgs = flag({
    name: 'fnWithoutArgs',
    needs: fn,
    avoid: [fnClock, typedFn, noFalsePositiveFnClock, noFalsePositiveFnSource],
  })
  const isPairOfSourceFields = bool({
    name: 'isPairOfSourceFields',
    source: {sourceType, source},
    true: [
      {sourceType: 'object', source: 'ab'},
      {sourceType: 'tuple', source: 'tuple_aa'},
    ],
    false: [
      {sourceType: 'object', source: 'a'},
      {sourceType: 'tuple', source: 'tuple_a'},
    ],
  })
  //@ts-ignore
  const fnText: Ref<string, 'computeVariant'> = computeVariants({
    name: 'fnText',
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
  })
  const sourceCode = computeVariant({
    name: 'sourceCode',
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
    name: 'target',
    source: {fn, sourceType},
    variant: {
      _: {
        object: [{fn: true}, {sourceType: 'object'}],
        tuple: {sourceType: 'tuple'},
      },
    },
    cases: {
      tuple: permute({
        // name: 'target/a',
        items: ['l_num', 'l_str', 'l_num_str', 'l_num_num'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
      object: permute({
        // name: 'target/b',
        items: ['a_num', 'a_str', 'abn', 'ab'],
        amount: {min: 1, max: 2},
        noReorder: true,
      }),
    },
  })
  const clockText = value('num' as const, 'clockText')
  const targetText = computeFn({
    name: 'targetText',
    source: {target},
    fn({target}) {
      return target.map(
        //@ts-ignore
        (item: keyof typeof variables) => variables[item] || item,
      )
    },
  })
  const pass = computeFn({
    name: 'pass',
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
  config({
    header: '',
    grouping: {
      createTestLines: {
        method: 'sample',
        align: true,
        shape: {
          source: 'sourceCode',
          clock: {
            field: 'clockText',
            when: 'hasClock',
          },
          target: 'targetText',
          fn: {
            field: 'fnText',
            when: 'fn',
          },
        },
      },
      getHash: (cur: any) =>
        `${cur.sourceDescription} ${cur.fn ? cur.fnDescription : ''}`,
      describeGroup: (cur: any) =>
        `source:${cur.sourceDescription}${
          cur.fn ? `, fn:${cur.fnDescription}` : ''
        }`,
      sortByFields: {
        hasClock: [false, true],
        source: ['ab', 'a', 'tuple_aa', 'tuple_a'],
        sourceDescription: 'string',
        fnDescription: [undefined, 'untyped', 'typed', 'assert'],
        fnText: 'string',
        fn: [false, true],
      },
    },
  })
})
