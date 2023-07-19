import {combine, createStore, Store} from 'effector'

const typecheck = '{global}'

describe('combine cases (should pass)', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<{R: number; G: number; B: number}> = combine({R, G, B})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[number, number, number]> = combine([R, G, B])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine([Store<number>,Store<string>])', () => {
    const sn = createStore(0)
    const ss = createStore('')
    const store = combine([sn, ss]).map(([n, s]) => {
      n.toFixed // should have method on type
      s.charAt // should have method on type
      return null
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    const store: Store<{Color: string}> = combine({Color})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    const store: Store<[string]> = combine([Color])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      {R, G, B},
      ({R, G, B}) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      [R, G, B],
      ([R, G, B]) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine([Store<number>,Store<string>], ([number,string]) => ...)`, () => {
    const sn = createStore(0)
    const ss = createStore('')
    const store = combine([sn, ss], ([n, s]) => {
      n.toFixed // should have method on type
      s.charAt // should have method on type
      return null
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine(Color, Color => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      R,
      G,
      B,
      (R, G, B) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[number, number, number]> = combine(R, G, B)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    const store: Store<[string]> = combine(Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('error inference (should fail with number -> string error)', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<{R: string; G: string; B: string}> = combine({R, G, B})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<{ R: number; G: number; B: number; }>' is not assignable to type 'Store<{ R: string; G: string; B: string; }>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ R: number; G: number; B: number; }' is not assignable to type '{ R: string; G: string; B: string; }'.
      "
    `)
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<[string, string, string]> = combine([R, G, B])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<[number, number, number]>' is not assignable to type 'Store<[string, string, string]>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '[number, number, number]' is not assignable to type '[string, string, string]'.
      "
    `)
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<{Color: number}> = combine({Color})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<{ Color: string; }>' is not assignable to type 'Store<{ Color: number; }>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ Color: string; }' is not assignable to type '{ Color: number; }'.
      "
    `)
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<[number]> = combine([Color])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<[string]>' is not assignable to type 'Store<[number]>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '[string]' is not assignable to type '[number]'.
      "
    `)
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<number> = combine(
      {R, G, B},
      ({R, G, B}) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
        The types returned by 'getState()' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      "
    `)
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<number> = combine(
      [R, G, B],
      ([R, G, B]) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<number> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<number> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<number> = combine(Color, Color => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<number> = combine(
      R,
      G,
      B,
      (R, G, B) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //@ts-expect-error
    const store: Store<[string, string, string]> = combine(R, G, B)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<[number, number, number]>' is not assignable to type 'Store<[string, string, string]>'.
      "
    `)
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    //@ts-expect-error
    const store: Store<number> = combine(Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<[string]>' is not assignable to type 'Store<number>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '[string]' is not assignable to type 'number'.
      "
    `)
  })
})

test('possibly undefined store error message mismatch (should pass)', () => {
  const $vacancyField = createStore<{id: string} | null>(null)
  const $hasNotActiveFunnels = createStore<boolean>(true)

  const result = combine({
    hasNotActiveFunnels: $hasNotActiveFunnels,
    vacancyId: $vacancyField.map(v => {
      if (v) return v.id
    }),
  })

  const resultType: Store<{
    hasNotActiveFunnels: boolean
    vacancyId: string | undefined
  }> = result

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('support optional parameters of explicit generic type', () => {
  test('basic case (should pass)', () => {
    type I = {
      foo?: string | number
      bar: number
    }
    const $store = createStore<string | number>('')
    const $bar = createStore(0)
    const result = combine<I>({
      foo: $store,
      bar: $bar,
    })
    const resultType: Store<{
      foo?: string | number
      bar: number
    }> = result
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('omit optional field (should pass)', () => {
    type I = {
      foo?: string | number
      bar: number
    }
    const $bar = createStore(0)
    const result: Store<I> = combine<I>({bar: $bar})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('plain values support (should pass)', () => {
    type I = {
      foo?: string | number
      bar: number
    }
    const $bar = createStore(0)
    const result: Store<I> = combine<I>({
      foo: 0,
      bar: $bar,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  /**
   * wide input is not supported because if you explicitly define desired type
   * then what's the point in passing more values?
   */
  test('wide input is not supported (should fail)', () => {
    type I = {
      foo?: string | number
      bar: number
    }
    const $bar = createStore(0)
    //@ts-expect-error
    const result = combine<I>({
      foo: 0,
      bar: $bar,
      baz: $bar,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        Overload 1 of 18, '(shape: { foo?: string | number | Store<string | number> | undefined; bar: number | Store<number>; }): Store<I>', gave the following error.
          Argument of type '{ foo: number; bar: Store<number>; baz: Store<number>; }' is not assignable to parameter of type '{ foo?: string | number | Store<string | number> | undefined; bar: number | Store<number>; }'.
            Object literal may only specify known properties, and 'baz' does not exist in type '{ foo?: string | number | Store<string | number> | undefined; bar: number | Store<number>; }'.
        Overload 2 of 18, '(shape: I): Store<{ foo?: string | number | undefined; bar: number; }>', gave the following error.
          Type 'Store<number>' is not assignable to type 'number'.
      "
    `)
  })
})

describe('support plain values as well as stores', () => {
  test('no errors in case of plain value', () => {
    const $bar = createStore(0)
    const result: Store<{foo: number; bar: number}> = combine({
      foo: 0,
      bar: $bar,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('edge case with mapped store', () => {
    enum DirectionSource {
      Country = 'country',
      Direction = 'direction',
    }

    function getTravelInfoSource(destination: null) {
      if (!destination) {
        return null
      }

      if (Math.random()) {
        return DirectionSource.Country
      }
    }

    const $a = createStore(false)
    const $b = createStore(null).map(getTravelInfoSource)

    const $c = combine($a, $b, (a, b) => 1)
    const $d = combine($a, 4, (a, b) => 1)

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe("#531 large unions doesn't brake combine", () => {
  test('infinite type', () => {
    type Currency =
      | 'usd'
      | 'eur'
      | 'cny'
      | 'uah'
      | 'byn'
      | 'thb'
      | 'rub'
      | 'azn'
      | 'kzt'
      | 'kgs'
      | 'uzs'
      | 'tzs'
      | 'kes'
      | 'zar'
      | 'ron'
      | 'mdl'
      | 'ils'
      | 'inr'
      | 'pln'
      | 'chf'
      | 'gbp'
    const initial = 'usd' as Currency
    const $currency = createStore(initial)
    const $result = combine({
      currency: $currency,
    })
    const $_: Store<{currency: Currency}> = $result
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no any', () => {
    type Currency =
      | 'usd'
      | 'eur'
      | 'cny'
      | 'uah'
      | 'byn'
      | 'thb'
      | 'rub'
      | 'azn'
      | 'kzt'
      | 'kgs'
      | 'uzs'
      | 'tzs'
      | 'kes'
      | 'zar'
      | 'ron'
      | 'mdl'
      | 'ils'
      | 'inr'
      | 'pln'
      | 'chf'
      | 'gbp'
    const initial = 'usd' as Currency
    const $currency = createStore(initial)
    const $result = combine({
      currency: $currency,
    })
    //@ts-expect-error
    const $_: Store<{currency: number}> = $result
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<{ currency: Currency; }>' is not assignable to type 'Store<{ currency: number; }>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ currency: Currency; }' is not assignable to type '{ currency: number; }'.
      "
    `)
  })
})
