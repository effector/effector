import React from 'react'
import {allSettled, createEvent, createStore, fork, sample} from 'effector'
import {useUnit, Provider} from 'effector-react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'

describe('useUnit uses @@unitShape', () => {
  it('resolves custom shape of stores', async () => {
    const {entity, internals} = createCustomEntity()

    const scope = fork()

    const View = () => {
      const {someStore} = useUnit(entity)

      return <p>{someStore}</p>
    }

    await render(
      <Provider value={scope}>
        <View />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <p>
        initial value
      </p>
    `)

    await allSettled(internals.someEvent, {scope, params: 'new value'})

    await render(
      <Provider value={scope}>
        <View />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <p>
        new value
      </p>
    `)
  })

  it('resolves binds events from shape correctly', async () => {
    const {entity} = createCustomEntity()

    const scope = fork()

    const View = () => {
      const {someStore, someEvent} = useUnit(entity)

      return (
        <div>
          <p>{someStore}</p>
          <button id="btn" onClick={() => someEvent('value from ui')}>
            click me
          </button>
        </div>
      )
    }

    await render(
      <Provider value={scope}>
        <View />
      </Provider>,
    )
    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          value from ui
        </p>
        <button
          id="btn"
        >
          click me
        </button>
      </div>
    `)
  })
})

function createCustomEntity() {
  const $someStore = createStore('initial value')
  const someEvent = createEvent<string>()

  sample({clock: someEvent, fn: value => value, target: $someStore})

  return {
    entity: {
      '@@unitShape': () => {
        return {someStore: $someStore, someEvent}
      },
    },
    internals: {
      $someStore,
      someEvent,
    },
  }
}
