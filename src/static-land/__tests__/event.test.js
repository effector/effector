//@flow

// import * as jv from 'jsverify'
import * as Event from '../event'
import {createEvent, createStore} from 'effector'
// import type {Event as EventType} from 'effector'

//$todo
import {ApplyLaws, FunctorLaws} from 'funland-laws'

import {FilterableLaws} from './laws/filterable'
import {ContravariantLaws} from './laws/contravariant'

function deferWatch(store, fn) {
  let isFirstCall = true
  return store.watch(data => {
    if (isFirstCall) {
      isFirstCall = false
    } else {
      fn(data)
    }
  })
}

describe('Functor<Event>', () => {
  const laws = new FunctorLaws(Event)

  test('functor.identity', () => {
    const fa = createEvent()
    const equiv = laws.identity(fa)

    const equal = createStore([])
      .on(equiv.lh, (list, a) => [...list, a])
      .on(equiv.rh, (list, b) => [...list, b])
      .map(list => {
        if (list.length === 0) return false
        return list.every(x => x === 0)
      })

    deferWatch(equal, data => {
      expect(data).toBe(true)
      //done()
    })

    fa(0)
  })

  test('functor.composition', () => {
    const fa = createEvent()
    const f = a => ({f_box: a})
    const g = b => ({g_box: b})
    const equiv = laws.composition(fa, f, g)

    const equal = createStore([])
      .on(equiv.lh, (list, a) => [...list, a])
      .on(equiv.rh, (list, b) => [...list, b])
      .map(list => {
        if (list.length === 0) return false
        return list.every(x => x === {f_box: {g_box: 0}})
      })

    deferWatch(equal, data => {
      console.log(data)
      expect(data).toBe(true)
      //done()
    })

    fa(0)
  })
})

describe('Apply<Event>', () => {
  const laws = new ApplyLaws(Event)
  it('apply.composition', done => {
    const fa = createEvent()
    const fab = createEvent()
    const fbc = createEvent()
    const equiv = laws.applyComposition(fa, fab, fbc)

    const equal = createStore([])
      .on(equiv.lh, (list, a) => [...list, a])
      .on(equiv.rh, (list, b) => [...list, b])
      .map(list => {
        if (list.length === 0) return false
        return list.every(x => {
          console.log('wtf', x)
          return x === {f_box: {g_box: 0}}
        })
      })

    deferWatch(equal, data => {
      console.log(data)
      expect(data).toBe(true)
      done()
    })

    fa(0)
    fab(a => ({ab_box: a}))
    fbc(b => ({bc_box: b}))
  })
})

describe('Filterable<Event>', () => {
  new FilterableLaws(Event)
})

describe('Contravariant<Event>', () => {
  const laws = new ContravariantLaws(Event)

  test('contravariant.identity', () => {
    const fa = createEvent()
    const equiv = laws.identity(fa)

    const equal = createStore([])
      .on(equiv.lh, (list, a) => [...list, a])
      .on(equiv.rh, (list, b) => [...list, b])
      .map(list => {
        if (list.length === 0) return false
        return list.every(x => x === 0)
      })

    deferWatch(equal, data => {
      expect(data).toBe(true)
      //done()
    })

    fa(0)
  })

  test('contravariant.composition', () => {
    const fa = createEvent()
    const f = a => ({f_box: a})
    const g = b => ({g_box: b})
    const equiv = laws.composition(fa, f, g)

    const equal = createStore([])
      .on(equiv.lh, (list, a) => [...list, a])
      .on(equiv.rh, (list, b) => [...list, b])
      .map(list => {
        if (list.length === 0) return false
        return list.every(x => x === {f_box: {g_box: 0}})
      })

    deferWatch(equal, data => {
      expect(data).toBe(true)
      //done()
    })

    fa(0)
  })
})
