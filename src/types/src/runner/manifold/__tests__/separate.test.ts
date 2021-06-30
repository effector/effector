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
// test('field validation')
