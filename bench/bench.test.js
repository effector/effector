'use strict'
//@flow

const {test, beforeAll, afterAll} = require('./benchmark')

beforeAll(() => {
 const {Record, Repeat} = require('immutable')
 //$off
 const {createEvent, createStore} = require('../npm/effector/effector.cjs.js')
 //$off
 const {default: produce, setAutoFreeze, setUseProxies} = require('immer')
})

afterAll(results => {
 const {printResults} = require('./printResults')
 printResults(results)
})

// describe('performance', () => {
// beforeEach(() => {
//  draft = cloneDeep(baseState)
//  memoryBefore = process.memoryUsage()
// })
// afterEach(() => {
//  const memoryAfter = process.memoryUsage()
//  console.log(memoryBefore)
//  console.log(memoryAfter)
// })
const MAX = 100000
const MODIFY_FACTOR = 0.1

function getItem(any, i) {
 return {
  todo: `todo_${i}`,
  done: false,
  someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
 }
}
function generateDraft() {
 const draft = []
 for (let i = 0; i < MAX; i++) {
  draft.push(getItem(undefined, i))
 }
 return draft
}
// Produce the frozen bazeState
// frozenBazeState = deepFreeze(cloneDeep(baseState))

// generate immutalbeJS base state

test('immutableJS', prepared => {
 const {Record, Repeat} = require('immutable')
 const todoRecord = Record({
  todo: '',
  done: false,
  someThingCompletelyIrrelevant: [],
 })
 const draft = Repeat(undefined, MAX)
  .map((_, i) => todoRecord(getItem(_, i)))
  .toList()
 prepared()
 const result = draft.withMutations(state => {
  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
   state.setIn([i, 'done'], true)
  }
 })
 return result
})

//  test('just mutate, freeze', () => {
//   for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//    draft[i].done = true
//   }
//   deepFreeze(draft)
//  })

// test('deepclone, then mutate', () => {
//  const draft = cloneDeep(baseState)
//  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//   draft[i].done = true
//  }
// })

// test('deepclone, then mutate, then freeze', () => {
//  const draft = cloneDeep(baseState)
//  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//   draft[i].done = true
//  }
//  deepFreeze(draft)
// })

// test('handcrafted reducer (no freeze)', () => {
//  const nextState = [
//   ...baseState.slice(0, MAX * MODIFY_FACTOR).map(todo => ({
//    ...todo,
//    done: true,
//   })),
//   ...baseState.slice(MAX * MODIFY_FACTOR),
//  ]
// })

// test('handcrafted reducer (with freeze)', () => {
//  const nextState = freeze([
//   ...baseState.slice(0, MAX * MODIFY_FACTOR).map(todo =>
//    freeze({
//     ...todo,
//     done: true,
//    }),
//   ),
//   ...baseState.slice(MAX * MODIFY_FACTOR),
//  ])
// })

// test('naive handcrafted reducer (without freeze)', () => {
//  const nextState = baseState.map((todo, index) => {
//   if (index < MAX * MODIFY_FACTOR)
//    return {
//     ...todo,
//     done: true,
//    }
//   else return todo
//  })
// })

// test('naive handcrafted reducer (with freeze)', () => {
//  const nextState = deepFreeze(
//   baseState.map((todo, index) => {
//    if (index < MAX * MODIFY_FACTOR)
//     return {
//      ...todo,
//      done: true,
//     }
//    else return todo
//   }),
//  )
// })

// test('immutableJS + toJS', () => {
//  const state = immutableJsBaseState
//   .withMutations(state => {
//    for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//     state.setIn([i, 'done'], true)
//    }
//   })
//   .toJS()
// })

test('immer (proxy) - without autofreeze', prepared => {
 //$off
 const {default: produce, setAutoFreeze, setUseProxies} = require('immer')
 const draft = generateDraft()
 prepared()

 setUseProxies(true)
 setAutoFreeze(false)
 produce(draft, draft => {
  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
   draft[i].done = true
  }
 })
 return draft
})

test('effector (mutable inner update)', prepared => {
 //$off
 const {createEvent, createStore} = require('../npm/effector/effector.cjs.js')
 const updateEvent = createEvent('update')
 const effectorStore = createStore(generateDraft()).on(updateEvent, draft => {
  const newDraft = draft.concat([])
  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
   newDraft[i].done = true
  }
  return newDraft
 })
 prepared()
 updateEvent()
 return effectorStore.getState()
})

test('effector (immutable inner update)', prepared => {
 //$off
 const {createEvent, createStore} = require('../npm/effector/effector.cjs.js')
 const updateEvent = createEvent('update')
 const effectorStore = createStore(generateDraft()).on(updateEvent, draft => {
  const newDraft = draft.concat([])
  for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
   newDraft[i] = Object.assign({}, newDraft[i], {done: true})
  }
  return newDraft
 })
 prepared()
 updateEvent()
 return effectorStore.getState()
})

// test('immer (proxy) - with autofreeze', () => {
//  setUseProxies(true)
//  setAutoFreeze(true)
//  produce(frozenBazeState, draft => {
//   for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//    draft[i].done = true
//   }
//  })
// })

// test('immer (es5) - without autofreeze', () => {
//  setUseProxies(false)
//  setAutoFreeze(false)
//  produce(baseState, draft => {
//   for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//    draft[i].done = true
//   }
//  })
// })

// test('immer (es5) - with autofreeze', () => {
//  setUseProxies(false)
//  setAutoFreeze(true)
//  produce(frozenBazeState, draft => {
//   for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
//    draft[i].done = true
//   }
//  })
// })
// })

test('just mutate', prepared => {
 const draft = generateDraft()
 prepared()
 for (let i = 0; i < MAX * MODIFY_FACTOR; i++) {
  draft[i].done = true
 }
 return draft
})
