import * as React from 'react'
import {from} from 'most'

import {createStore, combine, createEvent, createEffect} from 'effector'
import {useStore} from 'effector-react'

import {render, act, renderHTML} from 'effector/fixtures/react'

test('rfc1 example implementation', async() => {
  const fnWait = jest.fn()
  const fnClick = jest.fn()
  const clickEpicFn = jest.fn()

  const inputText = createEvent()
  const click = createEvent()
  const resetForm = createEvent()
  const increment = createEvent()

  const counter = createStore(0)
  const text = createStore('')
  const store = combine({counter, text})

  const waitIncrement = createEffect({
    async handler() {
      await new Promise(rs => {
        const unsub = increment.watch(() => {
          unsub()
          rs()
        })
      })
    },
  })
  click.watch(() => waitIncrement())
  waitIncrement.done.watch(fnWait)
  counter.reset(resetForm)
  text.reset(resetForm)
  const trimmedInput = inputText.map(text => text.trim())

  text.on(trimmedInput, (_, text) => text)

  counter.watch(() => {})
  counter.on(increment, state => state + 1)
  click.watch(() => {})
  const click$ = from(click).tap(clickEpicFn)

  click$.observe(() => {})
  click$.observe(async() => {
    await new Promise(rs => setTimeout(rs, 500))
    fnClick()
    increment()
  })
  store.watch(() => {})

  const messageStore = store.map(({counter}) => `Clicked: ${counter} times`)
  const ClickedTimes = () => {
    const state = useStore(messageStore)
    expect(state).not.toBe(text)
    expect(typeof state).toBe('string')
    return <span>{state}</span>
  }
  const CurrentText = ({prefix}) => {
    const {text} = useStore(store)
    return (
      <p>
        {prefix} {text}
      </p>
    )
  }

  const App = () => (
    <>
      <ClickedTimes />
      <CurrentText prefix="Current text: " />
    </>
  )
  await expect(
    (async() => {
      await render(<ClickedTimes />)
      await render(<CurrentText prefix="Current text: " />)
      await render(<App />)
    })(),
  ).resolves.not.toThrow()
  expect(await renderHTML(<ClickedTimes />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 0 times
    </span>
  `)
  expect(await renderHTML(<CurrentText prefix="Current text: " />))
    .toMatchInlineSnapshot(`
    <p>
      Current text: 
       
      
    </p>
  `)
  expect(await renderHTML(<App />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 0 times
    </span>
  `)
  expect(fnWait).not.toHaveBeenCalled()
  expect(fnClick).not.toHaveBeenCalled()
  await act(async() => {
    click()
    click()
    expect(fnWait).not.toHaveBeenCalled()
    await new Promise(_ => setTimeout(_, 2200))
  })
  expect(counter.getState()).toBe(2)
  expect(fnWait).toHaveBeenCalledTimes(2)
  expect(fnClick).toHaveBeenCalledTimes(2)
  expect(store.getState()).toMatchObject({
    counter: 2,
    text: '',
  })
  expect(await renderHTML(<App />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 2 times
    </span>
  `)
})
