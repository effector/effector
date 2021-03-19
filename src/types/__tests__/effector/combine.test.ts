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

  combine({
    hasNotActiveFunnels: $hasNotActiveFunnels,
    vacancyId: $vacancyField.map(v => {
      if (v) return v.id
    }),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '[{ hasNotActiveFunnels: Store<boolean>; vacancyId: Store<string | undefined>; }]' is not assignable to parameter of type 'Tuple<Store<any>>'.
      Type '[{ hasNotActiveFunnels: Store<boolean>; vacancyId: Store<string | undefined>; }]' is not assignable to type '[Store<any>]'.
        Type '{ hasNotActiveFunnels: Store<boolean>; vacancyId: Store<string | undefined>; }' is not assignable to type 'Store<any>'.
          Object literal may only specify known properties, and 'hasNotActiveFunnels' does not exist in type 'Store<any>'.
    "
  `)
})

test('support optional parameters of explicit generic type', () => {
  type I = {
    foo?: string | number
  }
  const $store = createStore<string | number>('')
  combine<I>({
    foo: $store,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
