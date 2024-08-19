/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  sample,
  Store,
  Event,
  StoreWritable,
  EventCallable,
} from 'effector'
const typecheck = '{global}'

describe('sample(config)', () => {
  describe('sample({source, filter: store})', () => {
    it('return new event (should pass)', () => {
      const trigger = createEvent<number>()
      const allow = createStore<boolean>(false)

      const result: Event<number> = sample({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('support any unit (should pass)', () => {
      const trigger = createStore<number[]>([1])
      const allow = createStore<boolean>(false)

      const result: Event<number[]> = sample({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('store is not boolean (should fail)', () => {
      const trigger = createEvent<number>()
      const allow = createStore<string>('no')

      sample({
        //@ts-expect-error
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger = createEvent<number>()
      const allow = createStore<string>('no')

      sample({
        //@ts-expect-error
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: EventCallable<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: StoreWritable<number> = createStore(0)

        sample({
          source: trigger,
          filter: allow,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        const trigger: EventCallable<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target = createStore<string>('no')

        sample({
          //@ts-expect-error
          source: trigger,
          filter: allow,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 9 'target,'
          lack of expected error at test line 7 'source: trigger,'
          Type 'StoreWritable<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.
          "
        `)
      })
    })
  })
  describe('sample({source, filter: fn})', () => {
    it('returns new event (should pass)', () => {
      const trigger = createEvent<number>()
      const result: Event<number> = sample({
        source: trigger,
        filter: n => n > 0,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger = createEvent<number>()

      //@ts-expect-error
      const result: Event<string> = sample({
        source: trigger,
        filter: n => n > 0,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger = createEvent<number>()
        const target = createStore<number>(0)

        sample({
          source: trigger,
          filter: x => x > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        const trigger = createEvent<number>()
        const target = createStore<string>('no')

        sample({
          //@ts-expect-error
          source: trigger,
          filter: x => x > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 8 'target,'
          lack of expected error at test line 6 'source: trigger,'
          Type 'StoreWritable<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.
          "
        `)
      })
      describe('any to void', () => {
        test('with store (should pass)', () => {
          const filter = createStore(true)
          const source = createEvent<string>()
          const target = createEvent<void>()

          sample({
            source,
            filter,
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('with function (should pass)', () => {
          const source = createEvent<{pass: boolean}>()
          const target = createEvent<void>()

          sample({
            source,
            filter: ({pass}) => pass,
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
      })
    })
  })
  describe('sample({source, clock, filter: fn})', () => {
    it('returns new event (should pass)', () => {
      const clock = createEvent<string>()
      const source = createEvent<number>()
      const result: Event<number> = sample({
        clock,
        source,
        filter: (src, clk) => src + clk.length > 0,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const clock = createEvent<string>()
      const source = createEvent<number>()

      //@ts-expect-error
      const result: Event<string> = sample({
        clock,
        source,
        filter: (src, clk) => src + clk.length > 0,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const clock = createEvent<string>()
        const source = createEvent<number>()
        const target = createStore<number>(0)

        sample({
          clock,
          source,
          filter: (src, clk) => src + clk.length > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('filter + fn edge case (should pass)', () => {
        const $source = createStore({a: null as number | null, b: ''})
        const aNum = createEvent<number>()
        sample({
          source: $source,
          target: aNum,
          filter: (val): val is {a: number; b: string} =>
            typeof val.a === 'number' && val.a > 0,
          fn: val => 1,
        })
        sample({
          source: $source,
          target: aNum,
          filter: (val): val is {a: number; b: string} =>
            typeof val.a === 'number' && val.a > 0,
          fn: (val: {a: number; b: string}) => val.a + 1,
        })
        sample({
          clock: $source,
          target: aNum,
          filter: (val): val is {a: number; b: string} =>
            typeof val.a === 'number' && val.a > 0,
          fn: val => 1,
        })
        sample({
          clock: $source,
          target: aNum,
          filter: (val): val is {a: number; b: string} =>
            typeof val.a === 'number' && val.a > 0,
          fn: (val: {a: number; b: string}) => val.a + 1,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        const clock = createEvent<string>()
        const source = createEvent<number>()
        const target = createStore<string>('no')

        sample({
          //@ts-expect-error
          clock,
          source,
          filter: (src, clk) => src + clk.length > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 10 'target,'
          lack of expected error at test line 7 'clock,'
          Type 'StoreWritable<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.
          "
        `)
      })
      describe('any to void', () => {
        test('with store (should pass)', () => {
          const clock = createEvent<string>()
          const filter = createStore(true)
          const source = createEvent<string>()
          const target = createEvent<void>()

          sample({
            clock,
            source,
            filter,
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('with function (should pass)', () => {
          const clock = createEvent<string>()
          const source = createEvent<{pass: boolean}>()
          const target = createEvent<void>()

          sample({
            clock,
            source,
            filter: ({pass}, clk) => pass && clk.length > 0,
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
      })
    })
  })
  describe('sample({source, filter: Boolean})', () => {
    it('returns new event (should pass)', () => {
      type User = {name: string}
      const trigger = createEvent<User | null>()
      const result: Event<User> = sample({
        source: trigger,
        filter: Boolean,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      type User = {name: string}
      const trigger = createEvent<User>()

      //@ts-expect-error
      const result: Event<string> = sample({
        source: trigger,
        filter: Boolean,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<User>' is not assignable to type 'Event<string>'.
          Type 'User' is not assignable to type 'string'.
        "
      `)
    })
    it('filters falsy values (should pass)', () => {
      type User = {name: string}
      type FalsyValues = null | undefined | false | 0 | 0n | ''
      const trigger = createEvent<User | FalsyValues>()
      const result: Event<User> = sample({
        source: trigger,
        filter: Boolean,
      })
      const resultFn: Event<User> = sample({
        source: trigger,
        filter: Boolean,
        fn: (arg: User) => arg,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        type User = {name: string}
        const trigger = createEvent<User | null>()
        const target = createStore<User>({name: 'alice'})

        sample({
          source: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        type User = {name: string}
        const trigger = createEvent<User>()
        const target = createStore<string>('no')

        sample({
          //@ts-expect-error
          source: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 9 'target,'
          lack of expected error at test line 7 'source: trigger,'
          Type 'StoreWritable<string>' is not assignable to type 'Unit<User>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'User'.
          "
        `)
      })
      test('any to void (should pass)', () => {
        const source = createEvent<{pass: boolean}>()
        const target = createEvent<void>()

        sample({
          source,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
  describe('sample({clock, filter: Boolean})', () => {
    it('returns new event (should pass)', () => {
      type User = {name: string}
      const trigger = createEvent<User | null>()
      const result: Event<User> = sample({
        clock: trigger,
        filter: Boolean,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      type User = {name: string}
      const trigger = createEvent<User>()

      //@ts-expect-error
      const result: Event<string> = sample({
        clock: trigger,
        filter: Boolean,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<User>' is not assignable to type 'Event<string>'.
          Type 'User' is not assignable to type 'string'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        type User = {name: string}
        const trigger = createEvent<User | null>()
        const target = createStore<User>({name: 'alice'})

        sample({
          clock: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        type User = {name: string}
        const trigger = createEvent<User>()
        const target = createStore<string>('no')

        sample({
          //@ts-expect-error
          clock: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: User; targetType: string; }; }'.
          "
        `)
      })
      test('any to void (should pass)', () => {
        const clock = createEvent<{pass: boolean}>()
        const target = createEvent<void>()

        sample({
          clock,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
})

describe('filter return validation', () => {
  const anyt = createEvent<any>()
  describe('wrong return', () => {
    test('sample({source, filter}) (should fail)', () => {
      //@ts-expect-error
      sample({source: anyt, filter: () => 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '[{ source: EventCallable<any>; filter: () => number; }]' is not assignable to parameter of type '[config: { source: EventCallable<any>; clock?: undefined; filter: (src: any) => src is any; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ source: EventCallable<any>; filter: () => number; }]' is not assignable to type '[config: { source: EventCallable<any>; clock?: undefined; filter: (src: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ source: EventCallable<any>; filter: () => number; }' is not assignable to type '{ source: EventCallable<any>; clock?: undefined; filter: (src: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ source: EventCallable<any>; filter: () => number; }' is not assignable to type '{ source: EventCallable<any>; clock?: undefined; filter: (src: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                The types returned by 'filter(...)' are incompatible between these types.
                  Type 'number' is not assignable to type 'boolean'.
        "
      `)
    })
    test('sample({clock, filter}) (should fail)', () => {
      //@ts-expect-error
      sample({clock: anyt, filter: () => 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '[{ clock: EventCallable<any>; filter: () => number; }]' is not assignable to parameter of type '[config: { clock: EventCallable<any>; source?: undefined; filter: (clk: any) => clk is any; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: EventCallable<any>; filter: () => number; }]' is not assignable to type '[config: { clock: EventCallable<any>; source?: undefined; filter: (clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<any>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<any>; source?: undefined; filter: (clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<any>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<any>; source?: undefined; filter: (clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                The types returned by 'filter(...)' are incompatible between these types.
                  Type 'number' is not assignable to type 'boolean'.
        "
      `)
    })
    test('sample({source, clock, filter}) (should fail)', () => {
      //@ts-expect-error
      sample({source: anyt, clock: anyt, filter: () => 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '[{ source: EventCallable<any>; clock: EventCallable<any>; filter: () => number; }]' is not assignable to parameter of type '[config: { clock: EventCallable<any>; source: EventCallable<any>; filter: (src: any, clk: any) => src is any; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ source: EventCallable<any>; clock: EventCallable<any>; filter: () => number; }]' is not assignable to type '[config: { clock: EventCallable<any>; source: EventCallable<any>; filter: (src: any, clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ source: EventCallable<any>; clock: EventCallable<any>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<any>; source: EventCallable<any>; filter: (src: any, clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ source: EventCallable<any>; clock: EventCallable<any>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<any>; source: EventCallable<any>; filter: (src: any, clk: any) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                The types returned by 'filter(...)' are incompatible between these types.
                  Type 'number' is not assignable to type 'boolean'.
        "
      `)
    })
  })
  describe('boolean return', () => {
    test('sample({source, filter}) (should pass)', () => {
      sample({source: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('sample({clock, filter}) (should pass)', () => {
      sample({clock: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('sample({source, clock, filter}) (should pass)', () => {
      sample({source: anyt, clock: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
  describe('boolean subtype return', () => {
    test('sample({source, filter}) (should pass)', () => {
      sample({source: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('sample({clock, filter}) (should pass)', () => {
      sample({clock: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('sample({source, clock, filter}) (should pass)', () => {
      sample({source: anyt, clock: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
})

describe('any support in arguments inference', () => {
  function assertNonNever<T>(val: T): [T] extends [never] ? 'never' : 'ok' {
    return val as any
  }
  const anyt = createEvent<any>()
  test('sample({source, filter}) (should pass)', () => {
    sample({
      source: anyt,
      filter(src) {
        const x: 'ok' = assertNonNever(src)
        return false
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({clock, filter}) (should pass)', () => {
    sample({
      clock: anyt,
      filter(clk) {
        const x: 'ok' = assertNonNever(clk)
        return false
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({clock: [clock], filter}) (should pass)', () => {
    sample({
      clock: [anyt],
      filter(clk) {
        const x: 'ok' = assertNonNever(clk)
        return false
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source, clock, filter}) (should pass)', () => {
    sample({
      source: anyt,
      clock: anyt,
      filter(src, clk) {
        const x1: 'ok' = assertNonNever(src)
        const x2: 'ok' = assertNonNever(clk)
        return false
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source, clock: [clock], filter}) (should pass)', () => {
    sample({
      source: anyt,
      clock: [anyt],
      filter(src, clk) {
        const x1: 'ok' = assertNonNever(src)
        const x2: 'ok' = assertNonNever(clk)
        return false
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('sample return type supports union types (should pass)', () => {
  const trigger = createEvent<{a: 1} | {a: 2}>()
  const allow = createStore<boolean>(false)

  const result: Event<{a: 1} | {a: 2}> = sample({
    source: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('incorrect filter (should fail)', () => {
  const trigger = createEvent()
  const target = createEvent()
  function factory() {
    //@ts-expect-error
    sample({
      source: trigger,
      filter: null,
      target,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '[{ source: EventCallable<void>; filter: null; target: EventCallable<void>; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
      Type '[{ source: EventCallable<void>; filter: null; target: EventCallable<void>; }]' is not assignable to type '[config: never]'.
        Type '{ source: EventCallable<void>; filter: null; target: EventCallable<void>; }' is not assignable to type 'never'.
          The intersection '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
    "
  `)
})
