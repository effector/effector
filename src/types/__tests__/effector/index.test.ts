/* eslint-disable no-unused-vars */
import {
  createNode,
  createEvent,
  Event,
  split,
  EventCallable,
  Unit,
  UnitTargetable,
  is,
  StoreWritable,
  Store,
  Effect,
  Scope,
  Domain,
} from 'effector'

const typecheck = '{global}'

describe('createNode', () => {
  test('createNode({})', () => {
    const foo = createNode({})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('createNode()', () => {
    const foo = createNode()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('split', () => {
  describe('split infer result', () => {
    describe('split result no false-negative', () => {
      it('works with user-defined event', () => {
        const source: EventCallable<string[]> = createEvent()
        const {
          emptyList,
          oneElement,
          __: commonList,
        } = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofneg__user_defined: Event<string[]> = emptyList
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      it('works with default event', () => {
        const source: EventCallable<string[]> = createEvent()
        const {emptyList, oneElement, __} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofneg__defaults: Event<string[]> = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('split result no false-positive', () => {
      test('split result no false-positive user-defined', () => {
        const source: EventCallable<string[]> = createEvent()
        const {emptyList, oneElement} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
        const split_result__nofpos__user_defined_1: Event<number> = emptyList
        //@ts-expect-error
        const split_result__nofpos__user_defined_2: null = oneElement
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
            Type 'string[]' is not assignable to type 'number'.
          Type 'Event<string[]>' is not assignable to type 'null'.
          "
        `)
      })
      test('split result no false-positive defaults 1', () => {
        const source: EventCallable<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
        const split_result__nofpos__defaults_1: Event<number> = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
          "
        `)
      })
      test('split result no false-positive defaults 2', () => {
        const source: EventCallable<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
        const split_result__nofpos__defaults_2: null = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Type 'Event<string[]>' is not assignable to type 'null'.
          "
        `)
      })
    })
  })

  test('split arguments no false-positive', () => {
    const source: EventCallable<string[]> = createEvent()
    split(source, {
      //@ts-expect-error
      wrongResult: list => null,
      //@ts-expect-error
      wrongArg_1: (list: null) => true,
      //@ts-expect-error
      wrongArg_2: (list: number[]) => true,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'null' is not assignable to type 'boolean'.
      Type '(list: null) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'null'.
      Type '(list: number[]) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'number[]'.
            Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})

describe('targetable units check', () => {
  test('targetable check works', () => {
    function checkTargetable(unit: Unit<any> | UnitTargetable<any>) {
      if ('targetable' in unit) {
        unit.targetable
      } else {
        // @ts-expect-error
        unit.targetable
      }
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Property 'targetable' does not exist on type 'Unit<any>'.
      "
    `)
  })
})

describe('is guards', () => {
  describe('unit guards', () => {
    test('unit guard works', () => {
      function checkUnit(unit: unknown) {
        if (is.unit(unit)) {
          unit.kind
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit targetable guard works', () => {
      function checkUnit(unit: unknown) {
        if (is.unit(unit)) {
          unit.kind
          if (is.targetable(unit)) {
            unit.targetable
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit targetable guard preserves type', () => {
      function checkUnit(unit: Unit<number> | UnitTargetable<number>) {
        if (is.unit(unit)) {
          unit.kind
          if (is.targetable(unit)) {
            unit.targetable

            // @ts-expect-error
            const wrong: UnitTargetable<string> = unit
            const correct: UnitTargetable<number> = unit
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'UnitTargetable<number>' is not assignable to type 'UnitTargetable<string>'.
          Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })

  describe('event guards', () => {
    test('event guard works', () => {
      function checkEvent(event: unknown) {
        if (is.event(event)) {
          event.kind
          const check: Event<any> = event
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('event targetable guard works', () => {
      function checkEvent(event: unknown) {
        if (is.event(event)) {
          event.kind
          if (is.targetable(event)) {
            event.targetable
            event()
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('event targetable guard preserves type', () => {
      function checkEvent(event: Event<number> | EventCallable<number>) {
        if (is.event(event)) {
          event.kind
          const correct: Event<number> = event
          // @ts-expect-error
          const wrong: Event<string> = event
          if (is.targetable(event)) {
            event.targetable

            // @ts-expect-error
            event('kek')
            // correct
            event(777)
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number> | EventCallable<number>' is not assignable to type 'Event<string>'.
          Type 'Event<number>' is not assignable to type 'Event<string>'.
        No overload matches this call.
          Overload 1 of 2, '(payload: number): number', gave the following error.
            Argument of type 'string' is not assignable to parameter of type 'number'.
          Overload 2 of 2, '(this: \\"Error: Expected 1 argument, but got 0\\", payload?: number | undefined): void', gave the following error.
            The 'this' context of type 'void' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
        "
      `)
    })
    test('event targetable guard preserves type agains unit entry', () => {
      function checkEvent(event: Unit<number>) {
        if (is.event(event)) {
          event.kind
          const correct: Event<number> = event
          // @ts-expect-error
          const wrong: Event<string> = event
          if (is.targetable(event)) {
            event.targetable

            // @ts-expect-error
            event('kek')
            // correct
            event(777)
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<number> | EventCallable<number>' is not assignable to type 'Event<string>'.
          Type 'Event<number>' is not assignable to type 'Event<string>'.
        No overload matches this call.
          Overload 1 of 2, '(payload: number): number', gave the following error.
            Argument of type 'string' is not assignable to parameter of type 'number'.
          Overload 2 of 2, '(this: \\"Error: Expected 1 argument, but got 0\\", payload?: number | undefined): void', gave the following error.
            The 'this' context of type 'void' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
        "
      `)
    })

    test('event guard preserves type against mixed entry', () => {
      function checkEvent(
        event: Event<number> | Store<string> | Effect<string, string, string>,
      ) {
        if (is.event(event)) {
          event.kind
          const correct: Event<number> = event
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })

  describe('store guards', () => {
    test('store guard works', () => {
      function checkStore(store: unknown) {
        if (is.store(store)) {
          store.kind
          const check: Store<any> = store
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('store targetable guard works', () => {
      function checkStore(store: unknown) {
        if (is.store(store)) {
          store.kind
          if (is.targetable(store)) {
            store.targetable

            const check: StoreWritable<any> = store
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('store targetable guard preserves type', () => {
      function checkStore(store: Store<number> | StoreWritable<number>) {
        if (is.store(store)) {
          store.kind
          if (is.targetable(store)) {
            store.targetable

            // @ts-expect-error
            const wrong: Store<string> = store
            // correct
            const correct: Store<number> = store
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'StoreWritable<number>' is not assignable to type 'Store<string>'.
          Types of property 'map' are incompatible.
            Type '{ <T>(fn: (state: number, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: number, lastState: T) => T, firstState: T): Store<T>; }' is not assignable to type '{ <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<T>; }'.
              Types of parameters 'fn' and 'fn' are incompatible.
                Types of parameters 'state' and 'state' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        "
      `)
    })
    test('store targetable guard preserves type agains unit entry', () => {
      function checkStore(store: Unit<number>) {
        if (is.store(store)) {
          store.kind
          if (is.targetable(store)) {
            store.targetable

            // @ts-expect-error
            const wrong: Store<string> = store
            // correct
            const correct: Store<number> = store
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'StoreWritable<number>' is not assignable to type 'Store<string>'.
          Types of property 'map' are incompatible.
            Type '{ <T>(fn: (state: number, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: number, lastState: T) => T, firstState: T): Store<T>; }' is not assignable to type '{ <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<T>; }'.
              Types of parameters 'fn' and 'fn' are incompatible.
                Types of parameters 'state' and 'state' are incompatible.
                  Type 'number' is not assignable to type 'string'.
        "
      `)
    })
    test('store guard preserves type against mixed entry', () => {
      function checkEvent(
        store:
          | Event<number>
          | Store<string>
          | Event<string>
          | Effect<string, string, string>,
      ) {
        if (is.store(store)) {
          store.kind
          const correct: Store<string> = store
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
  describe('effect guards', () => {
    test('effect guard works', () => {
      function checkEffect(effect: unknown) {
        if (is.effect(effect)) {
          effect.kind
          const check: Effect<any, any, any> = effect
          effect.done
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('effect targetable guard preserves type', () => {
      function checkEffect(effect: Event<string> | Effect<number, string, string>) {
        if (is.effect(effect)) {
          effect.kind
          if (is.targetable(effect)) {
            effect.targetable

            // correct
            effect.done

            effect(42)
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('effect targetable guard preserves type agains unit entry', () => {
      function checkEffect(effect: Unit<number>) {
        if (is.effect(effect)) {
          effect.kind
          if (is.targetable(effect)) {
            effect.targetable

            // correct
            effect.done

            effect(42)
          }
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
    })
    test('effect guard preserves type against mixed entry', () => {
      function checkEvent(
        effect:
          | Event<number>
          | Store<string>
          | Event<string>
          | Effect<string, string, string>,
      ) {
        if (is.effect(effect)) {
          effect.kind
          const correct: Effect<string, string, string> = effect
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('attached effect guard preserves type', () => {
      function checkAttachedEffect(effect: Effect<number, string, string>) {
        if (is.attached(effect)) {
          // correct
          effect.done

          effect(42)
        }
      }
    })
  })
  describe('other guards', () => {
    test('scope guard', () => {
      function checkScope(scope: unknown) {
        if (is.scope(scope)) {
          scope.kind
          const check: Scope = scope
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('domain guard', () => {
      function checkDomain(domain: unknown) {
        if (is.domain(domain)) {
          domain.kind
          const check: Domain = domain
        }
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
})
