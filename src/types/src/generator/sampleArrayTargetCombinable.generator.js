//@ts-check

const {
  generateCaseSetFile,
  printArray,
  createTest,
  byFields,
  createGroupedCases,
  printBools,
} = require('../generateCaseSetFile')

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

const grouping = {
  createTestLines,
  getHash: cur => `${cur.sourceDescription} ${cur.fn ? cur.fnDescription : ''}`,
  describeGroup: cur =>
    `source:${cur.sourceDescription}${
      cur.fn ? `, fn:${cur.fnDescription}` : ''
    }`,
  sortByFields: {
    source: ['ab', 'a', 'tuple_aa', 'tuple_a'],
    fn: [false, true],
    hasClock: [false, true],
  },
}

function createTestLines({
  sourceCode,
  sourceDescription,
  clockText,
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
  const methodCall = `sample({source: ${sourceCode}${clockText}, target: [${sourceTargets}]${
    fn ? `, fn: ${fnText}` : ''
  }})`
  return [pass ? null : '/*@ts-expect-error*/', methodCall].filter(Boolean)
}

const shape = {
  source: {
    union: ['a', 'ab', 'tuple_a', 'tuple_aa'],
  },
  hasClock: {
    flag: {},
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
      needs: ['fn', 'hasClock'],
    },
  },
  typedFn: {
    flag: {
      needs: 'fn',
    },
  },
  noFalsePositiveFnClock: {
    flag: {
      needs: ['fn', 'typedFn', 'fnClock', 'hasClock'],
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
        fnWithoutArgs: 'fn.noArgs',
        noFalsePositiveFnClock: {
          object: {
            solo: 'fn.assertSecond.object.solo',
            pair: 'fn.assertSecond.object.pair'
          },
          tuple: {
            solo: 'fn.assertSecond.tuple.solo',
            pair: 'fn.assertSecond.tuple.pair'
          },
        },
        noFalsePositiveFnSource_fnClock: {
          object: {
            solo: 'fn.assertFirst.object.solo',
            pair: 'fn.assertFirst.object.pair'
          },
          tuple: {
            solo: 'fn.assertFirst.tuple.solo',
            pair: 'fn.assertFirst.tuple.pair'
          },
        },
        typedFnClock: {
          object: {
            solo: 'fn.typedSrcClock.object.solo',
            pair: 'fn.typedSrcClock.object.pair'
          },
          tuple: {
            solo: 'fn.typedSrcClock.tuple.solo',
            pair: 'fn.typedSrcClock.tuple.pair'
          },
        },
        noFalsePositiveFnSource: {
          object: {
            solo: 'fn.assertFirstOnly.object.solo',
            pair: 'fn.assertFirstOnly.object.pair'
          },
          tuple: {
            solo: 'fn.assertFirstOnly.tuple.solo',
            pair: 'fn.assertFirstOnly.tuple.pair'
          },
        },
        typedNoFnClock: {
          object: {
            solo: 'fn.typedSrc.object.solo',
            pair: 'fn.typedSrc.object.pair'
          },
          tuple: {
            solo: 'fn.typedSrc.tuple.solo',
            pair: 'fn.typedSrc.tuple.pair'
          },
        },
        fnClock: {
          object: {
            solo: "({a}, cl) => ({a:a+cl,b:''})",
            pair: '({a,b}, cl) => ({a:a+cl,b})'
          },
          tuple: {
            solo: "([a], cl) => ({a:a+cl,b:''})",
            pair: '([a,b], cl) => ({a:a+cl,b})',
          }
        },
        noFnClock: {
          object: {
            solo: "({a}) => ({a,b:''})",
            pair: '({a,b}) => ({a,b})'
          },
          tuple: {
            solo: "([a]) => ({a,b:''})",
            pair: '([a,b]) => ({a,b})',
          }
        },
      },
    }
  },
  fnDescription: {
    compute: {
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
      },
    },
  },
  sourceDescription: {
    compute: {
      variant: sourceVariants,
      cases: {
        objectSolo: 'same',
        objectPair: 'wide',
        tupleSolo: 'same',
        tuplePair: 'wide',
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
            noReorder: true,
          },
        },
        object: {
          permute: {
            items: ['a_num', 'a_str', 'abn', 'ab'],
            amount: {min: 1, max: 2},
            noReorder: true,
          },
        },
      },
    },
  },
  clockText: {
    compute: {
      variant: {
        hasClock: {hasClock: true},
        noClock: {},
      },
      cases: {
        hasClock: ', clock: num',
        noClock: '',
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
          failCases[source].every(failCase => !target.includes(failCase)),
      },
    },
  },
}

module.exports = {shape, grouping}
