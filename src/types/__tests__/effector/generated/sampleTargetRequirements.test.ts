/* eslint-disable no-unused-vars */
import {createEvent, sample} from 'effector'
const typecheck = '{global}'

test('never, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('never, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly EventCallable<never>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<never>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'EventCallable<never>'.
          Type 'EventCallable<void>' is not assignable to type 'EventCallable<never>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 31 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly EventCallable<never>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<never>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'EventCallable<never>'.
          Type 'EventCallable<void>' is not assignable to type 'EventCallable<never>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[] | readonly EventCallable<{ b: string; }>[]'.
      Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ b: string; }>[]'.
        Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
          Type 'EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
            Types of property 'prepend' are incompatible.
              Type '<Before = void>(fn: (_: Before) => { a: number; }) => EventCallableAsReturnType<Before>' is not assignable to type '<Before = void>(fn: (_: Before) => { b: string; }) => EventCallableAsReturnType<Before>'.
                Types of parameters 'fn' and 'fn' are incompatible.
                  Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<{ a: number; }>[]'.
      Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[]'.
        Type 'EventCallable<unknown> | EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ a: number; }>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('never, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<never>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: never = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('void, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: [bottom, ignored],'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 31 'target: [ignored, bottom],'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ b: string; }' is not assignable to type 'void'.
    Unmarked error at test line 79 'target: [left, wide],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 79 'target: [left, wide],'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('void, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<void>'.
      Types of property '__' are incompatible.
        Type '{ b: string; }' is not assignable to type 'void'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 79 'target: [left, wide],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 75 'target: [left, right],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 75 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ b: string; }' is not assignable to type 'void'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 94 'target: [left, wide],'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 31 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 63 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 79 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type 'readonly [Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [UnitTargetable<void>, UnitTargetable<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type 'readonly [UnitTargetable<void>, EventCallable<unknown>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: readonly [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 75 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 94 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type 'readonly [Unit<void>, Unit<unknown>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 31 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<void>; error: \\"source should extend target type\\"; }'.
    Unmarked error at test line 63 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type '[Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 79 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type '[Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [UnitTargetable<void>, UnitTargetable<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type 'readonly [UnitTargetable<void>, EventCallable<unknown>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value?: void | undefined) => void; target: [Unit<void>, Unit<void>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 75 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type '[Unit<void>, Unit<void>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => { a: number; }'.
      Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 94 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<unknown>]' is not assignable to type '[Unit<void>, Unit<unknown>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'Unit<void>[]'.
      Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'Unit<void>'.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('void, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly UnitTargetable<void>[] | readonly UnitTargetable<void>[]'.
      Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<void>'.
          Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
            Types of property '__' are incompatible.
              Type '{ a: number; }' is not assignable to type 'void'.
    Unmarked error at test line 79 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly UnitTargetable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly UnitTargetable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'UnitTargetable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('void, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<void>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: void = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: void) => void' is not assignable to type '(value?: void | undefined) => never'.
      Type 'void' is not assignable to type 'never'.
    Unmarked error at test line 75 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'Unit<void>[]'.
      Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'Unit<void>'.
        Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<void>'.
          Types of property '__' are incompatible.
            Type '{ a: number; }' is not assignable to type 'void'.
    "
  `)
})
test('unknown, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 29 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 61 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; } | { b: string; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; } | { b: string; }'.
    Unmarked error at test line 79 'target: [left, wide],'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<unknown>; error: \\"source should extend target type\\"; }'.
    "
  `)
})
test('unknown, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 29 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 61 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; } | { b: string; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; } | { b: string; }'.
    Unmarked error at test line 79 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<unknown>; error: \\"source should extend target type\\"; }'.
    "
  `)
})
test('unknown, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: readonly [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 29 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<void>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 61 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; } | { b: string; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; } | { b: string; }'.
    Unmarked error at test line 79 'target: selected,'
    Object literal may only specify known properties, and 'target' does not exist in type '{ source: Unit<unknown>; error: \\"source should extend target type\\"; }'.
    "
  `)
})
test('unknown, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 77 'clock: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 32 'clock: input,'
    Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (value: unknown) => void; target: [Unit<unknown>, Unit<unknown>]; error: \\"fn result should extend target type\\"; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 90 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => { a: number; }'.
      Type 'unknown' is not assignable to type '{ a: number; }'.
    "
  `)
})
test('unknown, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 61 'source: input,'
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<{ a: number; } | { b: string; }>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type '{ a: number; } | { b: string; }'.
    "
  `)
})
test('unknown, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('unknown, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<unknown>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: unknown = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: unknown) => unknown' is not assignable to type '(value: unknown) => never'.
      Type 'unknown' is not assignable to type 'never'.
    "
  `)
})
test('any, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    "
  `)
})
test('any, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    "
  `)
})
test('any, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    Unmarked error at test line 29 'clock: input,'
    Type 'EventCallable<any>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type 'any' is not assignable to type 'never'.
    "
  `)
})
test('any, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('any, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[] | readonly EventCallable<{ b: string; }>[]'.
      Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ b: string; }>[]'.
        Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
          Type 'EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
            Types of property 'prepend' are incompatible.
              Type '<Before = void>(fn: (_: Before) => { a: number; }) => EventCallableAsReturnType<Before>' is not assignable to type '<Before = void>(fn: (_: Before) => { b: string; }) => EventCallableAsReturnType<Before>'.
                Types of parameters 'fn' and 'fn' are incompatible.
                  Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<{ a: number; }>[]'.
      Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[]'.
        Type 'EventCallable<unknown> | EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ a: number; }>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('any, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<any>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: any = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('{a: number}, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: [bottom, ignored],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 31 'target: [ignored, bottom],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 63 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
      Types of property '__' are incompatible.
        Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: [bottom, ignored],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 37 'target: [ignored, bottom],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: { a: number; }) => { a: number; }' is not assignable to type '(value: { a: number; }) => { b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 75 'target: [left, right],'
    Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
      Types of property '__' are incompatible.
        Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type 'readonly [EventCallable<never>, EventCallable<void>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 31 'target: selected,'
    Type 'readonly [EventCallable<void>, EventCallable<never>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 63 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [EventCallable<{ a: number; }>, UnitTargetable<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: selected,'
    Type 'readonly [EventCallable<never>, EventCallable<void>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 37 'target: selected,'
    Type 'readonly [EventCallable<void>, EventCallable<never>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: { a: number; }) => { a: number; }' is not assignable to type '(value: { a: number; }) => { b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 75 'target: selected,'
    Type 'readonly [EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type '[EventCallable<never>, EventCallable<void>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 31 'target: selected,'
    Type '[EventCallable<void>, EventCallable<never>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 63 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; }' is not assignable to type 'never'.
    Unmarked error at test line 61 'clock: input,'
    Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ b: string; }>'.
      Types of property '__' are incompatible.
        Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 63 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type 'readonly [EventCallable<{ a: number; }>, UnitTargetable<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: selected,'
    Type '[EventCallable<never>, EventCallable<void>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 37 'target: selected,'
    Type '[EventCallable<void>, EventCallable<never>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 71 'fn: value => {'
    Type '(value: { a: number; }) => { a: number; }' is not assignable to type '(value: { a: number; }) => { b: string; }'.
      Property 'b' is missing in type '{ a: number; }' but required in type '{ b: string; }'.
    Unmarked error at test line 75 'target: selected,'
    Type '[EventCallable<{ a: number; }>, EventCallable<{ b: string; }>]' is not assignable to type '[Unit<{ a: number; }>, Unit<{ a: number; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<{ b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
          Types of property '__' are incompatible.
            Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    "
  `)
})
test('{a: number}, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('{a: number}, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly UnitTargetable<{ a: number; }>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly UnitTargetable<{ a: number; }>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
          Type 'EventCallable<void>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 31 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly UnitTargetable<{ a: number; }>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly UnitTargetable<{ a: number; }>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
          Type 'EventCallable<void>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[] | readonly UnitTargetable<{ a: number; }>[]'.
      Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly UnitTargetable<{ a: number; }>[]'.
        Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
          Type 'EventCallable<{ b: string; }>' is not assignable to type 'UnitTargetable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<{ a: number; }>[]'.
      Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[]'.
        Type 'EventCallable<unknown> | EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ a: number; }>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('{a: number}, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('{a: number; b: string}, inline, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: [bottom, ignored],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 31 'target: [ignored, bottom],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, inline, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'never'.
    "
  `)
})
test('{a: number; b: string}, inline, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [bottom, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [ignored, bottom],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [wide, ignored],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [left, right],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [left, wide],
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: [ignored, wide],
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: [bottom, ignored],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 37 'target: [ignored, bottom],'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, readonly, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type 'readonly [EventCallable<never>, EventCallable<void>]' is not assignable to type 'readonly [Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 31 'target: selected,'
    Type 'readonly [EventCallable<void>, EventCallable<never>]' is not assignable to type 'readonly [Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, readonly, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'never'.
    "
  `)
})
test('{a: number; b: string}, readonly, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as const
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: selected,'
    Type 'readonly [EventCallable<never>, EventCallable<void>]' is not assignable to type 'readonly [Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 37 'target: selected,'
    Type 'readonly [EventCallable<void>, EventCallable<never>]' is not assignable to type 'readonly [Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, mutable, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type '[EventCallable<never>, EventCallable<void>]' is not assignable to type '[Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 31 'target: selected,'
    Type '[EventCallable<void>, EventCallable<never>]' is not assignable to type '[Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, mutable, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 13 'clock: input,'
    Type 'EventCallable<{ a: number; b: string; }>' is not assignable to type 'Unit<never>'.
      Types of property '__' are incompatible.
        Type '{ a: number; b: string; }' is not assignable to type 'never'.
    "
  `)
})
test('{a: number; b: string}, mutable, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored] as [typeof bottom, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom] as [typeof ignored, typeof bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored] as [typeof wide, typeof ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right] as [typeof left, typeof right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide] as [typeof left, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide] as [typeof ignored, typeof wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 18 'target: selected,'
    Type '[EventCallable<never>, EventCallable<void>]' is not assignable to type '[Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 1 in source is not compatible with type at position 1 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 37 'target: selected,'
    Type '[EventCallable<void>, EventCallable<never>]' is not assignable to type '[Unit<{ a: number; b: string; }>, Unit<{ a: number; b: string; }>]'.
      Type at position 0 in source is not compatible with type at position 0 in target.
        Type 'EventCallable<void>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'void' is not assignable to type '{ a: number; b: string; }'.
    "
  `)
})
test('{a: number; b: string}, array, source (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      source: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('{a: number; b: string}, array, clock (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly UnitTargetable<{ a: number; b: string; }>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly UnitTargetable<{ a: number; b: string; }>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'UnitTargetable<{ a: number; b: string; }>'.
          Type 'EventCallable<void>' is not assignable to type 'UnitTargetable<{ a: number; b: string; }>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 31 'target: selected,'
    Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly EventCallable<void>[] | readonly UnitTargetable<{ a: number; b: string; }>[]'.
      Type '(EventCallable<void> | EventCallable<never>)[]' is not assignable to type 'readonly UnitTargetable<{ a: number; b: string; }>[]'.
        Type 'EventCallable<void> | EventCallable<never>' is not assignable to type 'UnitTargetable<{ a: number; b: string; }>'.
          Type 'EventCallable<void>' is not assignable to type 'UnitTargetable<{ a: number; b: string; }>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type '{ a: number; b: string; }'.
    Unmarked error at test line 47 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    Unmarked error at test line 63 'target: selected,'
    Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[] | readonly EventCallable<{ b: string; }>[]'.
      Type '(EventCallable<{ a: number; }> | EventCallable<{ b: string; }>)[]' is not assignable to type 'readonly EventCallable<{ b: string; }>[]'.
        Type 'EventCallable<{ a: number; }> | EventCallable<{ b: string; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
          Type 'EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ b: string; }>'.
            Types of property 'prepend' are incompatible.
              Type '<Before = void>(fn: (_: Before) => { a: number; }) => EventCallableAsReturnType<Before>' is not assignable to type '<Before = void>(fn: (_: Before) => { b: string; }) => EventCallableAsReturnType<Before>'.
                Types of parameters 'fn' and 'fn' are incompatible.
                  Property 'a' is missing in type '{ b: string; }' but required in type '{ a: number; }'.
    Unmarked error at test line 79 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<{ a: number; }>[]'.
      Type '(EventCallable<unknown> | EventCallable<{ a: number; }>)[]' is not assignable to type 'readonly EventCallable<{ a: number; }>[]'.
        Type 'EventCallable<unknown> | EventCallable<{ a: number; }>' is not assignable to type 'EventCallable<{ a: number; }>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<{ a: number; }>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type '{ a: number; }'.
    Unmarked error at test line 95 'target: selected,'
    Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<unknown>[] | readonly EventCallable<void>[]'.
      Type '(EventCallable<unknown> | EventCallable<void>)[]' is not assignable to type 'readonly EventCallable<void>[]'.
        Type 'EventCallable<unknown> | EventCallable<void>' is not assignable to type 'EventCallable<void>'.
          Type 'EventCallable<unknown>' is not assignable to type 'EventCallable<void>'.
            Types of property '__' are incompatible.
              Type 'unknown' is not assignable to type 'void'.
    "
  `)
})
test('{a: number; b: string}, array, fn (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [bottom, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, bottom]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [wide, ignored]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, right]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [left, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
    {
    function regression() {
    const input = createEvent<{a: number; b: string}>()
    const bottom = createEvent<never>()
    const ignored = createEvent<void>()
    const wide = createEvent<unknown>()
    const left = createEvent<{a: number}>()
    const right = createEvent<{b: string}>()
    const selected = [ignored, wide]
    sample({
      clock: input,
      fn: value => {
        const exact: {a: number; b: string} = value
        return exact
      },
      target: selected,
    })
    }
    }
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
