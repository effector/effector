import {
  bracket,
  compute,
  generate,
  union,
  bool,
  val,
  text,
  rawPermute,
  permute,
} from '../manifold'
import {printMethod} from '../text'

test('basic case', () => {
  const result = generate(() => {
    const mode = union(['case', 'matcher'])
    const via = union(['unit', 'fn'])
    const title = bracket({
      source: {mode, via},
      matchGroups: {
        mode: {
          singular: {mode: 'case'},
          keyval: {mode: 'matcher'},
        },
        via: {
          unit: {via: 'unit'},
          fun: {via: 'fn'},
        },
      },
      fn(v: number, {mode, via}) {
        const predef = val('case function')
        mode({
          singular() {
            via({
              unit: () => 'case store',
              fun: () => predef,
            })
          },
          keyval() {
            via({
              unit: () => 'matcher store',
              fun() {
                val('matcher function')
              },
            })
          },
        })
      },
    })
    return text`title: "${title}"`
  })
  expect(result).toEqual([...new Set(result)])
})

describe('union', () => {
  test('single union', () => {
    const result = generate(() => {
      return union(['case', 'matcher'])
    })
    expect(result).toEqual(['case', 'matcher'])
  })
  test('pair of unions', () => {
    const result = generate(() => {
      const mode = union(['case', 'matcher'])
      const via = union(['unit', 'fn'])
      return text`${mode} ${via}`
    })
    expect(result).toEqual([
      'case unit',
      'case fn',
      'matcher unit',
      'matcher fn',
    ])
  })
  test('union in bracket branch', () => {
    const result = generate(() => {
      const user = union(['guest', 'user'])
      return bracket({
        source: {user},
        matchGroups: {
          _: {
            guest: {user: 'guest'},
            user: {user: 'user'},
          },
        },
        fn(v: string, {_}) {
          _({
            guest: () => 'hello guest',
            user() {
              const name = union(['alice', 'bob'])
              text`hello ${name} ${user}`
            },
          })
        },
      })
    })
    expect(result).toEqual([
      'hello guest',
      'hello alice user',
      'hello bob user',
    ])
  })
  test('unused unions', () => {
    const result = generate(() => {
      const ab = union(['a', 'b'])
      const typedFn = bool({
        source: {},
        when: {},
        flag: true,
      })
      return typedFn
    })
    expect(result).toEqual([false, true])
  })
})

describe('compute', () => {
  test('basic case', () => {
    const result = generate(() => {
      const mode = union(['case', 'matcher'])
      return text`mode: ${mode}`
    })
    expect(result).toEqual([...new Set(result)])
  })
  test('union combination', () => {
    const result = generate(() => {
      const mode = union(['case', 'matcher'])
      const via = union(['unit', 'fn'])
      return text`mode: ${mode}, via: ${via}`
    })
    expect(result).toEqual([...new Set(result)])
  })
})
test('bracket default branch', () => {
  const result = generate(() => {
    const user = union(['guest', 'user', 'admin', 'owner'])
    return bracket({
      source: {user},
      matchGroups: {
        _: {
          guest: {user: 'guest'},
          user: {user: 'user'},
          __: {},
        },
      },
      fn(v: string, {_}) {
        _({
          guest: () => 'hello guest',
          user: () => 'hello user',
          __() {
            const ab = union(['alice', 'bob'])
            text`${ab} ${user}`
          },
        })
      },
    })
  })
  expect(result).toMatchInlineSnapshot(`
    Array [
      "hello guest",
      "hello user",
      "alice admin",
      "bob admin",
      "alice owner",
      "bob owner",
    ]
  `)
})
describe('bracket edge cases', () => {
  test('bracket edge case', () => {
    const result = generate(() => {
      const clockType = union(['unit', 'array'])
      const b = union([false, true])
      bracket({
        source: {b},
        matchGroups: {
          _: {
            ok: {b: false},
            nope: {b: true},
          },
        },
        fn(v, {_}) {
          _({
            ok: () => 'ok',
            nope: () => 'nope',
          })
        },
      })
      bool({
        source: {clockType},
        when: {clockType: 'unit'},
        cases: {
          true: () => union(['unit_a', 'unit_b']),
          false: () => union(['arr_a', 'arr_b']),
        },
      })
      return clockType
    })
    expect(result).toEqual(['unit', 'array'])
  })
  test.only('bracket edge case 2', () => {
    const result = generate(() => {
      const clockType = union(['unit', 'array'])
      const sourceType = bool({
        source: {clockType},
        when: {clockType: 'unit'},
        cases: {
          true: () => val('unit'),
          false: () => union(['no', 'unit']),
        },
      })
      return clockType
    })
    expect(result).toEqual(['unit', 'array'])
  })
  test('edge case 3', () => {
    const result = generate(() => {
      const source = union(['num', 'str'])
      const fn = union([false, true])
      const typedFn = bool({
        source: {source},
        when: {},
        need: [fn],
        flag: true,
      })
      const fnCode = bracket({
        source: {fn, typedFn},
        matchGroups: {
          _: {
            noFn: {fn: false},
            typed: {typedFn: true},
            untyped: {typedFn: false},
          },
        },
        fn(v: string, {_}) {
          _({
            noFn: () => '-------',
            typed: () => 'typed  ',
            untyped: () => 'untyped',
          })
        },
      })
      return text`${source} ${fnCode} ${typedFn}`
    })
    expect(result).toEqual([...new Set(result)])
    expect(result).toMatchInlineSnapshot(`
Array [
  "num ------- false",
  "num untyped false",
  "num typed   true",
  "str ------- false",
  "str untyped false",
  "str typed   true",
]
`)
  })
  test('edge case 4', () => {
    const result = generate(() => {
      const source = union(['event', 'store', 'combinable'])
      const clock = union(['none', 'event', 'store'])
      const target = union(['none', 'event'])

      const targetCode = bracket({
        source: {target},
        matchGroups: {
          _: {
            none: {target: 'none'},
            event: {target: 'event'},
          },
        },
        fn(v: string, {_}) {
          _({
            none: () => 'tar_none ',
            event: () => 'tar_event',
          })
        },
      })
      const returnCode = bracket({
        source: {
          target,
        },
        matchGroups: {
          target: {
            none: {target: 'none'},
            event: {target: 'event'},
            __: {},
          },
        },
        fn(v: string, {target}) {
          target({
            __: () => val('    __     '),
            none() {
              bool({
                source: {source, clock},
                when: [
                  {source: 'store', clock: 'store'},
                  {source: 'combinable', clock: 'store'},
                  {source: 'store', clock: 'none'},
                  {source: 'combinable', clock: 'none'},
                ],
                cases: {
                  true: () => val('none__store'),
                  false: () => val('none__event'),
                },
              })
            },
            event: () => 'event_event',
          })
        },
      })
      return text`${returnCode} / ${targetCode}`
    })
    // expect(result).toEqual([...new Set(result)])
    expect(result).toMatchInlineSnapshot(`
Array [
  "    __      / tar_none ",
  "    __      / tar_event",
]
`)
  })
})

describe('filter', () => {})

describe('real cases', () => {
  test('sampleReturn', () => {
    const result = generate(() => {
      const source = union(['event', 'store', 'combinable'])
      const clock = union(['none', 'event', 'store', 'tuple'])
      const target = union(['none', 'event', 'store', 'tuple'])
      const fn = bracket({
        source: {clock},
        matchGroups: {
          _: {
            noClock: {clock: 'none'},
            hasClock: {},
          },
        },
        fn(v: 'none' | 'noArgs' | 'arg' | 'argPair', {_}) {
          _({
            noClock: () => union(['none', 'noArgs', 'arg']),
            hasClock: () => union(['none', 'noArgs', 'arg', 'argPair']),
          })
        },
      })
      const typedFn = bool({
        source: {fn},
        when: [{fn: 'arg'}, {fn: 'argPair'}],
        cases: {
          true: () => union([false, true]),
          false: () => val(false),
        },
      })
      const fnCode = bracket({
        source: {fn, typedFn},
        matchGroups: {
          fn: {
            none: {fn: 'none'},
            noArgs: {fn: 'noArgs'},
            arg: {fn: 'arg'},
            argPair: {fn: 'argPair'},
          },
          types: {
            typed: {typedFn: true},
            untyped: {},
          },
        },
        fn(v: string | null, {fn, types}) {
          fn({
            none: () => null,
            noArgs: () => 'fn0',
            arg() {
              types({
                typed: () => 'fn1',
                untyped: () => '({a}) => ({a})',
              })
            },
            argPair() {
              types({
                typed: () => 'fn2',
                untyped: () => '({a},c) => ({a:a+c})',
              })
            },
          })
        },
      })
      const sourceCode = bracket({
        source: {source},
        matchGroups: {
          _: {
            event: {source: 'event'},
            store: {source: 'store'},
            combinable: {source: 'combinable'},
          },
        },
        fn(v: string | null, {_}) {
          _({
            event: () => 'aNum    ',
            store: () => 'a       ',
            combinable: () => '{a:$num}',
          })
        },
      })
      const clockCode = bracket({
        source: {clock},
        matchGroups: {
          _: {
            none: {clock: 'none'},
            event: {clock: 'event'},
            store: {clock: 'store'},
            tuple: {clock: 'tuple'},
          },
        },
        fn(v: string | null, {_}) {
          _({
            none: () => null,
            event: () => 'aNumT',
            store: () => 'aT',
            tuple: () => '[aNumT,aT]',
          })
        },
      })

      const targetCode = bracket({
        source: {target},
        matchGroups: {
          _: {
            none: {target: 'none'},
            event: {target: 'event'},
            store: {target: 'store'},
            tuple: {target: 'tuple'},
          },
        },
        fn(v: string | null, {_}) {
          _({
            none: () => null,
            event: () => 'aNumT',
            store: () => 'aT   ',
            tuple: () => '[aNumT,aT]',
          })
        },
      })

      const methodCode = compute({
        source: {fnCode, clockCode, targetCode, sourceCode},
        fn(value) {
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
      })
      const returnCode = bracket({
        source: {
          target,
        },
        matchGroups: {
          target: {
            none: {target: 'none'},
            event: {target: 'event'},
            store: {target: 'store'},
            tuple: {target: 'tuple'},
          },
        },
        fn(v: string, {target}) {
          target({
            none() {
              bool({
                source: {source, clock},
                when: [
                  {source: 'store', clock: 'store'},
                  {source: 'combinable', clock: 'store'},
                  {source: 'store', clock: 'none'},
                  {source: 'combinable', clock: 'none'},
                ],
                cases: {
                  true: () => val('Store<AN>'),
                  false: () => val('Event<AN>'),
                },
              })
            },
            event: () => 'Event<AN>',
            store: () => 'Store<AN>',
            tuple: () => '[Event<AN>, Store<AN>]',
          })
        },
      })
      return text`{const result: ${returnCode} = ${methodCode}}`
    })
    expect(result).toEqual([...new Set(result)])
    expect(result).toMatchInlineSnapshot(`
      Array [
        "{const result: Event<AN> = sample({source:aNum    })}",
        "{const result: Event<AN> = sample({source:aNum    , fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , target:aNumT})}",
        "{const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , target:aNumT, fn:fn1})}",
        "{const result: Store<AN> = sample({source:aNum    , target:aT   })}",
        "{const result: Store<AN> = sample({source:aNum    , target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:aNum    , target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:aNum    , target:aT   , fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , target:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aNumT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   })}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aNumT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aNumT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:aT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   })}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:aT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:aT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT]})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   })}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:aNum    , clock:[aNumT,aT], target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:aNum    , clock:[aNumT,aT], target:[aNumT,aT], fn:fn2})}",
        "{const result: Store<AN> = sample({source:a       })}",
        "{const result: Store<AN> = sample({source:a       , fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , target:aNumT})}",
        "{const result: Event<AN> = sample({source:a       , target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , target:aNumT, fn:fn1})}",
        "{const result: Store<AN> = sample({source:a       , target:aT   })}",
        "{const result: Store<AN> = sample({source:a       , target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , target:aT   , fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , target:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aNumT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   })}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aNumT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aNumT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, fn:fn1})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:a       , clock:aT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   })}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:a       , clock:aT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:aT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT]})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:a       , clock:[aNumT,aT], target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   })}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:a       , clock:[aNumT,aT], target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:a       , clock:[aNumT,aT], target:[aNumT,aT], fn:fn2})}",
        "{const result: Store<AN> = sample({source:{a:$num}})}",
        "{const result: Store<AN> = sample({source:{a:$num}, fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, target:aNumT})}",
        "{const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, target:aNumT, fn:fn1})}",
        "{const result: Store<AN> = sample({source:{a:$num}, target:aT   })}",
        "{const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, target:aT   , fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, target:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aNumT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   })}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aNumT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aNumT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, fn:fn1})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, fn:fn2})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:aT, target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   })}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:aT, target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:aT, target:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT]})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], fn:fn2})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT, fn:fn0})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT, fn:({a}) => ({a})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT, fn:fn1})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT, fn:({a},c) => ({a:a+c})})}",
        "{const result: Event<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aNumT, fn:fn2})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   })}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   , fn:fn0})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   , fn:({a}) => ({a})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   , fn:fn1})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   , fn:({a},c) => ({a:a+c})})}",
        "{const result: Store<AN> = sample({source:{a:$num}, clock:[aNumT,aT], target:aT   , fn:fn2})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT]})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT], fn:fn0})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT], fn:({a}) => ({a})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT], fn:fn1})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT], fn:({a},c) => ({a:a+c})})}",
        "{const result: [Event<AN>, Store<AN>] = sample({source:{a:$num}, clock:[aNumT,aT], target:[aNumT,aT], fn:fn2})}",
      ]
    `)
  })
  test('sample array target plain', () => {
    const result = generate(() => {
      const source = union(['num', 'str'])
      const clock = union(['num', 'str'])
      const fn = union([false, true])
      const typedFn = bool({
        source: {fn, source, clock},
        when: [
          {fn: true, source: 'num', clock: 'num'},
          {fn: true, source: 'str', clock: 'num'},
          {fn: true, source: 'num', clock: 'str'},
        ],
        cases: {
          true: () => union([false, true]),
          false: () => val(false),
        },
      })
      const fnCode = bracket({
        source: {fn, typedFn},
        matchGroups: {
          _: {
            noFn: {fn: false},
            typed: {typedFn: true},
            untyped: {typedFn: false},
          },
        },
        fn(v: string | null, {_}) {
          _({
            noFn: () => null,
            typed: () => '(src:number,clk:number) => src+clk',
            untyped: () => '(src,clk) => src + clk',
          })
        },
      })
      return text`${source} ${clock} ${fnCode}`
    })
    expect(result).toEqual([...new Set(result)])
    expect(result).toMatchInlineSnapshot(`
      Array [
        "num num ",
        "num num (src,clk) => src + clk",
        "num num (src:number,clk:number) => src+clk",
        "num str ",
        "num str (src,clk) => src + clk",
        "num str (src:number,clk:number) => src+clk",
        "str num ",
        "str num (src,clk) => src + clk",
        "str num (src:number,clk:number) => src+clk",
        "str str ",
        "str str (src,clk) => src + clk",
      ]
    `)
  })
})

test('permute', () => {
  expect(
    generate(() => {
      const itemSet = permute({
        items: ['anyt', 'voidt', 'num'],
        amount: {min: 1, max: 3},
        reorder: false,
      })

      return compute({
        source: {itemSet},
        fn: ({itemSet}) => itemSet.join(' '),
      })
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "anyt",
      "voidt",
      "num",
      "anyt voidt",
      "anyt num",
      "num voidt",
      "anyt voidt num",
    ]
  `)
  expect(
    generate(() => {
      const itemSet = permute({
        items: ['anyt', 'voidt', 'num'],
        amount: {min: 1, max: 3},
        reorder: true,
      })

      return compute({
        source: {itemSet},
        fn: ({itemSet}) => itemSet.join(' '),
      })
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "anyt",
      "voidt",
      "num",
      "anyt voidt",
      "anyt num",
      "voidt anyt",
      "voidt num",
      "num anyt",
      "num voidt",
      "anyt voidt num",
      "anyt num voidt",
      "voidt anyt num",
      "voidt num anyt",
      "num anyt voidt",
      "num voidt anyt",
    ]
  `)
  expect(
    generate(() => {
      const itemSet = permute({
        items: ['anyt', 'voidt', 'num'],
        amount: {min: 1, max: 2},
        reorder: false,
      })

      return compute({
        source: {itemSet},
        fn: ({itemSet}) => itemSet.join(' '),
      })
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "anyt",
      "voidt",
      "num",
      "anyt voidt",
      "anyt num",
      "num voidt",
    ]
  `)
  expect(
    generate(() => {
      const itemSet = permute({
        items: ['anyt', 'voidt', 'num'],
        amount: {min: 1, max: 2},
        reorder: true,
      })

      return compute({
        source: {itemSet},
        fn: ({itemSet}) => itemSet.join(' '),
      })
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "anyt",
      "voidt",
      "num",
      "anyt voidt",
      "anyt num",
      "voidt anyt",
      "voidt num",
      "num anyt",
      "num voidt",
    ]
  `)
})
