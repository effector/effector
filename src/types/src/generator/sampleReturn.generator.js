const {generateCaseSetFile, printArray} = require('../generateCaseSetFile')

const Source = {
  event: {source: 'event'},
  store: {source: 'store'},
  combinable: {source: 'combinable'},
}
const Clock = {
  none: {clock: 'none'},
  event: {clock: 'event'},
  store: {clock: 'store'},
  tuple: {clock: 'tuple'},
}
const Target = {
  none: {target: 'none'},
  event: {target: 'event'},
  store: {target: 'store'},
  tuple: {target: 'tuple'},
}

const grouping = {
  getHash: ({targetToken, clock, typedFn}) =>
    `${targetToken} ${clock} ${typedFn}`,
  describeGroup: ({targetToken, typedFnToken, clock, largeGroup}) => ({
    largeGroup,
    noGroup: true,
    description: `${targetToken}${typedFnToken}, ${clock} clock`,
  }),
  createTestLines: ({methodCode, pass}) => [
    pass ? null : '//@ts-expect-error',
    methodCode,
  ],
  sortByFields: {
    targetToken: ['no target', 'unit target', 'tuple target'],
    typedFn: [false, true],
    source: ['event', 'store', 'combinable'],
    clock: ['none', 'event', 'store', 'tuple'],
    fn: ['none', 'noArgs', 'arg', 'argPair'],
  },
}

const shape = {
  source: {
    union: ['event', 'store', 'combinable'],
  },
  clock: {
    union: ['none', 'event', 'store', 'tuple'],
  },
  target: {
    union: ['none', 'event', 'store', 'tuple'],
  },
  fn: {
    split: {
      match: {
        noClock: {clock: 'none'},
      },
      cases: {
        noClock: {
          union: ['none', 'noArgs', 'arg'],
        },
        __: {
          union: ['none', 'noArgs', 'arg', 'argPair'],
        },
      },
    },
  },
  typedFn: {
    split: {
      match: {
        hasFnArgs: [{fn: 'arg'}, {fn: 'argPair'}],
      },
      cases: {
        hasFnArgs: {
          flag: {},
        },
        __: {
          value: false,
        },
      },
    },
  },
  fnCode: {
    compute: {
      variants: {
        fn: {
          none: {fn: 'none'},
          noArgs: {fn: 'noArgs'},
          arg: {fn: 'arg'},
          argPair: {fn: 'argPair'},
        },
        types: {
          typed: {typedFn: true},
          untyped: {typedFn: false},
        },
      },
      cases: {
        none: '',
        noArgs: ', fn: fn0',
        arg: {
          typed: ', fn: fn1',
          untyped: ', fn: ({a}) => ({a})',
        },
        argPair: {
          typed: ', fn: fn2',
          untyped: ', fn: ({a},c) => ({a:a+c})',
        },
      },
    },
  },
  sourceCode: {
    compute: {
      variant: Source,
      cases: {
        event: 'aNum    ',
        store: 'a       ',
        combinable: '{a:$num}',
      },
    },
  },
  clockCode: {
    compute: {
      variant: Clock,
      cases: {
        none: '',
        event: ', clock: num',
        store: ', clock: $num',
        tuple: ', clock: [num,$num]',
      },
    },
  },
  targetCode: {
    compute: {
      variant: Target,
      cases: {
        none: '',
        event: ', target: aNumT',
        store: ', target: aT   ',
        tuple: ', target: [aNumT,aT]',
      },
    },
  },
  returnCode: {
    compute: {
      variants: {
        Target,
        sources: {
          store: [
            {source: 'store', clock: 'store'},
            {source: 'combinable', clock: 'store'},
            {source: 'store', clock: 'none'},
            {source: 'combinable', clock: 'none'},
          ],
          event: {},
        },
      },
      cases: {
        none: {
          store: 'Store<AN>',
          event: 'Event<AN>',
        },
        event: 'Event<AN>',
        store: 'Store<AN>',
        tuple: '[Event<AN>, Store<AN>]',
      },
    },
  },
  pass: {
    value: true,
  },
  methodCode: {
    compute: {
      fn({sourceCode, clockCode, fnCode, targetCode, returnCode}) {
        return `{const result: ${returnCode} = sample({source:${sourceCode}${clockCode}${targetCode}${fnCode}})}`
      },
    },
  },
  typedFnToken: {
    compute: {
      variant: {
        typed: {typedFn: true},
        untyped: {},
      },
      cases: {
        typed: ', typed fn',
        untyped: '',
      },
    },
  },
  targetToken: {
    compute: {
      variant: {
        unit: [{target: 'event'}, {target: 'store'}],
        none: {target: 'none'},
        tuple: {target: 'tuple'},
      },
      cases: {
        unit: 'unit target',
        none: 'no target',
        tuple: 'tuple target',
      },
    },
  },
  largeGroup: {
    compute: {
      fn: ({typedFnToken, targetToken}) => `${targetToken}${typedFnToken}`,
    },
  },
}

const header = `
type AN = {a: number}
const $num = createStore(0)
const a = createStore({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aT = createStore({a: 0})
const aNumT = createEvent<AN>()
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})
`

module.exports = {shape, grouping, header}
