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
} from '../../manifold'

test('it works', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store', 'combinable'], 'source')
    const clock = union(['none', 'event', 'store', 'tuple'], 'clock')
    const getHash = computeFn({
      name: 'getHash',
      source: {source, clock},
      fn: ({source, clock}) => `${source} ${clock}`,
    })

    config({
      grouping: {
        getHash,
        describeGroup: source,
        pass: value(true, 'pass'),
        createTestLines: {
          method: 'method',
          shape: {
            src: 'source',
            clk: 'clock',
          },
        },
      },
    })
  })
  expect(suite).toMatchInlineSnapshot(`
"test('combinable (should pass)', () => {
  //prettier-ignore
  {
    method({src:combinable, clk:tuple})
    method({src:combinable, clk:store})
    method({src:combinable, clk:event})
    method({src:combinable, clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})
test('store (should pass)', () => {
  //prettier-ignore
  {
    method({src:store, clk:tuple})
    method({src:store, clk:store})
    method({src:store, clk:event})
    method({src:store, clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})
test('event (should pass)', () => {
  //prettier-ignore
  {
    method({src:event, clk:tuple})
    method({src:event, clk:store})
    method({src:event, clk:event})
    method({src:event, clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
})
describe('group', () => {
  test('group by union value', () => {
    const suite = suiteGenerator(() => {
      const source = union(['event', 'store', 'combinable'], 'source')
      const clock = union(['none', 'event', 'store', 'tuple'], 'clock')

      const getHash = computeFn({
        name: 'getHash',
        source: {source, clock},
        fn: ({source, clock}) => `${source} ${clock}`,
      })
      const pass = value(true, 'pass')
      config({
        grouping: {
          getHash,
          describeGroup: value('', 'describeGroup'),
          pass,
          createTestLines: {
            method: 'method',
            shape: {
              src: 'source',
              clk: 'clock',
            },
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    method({src:combinable, clk:tuple})
    method({src:combinable, clk:store})
    method({src:combinable, clk:event})
    method({src:combinable, clk:none })
    method({src:store     , clk:tuple})
    method({src:store     , clk:store})
    method({src:store     , clk:event})
    method({src:store     , clk:none })
    method({src:event     , clk:tuple})
    method({src:event     , clk:store})
    method({src:event     , clk:event})
    method({src:event     , clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
  describe('pass', () => {
    test('pass by union value', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['none', 'event'], 'clock')

        config({
          grouping: {
            getHash: computeFn({
              name: 'getHash',
              source: {source, clock},
              fn: ({source, clock}) => `${source} ${clock}`,
            }),
            describeGroup: source,
            pass: computeFn({
              name: 'pass',
              source: {source},
              fn: ({source}) => source === 'event',
            }),
            createTestLines: {
              method: 'method',
              shape: {
                src: 'source',
                clk: 'clock',
              },
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"test('store (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    method({src:store, clk:event})
    //@ts-expect-error
    method({src:store, clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})
test('event (should pass)', () => {
  //prettier-ignore
  {
    method({src:event, clk:event})
    method({src:event, clk:none })
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
    })
    test('edge case when pass field split groups', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['none', 'event'], 'clock')

        config({
          grouping: {
            getHash: computeFn({
              name: 'getHash',
              source: {source, clock},
              fn: ({source, clock}) => `${source} ${clock}`,
            }),
            describeGroup: source,
            pass: computeFn({
              name: 'pass',
              source: {clock},
              fn: ({clock}) => clock === 'event',
            }),
            createTestLines: {
              method: 'method',
              shape: {
                src: 'source',
                clk: 'clock',
              },
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"describe('store', () => {
  test('store (should pass)', () => {
    //prettier-ignore
    method({src:store, clk:event})
    expect(typecheck).toMatchInlineSnapshot()
  })
  test('store (should fail)', () => {
    //prettier-ignore
    //@ts-expect-error
    method({src:store, clk:none})
    expect(typecheck).toMatchInlineSnapshot()
  })
})
describe('event', () => {
  test('event (should pass)', () => {
    //prettier-ignore
    method({src:event, clk:event})
    expect(typecheck).toMatchInlineSnapshot()
  })
  test('event (should fail)', () => {
    //prettier-ignore
    //@ts-expect-error
    method({src:event, clk:none})
    expect(typecheck).toMatchInlineSnapshot()
  })
})"
`)
    })
  })
})

describe('config', () => {
  it('throw error when config is not called', () => {
    expect(() => {
      suiteGenerator(() => {
        union(['event', 'store', 'combinable'], 'source')
      })
    }).toThrowErrorMatchingInlineSnapshot(`"no config() used"`)
  })
  it('throw error when required fields are missed', () => {
    expect(() => {
      suiteGenerator(() => {
        union(['event', 'store', 'combinable'], 'source')
        config({
          grouping: {getHash: () => ''},
        })
      })
    }).toThrowErrorMatchingInlineSnapshot(`
      "required config items are missed:
      grouping.describeGroup
      grouping.createTestLines"
    `)
  })
  describe('getHash', () => {
    test('function', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['store', 'event', 'none '], 'clock')
        const tag = computeVariant({
          name: 'tag',
          source: {source, clock},
          variant: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
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
            getHash: computeFn({
              name: 'getHash',
              source: {source, clock},
              fn: ({source, clock}) => `${source} ${clock}`,
            }),
            describeGroup: value('', 'describeGroup'),
            pass: value(true, 'pass'),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag          * 
    | store  | none  | no clock     | 
    | store  | event | source store | 
    | store  | store | source store | 
    | event  | none  | no clock     | 
    | event  | event | events only  | 
    | event  | store | rest         | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
    })
    test('silent hash clash', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['store', 'event', 'none '], 'clock')
        const tag = computeVariant({
          name: 'tag',
          source: {source, clock},
          variant: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
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
            getHash: computeFn({
              name: 'getHash',
              source: {source},
              fn: ({source}) => `${source}`,
            }),
            describeGroup: value('', 'describeGroup'),
            pass: value(true, 'pass'),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag          * 
    | store  | none  | no clock     | 
    | store  | event | source store | 
    | store  | store | source store | 
    | event  | none  | no clock     | 
    | event  | event | events only  | 
    | event  | store | rest         | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
    })
    test('real hash clash', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['store', 'event', 'none '], 'clock')
        const tag = computeVariant({
          name: 'tag',
          source: {source, clock},
          variant: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
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
            getHash: computeFn({
              name: 'getHash',
              source: {source},
              fn: ({source}) => `${source}`,
            }),
            describeGroup: source,
            pass: value(true, 'pass'),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"test('store (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag          * 
    | store  | none  | no clock     | 
    | store  | event | source store | 
    | store  | store | source store | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})
test('event (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag         * 
    | event  | none  | no clock    | 
    | event  | event | events only | 
    | event  | store | rest        | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
    })
    test('real hash/describeGroup clash', () => {
      const suite = suiteGenerator(() => {
        const source = union(['event', 'store'], 'source')
        const clock = union(['store', 'event', 'none '], 'clock')
        const tag = computeVariant({
          name: 'tag',
          source: {source, clock},
          variant: {
            events: {source: 'event', clock: 'event'},
            noClock: {clock: 'none '},
            sourceStore: {source: 'store'},
            rest: {},
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
            getHash: computeFn({
              name: 'getHash',
              source: {source},
              fn: ({source}) => `${source}`,
            }),
            describeGroup: clock,
            pass: value(true, 'pass'),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
"test('store (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag          * 
    | store  | none  | no clock     | 
    | store  | event | source store | 
    | store  | store | source store | 
    | event  | none  | no clock     | 
    | event  | event | events only  | 
    | event  | store | rest         | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
    })
  })
})

describe('computeVariant', () => {
  test('basic case', () => {
    const suite = suiteGenerator(() => {
      const source = union(['event', 'store'], 'source')
      const clock = union(['store', 'event', 'none '], 'clock')
      const tag = computeVariant({
        name: 'tag',
        source: {source, clock},
        variant: {
          events: {source: 'event', clock: 'event'},
          noClock: {clock: 'none '},
          sourceStore: {source: 'store'},
          rest: {},
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock},
            fn: ({source, clock}) => `${source} ${clock}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
          createTestLines: {
            type: 'table',
            fields: [source, clock, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * tag          * 
    | store  | none  | no clock     | 
    | store  | event | source store | 
    | store  | store | source store | 
    | event  | none  | no clock     | 
    | event  | event | events only  | 
    | event  | store | rest         | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
})

describe('computeVariants', () => {
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | b       | no b clock   | 
    | store  | none  | a       | no a clock   | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | b       | no b clock   | 
    | event  | none  | a       | no a clock   | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | b       | rest b       | 
    | event  | store | a       | rest a       | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | b       | no clock     | 
    | store  | none  | a       | no clock     | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | b       | no clock     | 
    | event  | none  | a       | no clock     | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | b       | rest         | 
    | event  | store | a       | rest         | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | source store | 
    | store  | none  | b       | no b clock   | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       |              | 
    | event  | none  | b       | no b clock   | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       |              | 
    | event  | store | b       | rest b       | 
    | event  | store | a       | rest a       | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | no b|c clock | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       | no b|c clock | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       | rest b|c     | 
    | event  | store | b       | rest b|c     | 
    | event  | store | a       | rest a       | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | no b|c clock | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       | no b|c clock | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       | rest b|c     | 
    | event  | store | b       | rest b|c     | 
    | event  | store | a       | rest a       | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
  // test('field validation')
})

describe('separate', () => {
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | b       | no b clock   | 
    | store  | none  | a       | no a clock   | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | b       | no b clock   | 
    | event  | none  | a       | no a clock   | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | b       | rest b       | 
    | event  | store | a       | rest a       | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | b       | no clock     | 
    | store  | none  | a       | no clock     | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | b       | no clock     | 
    | event  | none  | a       | no clock     | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | b       | rest         | 
    | event  | store | a       | rest         | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | source store | 
    | store  | none  | b       | no b clock   | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       |              | 
    | event  | none  | b       | no b clock   | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       |              | 
    | event  | store | b       | rest b       | 
    | event  | store | a       | rest a       | 
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | no b|c clock | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       | no b|c clock | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       | rest b|c     | 
    | event  | store | b       | rest b|c     | 
    | event  | store | a       | rest a       | 
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
            restBranch: [{feature: 'b'}, {feature: 'c'}],
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | c       | no b|c clock | 
    | store  | none  | b       | no b|c clock | 
    | store  | none  | a       | no a clock   | 
    | store  | event | c       | source store | 
    | store  | event | b       | source store | 
    | store  | event | a       | source store | 
    | store  | store | c       | source store | 
    | store  | store | b       | source store | 
    | store  | store | a       | source store | 
    | event  | none  | c       | no b|c clock | 
    | event  | none  | b       | no b|c clock | 
    | event  | none  | a       | no a clock   | 
    | event  | event | c       | events only  | 
    | event  | event | b       | events only  | 
    | event  | event | a       | events only  | 
    | event  | store | c       | rest b|c     | 
    | event  | store | b       | rest b|c     | 
    | event  | store | a       | rest a       | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
  // test('field validation')
})

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
          },
          byFeature: {
            aBranch: {feature: true},
            bBranch: {feature: false},
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, feature},
            fn: ({source, clock, feature}) => `${source} ${clock} ${feature}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
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
    | store  | none  | true    | no a clock   | 
    | store  | none  | false   | no b clock   | 
    | store  | event | true    | source store | 
    | store  | event | false   | source store | 
    | store  | store | true    | source store | 
    | store  | store | false   | source store | 
    | event  | none  | true    | no a clock   | 
    | event  | none  | false   | no b clock   | 
    | event  | event | true    | events only  | 
    | event  | event | false   | events only  | 
    | event  | store | true    | rest a       | 
    | event  | store | false   | rest b       | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
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
          getHash: computeFn({
            name: 'getHash',
            source: {source, clock, featureA, featureB},
            fn: ({source, clock, featureA, featureB}) =>
              `${source} ${clock} ${featureA} ${featureB}`,
          }),
          describeGroup: value('', 'describeGroup'),
          pass: value(true, 'pass'),
          createTestLines: {
            type: 'table',
            fields: [source, clock, featureA, featureB, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    * source * clock * featureA * featureB * tag          * 
    | store  | none  | false    | true     | no b clock   | 
    | store  | none  | true     | false    | no a clock   | 
    | store  | none  | false    | false    | no a|b none  | 
    | store  | event | false    | true     | source store | 
    | store  | event | true     | false    | source store | 
    | store  | event | false    | false    | source store | 
    | store  | store | false    | true     | source store | 
    | store  | store | true     | false    | source store | 
    | store  | store | false    | false    | source store | 
    | event  | none  | false    | true     | no b clock   | 
    | event  | none  | true     | false    | no a clock   | 
    | event  | none  | false    | false    | no a|b none  | 
    | event  | event | false    | true     | events only  | 
    | event  | event | true     | false    | events only  | 
    | event  | event | false    | false    | events only  | 
    | event  | store | false    | true     | rest b       | 
    | event  | store | true     | false    | rest a       | 
    | event  | store | false    | false    | rest none    | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
})
