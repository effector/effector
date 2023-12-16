import * as React from 'react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'
import {
  createStore,
  createEvent,
  createEffect,
  combine,
  sample,
  attach,
  Store,
  fork,
  allSettled,
  serialize,
  launch,
} from 'effector'
import {useUnit} from 'effector-react'
import {
  useUnit as useUnitScope,
  createGate,
  useGate,
  useEvent,
  useStore,
  Provider,
} from 'effector-react/scope'
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

    await act(async () => {
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

    await act(async () => {
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
  it('should support dynamic change of event', async () => {
    const fnL = jest.fn()
    const fnR = jest.fn()
    const left = createEvent()
    const right = createEvent()
    left.watch(() => fnL())
    right.watch(() => fnR())

    const View = () => {
      const [which, setWhich] = React.useState(true)
      const event = which ? left : right
      const testUnit = useUnit(event)
      const onSwitch = () => setWhich(!which)
      return (
        <div>
          <button id="run" onClick={testUnit}>
            run
          </button>
          <button id="switch" onClick={onSwitch}>
            Switch
          </button>
        </div>
      )
    }
    await render(<View />)
    await act(async () => {
      container.firstChild.querySelector('#run').click()
    })
    await act(async () => {
      container.firstChild.querySelector('#switch').click()
    })
    await act(async () => {
      container.firstChild.querySelector('#run').click()
    })
    expect(fnL).toBeCalledTimes(1)
    expect(fnR).toBeCalledTimes(1)
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

    await act(async () => {
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

    await act(async () => {
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
  it('should support dynamic change of store keys', async () => {
    const upA = createEvent()
    const upB = createEvent()
    const $a = createStore(42).on(upA, s => s + 1)
    const $b = createStore(37).on(upB, s => s - 1)

    const fn = jest.fn()

    const StoreRenderer: React.FC<{leftFirst: boolean}> = props => {
      const {a, b, c, d} = useUnit(
        props.leftFirst ? {a: $a, b: $b} : {c: $b, d: $a},
      )
      const x = a ?? c
      const y = b ?? d
      fn(a ? {a, b} : {c, d})
      return (
        <div>
          {a ?? c}
          {b ?? d}
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

    await act(async () => {
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

    await act(async () => {
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
          "c": 36,
          "d": 42,
        },
        Object {
          "c": 35,
          "d": 42,
        },
      ]
    `)
  })
  it('should support dynamic change of scope', async () => {
    const activeChanged = createEvent<'a' | 'b'>()
    const $active = createStore<'a' | 'b'>('a').on(
      activeChanged,
      (_, upd) => upd,
    )
    let clientScope = fork()

    const ref: {fn(): any} = {
      fn() {
        throw Error('noop fn')
      },
    }
    const triggerTopRender = () => {
      ref.fn()
    }

    function Page() {
      const {acive, changeActive} = useUnitScope({
        acive: $active,
        changeActive: activeChanged,
      })

      return (
        <div>
          <button id="a" disabled={acive !== 'a'}>
            a
          </button>
          <button id="b" disabled={acive !== 'b'}>
            b
          </button>
          <button
            id="value"
            onClick={() => {
              changeActive(acive === 'a' ? 'b' : 'a')
            }}>
            Val
          </button>
          <button id="scope" onClick={triggerTopRender}>
            Scp
          </button>
        </div>
      )
    }

    function AppBase({page, data}: {data: any; page: JSX.Element}) {
      const scope = React.useMemo(() => {
        const scope = fork({
          values: {
            ...serialize(clientScope),
            ...data,
          },
        })
        clientScope = scope

        return scope
      }, [data])
      return <Provider value={scope}>{page}</Provider>
    }

    function App() {
      const [s, setS] = React.useState({})
      ref.fn = () => setS({})

      return <AppBase data={s} page={<Page />} />
    }

    await render(<App />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="a"
        >
          a
        </button>
        <button
          disabled=""
          id="b"
        >
          b
        </button>
        <button
          id="value"
        >
          Val
        </button>
        <button
          id="scope"
        >
          Scp
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#value').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          disabled=""
          id="a"
        >
          a
        </button>
        <button
          id="b"
        >
          b
        </button>
        <button
          id="value"
        >
          Val
        </button>
        <button
          id="scope"
        >
          Scp
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#scope').click()
    })
    await act(async () => {
      container.firstChild.querySelector('#value').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="a"
        >
          a
        </button>
        <button
          disabled=""
          id="b"
        >
          b
        </button>
        <button
          id="value"
        >
          Val
        </button>
        <button
          id="scope"
        >
          Scp
        </button>
      </div>
    `)
  })
  describe('useUnit + useGate edge case', () => {
    const getDataRawFx = createEffect(
      () =>
        new Promise<{id: number}[]>(rs => {
          setTimeout(() => rs([{id: 1}]), 1000)
        }),
    )
    test('useUnit + useGate', async () => {
      const event = createEvent()
      const getDataFx = attach({effect: getDataRawFx})
      const $data = createStore<{id: number}[]>([])

      const Gate = createGate({defaultState: 0})

      sample({clock: Gate.open, target: getDataFx})

      $data.on(getDataFx.doneData, (_, upd) => upd)

      const Component = () => {
        useGate(Gate, 0)
        const [data, pending] = useUnitScope([$data, getDataFx.pending])
        if (pending) return <div>Loading....</div>
        return <div>{JSON.stringify(data)}</div>
      }

      const scope = fork()

      await render(
        <React.StrictMode>
          <Provider value={scope}>
            <Component />
          </Provider>
        </React.StrictMode>,
      )
      // @ ts-expect-error
      // if (globalThis.REACT_17) {
      //   expect(container.firstChild).toMatchInlineSnapshot(`
      //     <div>
      //       []
      //     </div>
      //   `)
      // } else {
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          Loading....
        </div>
      `)
      // }
      await act(async () => {
        await allSettled(event, {scope})
      })
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          [{"id":1}]
        </div>
      `)
    })
    test('useStore + useGate', async () => {
      const event = createEvent()
      const getDataFx = attach({effect: getDataRawFx})
      const $data = createStore<{id: number}[]>([])

      const Gate = createGate({defaultState: 0})

      sample({clock: Gate.open, target: getDataFx})

      $data.on(getDataFx.doneData, (_, upd) => upd)

      const Component = () => {
        useGate(Gate, 0)
        const data = useStore($data)
        const pending = useStore(getDataFx.pending)
        if (pending) return <div>Loading....</div>
        return <div>{JSON.stringify(data)}</div>
      }

      const scope = fork()

      await render(
        <React.StrictMode>
          <Provider value={scope}>
            <Component />
          </Provider>
        </React.StrictMode>,
      )
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          Loading....
        </div>
      `)
      await act(async () => {
        await allSettled(event, {scope})
      })
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          [{"id":1}]
        </div>
      `)
    })
    test('useUnit + useEffect', async () => {
      const event = createEvent()
      const getData = createEvent()
      const getDataFx = attach({effect: getDataRawFx})
      const $data = createStore<{id: number}[]>([])

      sample({clock: getData, target: getDataFx})

      $data.on(getDataFx.doneData, (_, upd) => upd)

      const Component = () => {
        const run = useEvent(getData)
        const [data, pending] = useUnitScope([$data, getDataFx.pending])
        React.useEffect(() => {
          run()
        }, [])
        if (pending) return <div>Loading....</div>
        return <div>{JSON.stringify(data)}</div>
      }

      const scope = fork()

      await render(
        <React.StrictMode>
          <Provider value={scope}>
            <Component />
          </Provider>
        </React.StrictMode>,
      )
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          Loading....
        </div>
      `)
      await act(async () => {
        await allSettled(event, {scope})
      })
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          [{"id":1}]
        </div>
      `)
    })
  })
  describe('useUnit with force scope', () => {
    let consoleError: any
    beforeEach(() => {
      consoleError = console.error
      console.error = () => {}
    })
    afterEach(() => {
      console.error = consoleError
    })
    describe('forceScope options not set', () => {
      it('without context', async () => {
        const $a = createStore(42)

        const View = () => {
          const a = useUnit($a)

          return <div>{a}</div>
        }

        expect(() =>
          render(<View />).toMatchInlineSnapshot(`
            <div>
              42
            </div>
          `),
        )
      })
      test('with context', async () => {
        const $value = createStore('value')

        const Component = () => {
          const value = useUnit($value)
          return <div>{value}</div>
        }

        const scope = fork({values: [[$value, 'scoped value']]})

        await render(
          <React.StrictMode>
            <Provider value={scope}>
              <Component />
            </Provider>
          </React.StrictMode>,
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              scoped value
            </div>
          `)
      })
    })
    describe('forceScope disabled', () => {
      it('without context', async () => {
        const $a = createStore(42)

        const View = () => {
          const a = useUnit($a, {forceScope: false})

          return <div>{a}</div>
        }

        expect(() =>
          render(<View />).toMatchInlineSnapshot(`
            <div>
              42
            </div>
          `),
        )
      })
      test('with context', async () => {
        const $value = createStore('value')

        const Component = () => {
          const value = useUnit($value, {forceScope: false})
          return <div>{value}</div>
        }

        const scope = fork({values: [[$value, 'scoped value']]})

        await render(
          <React.StrictMode>
            <Provider value={scope}>
              <Component />
            </Provider>
          </React.StrictMode>,
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              scoped value
            </div>
          `)
      })
    })
    describe('forceScope enabled', () => {
      it('without context', async () => {
        const $a = createStore(42)

        const View = () => {
          const a = useUnit($a, {forceScope: true})

          return <div>{a}</div>
        }

        expect(() => render(<View />)).rejects.toThrow(
          'No scope found, consider adding <Provider> to app root',
        )
      })
      test('with context', async () => {
        const $value = createStore('value')

        const Component = () => {
          const value = useUnit($value, {forceScope: true})
          return <div>{value}</div>
        }

        const scope = fork({values: [[$value, 'scoped value']]})

        await render(
          <React.StrictMode>
            <Provider value={scope}>
              <Component />
            </Provider>
          </React.StrictMode>,
        )

        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              scoped value
            </div>
          `)
      })
    })
  })
  it('should not trigger too often', async () => {
    const $value = createStore('initial')
    const change = createEvent<string>()

    $value.on(change, (_, next) => next)

    const shape = {
      '@@unitShape': () => ({
        value: $value,
        onChange: change,
      }),
    }
    let failed = false
    let count = 0
    const App = () => {
      const {onChange, value} = useUnit(shape)
      React.useEffect(() => {
        count += 1
        if (count >= 100) {
          failed = true
          return
        }
        onChange('test')

        return () => {
          onChange('')
        }
      }, [onChange])
      return <div>{value}</div>
    }
    const scope = fork()
    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    expect(failed).toBe(false)
  })
  test('avoiding prototype pollution', async () => {
    const base = {fk: function fk() {}}
    const $foo = createStore(0)
    const App = () => {
      const {foo} = useUnit({foo: $foo, __proto__: base})
      return <div>{foo}</div>
    }
    await render(<App />)
  })
})

describe('@effector/next custom hydration triggers hooks', () => {
  test('useUnit case', async () => {
    const $count = createStore(0)
    const $mappedCount = $count.map(x => x + 2)

    const Component = () => {
      const count = useUnit($mappedCount)
      return <div>{count}</div>
    }

    const scope = fork({values: [[$count, 1]]})

    await render(
      <Provider value={scope}>
        <Component />
      </Provider>,
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        3
      </div>
    `)

    /**
     * @effector/next library now uses custom implementation of `hydrate` under the hood,
     * which relies on some internals of `Scope` object
     *
     * Here is the short test to check that hydration triggers hooks
     *
     * More details at `hydrate.test.ts` -> "@effector/next custom hydration works" test
     */
    const tscope = scope as any
    Object.values(tscope.reg).forEach((ref: any) => {
      if (ref?.meta?.id === ($count as any).graphite.id) {
        ref.current = 2
      }
      if (ref?.meta?.id === ($mappedCount as any).graphite.id) {
        delete tscope.reg[ref.id]
      }
    })
    await act(() => {
      Object.values(tscope.additionalLinks).forEach(links => {
        ;(links as any[]).forEach((link: any) => {
          if (link.meta.watchOp === 'store') {
            launch({
              scope,
              target: link,
              params: null,
            })
          }
        })
      })
    })

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        4
      </div>
    `)
  })
})
