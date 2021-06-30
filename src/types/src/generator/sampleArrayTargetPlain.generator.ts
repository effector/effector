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
} from '../runner/manifold/operators'

export default () => {
  const source = union(['num', 'str'])
  const clock = union(['num', 'str'])
  const fn = flag()
  const typedFn = flag({
    needs: bool({
      source: {fn, source, clock},
      true: [
        {fn: true, source: 'num', clock: 'num'},
        {fn: true, source: 'str', clock: 'num'},
        {fn: true, source: 'num', clock: 'str'},
      ],
    }),
  })
  const targets = permute({
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
    } as const,
    cases: {
      validWithFn: value(true),
      errorWithFn: value(false),
      validWithoutFn: value(true),
      errorWithoutFn: value(false),
    },
  })
  const fnCode = computeVariant({
    source: {fn, typedFn},
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
  })
  const fnToken = computeVariant({
    source: {fn, typedFn},
    variant: {
      noFn: {fn: false},
      typed: {typedFn: true},
      untyped: {typedFn: false},
    },
    cases: {
      noFn: 'no fn' as const,
      typed: 'typed fn' as const,
      untyped: 'untyped fn' as const,
    },
    sort: ['no fn', 'untyped fn', 'typed fn'],
  })
  config({
    header,
    file: 'generatedNew/sampleArrayTarget',
    usedMethods: ['createStore', 'createEvent', 'sample'],
    grouping: {
      pass,
      getHash: [fn, typedFn, pass],
      createTestLines: {
        method: 'sample',
        shape: {
          source,
          clock,
          target: targets,
          fn: fnCode,
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
