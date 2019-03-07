//@flow

import {createStore, createApi, type Event, type Store} from 'effector'

test('list', () => {
  const {store, api} = storeList(['init'])

  store.watch(list => console.log('list', list))

  api.enter([
    {
      offset: 0,
      entries: ['⚫️', '⚫️', '⚫️'],
    },
  ])
  api.enter([
    {
      offset: 1,
      entries: ['🔴', '🔴', '🔴'],
    },
  ])
  api.enter([
    {
      offset: 0,
      entries: ['0️⃣', 'hello'],
    },
    {
      offset: -1,
      entries: ['🔟'],
    },
  ])

  api.update([
    {
      offset: 0,
      entries: ['🔵', '🔵'],
    },
    {
      offset: -1,
      entries: ['✳️'],
    },
  ])

  api.exit([
    {
      offset: 3,
      amount: 2,
    },
    {
      offset: -1,
      amount: 1,
    },
  ])

  function storeList<T>(
    initials: Array<T>,
  ): {
    +store: Store<Array<T>>,
    +api: {
      enter: Event<
        Array<{
          +offset: number,
          +entries: Array<T>,
        }>,
      >,
      update: Event<
        Array<{
          +offset: number,
          +entries: Array<T>,
        }>,
      >,
      exit: Event<
        Array<{
          +offset: number,
          +amount: number,
        }>,
      >,
    },
  } {
    const store = createStore(initials)
    return {
      store,
      api: createApi(store, {
        enter(
          state,
          segments: Array<{
            +offset: number,
            +entries: Array<any>,
          }>,
        ) {
          if (segments.length === 0) return state
          const store = []
          segments = sortSegments(segments, state)
          for (let i = 0; i < state.length; i++) {
            const item = state[i]
            for (let j = 0; j < segments.length; j++) {
              const {entries, offset} = segments[j]
              if (offset !== i) continue
              store.push(...entries)
            }
            store.push(item)
          }
          for (let i = 0; i < segments.length; i++) {
            if (segments[i].offset >= state.length) {
              store.push(...segments[i].entries)
            }
          }
          return store
        },
        update(
          state,
          segments: Array<{
            +offset: number,
            +entries: Array<any>,
          }>,
        ) {
          if (segments.length === 0) return state
          const store = [...state]
          segments = sortSegments(segments, state)
          for (let i = 0; i < segments.length; i++) {
            const {entries, offset} = segments[i]
            for (let j = 0; j < entries.length; j++) {
              store[j + offset] = entries[j]
            }
          }
          return store
        },
        exit(
          state,
          segments: Array<{
            +offset: number,
            +amount: number,
          }>,
        ) {
          if (segments.length === 0) return state
          const store = [...state]
          const newSegments = []
          for (let j = 0; j < segments.length; j++) {
            const segment = segments[j]
            newSegments.push({
              offset: normalizeOffset(segment.offset, state),
              amount: segment.amount,
            })
          }
          segments = newSegments.sort((a, b) => a.offset - b.offset)
          const ids = Array(store.length).fill(true)
          for (let i = 0; i < segments.length; i++) {
            const {amount, offset} = segments[i]
            for (let j = 0; j < amount; j++) {
              ids[j + offset] = false
            }
          }
          return store.filter((_, i) => ids[i])
        },
      }),
    }
  }
  function normalizeOffset(offset, list) {
    if (offset < 0) offset = list.length + offset + 1
    return offset
  }
  function sortSegments<T>(
    segments: Array<{+entries: Array<T>, +offset: number}>,
    list: Array<T>,
  ) {
    return segments
      .map(({entries, offset}) => ({
        entries,
        offset: normalizeOffset(offset, list),
      }))
      .sort((a, b) => a.offset - b.offset)
  }
})
