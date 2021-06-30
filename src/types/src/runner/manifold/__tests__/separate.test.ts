import {suiteGenerator} from '../generateCases'
import {
  computeFn,
  union,
  value,
  computeVariant,
  computeVariants,
  separate,
  flag,
  config,
  bool,
} from '../operators'

test('basic case', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b'], 'feature')

    const tag = separate({
      name: 'tag',
      source: {source, clock, feature},
      variant: {
        base: {
          events: {source: 'event', clock: 'event'},
          noClock: {clock: 'none '},
          sourceStore: {source: 'store'},
          rest: {},
        },
        byFeature: {
          aBranch: {feature: 'a'},
          bBranch: {feature: 'b'},
        },
      } as const,
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
    | event  | store | a       | rest a       | 
    | event  | store | b       | rest b       | 
    | event  | event | a       | events only  | 
    | event  | event | b       | events only  | 
    | event  | none  | a       | no a clock   | 
    | event  | none  | b       | no b clock   | 
    | store  | store | a       | source store | 
    | store  | store | b       | source store | 
    | store  | event | a       | source store | 
    | store  | event | b       | source store | 
    | store  | none  | a       | no a clock   | 
    | store  | none  | b       | no b clock   | 
    "
  `)
})
test('unused match group', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b'], 'feature')

    const tag = separate({
      name: 'tag',
      source: {source, clock, feature},
      variant: {
        base: {
          events: {source: 'event', clock: 'event'},
          noClock: {clock: 'none '},
          sourceStore: {source: 'store'},
          rest: {},
        },
        byFeature: {
          aBranch: {feature: 'a'},
          bBranch: {feature: 'b'},
        },
      } as const,
      cases: {
        events: value('events only'),
        noClock: value('no clock'),
        sourceStore: value('source store'),
        rest: value('rest'),
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
    | event  | store | a       | rest         | 
    | event  | store | b       | rest         | 
    | event  | event | a       | events only  | 
    | event  | event | b       | events only  | 
    | event  | none  | a       | no clock     | 
    | event  | none  | b       | no clock     | 
    | store  | store | a       | source store | 
    | store  | store | b       | source store | 
    | store  | event | a       | source store | 
    | store  | event | b       | source store | 
    | store  | none  | a       | no clock     | 
    | store  | none  | b       | no clock     | 
    "
  `)
})
test('unused match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

    const tag = separate({
      name: 'tag',
      source: {source, clock, feature},
      variant: {
        base: {
          events: {source: 'event', clock: 'event'},
          noClock: {clock: 'none '},
          sourceStore: {source: 'store'},
          rest: {},
        },
        byFeature: {
          aBranch: {feature: 'a'},
          bBranch: {feature: 'b'},
        },
      } as const,
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
    | event  | store | a       | rest a       | 
    | event  | store | b       | rest b       | 
    | event  | store | c       |              | 
    | event  | event | a       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | c       | events only  | 
    | event  | none  | a       | no a clock   | 
    | event  | none  | b       | no b clock   | 
    | event  | none  | c       |              | 
    | store  | store | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | c       | source store | 
    | store  | event | a       | source store | 
    | store  | event | b       | source store | 
    | store  | event | c       | source store | 
    | store  | none  | a       | no a clock   | 
    | store  | none  | b       | no b clock   | 
    | store  | none  | c       | source store | 
    "
  `)
})
test('rest match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

    const tag = separate({
      name: 'tag',
      source: {source, clock, feature},
      variant: {
        base: {
          events: {source: 'event', clock: 'event'},
          noClock: {clock: 'none '},
          sourceStore: {source: 'store'},
          rest: {},
        },
        byFeature: {
          aBranch: {feature: 'a'},
          restBranch: {},
        },
      } as const,
      cases: {
        events: value('events only'),
        noClock: {
          aBranch: value('no a clock'),
          restBranch: value('no b|c clock'),
        },
        sourceStore: value('source store'),
        rest: {
          aBranch: value('rest a'),
          restBranch: value('rest b|c'),
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
    | event  | store | a       | rest a       | 
    | event  | store | b       | rest b|c     | 
    | event  | store | c       | rest b|c     | 
    | event  | event | a       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | c       | events only  | 
    | event  | none  | a       | no a clock   | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | c       | no b|c clock | 
    | store  | store | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | c       | source store | 
    | store  | event | a       | source store | 
    | store  | event | b       | source store | 
    | store  | event | c       | source store | 
    | store  | none  | a       | no a clock   | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | c       | no b|c clock | 
    "
  `)
})
test('array match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

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
          aBranch: {feature: 'a'},
          restBranch: [{feature: 'b'}, {feature: 'c'}],
        } as const,
      },
      cases: {
        events: value('events only'),
        noClock: {
          aBranch: value('no a clock'),
          restBranch: value('no b|c clock'),
        },
        sourceStore: value('source store'),
        rest: {
          aBranch: value('rest a'),
          restBranch: value('rest b|c'),
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
    | event  | store | a       | rest a       | 
    | event  | store | b       | rest b|c     | 
    | event  | store | c       | rest b|c     | 
    | event  | event | a       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | c       | events only  | 
    | event  | none  | a       | no a clock   | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | c       | no b|c clock | 
    | store  | store | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | c       | source store | 
    | store  | event | a       | source store | 
    | store  | event | b       | source store | 
    | store  | event | c       | source store | 
    | store  | none  | a       | no a clock   | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | c       | no b|c clock | 
    "
  `)
})
describe('branching', () => {
  test('execution of cases', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b'])
      const clock = union(['A', 'B'])
      const feature = flag({})
      const fn = computeVariant({
        source: {source},
        variant: {
          hasFn: {source: 'a'},
          noFn: {},
        },
        cases: {
          hasFn: 'function',
          noFn: null,
        },
      })

      const tag = separate({
        source: {feature},
        variant: {
          byFeature: {
            aBranch: {feature: true},
            none: {feature: false},
          },
        } as const,
        cases: {
          aBranch: separate({
            source: {clock},
            variant: {
              _: {
                a: {clock: 'A'},
                b: {},
              },
            } as const,
            cases: {
              a: union(['a1', 'a2']),
              b: union(['b1', 'b2']),
            },
          }),
          none: union(['c1', 'c2']),
        },
      })
      config({
        grouping: {
          getHash: [source, feature, clock, tag],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: {source, feature, clock, tag},
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * source * feature * clock * tag * 
      | a      | false   | A     | c1  | 
      | a      | false   | A     | c2  | 
      | a      | true    | A     | a1  | 
      | a      | true    | A     | a2  | 
      | a      | false   | B     | c1  | 
      | a      | false   | B     | c2  | 
      | a      | true    | B     | b1  | 
      | a      | true    | B     | b2  | 
      | b      | false   | A     | c1  | 
      | b      | false   | A     | c2  | 
      | b      | true    | A     | a1  | 
      | b      | true    | A     | a2  | 
      | b      | false   | B     | c1  | 
      | b      | false   | B     | c2  | 
      | b      | true    | B     | b1  | 
      | b      | true    | B     | b2  | 
      "
    `)
  })
  test('case safety (cases executed only when they are choosen)', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b'])
      const fn = computeVariant({
        source: {source},
        variant: {
          hasFn: {source: 'a'},
          noFn: {},
        },
        cases: {
          hasFn: 'fn',
          noFn: null,
        },
      })

      const tag = separate({
        source: {source},
        variant: {
          byFeature: {
            hasFn: {source: 'a'},
            none: {},
          },
        } as const,
        cases: {
          hasFn: computeFn({
            source: {fn},
            fn: ({fn}) => fn!.toUpperCase(),
          }),
          none: value(null),
        },
      })
      config({
        grouping: {
          getHash: [source],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: {source, fn, tag},
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "
      ## pass
      * source * fn   * tag  * 
      | a      | fn   | FN   | 
      | b      | null | null | 
      "
    `)
  })
  test.skip('source safety (source executed only when result is needed for something else)', () => {
    const jestFn = jest.fn(({fn}: {fn: string | null}) => fn!.toUpperCase())
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b'])
      const fn = computeVariant({
        source: {source},
        variant: {
          hasFn: {source: 'a'},
          noFn: {},
        },
        cases: {
          hasFn: 'fn',
          noFn: null,
        },
      })

      const tag = separate({
        source: {source},
        variant: {
          byFeature: {
            hasFn: {source: 'a'},
            none: {},
          },
        } as const,
        cases: {
          hasFn: computeFn({
            source: {
              uppercased: computeFn({
                source: {fn},
                fn: jestFn,
              }),
            },
            fn: ({uppercased}) => uppercased,
          }),
          none: value(null),
        },
      })
      config({
        grouping: {
          getHash: [source],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: {source, fn, tag},
          },
        },
      })
    })
    expect(jestFn.mock.results.map(({type}) => type)).not.toContain('throw')
  })
})
// test('field validation')
