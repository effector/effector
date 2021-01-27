import {
  createDomain,
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector'
{
  const domain = createDomain()

  const a = domain.store('bar')
  const b = domain.store('h', {option: 'test', ['na' + 'me']: 'LOL'})
  const c = domain.store('h', {name: 'test'})
  //$off
  const d = domain.store('h', null)
  //$off
  const e = domain.store('h', 4234)
  const f = domain.store('h', {})

  const aAlias = domain.createStore('bar')
  const bAlias = domain.createStore('h', {option: 'test', ['na' + 'me']: 'LOL'})
  const cAlias = domain.createStore('h', {name: 'testAlias'})
  //$off
  const dAlias = domain.createStore('h', null)
  //$off
  const eAlias = domain.createStore('h', 4234)
  const fAlias = domain.createStore('h', {})
  const {sid} = domain.createStore(null)
  const {shortName} = domain.createStore(null, {name: 'foo'})

  domain.createStore(null)

  domain.createStore(null)
}

{
  const foo = createEffect()
  const bar = createEffect('hello')
  const baz = createEffect({
    handler() {
      return 0
    },
  })
  const quux = createEffect('nice', {
    handler() {
      return 0
    },
  })
  const fa = () => createEffect()

  const {sid} = createEffect()
  const {name} = createEffect('foo')
  const {shortName} = createEffect({name: 'foo'})

  createEffect()

  createEffect()
}

{
  const foo = createStore('foo')
  const a = createStore('h')
  const b = createStore('h', {})
  //$off
  const c = createStore('h', 23020)
  const config = {option: 0}
  const dod = createStore(null, config)

  const f = a => createStore(a)

  const {sid} = createStore(null)
  const {shortName} = createStore(null, {name: 'foo'})

  createStore(null)

  createStore(null)
}

{
  const foo = createEvent()
  const bar = createEvent('hello')
  const baz = createEvent({name: 'nice'})
  const f = () => createEvent()

  const {sid} = createEvent()
  const {name} = createEvent('foo')
  const {shortName} = createEvent({name: 'foo'})

  createEvent()

  createEvent()
}

{
  const foo = createEvent()
  const a = restore(foo, null)
  const b = restore(foo, null, {})
  //$off
  const c = restore(foo, null, 23020)
  const config = {option: 0}
  const dod = restore(foo, null, config)

  const f = a => restore(foo, null)

  const {sid} = restore(foo, null)
  const {shortName} = restore(foo, null, {name: 'bar'})

  restore(foo, null)

  restore(foo, null)
}
