import * as React from 'react'
//@ts-ignore
import {render, container, act} from 'effector/fixtures/react'
import {
  createStore,
  createEvent,
  createEffect,
  createDomain,
  Store,
  Event,
  restore,
} from 'effector'
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
})
