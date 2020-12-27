/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard, Store, Event} from 'effector'
const typecheck = '{global}'

describe('guard(source, config)', () => {
  describe('guard(source, {filter: store})', () => {
    it('return new event', () => {
      const trigger: Event<number> = createEvent()
      const allow = createStore<boolean>(false)

      const result: Event<number> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('support any unit', () => {
      const trigger: Store<number[]> = createStore([1])
      const allow = createStore<boolean>(false)

      const result: Event<number[]> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('show error when store is not boolean', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.
                The types returned by 'getState()' are incompatible between these types.
                  Type 'string' is not assignable to type 'boolean'.
        "
      `)
    })
    it('show error in case of result type mismatch', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      const result: Event<string> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field', () => {
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<number> = createStore(0)

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
      it('show error in case of type mismatch', () => {
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<string> = createStore('no')

        guard(trigger, {
          filter: allow,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.
                Types of property '__' are incompatible.
                  Type 'string' is not assignable to type 'number'.
          "
        `)
      })
    })
  })
  describe('guard(source, {filter: fn})', () => {
    it('returns new event', () => {
      const trigger: Event<number> = createEvent()
      const result: Event<number> = guard(trigger, {filter: n => n > 0})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('show error in case of result type mismatch', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      const result: Event<string> = guard(trigger, {filter: x => x > 0})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field', () => {
        const trigger: Event<number> = createEvent()
        const target: Store<number> = createStore(0)

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
      it('show error in case of type mismatch', () => {
        const trigger: Event<number> = createEvent()
        const target: Store<string> = createStore('no')

        guard(trigger, {
          filter: x => x > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.
          "
        `)
      })
    })
  })
  describe('guard(source, {filter: Boolean})', () => {
    it('returns new event', () => {
      type User = {name: string}
      const trigger: Event<User | null> = createEvent()
      const result: Event<User> = guard(trigger, {filter: Boolean})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('show error in case of result type mismatch', () => {
      type User = {name: string}
      const trigger: Event<User | null> = createEvent()

      const result: Event<string> = guard(trigger, {filter: Boolean})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<User>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: User) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'User' is not assignable to type 'string'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field', () => {
        type User = {name: string}
        const trigger: Event<User | null> = createEvent()
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
      it('show error in case of type mismatch', () => {
        type User = {name: string}
        const trigger: Event<User | null> = createEvent()
        const target: Store<string> = createStore('no')

        guard(trigger, {
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<User | null>'.
                Types of property '__' are incompatible.
                  Type 'string' is not assignable to type 'User | null'.
          "
        `)
      })
    })
  })
})

describe('guard(config)', () => {
  describe('guard({source, filter: store})', () => {
    it('return new event', () => {
      const trigger: Event<number> = createEvent()
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
    it('support any unit', () => {
      const trigger: Store<number[]> = createStore([1])
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
    it('show error when store is not boolean', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      guard({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.
        "
      `)
    })
    it('show error in case of result type mismatch', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      const result: Event<string> = guard({
        source: trigger,
        filter: allow,
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number>' is not assignable to type 'Event<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field', () => {
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<number> = createStore(0)

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
      it('show error in case of type mismatch', () => {
        const trigger: Event<number> = createEvent()
        const allow = createStore<boolean>(false)
        const target: Store<string> = createStore('no')

        guard({
          source: trigger,
          filter: allow,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.
          "
        `)
      })
    })
  })
  describe('guard({source, filter: fn})', () => {
    it('returns new event', () => {
      const trigger: Event<number> = createEvent()
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
    it('show error in case of result type mismatch', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

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
      it('allow to pass target field', () => {
        const trigger: Event<number> = createEvent()
        const target: Store<number> = createStore(0)

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
      it('show error in case of type mismatch', () => {
        const trigger: Event<number> = createEvent()
        const target: Store<string> = createStore('no')

        guard({
          source: trigger,
          filter: x => x > 0,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.
          "
        `)
      })
      test('nullable type support', () => {
        const event = createEvent()
        const source = createStore<string | null>('test').on(event, () => null)
        const filter = createStore(true)

        const target = createEvent<string>()

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
      describe('any to void', () => {
        test('with store', () => {
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
        test('with function', () => {
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
    it('returns new event', () => {
      type User = {name: string}
      const trigger: Event<User | null> = createEvent()
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
    it('show error in case of result type mismatch', () => {
      type User = {name: string}
      const trigger: Event<User> = createEvent()

      const result: Event<string> = guard({
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
        "
      `)
    })
    describe('support target field', () => {
      it('allow to pass target field', () => {
        type User = {name: string}
        const trigger: Event<User | null> = createEvent()
        const target: Store<User> = createStore({name: 'alice'})

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
      it('show error in case of type mismatch', () => {
        type User = {name: string}
        const trigger: Event<User> = createEvent()
        const target: Store<string> = createStore('no')

        guard({
          source: trigger,
          filter: Boolean,
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<User>'.
                Types of property '__' are incompatible.
                  Type 'string' is not assignable to type 'User'.
          "
        `)
      })
      test('any to void', () => {
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

test('guard return type supports union types', () => {
  const trigger: Event<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(false)

  const result: Event<{a: 1} | {a: 2}> = guard(trigger, {filter: allow})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
