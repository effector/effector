/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'
const typecheck = '{global}'
type A = {kind: 'a'; a: number}
type B = {kind: 'b'; b: string}
type C = {kind: 'c'; c: boolean}
type AB = A | B

const abSource = createEvent<AB>()
const aTarget = createEvent<A>()
const bTarget = createEvent<B>()
const abTarget = createEvent<AB>()
const unknownTarget = createEvent<unknown>()
const voidTarget = createEvent<void>()

const isA = (value: AB): value is A => value.kind === 'a'
describe('source, namedA, unit target', () => {
  test('source, namedA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:isA, target:aTarget      })
      sample({source:abSource, filter:isA, target:abTarget     })
      sample({source:abSource, filter:isA, target:unknownTarget})
      sample({source:abSource, filter:isA, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, namedA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: isA,
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('source, namedA, array target', () => {
  test('source, namedA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:isA, target:[aTarget]      })
      sample({source:abSource, filter:isA, target:[abTarget]     })
      sample({source:abSource, filter:isA, target:[unknownTarget]})
      sample({source:abSource, filter:isA, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, namedA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: isA,
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
test('source, invalidC, unit target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      //@ts-expect-error
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: aTarget,
    })
    sample({
      //@ts-expect-error
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: bTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: abTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: unknownTarget,
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: voidTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
test('source, invalidC, array target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      //@ts-expect-error
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [aTarget],
    })
    sample({
      //@ts-expect-error
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [bTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [abTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [unknownTarget],
    })
    sample({
      source: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [voidTarget],
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
describe('source, inferredA, unit target', () => {
  test('source, inferredA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value) => value.kind === 'a', target:aTarget      })
      sample({source:abSource, filter:(value) => value.kind === 'a', target:abTarget     })
      sample({source:abSource, filter:(value) => value.kind === 'a', target:unknownTarget})
      sample({source:abSource, filter:(value) => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, inferredA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value) => value.kind === 'a',
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('source, inferredA, array target', () => {
  test('source, inferredA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value) => value.kind === 'a', target:[aTarget]      })
      sample({source:abSource, filter:(value) => value.kind === 'a', target:[abTarget]     })
      sample({source:abSource, filter:(value) => value.kind === 'a', target:[unknownTarget]})
      sample({source:abSource, filter:(value) => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, inferredA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value) => value.kind === 'a',
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('source, explicitB, unit target', () => {
  test('source, explicitB, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:bTarget      })
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:abTarget     })
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:unknownTarget})
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, explicitB, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value): value is B => value.kind === 'b',
      //@ts-expect-error
      target: aTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('source, explicitB, array target', () => {
  test('source, explicitB, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:[bTarget]      })
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:[abTarget]     })
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:[unknownTarget]})
      sample({source:abSource, filter:(value): value is B => value.kind === 'b', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, explicitB, array target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value): value is B => value.kind === 'b',
      //@ts-expect-error
      target: [aTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('source, explicitA, unit target', () => {
  test('source, explicitA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:aTarget      })
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:abTarget     })
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:unknownTarget})
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, explicitA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value): value is A => value.kind === 'a',
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('source, explicitA, array target', () => {
  test('source, explicitA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:[aTarget]      })
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:[abTarget]     })
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:[unknownTarget]})
      sample({source:abSource, filter:(value): value is A => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, explicitA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      source: abSource,
      filter: (value): value is A => value.kind === 'a',
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('source, booleanA, unit target', () => {
  test('source, booleanA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:abTarget     })
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:unknownTarget})
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, booleanA, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: aTarget,
      })
      sample({
        //@ts-expect-error
        source: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: bTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'A'.
            Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'B'.
            Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('source, booleanA, array target', () => {
  test('source, booleanA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:[abTarget]     })
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:[unknownTarget]})
      sample({source:abSource, filter:(value): boolean => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('source, booleanA, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        source: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: [aTarget],
      })
      sample({
        //@ts-expect-error
        source: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: [bTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'A'.
            Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'B'.
            Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('clock, namedA, unit target', () => {
  test('clock, namedA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:isA, target:aTarget      })
      sample({clock:abSource, filter:isA, target:abTarget     })
      sample({clock:abSource, filter:isA, target:unknownTarget})
      sample({clock:abSource, filter:isA, target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, namedA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: isA,
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('clock, namedA, array target', () => {
  test('clock, namedA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:isA, target:[aTarget]      })
      sample({clock:abSource, filter:isA, target:[abTarget]     })
      sample({clock:abSource, filter:isA, target:[unknownTarget]})
      sample({clock:abSource, filter:isA, target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, namedA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: isA,
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
test('clock, invalidC, unit target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      //@ts-expect-error
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: aTarget,
    })
    sample({
      //@ts-expect-error
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: bTarget,
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: abTarget,
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: unknownTarget,
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: voidTarget,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
test('clock, invalidC, array target (should fail)', () => {
  //prettier-ignore
  {
    sample({
      //@ts-expect-error
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [aTarget],
    })
    sample({
      //@ts-expect-error
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [bTarget],
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [abTarget],
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [unknownTarget],
    })
    sample({
      clock: abSource,
      //@ts-expect-error
      filter: ((value): value is C => true),
      target: [voidTarget],
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'A'.
          Property 'a' is missing in type 'B' but required in type 'A'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
      Types of property '__' are incompatible.
        Type 'AB' is not assignable to type 'B'.
          Property 'b' is missing in type 'A' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    A type predicate's type must be assignable to its parameter's type.
      Type 'C' is not assignable to type 'AB'.
        Property 'b' is missing in type 'C' but required in type 'B'.
    "
  `)
})
describe('clock, inferredA, unit target', () => {
  test('clock, inferredA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:aTarget      })
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:abTarget     })
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:unknownTarget})
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, inferredA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value) => value.kind === 'a',
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('clock, inferredA, array target', () => {
  test('clock, inferredA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:[aTarget]      })
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:[abTarget]     })
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:[unknownTarget]})
      sample({clock:abSource, filter:(value) => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, inferredA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value) => value.kind === 'a',
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('clock, explicitB, unit target', () => {
  test('clock, explicitB, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:bTarget      })
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:abTarget     })
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:unknownTarget})
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, explicitB, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value): value is B => value.kind === 'b',
      //@ts-expect-error
      target: aTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('clock, explicitB, array target', () => {
  test('clock, explicitB, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:[bTarget]      })
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:[abTarget]     })
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:[unknownTarget]})
      sample({clock:abSource, filter:(value): value is B => value.kind === 'b', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, explicitB, array target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value): value is B => value.kind === 'b',
      //@ts-expect-error
      target: [aTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<A>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('clock, explicitA, unit target', () => {
  test('clock, explicitA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:aTarget      })
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:abTarget     })
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:unknownTarget})
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, explicitA, unit target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value): value is A => value.kind === 'a',
      //@ts-expect-error
      target: bTarget,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('clock, explicitA, array target', () => {
  test('clock, explicitA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:[aTarget]      })
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:[abTarget]     })
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:[unknownTarget]})
      sample({clock:abSource, filter:(value): value is A => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, explicitA, array target (should fail)', () => {
    //prettier-ignore
    sample({
      clock: abSource,
      filter: (value): value is A => value.kind === 'a',
      //@ts-expect-error
      target: [bTarget],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<B>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Property 'a' is missing in type 'B' but required in type 'A'.
      "
    `)
  })
})
describe('clock, booleanA, unit target', () => {
  test('clock, booleanA, unit target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:abTarget     })
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:unknownTarget})
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:voidTarget   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, booleanA, unit target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: aTarget,
      })
      sample({
        //@ts-expect-error
        clock: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: bTarget,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'A'.
            Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'B'.
            Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
describe('clock, booleanA, array target', () => {
  test('clock, booleanA, array target (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:[abTarget]     })
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:[unknownTarget]})
      sample({clock:abSource, filter:(value): boolean => value.kind === 'a', target:[voidTarget]   })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock, booleanA, array target (should fail)', () => {
    //prettier-ignore
    {
      sample({
        //@ts-expect-error
        clock: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: [aTarget],
      })
      sample({
        //@ts-expect-error
        clock: abSource,
        filter: (value): boolean => value.kind === 'a',
        target: [bTarget],
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<AB>' is not assignable to type 'Unit<A>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'A'.
            Property 'a' is missing in type 'B' but required in type 'A'.
      Type 'EventCallable<AB>' is not assignable to type 'Unit<B>'.
        Types of property '__' are incompatible.
          Type 'AB' is not assignable to type 'B'.
            Property 'b' is missing in type 'A' but required in type 'B'.
      "
    `)
  })
})
