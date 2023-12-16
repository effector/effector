import * as React from 'react'
//@ts-expect-error
import {render, container} from 'effector/fixtures/react'
import {
    fork,
} from 'effector'
import {useScope, Provider} from 'effector-react'

describe('low-level useScope hook', () => {
  const Comp = () => {
    const scope = useScope()
    return <div>{scope === null ? 'null' : 'not null'}</div>
  }

  it('returns `null` if no scope provided', async () => {
    await render(<Comp />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        null
      </div>
    `)
  })

  it('returns scope if scope provided', async () => {
    const scope = fork()
    await render(
      <Provider value={scope}>
        <Comp />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        not null
      </div>
    `)
  })
})