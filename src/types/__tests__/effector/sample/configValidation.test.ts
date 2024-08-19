/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'

const typecheck = '{global}'

describe('fn', () => {
  test('fn is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        clock: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
      sample({
        source: evt,
        filter: () => true,
        //@ts-expect-error
        fn: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 5 'target: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 10 'clock: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 15 'source: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 16 'target: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 21 'source: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 26 'clock: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 27 'target: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 28 'filter: () => true,'
      Type '() => boolean' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 33 'clock: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 34 'filter: () => true,'
      Type '() => boolean' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 39 'source: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 40 'target: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 41 'filter: () => true,'
      Type '() => boolean' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      Unmarked error at test line 46 'source: evt,'
      Type 'EventCallable<void>' is not assignable to type 'never'.
      Unmarked error at test line 47 'filter: () => true,'
      Type '() => boolean' is not assignable to type 'never'.
      Type 'null' is not assignable to type 'never'.
      "
    `)
  })
  test('fn is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        clock: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
      sample({
        source: evt,
        filter: () => true,
        //@ts-expect-error
        fn: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '{ a: 0; }' is not assignable to type '((clk: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(clk: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(clk: void): any'.
      Type '{ a: 0; }' is not assignable to type '((clk: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(clk: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(clk: void): any'.
      Type '{ a: 0; }' is not assignable to type '((src: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(src: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(src: void): any'.
      Type '{ a: 0; }' is not assignable to type '((src: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(src: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(src: void): any'.
      Type '{ a: 0; }' is not assignable to type '((clk: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(clk: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(clk: void): any'.
      Type '{ a: 0; }' is not assignable to type '((clk: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(clk: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(clk: void): any'.
      Type '{ a: 0; }' is not assignable to type '((src: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(src: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(src: void): any'.
      Type '{ a: 0; }' is not assignable to type '((src: void) => any) & { readonly a: 0; }'.
        Type '{ a: 0; }' is not assignable to type '(src: void) => any'.
          Type '{ a: 0; }' provides no match for the signature '(src: void): any'.
      "
    `)
  })
})

describe('filter', () => {
  test('filter is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        filter: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 3 'sample({'
      Argument of type '[{ clock: EventCallable<void>; target: EventCallable<void>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<void>; target: EventCallable<void>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<void>; target: EventCallable<void>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 9 'sample({'
      lack of expected error at test line 7 'filter: null,'
      Argument of type '[{ clock: EventCallable<void>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<void>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<void>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 14 'sample({'
      lack of expected error at test line 12 'filter: null,'
      Argument of type '[{ source: EventCallable<void>; target: EventCallable<void>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ source: EventCallable<void>; target: EventCallable<void>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ source: EventCallable<void>; target: EventCallable<void>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 20 'sample({'
      lack of expected error at test line 18 'filter: null,'
      Argument of type '[{ source: EventCallable<void>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ source: EventCallable<void>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ source: EventCallable<void>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 25 'sample({'
      lack of expected error at test line 23 'filter: null,'
      Argument of type '[{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 32 'sample({'
      lack of expected error at test line 30 'filter: null,'
      Argument of type '[{ clock: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<void>; fn: () => void; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 38 'sample({'
      lack of expected error at test line 36 'filter: null,'
      Argument of type '[{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: null; }' is not assignable to type 'never'.
            The intersection '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 45 'sample({'
      lack of expected error at test line 43 'filter: null,'
      Argument of type '[{ source: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ source: EventCallable<void>; fn: () => void; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ source: EventCallable<void>; fn: () => void; filter: null; }' is not assignable to type 'never'.
            The intersection '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      lack of expected error at test line 49 'filter: null,'
      "
    `)
  })
  test('filter is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        target: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        target: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        filter: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 3 'sample({'
      Argument of type '[{ clock: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<void>; source?: undefined; filter: (clk: void) => clk is void; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to type '[config: { clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(clk: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(clk: void): boolean'.
      Unmarked error at test line 9 'sample({'
      lack of expected error at test line 7 'filter: {a: 0},'
      Argument of type '[{ clock: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<void>; source?: undefined; filter: (clk: void) => clk is void; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to type '[config: { clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter: (clk: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(clk: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(clk: void): boolean'.
      Unmarked error at test line 14 'sample({'
      lack of expected error at test line 12 'filter: {a: 0},'
      Argument of type '[{ source: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { source: EventCallable<void>; clock?: undefined; filter: (src: void) => src is void; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ source: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to type '[config: { source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
          Type '{ source: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
            Type '{ source: EventCallable<void>; target: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(src: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(src: void): boolean'.
      Unmarked error at test line 20 'sample({'
      lack of expected error at test line 18 'filter: {a: 0},'
      Argument of type '[{ source: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { source: EventCallable<void>; clock?: undefined; filter: (src: void) => src is void; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ source: EventCallable<void>; filter: { a: 0; }; }]' is not assignable to type '[config: { source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ source: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ source: EventCallable<void>; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter: (src: void) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(src: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(src: void): boolean'.
      Unmarked error at test line 25 'sample({'
      lack of expected error at test line 23 'filter: {a: 0},'
      Argument of type '[{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<void>; source?: undefined; filter?: (((clk: void) => clk is void) & ((clk: void) => clk is void)) | undefined; fn?: ((() => void) & ((clk: void) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to type '[config: { clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(clk: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(clk: void): boolean'.
      Unmarked error at test line 32 'sample({'
      lack of expected error at test line 30 'filter: {a: 0},'
      Argument of type '[{ clock: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => clk is void) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to type '[config: { clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ clock: EventCallable<void>; source?: undefined; filter?: ((clk: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(clk: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(clk: void): boolean'.
      Unmarked error at test line 38 'sample({'
      lack of expected error at test line 36 'filter: {a: 0},'
      Argument of type '[{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { source: EventCallable<void>; clock?: undefined; filter?: (((src: void) => src is void) & ((src: void) => src is void)) | undefined; fn?: ((() => void) & ((src: void) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to type '[config: { source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
          Type '{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
            Type '{ source: EventCallable<void>; target: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target: EventCallable<void>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(src: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(src: void): boolean'.
      Unmarked error at test line 45 'sample({'
      lack of expected error at test line 43 'filter: {a: 0},'
      Argument of type '[{ source: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to parameter of type '[config: { source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => src is void) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ source: EventCallable<void>; fn: () => void; filter: { a: 0; }; }]' is not assignable to type '[config: { source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ source: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ source: EventCallable<void>; fn: () => void; filter: { a: 0; }; }' is not assignable to type '{ source: EventCallable<void>; clock?: undefined; filter?: ((src: void) => boolean) | undefined; fn?: (() => void) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '{ a: 0; }' is not assignable to type '(src: void) => boolean'.
                  Type '{ a: 0; }' provides no match for the signature '(src: void): boolean'.
      lack of expected error at test line 49 'filter: {a: 0},'
      "
    `)
  })
})

describe('target', () => {
  test('target is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: null,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        target: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: null,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 9 'clock: evt,'
      lack of expected error at test line 6 'target: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 14 'source: evt,'
      lack of expected error at test line 11 'target: null,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 19 'source: evt,'
      lack of expected error at test line 16 'target: null,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 24 'clock: evt,'
      lack of expected error at test line 21 'target: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 31 'clock: evt,'
      lack of expected error at test line 26 'target: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 37 'source: evt,'
      lack of expected error at test line 34 'target: null,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 44 'source: evt,'
      lack of expected error at test line 39 'target: null,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      lack of expected error at test line 47 'target: null,'
      "
    `)
  })
  test('target is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        target: {a: 0},
        fn: () => {},
        filter: Boolean,
      })
      sample({
        clock: evt,
        fn: () => {},
        //@ts-expect-error
        target: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        target: {a: 0},
        fn: () => {},
        filter: Boolean,
      })
      sample({
        source: evt,
        fn: () => {},
        //@ts-expect-error
        target: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 9 'clock: evt,'
      lack of expected error at test line 6 'target: {a: 0},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 14 'source: evt,'
      lack of expected error at test line 11 'target: {a: 0},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 19 'source: evt,'
      lack of expected error at test line 16 'target: {a: 0},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 24 'clock: evt,'
      lack of expected error at test line 21 'target: {a: 0},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 31 'clock: evt,'
      lack of expected error at test line 26 'target: {a: 0},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 37 'source: evt,'
      lack of expected error at test line 34 'target: {a: 0},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 44 'source: evt,'
      lack of expected error at test line 39 'target: {a: 0},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      lack of expected error at test line 47 'target: {a: 0},'
      "
    `)
  })
})

describe('clock', () => {
  test('clock is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
        fn: () => {},
      })
      sample({
        fn: () => {},
        //@ts-expect-error
        clock: null,
      })
      sample({
        source: evt,
        //@ts-expect-error
        clock: null,
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: null,
        filter: () => true,
      })
      sample({
        filter: () => true,
        //@ts-expect-error
        clock: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'target: evt,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 10 'fn: () => {},'
      lack of expected error at test line 6 'clock: null,'
      Object literal may only specify known properties, and 'fn' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 15 'source: evt,'
      lack of expected error at test line 12 'clock: null,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 20 'target: evt,'
      lack of expected error at test line 17 'clock: null,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 25 'target: evt,'
      lack of expected error at test line 22 'clock: null,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      Unmarked error at test line 31 'filter: () => true,'
      lack of expected error at test line 27 'clock: null,'
      Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: null; }'.
      lack of expected error at test line 33 'clock: null,'
      "
    `)
  })
  test('clock is object', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
        fn: () => {},
      })
      sample({
        fn: () => {},
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        source: evt,
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
      })
      sample({
        target: evt,
        //@ts-expect-error
        clock: {a: 0},
        filter: () => true,
      })
      sample({
        filter: () => true,
        //@ts-expect-error
        clock: {a: 0},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'target: evt,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 10 'fn: () => {},'
      lack of expected error at test line 6 'clock: {a: 0},'
      Object literal may only specify known properties, and 'fn' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 15 'source: evt,'
      lack of expected error at test line 12 'clock: {a: 0},'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 20 'target: evt,'
      lack of expected error at test line 17 'clock: {a: 0},'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 25 'target: evt,'
      lack of expected error at test line 22 'clock: {a: 0},'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      Unmarked error at test line 31 'filter: () => true,'
      lack of expected error at test line 27 'clock: {a: 0},'
      Object literal may only specify known properties, and 'filter' does not exist in type '{ error: \\"clock should be unit or array of units\\"; got: { readonly a: 0; }; }'.
      lack of expected error at test line 33 'clock: {a: 0},'
      "
    `)
  })
})

describe('source', () => {
  test('source is null', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        filter: Boolean,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        fn: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        target: evt,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        target: evt,
        //@ts-expect-error
        source: null,
        fn: () => {},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      Unmarked error at test line 9 'clock: evt,'
      lack of expected error at test line 6 'source: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      Unmarked error at test line 15 'clock: evt,'
      lack of expected error at test line 11 'source: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      Unmarked error at test line 22 'clock: evt,'
      lack of expected error at test line 17 'source: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      Unmarked error at test line 29 'clock: evt,'
      lack of expected error at test line 24 'source: null,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      Unmarked error at test line 37 'target: evt,'
      lack of expected error at test line 31 'source: null,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      lack of expected error at test line 39 'source: null,'
      "
    `)
  })
  test('source is function', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        filter: Boolean,
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        fn: () => {},
      })
      sample({
        clock: evt,
        //@ts-expect-error
        source: () => {},
        target: evt,
        fn: () => {},
        filter: Boolean,
      })
      sample({
        target: evt,
        //@ts-expect-error
        source: () => {},
        fn: () => {},
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      Unmarked error at test line 9 'clock: evt,'
      lack of expected error at test line 6 'source: () => {},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      Unmarked error at test line 15 'clock: evt,'
      lack of expected error at test line 11 'source: () => {},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      Unmarked error at test line 22 'clock: evt,'
      lack of expected error at test line 17 'source: () => {},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      Unmarked error at test line 29 'clock: evt,'
      lack of expected error at test line 24 'source: () => {},'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      Unmarked error at test line 37 'target: evt,'
      lack of expected error at test line 31 'source: () => {},'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: () => void; }'.
      lack of expected error at test line 39 'source: () => {},'
      "
    `)
  })
})

describe('multiple errors', () => {
  test('source and clock', () => {
    const evt = createEvent()
    function factory() {
      sample({
        target: evt,
        //@ts-expect-error
        source: null,
        //@ts-expect-error
        clock: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'target: evt,'
      Object literal may only specify known properties, and 'target' does not exist in type '{ error: \\"source should be unit or object with stores\\"; got: null; }'.
      lack of expected error at test line 6 'source: null,'
      lack of expected error at test line 8 'clock: null,'
      "
    `)
  })
  test('source and target', () => {
    const evt = createEvent()
    function factory() {
      sample({
        clock: evt,
        //@ts-expect-error
        source: null,
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: evt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      lack of expected error at test line 6 'source: null,'
      lack of expected error at test line 8 'target: null,'
      "
    `)
  })
  test('clock and target', () => {
    const evt = createEvent()
    function factory() {
      sample({
        source: evt,
        //@ts-expect-error
        clock: null,
        //@ts-expect-error
        target: null,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'source: evt,'
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: null; }'.
      lack of expected error at test line 6 'clock: null,'
      lack of expected error at test line 8 'target: null,'
      "
    `)
  })
})
