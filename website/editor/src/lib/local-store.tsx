import {Store, createStore} from 'effector'
import throttle from 'lodash.throttle'

interface Local {
  prevent: boolean
  unsavedState: any | undefined
  storageKey: string
  save(key: string, value: any): void
}

let leavePagePrevented = false
const stores: Array<Store<any> & Local> = []

export function createLocalStore<State>(
  name: string,
  initialState: State,
  options: {interval?: number; prevent?: boolean} = {},
): Store<State> {
  const {interval = 250, prevent = false} = options

  if (!leavePagePrevented) {
    window.addEventListener('beforeunload', preventLeavePage)
    leavePagePrevented = true
  }

  const $store: Store<State> & Partial<Local> = createStore(initialState, {
    name: `Local(${name})`,
  })

  // @ts-ignore
  $store.setState(load(name))
  $store.storageKey = name
  $store.prevent = prevent
  $store.save = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      $store.unsavedState = undefined
    } catch (error) {
      console.error(`Can't save store 'Local(${name})' to localStorage.`)
    }
  }

  const throttledSave = throttle($store.save, interval)

  stores.push($store as Store<State> & Local)

  $store.watch(state => {
    $store.unsavedState = state
    throttledSave(name, state)
  })

  return $store

  function load(key: string): State {
    try {
      const result: string | null = localStorage.getItem(key)
      return result === null || result === undefined
        ? initialState
        : JSON.parse(result)
    } catch (error) {
      console.error(`Can't load store 'Local(${name})' from localStorage.`)
    }
    return initialState
  }
}

function preventLeavePage(event: BeforeUnloadEvent) {
  event.preventDefault()

  if (stores.some(store => store.prevent && store.unsavedState !== undefined)) {
    event.returnValue = 'There is pending work. Sure you want to leave?'
  }

  setTimeout(() => {
    stores.forEach(store => {
      if (store.unsavedState !== undefined) {
        store.save(store.storageKey, store.unsavedState)
      }
    })
  })

  return event.returnValue
}
