import * as React from 'react'
import {createStore, createEffect, combine} from 'effector'
import {useUnit} from 'effector-react'

//@ts-expect-error
import {render} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'

it('should rerender only once', async () => {
  const fn = jest.fn()
  const getPresentation = createEffect({
    async handler() {
      await 1
      return 'ok'
    },
  })
  const presentation = createStore<string | null>(null).on(
    getPresentation.done,
    (_, {result}) => result,
  )
  const loading = createStore(true)
    .on(getPresentation, () => true)
    .on(getPresentation.finally, () => false)
  const presentationStore = combine({
    loading,
    presentation,
  })

  const View = () => {
    const presentation = useUnit(presentationStore)
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
