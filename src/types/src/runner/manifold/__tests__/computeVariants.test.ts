import {suiteGenerator} from '../generateCases'
import {union, value, computeVariants, config} from '../operators'

test('basic case', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b'], 'feature')

    const tag = computeVariants({
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
      },
      cases: {
        events: 'events only',
        noClock: {
          aBranch: 'no a clock',
          bBranch: 'no b clock',
        },
        sourceStore: 'source store',
        rest: {
          aBranch: 'rest a',
          bBranch: 'rest b',
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
    "test(' (should pass)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot()
    })"
  `)
})
test('unused match group', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b'], 'feature')

    const tag = computeVariants({
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
      },
      cases: {
        events: 'events only',
        noClock: 'no clock',
        sourceStore: 'source store',
        rest: 'rest',
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
    "test(' (should pass)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot()
    })"
  `)
})
test('unused match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

    const tag = computeVariants({
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
      },
      cases: {
        events: 'events only',
        noClock: {
          aBranch: 'no a clock',
          bBranch: 'no b clock',
        },
        sourceStore: 'source store',
        rest: {
          aBranch: 'rest a',
          bBranch: 'rest b',
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
    "test(' (should pass)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot()
    })"
  `)
})
test('rest match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

    const tag = computeVariants({
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
      },
      cases: {
        events: 'events only',
        noClock: {
          aBranch: 'no a clock',
          restBranch: 'no b|c clock',
        },
        sourceStore: 'source store',
        rest: {
          aBranch: 'rest a',
          restBranch: 'rest b|c',
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
    "test(' (should pass)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot()
    })"
  `)
})
test('array match', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store'], 'source')
    const clock = union(['store', 'event', 'none '], 'clock')
    const feature = union(['a', 'b', 'c'], 'feature')

    const tag = computeVariants({
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
          restBranch: [{feature: 'b'}, {feature: 'c'}],
        },
      },
      cases: {
        events: 'events only',
        noClock: {
          aBranch: 'no a clock',
          restBranch: 'no b|c clock',
        },
        sourceStore: 'source store',
        rest: {
          aBranch: 'rest a',
          restBranch: 'rest b|c',
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
    "test(' (should pass)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot()
    })"
  `)
})
// test('field validation')
