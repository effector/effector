/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  guard,
  Store,
  Event,
  Unit,
  StoreWritable,
  EventCallable,
} from 'effector'
const typecheck = '{global}'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

describe('explicit generics', () => {
  test('guard<A>({source, clock, filter})', () => {
    const source = createEvent<string | null>()
    const clock = createEvent<number>()
    const filter = createStore(true)
    const withFilterStore: Event<string | null> = guard<string | null>({
      source,
      clock,
      filter,
    })
    const withFilterFn: Event<string | null> = guard<string | null>({
      source,
      clock,
      filter: e => e !== null,
    })
    const withFilterBoolean: Event<string> = guard<string | null>({
      source,
      clock,
      filter: Boolean,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('guard<A>({source, filter})', () => {
    const source = createEvent<string | null>()
    const filter = createStore(true)
    const withFilterStore: Event<string | null> = guard<string | null>({
      source,
      filter,
    })
    const withFilterFn: Event<string | null> = guard<string | null>({
      source,
      filter: e => e !== null,
    })
    const withFilterBoolean: Event<string> = guard<string | null>({
      source,
      filter: Boolean,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('guard<A>({clock, filter})', () => {
    const clock = createEvent<string | null>()
    const filter = createStore(true)
    const withFilterStore: Event<string | null> = guard<string | null>({
      clock,
      filter,
    })
    const withFilterFn: Event<string | null> = guard<string | null>({
      clock,
      filter: e => e !== null,
    })
    const withFilterBoolean: Event<string> = guard<string | null>({
      clock,
      filter: Boolean,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('guard<A>({source, filter, target})', () => {
    const source = createEvent<string | null>()
    const filter = createStore(true)
    const target = createEvent<string>()
    const withFilterStore: Unit<string | null> = guard<string | null>({
      source,
      filter,
      target,
    })
    const withFilterFn: Unit<string | null> = guard<string | null>({
      source,
      filter: e => e !== null,
      target,
    })
    const withFilterBoolean: Unit<string> = guard<string | null>({
      source,
      filter: Boolean,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Target' is not assignable to type 'Unit<string | null>'.
        Type 'Tuple<any>' is not assignable to type 'Unit<string | null>'.
      Type 'Target' is not assignable to type 'Unit<string | null>'.
        Type 'Tuple<any>' is not assignable to type 'Unit<string | null>'.
      Type 'Target' is not assignable to type 'Unit<string>'.
        Type 'Tuple<any>' is not assignable to type 'Unit<string>'.
      "
    `)
  })
  test('guard<Source, Result>({source, filter})', () => {
    const source = createEvent<string | null>()
    const clock = createEvent<string | null>()
    const result1: Event<string> = guard<string | null, string>({
      source,
      clock,
      filter: (e): e is string => e !== null,
    })
    const result2: Event<string> = guard<string | null, string>({
      source,
      filter: (e): e is string => e !== null,
    })
    const result3: Event<string> = guard<string | null, string>({
      clock,
      filter: (e): e is string => e !== null,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('guard<Source, Result>({source, filter, target})', () => {
    const source = createEvent<string | null>()
    const target = createEvent<string>()
    const result: Unit<string> = guard<string | null, string>({
      source,
      filter: (e): e is string => e !== null,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Target' is not assignable to type 'Unit<string>'.
        Type 'Tuple<any>' is not assignable to type 'Unit<string>'.
      "
    `)
  })
})

describe('guard(source, config)', () => {
  describe('guard(source, {filter: store})', () => {
    it('return new event (should pass)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow = createStore<boolean>(false)

      const result: Event<number> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('support any unit (should pass)', () => {
      const trigger: StoreWritable<number[]> = createStore([1])
      const allow = createStore<boolean>(false)

      const result: Event<number[]> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('store is not boolean (should fail)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      //@ts-expect-error
      guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | ((source: number) => boolean)'.
              Type 'StoreWritable<string>' is not assignable to type 'Store<boolean>'.
                Types of property 'map' are incompatible.
                  Type '<T>(fn: (state: string) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>' is not assignable to type '<T>(fn: (state: boolean) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>'.
                    Types of parameters 'fn' and 'fn' are incompatible.
                      Types of parameters 'state' and 'state' are incompatible.
                        Type 'string' is not assignable to type 'boolean'.
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      //@ts-expect-error
      const result: Event<string> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Target' is not assignable to type 'Event<string>'.
          Type 'UnitTargetable<any>' is missing the following properties from type 'Event<string>': map, filter, filterMap, watch, and 5 more.
        No overload matches this call.
          The last overload gave the following error.
            Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | ((source: number) => boolean)'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: EventCallable<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: StoreWritable<number> = createStore(0)

        guard(trigger, {
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
        const target: StoreWritable<string> = createStore('no')

        guard(trigger, {
          filter: allow,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
    })
  })
  describe('guard(source, {filter: fn})', () => {
    it('returns new event (should pass)', () => {
      const trigger: EventCallable<number> = createEvent()
      const result: Event<number> = guard(trigger, {filter: n => n > 0})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      //@ts-expect-error
      const result: Event<string> = guard(trigger, {filter: x => x > 0})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: EventCallable<number> = createEvent()
        const target: StoreWritable<number> = createStore(0)

        guard(trigger, {
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
        const trigger: EventCallable<number> = createEvent()
        const target: StoreWritable<string> = createStore('no')

        guard(trigger, {
          filter: x => x > 0,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
    })
  })
  describe('guard(source, {filter: Boolean})', () => {
    it('returns new event (should pass)', () => {
      type User = {name: string}
      const trigger: EventCallable<User | null> = createEvent()
      const result: Event<User> = guard(trigger, {filter: Boolean})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      type User = {name: string}
      const trigger: EventCallable<User | null> = createEvent()

      //@ts-expect-error
      const result: Event<string> = guard(trigger, {filter: Boolean})

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
        const trigger: EventCallable<User | null> = createEvent()
        const target = createStore<User>({name: 'alice'})

        guard(trigger, {
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
        const trigger: EventCallable<User | null> = createEvent()
        const target: StoreWritable<string> = createStore('no')

        guard(trigger, {
          filter: Boolean,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
    })
  })
})

describe('guard(config)', () => {
  describe('guard({source, filter: store})', () => {
    it('return new event (should pass)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow = createStore<boolean>(false)

      const result: Event<number> = guard({
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
      const trigger: StoreWritable<number[]> = createStore([1])
      const allow = createStore<boolean>(false)

      const result: Event<number[]> = guard({
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
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      guard({
        source: trigger,
        //@ts-expect-error
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | ((source: number) => boolean)'.
              Type 'StoreWritable<string>' is not assignable to type 'Store<boolean>'.
        "
      `)
    })
    test('result type mismatch (should fail)', () => {
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      guard({
        source: trigger,
        //@ts-expect-error
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | ((source: number) => boolean)'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: EventCallable<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: StoreWritable<number> = createStore(0)

        guard({
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
        const target: StoreWritable<string> = createStore('no')

        guard({
          source: trigger,
          filter: allow,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
    })
  })
  describe('guard({source, filter: fn})', () => {
    it('returns new event (should pass)', () => {
      const trigger: EventCallable<number> = createEvent()
      const result: Event<number> = guard({
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
      const trigger: EventCallable<number> = createEvent()
      const allow: StoreWritable<string> = createStore('no')

      //@ts-expect-error
      const result: Event<string> = guard({
        source: trigger,
        filter: n => n > 0,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        const trigger: EventCallable<number> = createEvent()
        const target: StoreWritable<number> = createStore(0)

        guard({
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
        const trigger: EventCallable<number> = createEvent()
        const target: StoreWritable<string> = createStore('no')

        guard({
          source: trigger,
          filter: x => x > 0,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
      describe('any to void', () => {
        test('with store (should pass)', () => {
          const filter = createStore(true)
          const source = createEvent<string>()
          const target = createEvent<void>()

          guard({
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

          guard({
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
  describe('guard({source, filter: Boolean})', () => {
    it('returns new event (should pass)', () => {
      type User = {name: string}
      const trigger: EventCallable<User | null> = createEvent()
      const result: Event<User> = guard({
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
      const trigger: EventCallable<User> = createEvent()

      //@ts-expect-error
      const result: Event<string> = guard({
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
    describe('support target field', () => {
      it('allow to pass target field (should pass)', () => {
        type User = {name: string}
        const trigger: EventCallable<User | null> = createEvent()
        const target: StoreWritable<User> = createStore({name: 'alice'})

        guard({
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
        const trigger: EventCallable<User> = createEvent()
        const target: StoreWritable<string> = createStore('no')

        guard({
          source: trigger,
          filter: Boolean,
          //@ts-expect-error
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'StoreWritable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
          "
        `)
      })
      test('any to void (should pass)', () => {
        const source = createEvent<{pass: boolean}>()
        const target = createEvent<void>()

        guard({
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
})

test('guard return type supports union types (should pass)', () => {
  const trigger: EventCallable<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(false)

  const result: Event<{a: 1} | {a: 2}> = guard(trigger, {filter: allow})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
