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

test('it works', () => {
  const suite = suiteGenerator(() => {
    const source = union(['event', 'store', 'combinable'], 'source')
    const clock = union(['none', 'event', 'store', 'tuple'], 'clock')

    config({
      grouping: {
        getHash: [source, clock],
        describeGroup: source,
        pass: value(true),
        createTestLines: {
          method: 'method',
          shape: {
            src: source,
            clk: clock,
          },
        },
      },
    })
  })
  expect(suite).toMatchInlineSnapshot(`
    "test('event (should pass)', () => {
      //prettier-ignore
      {
        method({src:event, clk:none })
        method({src:event, clk:event})
        method({src:event, clk:store})
        method({src:event, clk:tuple})
      }
      expect(typecheck).toMatchInlineSnapshot()
    })
    test('store (should pass)', () => {
      //prettier-ignore
      {
        method({src:store, clk:none })
        method({src:store, clk:event})
        method({src:store, clk:store})
        method({src:store, clk:tuple})
      }
      expect(typecheck).toMatchInlineSnapshot()
    })
    test('combinable (should pass)', () => {
      //prettier-ignore
      {
        method({src:combinable, clk:none })
        method({src:combinable, clk:event})
        method({src:combinable, clk:store})
        method({src:combinable, clk:tuple})
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

      const pass = value(true, 'pass')
      config({
        grouping: {
          getHash: [source, clock],
          describeGroup: value(''),
          pass,
          createTestLines: {
            method: 'method',
            shape: {
              src: source,
              clk: clock,
            },
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "test(' (should pass)', () => {
        //prettier-ignore
        {
          method({src:event     , clk:none })
          method({src:event     , clk:event})
          method({src:event     , clk:store})
          method({src:event     , clk:tuple})
          method({src:store     , clk:none })
          method({src:store     , clk:event})
          method({src:store     , clk:store})
          method({src:store     , clk:tuple})
          method({src:combinable, clk:none })
          method({src:combinable, clk:event})
          method({src:combinable, clk:store})
          method({src:combinable, clk:tuple})
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
            getHash: [source, clock],
            describeGroup: source,
            pass: computeFn({
              name: 'pass',
              source: {source},
              fn: ({source}) => source === 'event',
            }),
            createTestLines: {
              method: 'method',
              shape: {
                src: source,
                clk: clock,
              },
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
        "test('event (should pass)', () => {
          //prettier-ignore
          {
            method({src:event, clk:none })
            method({src:event, clk:event})
          }
          expect(typecheck).toMatchInlineSnapshot()
        })
        test('store (should fail)', () => {
          //prettier-ignore
          {
            //@ts-expect-error
            method({src:store, clk:none })
            //@ts-expect-error
            method({src:store, clk:event})
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
            getHash: [source, clock],
            describeGroup: source,
            pass: computeFn({
              name: 'pass',
              source: {clock},
              fn: ({clock}) => clock === 'event',
            }),
            createTestLines: {
              method: 'method',
              shape: {
                src: source,
                clk: clock,
              },
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
        "describe('event', () => {
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
        })
        describe('store', () => {
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
            getHash: [source, clock],
            describeGroup: value(''),
            pass: value(true),
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
            | event  | store | rest         | 
            | event  | event | events only  | 
            | event  | none  | no clock     | 
            | store  | store | source store | 
            | store  | event | source store | 
            | store  | none  | no clock     | 
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
            getHash: [source],
            describeGroup: value(''),
            pass: value(true),
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
            | event  | store | rest         | 
            | event  | event | events only  | 
            | event  | none  | no clock     | 
            | store  | store | source store | 
            | store  | event | source store | 
            | store  | none  | no clock     | 
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
            getHash: [source],
            describeGroup: source,
            pass: value(true),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
        "test('event (should pass)', () => {
          //prettier-ignore
          {
            * source * clock * tag         * 
            | event  | store | rest        | 
            | event  | event | events only | 
            | event  | none  | no clock    | 
          }
          expect(typecheck).toMatchInlineSnapshot()
        })
        test('store (should pass)', () => {
          //prettier-ignore
          {
            * source * clock * tag          * 
            | store  | store | source store | 
            | store  | event | source store | 
            | store  | none  | no clock     | 
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
            getHash: [source],
            describeGroup: clock,
            pass: value(true),
            createTestLines: {
              type: 'table',
              fields: [source, clock, tag],
            },
          },
        })
      })
      expect(suite).toMatchInlineSnapshot(`
        "test('none  (should pass)', () => {
          //prettier-ignore
          {
            * source * clock * tag          * 
            | event  | store | rest         | 
            | event  | event | events only  | 
            | event  | none  | no clock     | 
            | store  | store | source store | 
            | store  | event | source store | 
            | store  | none  | no clock     | 
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
          getHash: [source, clock],
          describeGroup: value(''),
          pass: value(true),
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
          | event  | store | rest         | 
          | event  | event | events only  | 
          | event  | none  | no clock     | 
          | store  | store | source store | 
          | store  | event | source store | 
          | store  | none  | no clock     | 
        }
        expect(typecheck).toMatchInlineSnapshot()
      })"
    `)
  })
})

describe('name usage', () => {
  test('inline operator with name', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b'], 'source')
      const feature = flag({
        name: 'feature',
      })

      const tag = separate({
        name: 'tag',
        source: {feature},
        variant: {
          byFeature: {
            aBranch: {feature: true},
            none: {feature: false},
          },
        } as const,
        cases: {
          aBranch: value('-'),
          none: union(['A', 'B'], 'clock'),
        },
      })
      config({
        grouping: {
          getHash: [source, feature],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, feature, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "test(' (should pass)', () => {
        //prettier-ignore
        {
          * source * feature * tag * 
          | a      | false   | A   | 
          | a      | false   | B   | 
          | a      | false   | A   | 
          | a      | false   | B   | 
          | a      | true    | -   | 
          | a      | true    | -   | 
          | b      | false   | A   | 
          | b      | false   | B   | 
          | b      | false   | A   | 
          | b      | false   | B   | 
          | b      | true    | -   | 
          | b      | true    | -   | 
        }
        expect(typecheck).toMatchInlineSnapshot()
      })"
    `)
  })
  test('inline operator without name', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b'], 'source')
      const feature = flag({
        name: 'feature',
      })

      const tag = separate({
        name: 'tag',
        source: {feature},
        variant: {
          byFeature: {
            aBranch: {feature: true},
            none: {feature: false},
          },
        } as const,
        cases: {
          aBranch: value('-'),
          none: union(['A', 'B']),
        },
      })
      config({
        grouping: {
          getHash: [source, feature],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, feature, tag],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
      "test(' (should pass)', () => {
        //prettier-ignore
        {
          * source * feature * tag * 
          | a      | false   | A   | 
          | a      | false   | B   | 
          | a      | true    | -   | 
          | b      | false   | A   | 
          | b      | false   | B   | 
          | b      | true    | -   | 
        }
        expect(typecheck).toMatchInlineSnapshot()
      })"
    `)
  })
  test('flag edge case', () => {
    const suite = suiteGenerator(() => {
      const source = union(['a', 'b', 'c'], 'source')
      const feature = flag({
        name: 'feature',
        needs: [
          computeVariants({
            source: {source},
            variant: {
              src: {
                a: {source: 'a'},
                b: {source: 'b'},
              },
            },
            cases: {
              a: false,
              b: true,
            },
          }),
        ],
      })
      config({
        grouping: {
          getHash: [source, feature],
          describeGroup: value(''),
          pass: value(true),
          createTestLines: {
            type: 'table',
            fields: [source, feature],
          },
        },
      })
    })
    expect(suite).toMatchInlineSnapshot(`
"test(' (should pass)', () => {
  //prettier-ignore
  {
    * source * feature * 
    | a      | false   | 
    | b      | false   | 
    | c      | false   | 
    | b      | true    | 
  }
  expect(typecheck).toMatchInlineSnapshot()
})"
`)
  })
})
