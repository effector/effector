import {printMethod} from '../runner/text'

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
  getHash: ({targetToken, clock, typedFn}: any) =>
    `${targetToken} ${clock} ${typedFn}`,
  describeGroup: ({targetToken, typedFnToken, clock, largeGroup}: any) => ({
    largeGroup,
    noGroup: true,
    description: `${targetToken}${typedFnToken}, ${clock} clock`,
  }),
  createTestLines(value: any) {
    const method = printMethod({
      method: 'sample',
      shape: {
        source: 'sourceCode',
        clock: 'clockCode',
        target: 'targetCode',
        fn: 'fnCode',
      },
      value,
      addExpectError: false,
    })
    return [
      !value.pass && '//@ts-expect-error',
      `{const result: ${value.returnCode} = ${method}}`,
    ]
  },
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
        none: null,
        noArgs: 'fn0',
        arg: {
          typed: 'fn1',
          untyped: '({a}) => ({a})',
        },
        argPair: {
          typed: 'fn2',
          untyped: '({a},c) => ({a:a+c})',
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
        none: null,
        event: 'num',
        store: '$num',
        tuple: '[num,$num]',
      },
    },
  },
  targetCode: {
    compute: {
      variant: Target,
      cases: {
        none: null,
        event: 'aNumT',
        store: 'aT   ',
        tuple: '[aNumT,aT]',
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
      fn: ({typedFnToken, targetToken}: any) => `${targetToken}${typedFnToken}`,
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

export default {shape, grouping, header}
