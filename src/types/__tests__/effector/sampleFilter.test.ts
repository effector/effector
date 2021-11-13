/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Store, Event} from 'effector'
const typecheck = '{global}'

describe('sample(config)', () => {
  describe('sample({source, filter: store})', () => {
    it('return new event (should pass)', () => {
      const trigger: Event<number> = createEvent()
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
      const trigger: Store<number[]> = createStore([1])
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
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      sample({
        //@ts-expect-error
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
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      sample({
        //@ts-expect-error
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
      const trigger: Event<number> = createEvent()
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
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

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
        const trigger: Event<number> = createEvent()
        const target: Store<number> = createStore(0)

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
        const trigger: Event<number> = createEvent()
        const target: Store<string> = createStore('no')

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
  describe('sample({source, filter: Boolean})', () => {
    it('returns new event (should pass)', () => {
      type User = {name: string}
      const trigger: Event<User | null> = createEvent()
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
          source: trigger,
          filter: Boolean,
          //@ts-expect-error
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

test('sample return type supports union types (should pass)', () => {
  const trigger: Event<{a: 1} | {a: 2}> = createEvent()
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
