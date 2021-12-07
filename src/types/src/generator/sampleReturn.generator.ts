import {printMethod} from '../runner/text'
import {
  computeFn,
  union,
  value,
  computeVariant,
  computeVariants,
  separate,
  flag,
  config,
  sortOrder,
  fmt,
} from '../runner/manifold/operators'

export default () => {
  const source = union({
    oneOf: ['event', 'store', 'combinable'],
    sort: ['event', 'store', 'combinable'],
  })
  const clock = union({
    oneOf: ['none', 'event', 'store', 'tuple'],
    sort: ['none', 'event', 'store', 'tuple'],
  })
  const target = union({oneOf: ['none', 'event', 'store', 'tuple']})
  const fn = separate({
    source: {clock},
    variant: {
      _: {
        noClock: {clock: 'none'},
      },
    } as const,
    cases: {
      noClock: union(['none', 'noArgs', 'arg']),
      __: union(['none', 'noArgs', 'arg', 'argPair']),
    },
    sort: ['none', 'noArgs', 'arg', 'argPair'],
  })
  const typedFn = separate({
    source: {fn},
    variant: {
      _: {
        hasFnArgs: [{fn: 'arg'}, {fn: 'argPair'}],
      },
    } as const,
    cases: {
      hasFnArgs: flag(),
      __: value(false),
    },
    sort: [false, true],
  })

  const pass = value(true)
  const typedFnToken = computeVariant({
    source: {typedFn},
    variant: {
      typed: {typedFn: true},
      untyped: {},
    },
    cases: {
      typed: ', typed fn',
      untyped: '',
    },
  })

  const targetToken = computeVariant({
    source: {target},
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
    sort: ['no target', 'unit target', 'tuple target'],
  })
  const fields = {
    source: computeVariant({
      source: {source},
      variant: {
        event: {source: 'event'},
        store: {source: 'store'},
        combinable: {source: 'combinable'},
      },
      cases: {
        event: 'aNum    ',
        store: 'a       ',
        combinable: '{a:$num}',
      },
    }),
    clock: computeVariant({
      source: {clock},
      variant: {
        none: {clock: 'none'},
        event: {clock: 'event'},
        store: {clock: 'store'},
        tuple: {clock: 'tuple'},
      },
      cases: {
        none: null,
        event: 'num',
        store: '$num',
        tuple: '[num,$num]',
      },
    }),
    target: computeVariant({
      source: {target},
      variant: {
        none: {target: 'none'},
        event: {target: 'event'},
        store: {target: 'store'},
        tuple: {target: 'tuple'},
      },
      cases: {
        none: null,
        event: 'aNumT',
        store: 'aT   ',
        tuple: '[aNumT,aT]',
      },
    }),
    fn: computeVariants({
      source: {fn, typedFn},
      variant: {
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
      } as const,
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
    }),
  }
  const methodCode = computeFn({
    source: {
      pass,
      sourceCode: fields.source,
      clockCode: fields.clock,
      targetCode: fields.target,
      fnCode: fields.fn,
    },
    fn: value => {
      return printMethod({
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
    },
    sort: 'string',
  })
  const largeGroup = fmt`${targetToken}${typedFnToken}`
  const returnCode = computeVariants({
    source: {target, source, clock},
    variant: {
      Target: {
        none: {target: 'none'},
        event: {target: 'event'},
        store: {target: 'store'},
        tuple: {target: 'tuple'},
      },
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
  })
  sortOrder([targetToken, typedFn, source, clock, fn, methodCode])
  config({
    header,
    file: 'generated/sampleReturn',
    usedMethods: ['createStore', 'createEvent', 'sample', 'Event', 'Store'],
    grouping: {
      pass,
      getHash: [targetToken, clock, typedFn],
      tags: {
        sourceType: source,
        clockType: clock,
        fnType: fn,
        targetType: target,
        target: targetToken,
      },
      describeGroup: computeFn({
        source: {
          largeGroup,
          description: fmt`${targetToken}${typedFnToken}, ${clock} clock`,
        },
        fn: ({largeGroup, description}) => ({
          largeGroup,
          noGroup: true,
          description,
        }),
      }),
      createTestLines: {
        type: 'text',
        value: fmt`{const result: ${returnCode} = ${methodCode}}`,
      },
    },
  })
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
