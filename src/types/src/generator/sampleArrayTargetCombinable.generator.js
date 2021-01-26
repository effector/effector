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
        fnWithoutArgs: "() => ({a:2,b:''})",
        noFalsePositiveFnClock: {
          object: {
            solo: '({a}:AN, cl:string) => ({a,b:cl})',
            pair: '({a}:AB, cl:string) => ({a,b:cl})'
          },
          tuple: {
            solo: '([a]:[number], cl:string) => ({a,b:cl})',
            pair: '([a]:[number,string], cl:string) => ({a,b:cl})',
          }
        },
        noFalsePositiveFnSource_fnClock: {
          object: {
            solo: "({a}:AS, cl:number) => ({a: cl, b: a})",
            pair: "({a,b}:ABN, cl:number) => ({a:b+cl,b:''})"
          },
          tuple: {
            solo: '([a]:[string], cl:number) => ({a:cl,b:a})',
            pair: "([a,b]:[number,number], cl:number) => ({a:b+cl,b:''})",
          }
        },
        typedFnClock: {
          object: {
            solo: "({a}:AN, cl:number) => ({a:a+cl,b:''})",
            pair: '({a,b}:AB, cl:number) => ({a:a+cl,b})'
          },
          tuple: {
            solo: "([a]:[number], cl:number) => ({a:a+cl,b:''})",
            pair: '([a,b]:[number,string], cl:number) => ({a:a+cl,b})',
          }
        },
        noFalsePositiveFnSource: {
          object: {
            solo: "({a}:AS) => ({a:0,b:a})",
            pair: "({b}:ABN) => ({a:b,b:''})"
          },
          tuple: {
            solo: '([a]:[string]) => ({a:2,b:a})',
            pair: "([,b]:[number,number]) => ({a:b,b:''})",
          }
        },
        typedNoFnClock: {
          object: {
            solo: "({a}:AN) => ({a,b:''})",
            pair: '({a,b}:AB) => ({a,b})'
          },
          tuple: {
            solo: "([a]:[number]) => ({a,b:''})",
            pair: '([a,b]:[number,string]) => ({a,b})',
          }
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
