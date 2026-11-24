/* eslint-disable no-unused-vars */
import {createEvent, createStore, sample} from 'effector'
const typecheck = '{global}'
type IsAny<T> = 0 extends 1 & T ? true : false
const assertNotAny = <T extends false>() => {}
test('concrete, state, restored, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, state, restored, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, state, restored, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, state, [restored], none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, state, [restored], flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, state, [restored], callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, state, none, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('concrete, state, none, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('concrete, state, none, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('concrete, {stack, cursor}, restored, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, {stack, cursor}, restored, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, {stack, cursor}, restored, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: restored
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
test('concrete, {stack, cursor}, [restored], none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, {stack, cursor}, [restored], flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, {stack, cursor}, [restored], callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }, target: [restored]
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
test('concrete, {stack, cursor}, none, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('concrete, {stack, cursor}, none, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('concrete, {stack, cursor}, none, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression() {
    type T = string
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    assertNotAny<IsAny<typeof result>>()
    const expected: T = result
    return expected
    }
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
test('generic, state, restored, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, state, restored, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, state, restored, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, state, [restored], none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, state, [restored], flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, state, [restored], callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, state, none, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
test('generic, state, none, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
test('generic, state, none, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: state,
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
test('generic, {stack, cursor}, restored, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, {stack, cursor}, restored, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, {stack, cursor}, restored, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: restored
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
test('generic, {stack, cursor}, [restored], none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, {stack, cursor}, [restored], flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, {stack, cursor}, [restored], callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }, target: [restored]
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
test('generic, {stack, cursor}, none, none (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
test('generic, {stack, cursor}, none, flag (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: flag,
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
test('generic, {stack, cursor}, none, callback (should fail)', () => {
  //prettier-ignore
  {
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [index, index], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: mixed, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: tuple, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: readonlyArray, source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, unknown], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, any], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
    })
    }
    }
    {
    function regression<T>() {
    
    const tick = createEvent<void>()
    const index = createEvent<number>()
    const unknown = createEvent<unknown>()
    const any = createEvent<any>()
    const never = createEvent<never>()
    const mixed = [tick, index]
    const tuple = [tick, index] as const
    const readonlyArray: ReadonlyArray<typeof tick | typeof index> = mixed
    const state = createStore<{stack: T[]; cursor: number}>({stack: [], cursor: 0})
    const stack = createStore<T[]>([])
    const cursor = createStore(0)
    const flag = createStore(true)
    const restored = createEvent<T>()
    sample({clock: [tick, never], source: {stack, cursor},
    filter: (value) => { assertNotAny<IsAny<typeof value>>(); assertNotAny<IsAny<typeof value.stack>>(); return true },
    fn: ({stack, cursor}) => {
    assertNotAny<IsAny<typeof stack>>()
    assertNotAny<IsAny<typeof cursor>>()
    const result = stack[cursor]
    
    const expected: T = result
    return expected
    }
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
