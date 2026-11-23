/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'
const typecheck = '{global}'
type A = {kind: 'a'; a: number}
type B = {kind: 'b'; b: string}
type C = {kind: 'c'; c: boolean}
type AB = A | B
type ABC = A | B | C

const aSource = createEvent<A>()
const abSource = createEvent<AB>()
const abcSource = createEvent<ABC>()

const aTarget = createEvent<A>()
const abTarget = createEvent<AB>()
const abcTarget = createEvent<ABC>()
const unknownTarget = createEvent<unknown>()
const voidTarget = createEvent<void>()
describe('A source, inferred fn argument, unit target', () => {
  test('A source, inferred fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value) => null as unknown as A  , target:aTarget      })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:abTarget     })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:abcTarget    })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:unknownTarget})
      sample({source:aSource, fn:(value) => null as unknown as A  , target:voidTarget   })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:abTarget     })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:abcTarget    })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:unknownTarget})
      sample({source:aSource, fn:(value) => null as unknown as AB , target:voidTarget   })
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:abcTarget    })
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:unknownTarget})
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, inferred fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, inferred fn argument, array target', () => {
  test('A source, inferred fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value) => null as unknown as A  , target:[aTarget]      })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:[abTarget]     })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:[abcTarget]    })
      sample({source:aSource, fn:(value) => null as unknown as A  , target:[unknownTarget]})
      sample({source:aSource, fn:(value) => null as unknown as A  , target:[voidTarget]   })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:[abTarget]     })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:[abcTarget]    })
      sample({source:aSource, fn:(value) => null as unknown as AB , target:[unknownTarget]})
      sample({source:aSource, fn:(value) => null as unknown as AB , target:[voidTarget]   })
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:aSource, fn:(value) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, inferred fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, A fn argument, unit target', () => {
  test('A source, A fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:aTarget      })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:abTarget     })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:abcTarget    })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:unknownTarget})
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:voidTarget   })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:abTarget     })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:abcTarget    })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:unknownTarget})
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:voidTarget   })
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:abcTarget    })
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:unknownTarget})
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, A fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: A) => AB' is not assignable to type '(value: A) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: A) => ABC' is not assignable to type '(value: A) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: A) => ABC' is not assignable to type '(value: A) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, A fn argument, array target', () => {
  test('A source, A fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:[aTarget]      })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:[abTarget]     })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:[abcTarget]    })
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:[unknownTarget]})
      sample({source:aSource, fn:(value: A) => null as unknown as A  , target:[voidTarget]   })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:[abTarget]     })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:[abcTarget]    })
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:[unknownTarget]})
      sample({source:aSource, fn:(value: A) => null as unknown as AB , target:[voidTarget]   })
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:aSource, fn:(value: A) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, A fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: A) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: A) => AB' is not assignable to type '(value: A) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: A) => ABC' is not assignable to type '(value: A) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: A) => ABC' is not assignable to type '(value: A) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, AB fn argument, unit target', () => {
  test('A source, AB fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:aTarget      })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:abTarget     })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:abcTarget    })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:unknownTarget})
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:voidTarget   })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:abTarget     })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:abcTarget    })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:unknownTarget})
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:voidTarget   })
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:abcTarget    })
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:unknownTarget})
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, AB fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: AB) => AB' is not assignable to type '(value: AB) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, AB fn argument, array target', () => {
  test('A source, AB fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:[aTarget]      })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:[abTarget]     })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:[abcTarget]    })
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:[unknownTarget]})
      sample({source:aSource, fn:(value: AB) => null as unknown as A  , target:[voidTarget]   })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:[abTarget]     })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:[abcTarget]    })
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:[unknownTarget]})
      sample({source:aSource, fn:(value: AB) => null as unknown as AB , target:[voidTarget]   })
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:aSource, fn:(value: AB) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, AB fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: AB) => AB' is not assignable to type '(value: AB) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, ABC fn argument, unit target', () => {
  test('A source, ABC fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:aTarget      })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:abTarget     })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:abcTarget    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:unknownTarget})
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:voidTarget   })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:abTarget     })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:abcTarget    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:unknownTarget})
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:voidTarget   })
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:abcTarget    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:unknownTarget})
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, ABC fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('A source, ABC fn argument, array target', () => {
  test('A source, ABC fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:[aTarget]      })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:[abTarget]     })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:[abcTarget]    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:[unknownTarget]})
      sample({source:aSource, fn:(value: ABC) => null as unknown as A  , target:[voidTarget]   })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:[abTarget]     })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:[abcTarget]    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:[unknownTarget]})
      sample({source:aSource, fn:(value: ABC) => null as unknown as AB , target:[voidTarget]   })
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:aSource, fn:(value: ABC) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('A source, ABC fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: aSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('AB source, inferred fn argument, unit target', () => {
  test('AB source, inferred fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value) => null as unknown as A  , target:aTarget      })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:abTarget     })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:abcTarget    })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:unknownTarget})
      sample({source:abSource, fn:(value) => null as unknown as A  , target:voidTarget   })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:abTarget     })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:abcTarget    })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:unknownTarget})
      sample({source:abSource, fn:(value) => null as unknown as AB , target:voidTarget   })
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:abcTarget    })
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:unknownTarget})
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, inferred fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('AB source, inferred fn argument, array target', () => {
  test('AB source, inferred fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value) => null as unknown as A  , target:[aTarget]      })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:[abTarget]     })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:[abcTarget]    })
      sample({source:abSource, fn:(value) => null as unknown as A  , target:[unknownTarget]})
      sample({source:abSource, fn:(value) => null as unknown as A  , target:[voidTarget]   })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:[abTarget]     })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:[abcTarget]    })
      sample({source:abSource, fn:(value) => null as unknown as AB , target:[unknownTarget]})
      sample({source:abSource, fn:(value) => null as unknown as AB , target:[voidTarget]   })
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:abSource, fn:(value) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, inferred fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
test('AB source, A fn argument, unit target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: aTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: abTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: abcTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: unknownTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: voidTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: aTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: abTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: abcTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: unknownTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: voidTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: aTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: abTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: abcTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: unknownTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: voidTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    "
  `)
})
test('AB source, A fn argument, array target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [aTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [abTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [abcTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [unknownTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [voidTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [aTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [abTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [abcTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [unknownTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [voidTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [aTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [abTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [abcTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [unknownTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [voidTarget],
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: AB) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    "
  `)
})
describe('AB source, AB fn argument, unit target', () => {
  test('AB source, AB fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:aTarget      })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:abTarget     })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:abcTarget    })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:unknownTarget})
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:voidTarget   })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:abTarget     })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:abcTarget    })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:unknownTarget})
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:voidTarget   })
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:abcTarget    })
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:unknownTarget})
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, AB fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: AB) => AB' is not assignable to type '(value: AB) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('AB source, AB fn argument, array target', () => {
  test('AB source, AB fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:[aTarget]      })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:[abTarget]     })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:[abcTarget]    })
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:[unknownTarget]})
      sample({source:abSource, fn:(value: AB) => null as unknown as A  , target:[voidTarget]   })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:[abTarget]     })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:[abcTarget]    })
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:[unknownTarget]})
      sample({source:abSource, fn:(value: AB) => null as unknown as AB , target:[voidTarget]   })
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:abSource, fn:(value: AB) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, AB fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: AB) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: AB) => AB' is not assignable to type '(value: AB) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: AB) => ABC' is not assignable to type '(value: AB) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('AB source, ABC fn argument, unit target', () => {
  test('AB source, ABC fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:aTarget      })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:abTarget     })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:abcTarget    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:unknownTarget})
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:voidTarget   })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:abTarget     })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:abcTarget    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:unknownTarget})
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:voidTarget   })
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:abcTarget    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:unknownTarget})
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, ABC fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('AB source, ABC fn argument, array target', () => {
  test('AB source, ABC fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:[aTarget]      })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:[abTarget]     })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:[abcTarget]    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:[unknownTarget]})
      sample({source:abSource, fn:(value: ABC) => null as unknown as A  , target:[voidTarget]   })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:[abTarget]     })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:[abcTarget]    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:[unknownTarget]})
      sample({source:abSource, fn:(value: ABC) => null as unknown as AB , target:[voidTarget]   })
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:abSource, fn:(value: ABC) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('AB source, ABC fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('ABC source, inferred fn argument, unit target', () => {
  test('ABC source, inferred fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:aTarget      })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:abTarget     })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:abcTarget    })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:unknownTarget})
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:voidTarget   })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:abTarget     })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:abcTarget    })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:unknownTarget})
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:voidTarget   })
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:abcTarget    })
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:unknownTarget})
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('ABC source, inferred fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('ABC source, inferred fn argument, array target', () => {
  test('ABC source, inferred fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:[aTarget]      })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:[abTarget]     })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:[abcTarget]    })
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:[unknownTarget]})
      sample({source:abcSource, fn:(value) => null as unknown as A  , target:[voidTarget]   })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:[abTarget]     })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:[abcTarget]    })
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:[unknownTarget]})
      sample({source:abcSource, fn:(value) => null as unknown as AB , target:[voidTarget]   })
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:abcSource, fn:(value) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('ABC source, inferred fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'AB' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'ABC' is not assignable to type 'A'.
        Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type 'ABC' is not assignable to type 'B'.
        Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
test('ABC source, A fn argument, unit target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: voidTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: voidTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: voidTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    "
  `)
})
test('ABC source, A fn argument, array target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as A,
      target: [voidTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as AB,
      target: [voidTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: A) => null as unknown as ABC,
      target: [voidTarget],
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    Type '(value: A) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    "
  `)
})
test('ABC source, AB fn argument, unit target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: voidTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: voidTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: aTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: abTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: abcTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: unknownTarget,
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: voidTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
test('ABC source, AB fn argument, array target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as A,
      target: [voidTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as AB,
      target: [voidTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: [aTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: [abTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: [abcTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: [unknownTarget],
    })
    sample({
      source: abcSource,
      //@ts-expect-error
      fn: (value: AB) => null as unknown as ABC,
      target: [voidTarget],
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => A' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => AB' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    Type '(value: AB) => ABC' is not assignable to type '(src: ABC) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type 'ABC' is not assignable to type 'AB'.
          Type 'C' is not assignable to type 'AB'.
            Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
describe('ABC source, ABC fn argument, unit target', () => {
  test('ABC source, ABC fn argument, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:aTarget      })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:abTarget     })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:abcTarget    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:unknownTarget})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:voidTarget   })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:abTarget     })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:abcTarget    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:unknownTarget})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:voidTarget   })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:abcTarget    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:unknownTarget})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('ABC source, ABC fn argument, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: aTarget,
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: abTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
describe('ABC source, ABC fn argument, array target', () => {
  test('ABC source, ABC fn argument, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:[aTarget]      })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:[abTarget]     })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:[abcTarget]    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:[unknownTarget]})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as A  , target:[voidTarget]   })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:[abTarget]     })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:[abcTarget]    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:[unknownTarget]})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as AB , target:[voidTarget]   })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:[abcTarget]    })
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:[unknownTarget]})
      sample({source:abcSource, fn:(value: ABC) => null as unknown as ABC, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('ABC source, ABC fn argument, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as AB,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [aTarget],
      })
      sample({
        source: abcSource,
        //@ts-expect-error
        fn: (value: ABC) => null as unknown as ABC,
        //@ts-expect-error
        target: [abTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(value: ABC) => AB' is not assignable to type '(value: ABC) => A'.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => A'.
        Type 'ABC' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<A>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Property 'c' is missing in type 'A' but required in type 'C'.
      Type '(value: ABC) => ABC' is not assignable to type '(value: ABC) => B'.
        Type 'ABC' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<C>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'C'.
            Property 'c' is missing in type 'A' but required in type 'C'.
      "
    `)
  })
})
