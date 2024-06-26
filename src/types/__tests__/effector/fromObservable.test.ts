/* eslint-disable no-unused-vars */
import {createEvent, createStore, fromObservable, Event} from 'effector'
import * as redux from 'redux'
import {from, periodic} from 'most'
import * as rxjs from 'rxjs'

const typecheck = '{global}'

describe('standard shape', () => {
  it('supports events from observables', () => {
    const test = () => {
      const intervaled = fromObservable(rxjs.interval(1000))
      const expect: Event<number> = intervaled;
    }

    expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
  })
})

describe('config shape', () => {
  it('supports events from observables', () => {
    const test = () => {
      const appStarted = createEvent()
      const intervaled = fromObservable({
        start: appStarted,
        setup: rxjs.interval(1000),
      })

      const expect: Event<number> = intervaled
    }

    expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
  })

  it('supports source with manual setup', () => {
    const test = () => {
      const $stream = createStore(rxjs.interval(1000))
      const appStarted = createEvent()
      const intervaled = fromObservable({
        source: $stream,
        start: appStarted,
        setup: (notifyEffector, stream) => {
          const subscription = stream.subscribe(notifyEffector)

          return () => subscription.unsubscribe()
        },
      })

      const expect: Event<number> = intervaled
    }

    expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
  })
})
