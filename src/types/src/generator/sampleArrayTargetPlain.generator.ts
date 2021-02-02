import {printArray} from '../runner/text'

const grouping = {
  getHash: ({descriptionTokens}) => descriptionTokens,
  describeGroup: ({groupTokens}) => ({
    // largeGroup,
    description: groupTokens,
  }),
  createTestLines: ({methodCode, pass}) => [
    pass ? null : '//@ts-expect-error',
    methodCode,
  ],
  sortByFields: {
    fnToken: ['no fn', 'untyped fn', 'typed fn'],
  },
}

const shape = {
  source: {
    union: ['num', 'str'],
  },
  clock: {
    union: ['num', 'str'],
  },
  fn: {
    flag: {},
  },
  typedFn: {
    flag: {
      needs: [
        'fn',
        {
          true: [
            {fn: true, source: 'num', clock: 'num'},
            {fn: true, source: 'str', clock: 'num'},
            {fn: true, source: 'num', clock: 'str'},
          ],
        },
      ],
    },
  },

  targets: {
    permute: {
      items: ['num', 'voidt', 'str', 'anyt', 'strBool', 'numStr'],
      amount: {min: 1, max: 2},
      noReorder: true,
    },
  },
  validSource: {
    bool: {
      true: {source: 'num'},
      false: {source: 'str'},
    },
  },
  validTarget: {
    compute: {
      fn: ({targets}) =>
        targets.every(target => !['strBool', 'str'].includes(target)),
    },
  },
  targetAcceptString: {
    compute: {
      fn: ({targets}) =>
        targets.every(target =>
          ['str', 'numStr', 'strBool', 'anyt', 'voidt'].includes(target),
        ),
    },
  },
  targetAcceptNumber: {
    compute: {
      fn: ({targets}) =>
        targets.every(target =>
          ['num', 'numStr', 'anyt', 'voidt'].includes(target),
        ),
    },
  },
  validSources: {
    compute: {
      variant: {
        validWithFn: [
          {
            fn: true,
            source: 'num',
            clock: 'num',
            targetAcceptNumber: true,
          },
          {
            fn: true,
            typedFn: false,
            source: 'str',
            targetAcceptString: true,
          },
        ],
        errorWithFn: {fn: true},
        validWithoutFn: [
          {fn: false, source: 'num', targetAcceptNumber: true},
          {fn: false, source: 'str', targetAcceptString: true},
        ],
        errorWithoutFn: {},
      },
      cases: {
        validWithFn: true,
        errorWithFn: false,
        validWithoutFn: true,
        errorWithoutFn: false,
      },
    },
  },
  pass: {
    true: [
      {fn: true, validSources: true},
      {fn: false, validSources: true},
      // {fn: true, validSources: true, validTarget: true},
    ],
  },
  fnCode: {
    compute: {
      variant: {
        noFn: {fn: false},
        typed: {typedFn: true},
        untyped: {typedFn: false},
      },
      cases: {
        noFn: '',
        typed: ', fn: (src:number,clk:number) => src+clk',
        untyped: ', fn: (src,clk) => src + clk',
      },
    },
  },
  targetCode: {
    compute: {fn: ({targets}) => printArray(targets)},
  },
  methodCode: {
    compute: {
      fn({source, clock, fnCode, targetCode}) {
        return `sample({source: ${source}, clock: ${clock}, target: ${targetCode}${fnCode}})`
      },
    },
  },
  fnToken: {
    compute: {
      fn: ({fn, typedFn}) =>
        fn ? (typedFn ? 'typed fn' : 'untyped fn') : 'no fn',
    },
  },
  groupTokens: {
    compute: {
      fn: ({fnToken}) => fnToken,
    },
  },
  descriptionTokens: {
    compute: {
      fn({fn, typedFn, validSources}) {
        return `${fn} ${fn && typedFn} ${validSources}`
      },
    },
  },
}

export default {shape, grouping}
