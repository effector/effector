// @flow
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.
                The types returned by 'getState()' are incompatible between these types.
                  Type 'string' is not assignable to type 'boolean'.

        --flow--
        Cannot call 'guard' because: Either string [1] is incompatible with boolean [2] in type argument 'State' [3] of property 'filter'. Or string [1] is incompatible with boolean [4] in type argument 'State' [3] of property 'filter'
          guard(trigger, {filter: allow})
          ^^^^^
              const allow: Store<string> = createStore('no')
                             [1] ^^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [2] ^^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [4] ^^^^^^^
        "
      `)
    })
    it('show error in case of result type mismatch', () => {
      const trigger: Event<number> = createEvent()
      const allow: Store<string> = createStore('no')

      const result: Event<string> = guard(trigger, {filter: allow})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.

        --flow--
        Cannot call 'guard' because: Either string [1] is incompatible with boolean [2] in type argument 'State' [3] of property 'filter'. Or string [1] is incompatible with boolean [4] in type argument 'State' [3] of property 'filter'
          const result: Event<string> = guard(trigger, {filter: allow})
                                        ^^^^^
              const allow: Store<string> = createStore('no')
                             [1] ^^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [2] ^^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [4] ^^^^^^^
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
          --typescript--
          no errors

          --flow--
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
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.
                Types of property '__' are incompatible.
                  Type 'string' is not assignable to type 'number'.

          --flow--
          Cannot call 'guard'
            guard(trigger, {
                           ^...
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'target'
                const target: Store<string> = createStore('no')
                                [1] ^^^^^^
                const trigger: Event<number> = createEvent()
                                 [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'number' is not assignable to type 'string'.

        --flow--
        Cannot assign 'guard(...)' to 'result'
          const result: Event<string> = guard(trigger, {filter: x => x > 0})
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          number [1] is incompatible with string [2] in type argument 'Payload' [3]
              const trigger: Event<number> = createEvent()
                               [1] ^^^^^^
              const result: Event<string> = guard(trigger, {filter: x => x > 0})
                              [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
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
          --typescript--
          no errors

          --flow--
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
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.

          --flow--
          Cannot call 'guard'
            guard(trigger, {
                           ^...
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'target'
                const target: Store<string> = createStore('no')
                                [1] ^^^^^^
                const trigger: Event<number> = createEvent()
                                 [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.

        --flow--
        Cannot call 'guard' because: Either string [1] is incompatible with boolean [2] in type argument 'State' [3] of property 'filter'. Or string [1] is incompatible with boolean [4] in type argument 'State' [3] of property 'filter'
          guard({
          ^^^^^
              const allow: Store<string> = createStore('no')
                             [1] ^^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [2] ^^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [4] ^^^^^^^
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
        --typescript--
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<boolean> | ((value: number) => boolean)'.
              Type 'Store<string>' is not assignable to type 'Store<boolean>'.

        --flow--
        Cannot call 'guard' because: Either string [1] is incompatible with boolean [2] in type argument 'State' [3] of property 'filter'. Or string [1] is incompatible with boolean [4] in type argument 'State' [3] of property 'filter'
          const result: Event<string> = guard({
                                        ^^^^^
              const allow: Store<string> = createStore('no')
                             [1] ^^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [2] ^^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
              +filter: Store<boolean> | ((value: A) => boolean),
                         [4] ^^^^^^^
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
          --typescript--
          no errors

          --flow--
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
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.

          --flow--
          Cannot call 'guard'
            guard({
                  ^...
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'target'
                const target: Store<string> = createStore('no')
                                [1] ^^^^^^
                const trigger: Event<number> = createEvent()
                                 [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
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
        --typescript--
        no errors

        --flow--
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
        --typescript--
        Type 'Event<number>' is not assignable to type 'Event<string>'.

        --flow--
        Cannot assign 'guard(...)' to 'result'
          const result: Event<string> = guard({
                                        ^^^^^^^...
          number [1] is incompatible with string [2] in type argument 'Payload' [3]
              const trigger: Event<number> = createEvent()
                               [1] ^^^^^^
              const result: Event<string> = guard({
                              [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
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
          --typescript--
          no errors

          --flow--
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
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Unit<number>'.

          --flow--
          Cannot call 'guard'
            guard({
                  ^...
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'target'
                const target: Store<string> = createStore('no')
                                [1] ^^^^^^
                const trigger: Event<number> = createEvent()
                                 [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
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
          --typescript--
          no errors

          --flow--
          Cannot call 'guard' with object literal bound to 'config'
            guard({
                  ^...
            string [1] is incompatible with null [2] in type argument 'T' [3] of property 'target'
                const target = createEvent<string>()
                                      [1] ^^^^^^
                const source = createStore<string | null>('test').on(event, () => null)
                                                [2] ^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
    })
  })
})
