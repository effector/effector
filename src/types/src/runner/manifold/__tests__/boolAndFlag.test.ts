import {suiteGenerator} from '../generateCases'
import {
  computeFn,
  union,
  value,
  separate,
  flag,
  config,
  bool,
} from '../operators'

describe('flag', () => {
  test('basic case', () => {
    const suite = suiteGenerator(() => {
      const source = union(['event', 'store'], 'source')
      const clock = union(['store', 'event', 'none '], 'clock')
      const feature = flag({
        name: 'feature',
      })

      const tag = separate({
        name: 'tag',
        source: {source, clock, feature},
        variant: {
          base: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
          } as const,
          byFeature: {
            aBranch: {feature: true},
            bBranch: {feature: false},
          } as const,
        },
        cases: {
          events: value('events only'),
          noClock: {
            aBranch: value('no a clock'),
            bBranch: value('no b clock'),
          },
          sourceStore: value('source store'),
          rest: {
            aBranch: value('rest a'),
            bBranch: value('rest b'),
          },
        },
      })
      config({
        grouping: {
          getHash: [source, clock, feature],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, clock, feature, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * source * clock * feature * tag          * 
      | event  | store | false   | rest b       | 
      | event  | store | true    | rest a       | 
      | event  | event | false   | events only  | 
      | event  | event | true    | events only  | 
      | event  | none  | false   | no b clock   | 
      | event  | none  | true    | no a clock   | 
      | store  | store | false   | source store | 
      | store  | store | true    | source store | 
      | store  | event | false   | source store | 
      | store  | event | true    | source store | 
      | store  | none  | false   | no b clock   | 
      | store  | none  | true    | no a clock   | 
      "
    `)
  })
  test('avoid', () => {
    const suite = suiteGenerator(() => {
      const source = union(['event', 'store'], 'source')
      const clock = union(['store', 'event', 'none '], 'clock')
      const featureA = flag({
        name: 'featureA',
      })
      const featureB = flag({
        name: 'featureB',
        avoid: [featureA],
      })

      const tag = separate({
        name: 'tag',
        source: {source, clock, featureA, featureB},
        variant: {
          base: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
          },
          byFeature: {
            aBranch: {featureA: true},
            bBranch: {featureB: true},
            none: {featureA: false, featureB: false},
          },
        } as const,
        cases: {
          events: value('events only'),
          noClock: {
            aBranch: value('no a clock'),
            bBranch: value('no b clock'),
            none: value('no a|b none'),
          },
          sourceStore: value('source store'),
          rest: {
            aBranch: value('rest a'),
            bBranch: value('rest b'),
            none: value('rest none'),
          },
        },
      })
      config({
        grouping: {
          getHash: [source, clock, featureA, featureB],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, clock, featureA, featureB, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * source * clock * featureA * featureB * tag          * 
      | event  | store | false    | false    | rest none    | 
      | event  | store | true     | false    | rest a       | 
      | event  | store | false    | true     | rest b       | 
      | event  | event | false    | false    | events only  | 
      | event  | event | true     | false    | events only  | 
      | event  | event | false    | true     | events only  | 
      | event  | none  | false    | false    | no a|b none  | 
      | event  | none  | true     | false    | no a clock   | 
      | event  | none  | false    | true     | no b clock   | 
      | store  | store | false    | false    | source store | 
      | store  | store | true     | false    | source store | 
      | store  | store | false    | true     | source store | 
      | store  | event | false    | false    | source store | 
      | store  | event | true     | false    | source store | 
      | store  | event | false    | true     | source store | 
      | store  | none  | false    | false    | no a|b none  | 
      | store  | none  | true     | false    | no a clock   | 
      | store  | none  | false    | true     | no b clock   | 
      "
    `)
  })
})

describe('bool', () => {
  test('basic case', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b', 'c'], 'union')
      const tag = bool({
        name: 'tag',
        source: {source},
        true: {source: 'a'},
      })
      config({
        grouping: {
          getHash: [source],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * union * tag   * 
      | a     | true  | 
      | b     | false | 
      | c     | false | 
      "
    `)
  })
  test('array support', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b', 'c'], 'union')
      const tag = bool({
        name: 'tag',
        source: {source},
        true: [{source: 'a'}, {source: 'b'}],
      })
      config({
        grouping: {
          getHash: [source],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * union * tag   * 
      | a     | true  | 
      | b     | true  | 
      | c     | false | 
      "
    `)
  })
  test('non-exhaustive', () => {
    expect(() => {
      suiteGenerator(() => {
        const source = union(['a', 'b', 'c'], 'source')
        const pass = bool({
          name: 'pass',
          source: {source},
          true: {source: 'a'},
          false: {source: 'b'},
        })

        const failed = computeFn({
          source: {pass},
          name: 'failed',
          fn: ({pass}) => !pass,
        })

        config({
          grouping: {
            getHash: [source, failed],
            describeGroup: value(''),
            pass,
            createTestLines: {
              method: 'method',
              shape: {source},
              addExpectError: failed,
            },
          },
        })
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"either true or false should be defined but not both"`,
    )
  })
})
