//@flow

import fetch from 'cross-fetch'
import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  createNode,
  forward,
  sample,
  launch,
  step,
  clearNode,
} from 'effector'
import {
  useStore as commonUseStore,
  useList as commonUseList,
} from 'effector-react'

const stack = []
const Scope = React.createContext(null)

/* useStore wrapper for scopes */
function useStore(store) {
  return commonUseStore(useScopeStore(store))
}
/* useList wrapper for scopes */
function useList(store, opts) {
  return commonUseList(useScopeStore(store), opts)
}
function useScopeStore(store) {
  const scope = React.useContext(Scope)
  return scope.find(store).meta.wrapped
}

/* invoke event in scope */
function invoke(unit, payload) {
  if (stack.length === 0) {
    throw Error('invoke cannot be called outside of forked .watch')
  }
  launch(stack[stack.length - 1](unit), payload)
}

/* bind event to scope */
function scopeBind(unit) {
  if (stack.length === 0) {
    throw Error('scopeBind cannot be called outside of forked .watch')
  }
  const result = stack[stack.length - 1](unit)
  return payload => {
    launch(result, payload)
  }
}

/*
bind event to scope. works like React.useCallback, but for scopes
*/
function useScopeEvent(event) {
  const scope = React.useContext(Scope)
  const unit = scope.find(store)
  const result = payload => launch(unit, payload)
  return React.useCallback(result, [event])
}

/*
fork graph and launch all effectx with that ctx
*/
async function fork({start, ctx, domain}) {
  const {scope, req, syncComplete} = cloneGraph(domain)
  launch(scope.find(start), ctx)
  syncComplete()
  await req
  return scope
}

it('works', async() => {
  /*
  real remote json documents
  GET https://api.myjson.com/bins/{user}
  */
  const users = {
    alice: '9s0p2',
    bob: 'sw17q',
    carol: 'k38w6',
  }

  const app = createDomain()
  const start = app.event()
  const indirectCall = app.event()
  const sendStats = app.effect({
    async handler(user) {
      console.log(`loading instance\n  current user: %s`, user)
      await new Promise(resolve => {
        // let bob loading longer
        setTimeout(resolve, user === 'bob' ? 500 : 100)
      })
    },
  })

  const fetchUser = app.effect({
    async handler(bin) {
      return (await fetch('https://api.myjson.com/bins/' + bin)).json()
    },
  })
  //assume that calling start() will trigger some effects
  forward({
    from: start,
    to: fetchUser,
  })

  const user = app.store('guest')
  const friends = app.store([])
  const friendsTotal = friends.map(list => list.length)

  user.on(fetchUser.done, (_, {result}) => result.name)
  friends.on(fetchUser.done, (_, {result}) => result.friends)

  sample({
    source: user,
    clock: fetchUser.done,
    target: sendStats,
  })
  sample({
    source: user,
    clock: indirectCall,
  }).watch(e => {
    console.log(`${e} indirect call`)
  })
  sendStats.done.watch(() => {
    invoke(indirectCall)
  })

  const aliceScope = await fork({
    start,
    ctx: users.alice,
    domain: app,
  })
  const [bobScope, carolScope] = await Promise.all([
    fork({
      start,
      ctx: users.bob,
      domain: app,
    }),
    fork({
      start,
      ctx: users.carol,
      domain: app,
    }),
  ])
  const User = () => <h2>{useStore(user)}</h2>
  const Friends = () => useList(friends, friend => <li>{friend}</li>)
  const Total = () => <small>Total: {useStore(friendsTotal)}</small>

  const App = ({root}) => (
    <Scope.Provider value={root}>
      <User />
      <b>Friends:</b>
      <ol>
        <Friends />
      </ol>
      <Total />
    </Scope.Provider>
  )

  clearNode(carolScope)
  await render(<App root={carolScope} />)
  expect(carolScope).toMatchInlineSnapshot(`
    Object {
      "find": [Function],
      "graphite": Object {
        "family": Object {
          "links": Array [],
          "owners": Array [],
          "type": "domain",
        },
        "meta": Object {
          "unit": "domain",
        },
        "next": Array [],
        "scope": null,
        "seq": Array [],
      },
    }
  `)
  await render(<App root={bobScope} />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h2>
      bob
    </h2>
  `)
})

/**
everything we need to clone graph section
reachable from given unit

to erase, call clearNode(clone.node)
*/
function cloneGraph(unit) {
  unit = unit.graphite || unit
  const list = flatGraph(unit)
  const clones = list.map(copyUnit)
  let resolve
  let reject
  const req = new Promise((rs, rj) => {
    resolve = rs
    reject = rj
  })
  const fxCount = {
    current: 0,
    req,
    resolve,
    reject,
    syncComplete: false,
  }
  let fxID = 0

  const tryCompleteInitPhase = () => {
    if (!fxCount.syncComplete) return
    if (fxCount.current !== 0) return
    const id = fxID
    Promise.resolve().then(() => {
      if (id !== fxID) return
      fxCount.resolve()
    })
  }

  const refs = new Map()
  const handlers = new Map()
  queryClone({op: 'fx'}, node => {
    const {scope, seq} = node
    scope.done = findClone(scope.done)
    scope.fail = findClone(scope.fail)
    scope.anyway = findClone(scope.anyway)

    forward({
      from: getNode(scope.anyway),
      to: createNode({
        meta: {fork: true},
        node: [
          step.barrier({}),
          step.run({
            fn() {
              fxCount.current -= 1
              // console.log('in flight effects: %d', fxCount.current)
              if (fxCount.current === 0) {
                fxID += 1
                tryCompleteInitPhase()
              }
            },
          }),
        ],
      }),
    })
  })
  queryItem({unit: 'store'}, item => {
    cloneRef(item.seq[1].data.store)
    cloneRef(item.seq[3].data.store)
  })
  queryItem({op: 'sample', sample: 'source'}, item => {
    cloneRef(item.scope.hasSource)
    cloneRef(item.seq[0].data.store)
  })
  queryItem({op: 'sample', sample: 'clock'}, item => {
    cloneRef(item.scope.hasSource)
    cloneRef(item.scope.sourceState)
    cloneRef(item.scope.clockState)
  })
  queryItem({op: 'sample', sample: 'store'}, item => {
    cloneRef(item.scope.state)
  })
  queryItem({op: 'combine'}, item => {
    cloneRef(item.scope.target)
    cloneRef(item.scope.isFresh)
  })

  queryClone({unit: 'store'}, node => {
    const {seq, meta} = node
    const plainState = getRef(seq[1].data.store)
    const oldState = getRef(seq[3].data.store)
    seq[1] = copyStep(seq[1])
    seq[2] = copyStep(seq[2])
    seq[3] = copyStep(seq[3])
    seq[1].data.store = plainState
    seq[2].data.store = oldState
    seq[3].data.store = oldState
    meta.plainState = plainState
    meta.wrapped = wrapStore(node)
  })
  queryClone({op: 'sample', sample: 'source'}, ({scope, seq}) => {
    scope.hasSource = getRef(scope.hasSource)
    seq[0].data.store = getRef(seq[0].data.store)
  })
  queryClone({op: 'sample', sample: 'clock'}, ({scope}) => {
    scope.hasSource = getRef(scope.hasSource)
    scope.sourceState = getRef(scope.sourceState)
    scope.clockState = getRef(scope.clockState)
  })
  queryClone({op: 'sample', sample: 'store'}, ({scope}) => {
    scope.state = getRef(scope.state)
  })
  queryClone({op: 'combine'}, ({scope}) => {
    scope.target = getRef(scope.target)
    scope.isFresh = getRef(scope.isFresh)
  })

  queryClone({op: 'map'}, ({scope}) => {
    if (scope.state) {
      scope.state = getRef(scope.state)
    }
  })
  queryClone({op: 'on'}, ({scope}) => {
    scope.state = getRef(scope.state)
  })

  queryClone({unit: 'domain'}, ({scope}) => {
    scope.history = {
      domains: new Set(),
      stores: new Set(),
      events: new Set(),
      effects: new Set(),
    }
  })
  queryClone({unit: 'effect'}, ({scope, seq}) => {
    scope.runner = findClone(scope.runner)
    seq.push(
      step.tap({
        fn() {
          fxCount.current += 1
          // console.log('in flight effects: %d', fxCount.current)
          fxID += 1
        },
      }),
    )
  })
  queryClone({op: 'watch'}, ({scope}) => {
    const handler = scope.handler
    scope.handler = data => {
      stack.push(findClone)
      try {
        handler(data)
      } finally {
        stack.pop()
      }
    }
  })

  clones.forEach(clone => {
    reallocSiblings(clone.next)
    reallocSiblings(clone.family.links)
    reallocSiblings(clone.family.owners)
  })
  return {
    syncComplete() {
      fxCount.syncComplete = true
      if (fxCount.current === 0) {
        fxID += 1
        tryCompleteInitPhase()
      }
    },
    req,
    scope: {
      find: findClone,
      graphite: createNode({
        node: [],
        meta: {unit: 'domain'},
        family: {
          type: 'domain',
          links: clones,
        },
      }),
    },
  }
  function queryItem(query, cb) {
    queryList(list, query, cb)
  }
  function queryClone(query, cb) {
    queryList(clones, query, cb)
  }
  function queryList(list, query, cb) {
    list
      .filter(item => {
        for (const key in query) {
          if (item.meta[key] !== query[key]) return false
        }
        return true
      })
      .forEach(cb)
  }
  function getRef(ref) {
    if (ref == null) throw Error('no ref')
    if (!refs.has(ref)) throw Error('no ref found')
    return refs.get(ref)
  }
  function cloneRef(ref) {
    if (ref == null) throw Error('no ref')
    if (refs.has(ref)) return
    refs.set(ref, {...ref})
  }
  function reallocSiblings(siblings) {
    siblings.forEach((node, i) => {
      if (!node.meta.fork) siblings[i] = findClone(node)
    })
  }
  function findClone(unit) {
    unit = unit.graphite || unit
    let index = list.indexOf(unit)
    if (index === -1) index = clones.indexOf(unit)
    if (index === -1) throw Error('not found')
    return clones[index]
  }
  function copyStep(step) {
    return {
      id: step.id,
      type: step.type,
      data: {...step.data},
    }
  }
  function getNode(unit) {
    return unit.graphite || unit
  }
  function copyUnit(node) {
    return createNode({
      node: [...node.seq.map(copyStep)],
      child: [...node.next],
      family: {
        type: node.family.type,
        links: [...node.family.links],
        owners: [...node.family.owners],
      },
      meta: {...node.meta},
      scope: {...node.scope},
    })
  }
  function flatGraph(unit) {
    const visited = new Set()
    traverse(unit.graphite || unit)
    function traverse(node) {
      if (visited.has(node)) return
      visited.add(node)
      node.next.forEach(traverse)
      node.family.owners.forEach(traverse)
      node.family.links.forEach(traverse)
    }
    return [...visited]
  }
  function wrapStore(node) {
    return {
      kind: 'store',
      getState: () => node.meta.plainState.current,
      updates: {
        watch: cb => createWatch(node, cb),
      },
      graphite: node,
      family: node.family,
    }
  }

  /* watchers for bare graph nodes */
  function createWatch(node, cb) {
    return forward({
      from: node,
      to: createNode({
        node: [
          step.run({
            fn(result) {
              cb(result)
            },
          }),
        ],
        family: {
          type: 'crosslink',
          owners: [],
        },
        meta: {op: 'watch'},
      }),
    })
  }
}
