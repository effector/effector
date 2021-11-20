/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Store, Event} from 'effector'
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

      //@ts-expect-error
      sample({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<number>; filter: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: Store<string>; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: Store<string>; }'.
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger = createEvent<number>()
      const allow = createStore<string>('no')

      //@ts-expect-error
      sample({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<number>; filter: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: Store<string>; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: Store<string>; }'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<number> = createStore(0)

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
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<string> = createStore('no')

        sample({
          //@ts-expect-error
          source: trigger,
          filter: allow,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Argument of type '{ source: Event<number>; filter: Store<boolean>; target: Store<string>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }; }'.
            Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }; }'.
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
        Argument of type '{ source: Event<number>; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: undefined; }'.
        Parameter 'n' implicitly has an 'any' type.
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
        Argument of type '{ source: Event<number>; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: undefined; }'.
        Parameter 'n' implicitly has an 'any' type.
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
          Argument of type '{ source: Event<number>; filter: (x: any) => boolean; target: Store<number>; }' is not assignable to parameter of type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: Store<number> | undefined; }'.
            Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: Store<number> | undefined; }'.
          Parameter 'x' implicitly has an 'any' type.
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        const trigger = createEvent<number>()
        const target = createStore<string>('no')

        sample({
          source: trigger,
          filter: x => x > 0,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Argument of type '{ source: Event<number>; filter: (x: any) => boolean; target: Store<string>; }' is not assignable to parameter of type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: Store<string> | undefined; }'.
            Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock?: undefined; fn: (src: number) => any; target?: Store<string> | undefined; }'.
          Parameter 'x' implicitly has an 'any' type.
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
            Argument of type '{ source: Event<{ pass: boolean; }>; filter: ({ pass }: { pass: any; }) => any; target: Event<void>; }' is not assignable to parameter of type '{ source: Event<{ pass: boolean; }>; clock?: undefined; fn: (src: { pass: boolean; }) => any; target?: Event<void> | undefined; }'.
              Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ pass: boolean; }>; clock?: undefined; fn: (src: { pass: boolean; }) => any; target?: Event<void> | undefined; }'.
            Binding element 'pass' implicitly has an 'any' type.
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
        Argument of type '{ clock: Event<string>; source: Event<number>; filter: (src: any, clk: any) => boolean; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: undefined; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'clk' implicitly has an 'any' type.
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
        Argument of type '{ clock: Event<string>; source: Event<number>; filter: (src: any, clk: any) => boolean; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: undefined; }'.
        Parameter 'src' implicitly has an 'any' type.
        Parameter 'clk' implicitly has an 'any' type.
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
          Argument of type '{ clock: Event<string>; source: Event<number>; filter: (src: any, clk: any) => boolean; target: Store<number>; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: Store<number> | undefined; }'.
            Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: Store<number> | undefined; }'.
          Parameter 'src' implicitly has an 'any' type.
          Parameter 'clk' implicitly has an 'any' type.
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        const clock = createEvent<string>()
        const source = createEvent<number>()
        const target = createStore<string>('no')

        sample({
          clock,
          source,
          filter: (src, clk) => src + clk.length > 0,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Argument of type '{ clock: Event<string>; source: Event<number>; filter: (src: any, clk: any) => boolean; target: Store<string>; }' is not assignable to parameter of type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: Store<string> | undefined; }'.
            Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<number>; clock: Event<string>; fn: (src: number, clk: string) => any; target?: Store<string> | undefined; }'.
          Parameter 'src' implicitly has an 'any' type.
          Parameter 'clk' implicitly has an 'any' type.
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
            Argument of type '{ clock: Event<string>; source: Event<{ pass: boolean; }>; filter: ({ pass }: { pass: any; }, clk: any) => any; target: Event<void>; }' is not assignable to parameter of type '{ source: Event<{ pass: boolean; }>; clock: Event<string>; fn: (src: { pass: boolean; }, clk: string) => any; target?: Event<void> | undefined; }'.
              Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ pass: boolean; }>; clock: Event<string>; fn: (src: { pass: boolean; }, clk: string) => any; target?: Event<void> | undefined; }'.
            Binding element 'pass' implicitly has an 'any' type.
            Parameter 'clk' implicitly has an 'any' type.
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
        Type 'Event<User | null>' is not assignable to type 'Event<User>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: User | null) => any) => Subscription' is not assignable to type '(watcher: (payload: User) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'User | null' is not assignable to type 'User'.
                    Type 'null' is not assignable to type 'User'.
        Argument of type '{ source: Event<User | null>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      type User = {name: string}
      const trigger: Event<User> = createEvent()

      //@ts-expect-error
      const result: Event<string> = sample({
        source: trigger,
        filter: Boolean,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<User>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: User) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'User' is not assignable to type 'string'.
        Argument of type '{ source: Event<User>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        type User = {name: string}
        const trigger: Event<User | null> = createEvent()
        const target: Store<User> = createStore({name: 'alice'})

        sample({
          source: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Argument of type '{ source: Event<User | null>; filter: BooleanConstructor; target: Store<User>; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
            Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
          "
        `)
      })
      test('type mismatch (should fail)', () => {
        type User = {name: string}
        const trigger: Event<User> = createEvent()
        const target: Store<string> = createStore('no')

        sample({
          //@ts-expect-error
          source: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Argument of type '{ source: Event<User>; filter: BooleanConstructor; target: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
            Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
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
          Argument of type '{ source: Event<{ pass: boolean; }>; filter: BooleanConstructor; target: Event<void>; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
            Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: BooleanConstructor; }'.
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
        Argument of type '{ source: Event<any>; filter: () => number; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
        "
      `)
    })
    test('sample({clock, filter}) (should fail)', () => {
      //@ts-expect-error
      sample({clock: anyt, filter: () => 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ clock: Event<any>; filter: () => number; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
          Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
        "
      `)
    })
    test('sample({source, clock, filter}) (should fail)', () => {
      //@ts-expect-error
      sample({source: anyt, clock: anyt, filter: () => 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<any>; clock: Event<any>; filter: () => number; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => number; }'.
        "
      `)
    })
  })
  describe('boolean return', () => {
    test('sample({source, filter}) (should pass)', () => {
      sample({source: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<any>; filter: () => boolean; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
        "
      `)
    })
    test('sample({clock, filter}) (should pass)', () => {
      sample({clock: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ clock: Event<any>; filter: () => boolean; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
          Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
        "
      `)
    })
    test('sample({source, clock, filter}) (should pass)', () => {
      sample({source: anyt, clock: anyt, filter: () => true as boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<any>; clock: Event<any>; filter: () => boolean; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => boolean; }'.
        "
      `)
    })
  })
  describe('boolean subtype return', () => {
    test('sample({source, filter}) (should pass)', () => {
      sample({source: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<any>; filter: () => true; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
        "
      `)
    })
    test('sample({clock, filter}) (should pass)', () => {
      sample({clock: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ clock: Event<any>; filter: () => true; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
          Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
        "
      `)
    })
    test('sample({source, clock, filter}) (should pass)', () => {
      sample({source: anyt, clock: anyt, filter: () => true as true})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<any>; clock: Event<any>; filter: () => true; }' is not assignable to parameter of type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter should be a boolean unit\\"; got: () => true; }'.
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
      Argument of type '{ source: Event<any>; filter(src: any): boolean; }' is not assignable to parameter of type '{ source: Event<any>; clock?: undefined; fn: (src: any) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<any>; clock?: undefined; fn: (src: any) => any; target?: undefined; }'.
      Parameter 'src' implicitly has an 'any' type.
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
      Argument of type '{ clock: Event<any>; filter(clk: any): boolean; }' is not assignable to parameter of type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
      Parameter 'clk' implicitly has an 'any' type.
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
      Argument of type '{ clock: [Event<any>]; filter(clk: any): boolean; }' is not assignable to parameter of type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
      Parameter 'clk' implicitly has an 'any' type.
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
      Argument of type '{ source: Event<any>; clock: Event<any>; filter(src: any, clk: any): boolean; }' is not assignable to parameter of type '{ source: Event<any>; clock: Event<any>; fn: (src: any, clk: any) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<any>; clock: Event<any>; fn: (src: any, clk: any) => any; target?: undefined; }'.
      Parameter 'src' implicitly has an 'any' type.
      Parameter 'clk' implicitly has an 'any' type.
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
      Argument of type '{ source: Event<any>; clock: [Event<any>]; filter(src: any, clk: any): boolean; }' is not assignable to parameter of type '{ source: Event<any>; clock: [Event<any>]; fn: (src: any, clk: never) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<any>; clock: [Event<any>]; fn: (src: any, clk: never) => any; target?: undefined; }'.
      Parameter 'src' implicitly has an 'any' type.
      Parameter 'clk' implicitly has an 'any' type.
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
