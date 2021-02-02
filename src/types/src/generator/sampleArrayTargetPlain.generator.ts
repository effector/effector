const grouping = {
  getHash: ({descriptionTokens}) => descriptionTokens,
  describeGroup: ({groupTokens}) => ({
    // largeGroup,
    description: groupTokens,
  }),
  createTestLines: {
    method: 'sample',
    shape: {
      source: 'source',
      clock: 'clock',
      target: 'targets',
      fn: 'fnCode',
    },
  },
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
  pass: {
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
          {
            fn: true,
            typedFn: false,
            source: 'num',
            clock: 'str',
            targetAcceptString: true,
          },
          {
            fn: true,
            typedFn: false,
            source: 'num',
            clock: 'num',
            targetAcceptNumber: true,
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
  fnCode: {
    compute: {
      variant: {
        noFn: {fn: false},
        typed: {typedFn: true},
        untyped: {typedFn: false},
      },
      cases: {
        noFn: null,
        typed: '(src:number,clk:number) => src+clk',
        untyped: '(src,clk) => src + clk',
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
      fn({fn, typedFn, pass}) {
        return `${fn} ${fn && typedFn} ${pass}`
      },
    },
  },
}

export default {shape, grouping}
