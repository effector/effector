import {
  computeFn,
  union,
  value,
  computeVariant,
  bool,
  separate,
  flag,
  config,
  permute,
  computeVariants,
} from '../runner/manifold/operators'

export default () => {
  const mode = union(['src', 'clk', 'src/clk'])
  const source = union(['num', 'str'])
  const clock = union(['num', 'str'])
  const fn = flag()
  const typedFn = flag({
    needs: bool({
      source: {fn, source, clock, mode},
      true: [
        {fn: true, mode: 'src/clk', source: 'num', clock: 'num'},
        {fn: true, mode: 'src/clk', source: 'str', clock: 'num'},
        {fn: true, mode: 'src/clk', source: 'num', clock: 'str'},
        {fn: true, mode: 'src', source: 'num'},
        {fn: true, mode: 'clk', clock: 'num'},
      ],
    }),
  })
  const wrongFnArgs = bool({
    source: {mode, source, clock, typedFn},
    true: [
      {mode: 'src/clk', typedFn: true, source: 'str'},
      {mode: 'src/clk', typedFn: true, clock: 'str'},
    ],
  })
  type TargetType = 'num' | 'voidt' | 'str' | 'anyt' | 'strBool' | 'numStr'
  const targets = permute<TargetType>({
    items: ['num', 'voidt', 'str', 'anyt', 'strBool', 'numStr'],
    amount: {min: 1, max: 2},
    noReorder: true,
  })
  const targetAcceptString = computeFn({
    source: {targets},
    fn({targets}) {
      return targets.every(target =>
        ['str', 'numStr', 'strBool', 'anyt', 'voidt'].includes(target),
      )
    },
  })
  const targetAcceptNumber = computeFn({
    source: {targets},
    fn({targets}) {
      return targets.every(target =>
        ['num', 'numStr', 'anyt', 'voidt'].includes(target),
      )
    },
  })
  const pass = separate({
    source: {
      mode,
      fn,
      source,
      clock,
      typedFn,
      targetAcceptNumber,
      targetAcceptString,
    },
    variant: {
      _: {
        validWithFn: [
          {
            mode: 'src/clk',
            source: 'num',
            clock: 'num',
            targetAcceptNumber: true,
            fn: true,
          },
          {
            mode: 'src',
            source: 'num',
            targetAcceptNumber: true,
            fn: true,
          },
          {
            mode: 'clk',
            clock: 'num',
            targetAcceptNumber: true,
            fn: true,
          },
          {
            mode: 'src/clk',
            source: 'str',
            targetAcceptString: true,
            fn: true,
            typedFn: false,
          },
          {
            mode: 'src',
            source: 'str',
            targetAcceptString: true,
            fn: true,
            typedFn: false,
          },
          {
            mode: 'clk',
            clock: 'str',
            targetAcceptString: true,
            fn: true,
            typedFn: false,
          },
          {
            mode: 'src/clk',
            source: 'num',
            clock: 'str',
            targetAcceptString: true,
            fn: true,
            typedFn: false,
          },
        ],
        errorWithFn: {fn: true},
        validWithoutFn: [
          {mode: 'src/clk', source: 'num', targetAcceptNumber: true, fn: false},
          {mode: 'src', source: 'num', targetAcceptNumber: true, fn: false},
          {mode: 'clk', clock: 'num', targetAcceptNumber: true, fn: false},
          {mode: 'src/clk', source: 'str', targetAcceptString: true, fn: false},
          {mode: 'src', source: 'str', targetAcceptString: true, fn: false},
          {mode: 'clk', clock: 'str', targetAcceptString: true, fn: false},
        ],
        errorWithoutFn: {},
      },
    } as const,
    cases: {
      validWithFn: value(true),
      errorWithFn: value(false),
      validWithoutFn: value(true),
      errorWithoutFn: value(false),
    },
  })
  const fnCode = computeVariants({
    source: {mode, fn, typedFn},
    variant: {
      mode: {
        both: {mode: 'src/clk'},
        src: {mode: 'src'},
        clk: {mode: 'clk'},
      },
      fn: {
        noFn: {fn: false},
        typed: {typedFn: true},
        untyped: {typedFn: false},
      },
    },
    cases: {
      both: {
        noFn: value(null),
        typed: value('(src:number,clk:number) => src+clk'),
        untyped: value('(src,clk) => src + clk'),
      },
      src: {
        noFn: value(null),
        typed: value('(src:number) => src+1'),
        untyped: value('(src) => src + 1'),
      },
      clk: {
        noFn: value(null),
        typed: value('(clk:number) => clk+1'),
        untyped: value('(clk) => clk + 1'),
      },
    },
  })
  const fnToken = computeVariant({
    source: {fn, typedFn, wrongFnArgs},
    variant: {
      wrongArgs: {wrongFnArgs: true},
      noFn: {fn: false},
      typed: {typedFn: true},
      untyped: {typedFn: false},
    },
    cases: {
      wrongArgs: 'wrong args' as const,
      noFn: 'no fn' as const,
      typed: 'typed fn' as const,
      untyped: 'untyped fn' as const,
    },
    sort: ['no fn', 'untyped fn', 'typed fn', 'wrong args'],
  })
  const sourceClockToken = computeFn({
    source: {mode, source, clock},
    fn({mode, source, clock}) {
      switch (mode) {
        case 'src/clk':
          return `${source}/${clock}`
        case 'src':
          return `src ${source}`
        case 'clk':
          return `clk ${clock}`
      }
    },
  })
  const targetToken = computeFn({
    source: {targets},
    fn: ({targets}) => targets.sort().join('/'),
  })
  config({
    header,
    file: 'generated/sampleArrayTarget',
    usedMethods: ['createStore', 'createEvent', 'sample'],
    grouping: {
      pass,
      getHash: {mode, fn, typedFn, pass, wrongFnArgs},
      tags: {
        sourceClockToken,
        targetToken,
        fn: fnToken,
      },
      createTestLines: {
        method: 'sample',
        shape: {
          source: {
            field: source,
            when: bool({
              source: {mode},
              true: [{mode: 'src/clk'}, {mode: 'src'}],
            }),
          },
          clock: {
            field: clock,
            when: bool({
              source: {mode},
              true: [{mode: 'src/clk'}, {mode: 'clk'}],
            }),
          },
          target: {
            field: targets,
            markError: separate({
              source: {mode, clock, source, fn, wrongFnArgs},
              variant: {
                _: {
                  numberTrigger: [
                    {mode: 'clk', clock: 'num'},
                    {mode: 'src', source: 'num'},
                    {mode: 'src/clk', source: 'num', fn: false},
                    {mode: 'src/clk', source: 'num', clock: 'num', fn: true},
                  ],
                  stringTrigger: {wrongFnArgs: false},
                },
              } as const,
              cases: {
                numberTrigger: value<TargetType[]>(['str', 'strBool']),
                stringTrigger: value<TargetType[]>(['num']),
              },
            }),
          },
          fn: {
            field: fnCode,
            markError: wrongFnArgs,
          },
        },
      },
      describeGroup: fnToken,
    },
  })
}

const header = `
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const num = createEvent<number>()
const numStr = createEvent<number | string>()
const strBool = createEvent<string | boolean>()
`
