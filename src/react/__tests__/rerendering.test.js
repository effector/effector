//@flow

import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'

import {
  createStore,
  createEvent,
  createEffect,
  createStoreObject,
  merge,
} from 'effector'
import {useStore} from 'effector-react'
import {argumentHistory} from 'effector/fixtures/index'

it('should rerender only once', async () => {
  const fn = jest.fn()
  const getPresentation = createEffect({
    async handler() {
      await 1
      return 'ok'
    },
  })
  const presentation = createStore(null).on(
    getPresentation.done,
    (_, {result}) => result,
  )
  const loading = createStore(true)
    .on(getPresentation, () => true)
    .on(getPresentation.finally, () => false)
  const presentationStore = createStoreObject({
    loading,
    presentation,
  })

  const View = () => {
    const presentation = useStore(presentationStore)
    React.useEffect(() => {
      getPresentation()
    }, [])
    fn(presentation)
    return (
      <div>
        <p>is loading: {presentation.loading.toString()}</p>
        <p>presentation: {presentation.presentation}</p>
      </div>
    )
  }
  await render(<View />)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "loading": true,
        "presentation": null,
      },
      Object {
        "loading": false,
        "presentation": "ok",
      },
    ]
  `)
})
