import * as React from 'react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'
import {createStore, createEvent, createEffect, combine, Store} from 'effector'
import {useUnit} from 'effector-react'
import {argumentHistory} from 'effector/fixtures'

describe('useUnit', () => {
  it('should bind single store', async () => {
    const $a = createStore(42)

    const View = () => {
      const a = useUnit($a)

      return <div>{a}</div>
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
  })
  it('should bind single event', async () => {
    const initialValue = 42
    const inc = createEvent()
    const $a = createStore(initialValue).on(inc, s => s + 1)

    const View = () => {
      const up = useUnit(inc)

      return (
        <div>
          <button id="btn" onClick={up}>
            up!
          </button>
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          up!
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect($a.getState()).toEqual(initialValue + 1)
  })
  it('should bind single effect', async () => {
    const initialValue = 42
    const incFx = createEffect(() => {})
    const $a = createStore(initialValue).on(incFx.done, s => s + 1)

    const View = () => {
      const up = useUnit(incFx)

      return (
        <div>
          <button
            id="btn"
            onClick={() => {
              const promise = up()

              expect(promise).toBeInstanceOf(Promise)
            }}>
            up!
          </button>
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          up!
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect($a.getState()).toEqual(initialValue + 1)
  })
  it('should bind stores shape', async () => {
    const $a = createStore(30)
    const $b = createStore(10)
    const $c = createStore(2)

    const View = () => {
      const state = useUnit({a: $a, b: $b, c: $c})

      return <div>{state.a + state.b + state.c}</div>
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
  })
  it('should bind stores array shape', async () => {
    const $a = createStore(30)
    const $b = createStore(10)
    const $c = createStore(2)

    const View = () => {
      const [a, b, c] = useUnit([$a, $b, $c])

      return <div>{a + b + c}</div>
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
  })
  it('should bind events shape', async () => {
    const initialValue = 42
    const inc = createEvent()
    const dec = createEvent()
    const $a = createStore(initialValue)
      .on(inc, s => s + 1)
      .on(dec, s => s - 1)

    const View = () => {
      const up = useUnit({inc, dec})

      return (
        <div>
          <button
            id="btn"
            onClick={() => {
              up.inc()
              up.dec()
            }}>
            up!
          </button>
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          up!
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect($a.getState()).toEqual(initialValue)
  })
  it('should bind effects shape', async () => {
    const initialValue = 42
    const incFx = createEffect(() => {})
    const decFx = createEffect(() => {})
    const $a = createStore(initialValue)
      .on(incFx.done, s => s + 1)
      .on(decFx.done, s => s - 1)

    const View = () => {
      const up = useUnit({incFx, decFx})

      return (
        <div>
          <button
            id="btn"
            onClick={() => {
              expect(up.incFx()).toBeInstanceOf(Promise)
              expect(up.decFx()).toBeInstanceOf(Promise)
            }}>
            up!
          </button>
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          up!
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect($a.getState()).toEqual(initialValue)
  })
  it('should bind mixed shape', async () => {
    const initialValue = 42
    const inc = createEvent()
    const decFx = createEffect(() => {})
    const $a = createStore(initialValue)
      .on(inc, s => s + 1)
      .on(decFx.done, s => s - 1)

    const View = () => {
      const {a, b, c} = useUnit({a: $a, b: inc, c: decFx})

      return (
        <div>
          {a}
          <button
            id="btn"
            onClick={() => {
              b()
              expect(c()).toBeInstanceOf(Promise)
            }}>
            up
          </button>
        </div>
      )
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
        <button
          id="btn"
        >
          up
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
        <button
          id="btn"
        >
          up
        </button>
      </div>
    `)
  })
  it('should bind mixed array', async () => {
    const initialValue = 42
    const inc = createEvent()
    const decFx = createEffect(() => {})
    const $a = createStore(initialValue)
      .on(inc, s => s + 1)
      .on(decFx.done, s => s - 1)

    const View = () => {
      const [a, b, c] = useUnit([$a, inc, decFx])

      return (
        <div>
          {a}
          <button
            id="btn"
            onClick={() => {
              b()
              expect(c()).toBeInstanceOf(Promise)
            }}>
            up
          </button>
        </div>
      )
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
        <button
          id="btn"
        >
          up
        </button>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })

    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          42
          <button
            id="btn"
          >
            up
          </button>
        </div>
      `)
  })
  it('should batch multiple updates', async () => {
    const up = createEvent()
    const $a = createStore(29).on(up, s => s + 1)
    const $b = createStore(9).on(up, s => s + 1)
    const $c = createStore(1).on(up, s => s + 1)
    const $d = combine($b, $c, (b, c) => b + c)

    const rendered = jest.fn()

    const View = () => {
      const state = useUnit({a: $a, d: $d})

      rendered()

      return <div>{state.a + state.d}</div>
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        39
      </div>
    `)

    act(() => {
      up()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
          <div>
            42
          </div>
      `)
    expect(rendered).toBeCalledTimes(2)
  })
  it('should support dynamic change of store', async () => {
    const upA = createEvent()
    const upB = createEvent()
    const $a = createStore(42)
    const $b = createStore(37)

    $a.on(upA, s => s + 1)
    $b.on(upB, s => s - 1)

    const fn = jest.fn()

    const StoreRenderer: React.FC<{store: Store<number>}> = props => {
      const {a} = useUnit({a: props.store})
      fn({a})
      return <div>{a}</div>
    }
    const View = () => {
      const [left, setLeft] = React.useState(true)

      return (
        <div>
          <button
            id="btn"
            onClick={() => {
              setLeft(s => !s)
            }}>
            switch
          </button>
          <StoreRenderer store={left ? $a : $b} />
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          42
        </div>
      </div>
    `)

    await act(() => {
      upB()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          42
        </div>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          36
        </div>
      </div>
    `)

    await act(() => {
      upB()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          35
        </div>
      </div>
    `)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "a": 42,
        },
        Object {
          "a": 36,
        },
        Object {
          "a": 35,
        },
      ]
    `)
  })
  it('should support dynamic change of store positions', async () => {
    const upA = createEvent()
    const upB = createEvent()
    const $a = createStore(42).on(upA, s => s + 1)
    const $b = createStore(37).on(upB, s => s - 1)

    const fn = jest.fn()

    const StoreRenderer: React.FC<{leftFirst: boolean}> = props => {
      const [a, b] = useUnit(props.leftFirst ? [$a, $b] : [$b, $a])
      fn({a, b})
      return (
        <div>
          {a}
          {b}
        </div>
      )
    }
    const View = () => {
      const [left, setLeft] = React.useState(true)

      return (
        <div>
          <button
            id="btn"
            onClick={() => {
              setLeft(s => !s)
            }}>
            switch
          </button>
          <StoreRenderer leftFirst={left} />
        </div>
      )
    }

    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          42
          37
        </div>
      </div>
    `)

    await act(() => {
      upB()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          42
          36
        </div>
      </div>
    `)

    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          36
          42
        </div>
      </div>
    `)

    await act(() => {
      upB()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          switch
        </button>
        <div>
          35
          42
        </div>
      </div>
    `)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "a": 42,
          "b": 37,
        },
        Object {
          "a": 42,
          "b": 36,
        },
        Object {
          "a": 36,
          "b": 42,
        },
        Object {
          "a": 35,
          "b": 42,
        },
      ]
    `)
  })
})
