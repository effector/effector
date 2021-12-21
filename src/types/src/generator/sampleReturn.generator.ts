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
import type {ComputeVariant} from '../runner/manifold/types'

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
  const filter = separate({
    source: {source},
    variant: {
      source: {
        combinable: {source: 'combinable'},
        rest: {},
      },
    } as const,
    cases: {
      combinable: union(['none']),
      rest: union(['none', 'unit', 'fn', 'infer', 'bool']),
    },
    sort: ['none', 'unit', 'fn', 'infer', 'bool'],
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
    source: computeVariants({
      source: {source, filter},
      variant: {
        source: {
          event: {source: 'event'},
          store: {source: 'store'},
          combinable: {source: 'combinable'},
        },
        filter: {
          inferFilter: [{filter: 'infer'}, {filter: 'bool'}],
          plainFilter: {},
        },
      },
      cases: {
        event: {
          inferFilter: 'aNumNull',
          plainFilter: 'aNum    ',
        },
        store: {
          inferFilter: '$aNull  ',
          plainFilter: 'a       ',
        },
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
      source: {fn, typedFn, filter},
      variant: {
        fn: {
          none: {fn: 'none'},
          noArgs: {fn: 'noArgs'},
          arg: {fn: 'arg'},
          argPair: {fn: 'argPair'},
        },
        types: {
          typed: {typedFn: true},
          inferred: [
            {typedFn: false, filter: 'bool'},
            {typedFn: false, filter: 'infer'},
          ],
          untyped: {typedFn: false},
        },
      } as const,
      cases: {
        none: null,
        noArgs: 'fn0',
        arg: {
          typed: 'fn1',
          inferred: '({a}:AN) => ({a})',
          untyped: '({a}) => ({a})',
        },
        argPair: {
          typed: 'fn2',
          inferred: '({a}:AN,c) => ({a:a+c})',
          untyped: '({a},c) => ({a:a+c})',
        },
      },
    }),
    filter: computeVariant({
      source: {filter},
      variant: {
        none: {filter: 'none'},
        unit: {filter: 'unit'},
        fn: {filter: 'fn'},
        infer: {filter: 'infer'},
        bool: {filter: 'bool'},
      },
      cases: {
        none: null,
        unit: '$flag',
        fn: 'filterFun',
        infer: 'filterInf',
        bool: 'Boolean',
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
      filterCode: fields.filter,
    },
    fn: value => {
      return printMethod({
        method: 'sample',
        shape: {
          source: 'sourceCode',
          clock: 'clockCode',
          target: 'targetCode',
          filter: 'filterCode',
          fn: 'fnCode',
        },
        value,
        addExpectError: false,
      })
    },
    sort: 'string',
  })
  const largeGroup = fmt`${targetToken}${typedFnToken}`
  //@ts-expect-error
  const returnCode: ComputeVariant<string> = computeVariants({
    source: {target, source, clock, filter},
    variant: {
      Target: {
        none: {target: 'none'},
        event: {target: 'event'},
        store: {target: 'store'},
        tuple: {target: 'tuple'},
      },
      filter: {
        noFilter: {filter: 'none'},
        hasFilter: {},
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
        noFilter: {
          store: 'Store<AN>',
          event: 'Event<AN>',
        },
        hasFilter: 'Event<AN>',
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
      getHash: [targetToken, clock, typedFn, filter],
      tags: {
        source,
        clock,
        fn,
        target,
        targetToken,
        filter,
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
const $aNull = createStore<AN | null>({a: 0})
const num = createEvent<number>()
const aNum = createEvent<AN>()
const aNumNull = createEvent<AN | null>()
const aT = createStore({a: 0})
const aNumT = createEvent<AN>()
const $flag = createStore(true)
const fn0 = () => ({a: 0})
const fn1 = ({a}: AN) => ({a})
const fn2 = ({a}: AN, c: number) => ({a: a + c})
const filterFun = (val: AN | null) => val !== null
const filterInf = (val: AN | null): val is AN => val !== null
`
