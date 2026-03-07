import type {Devtools, StoreInfo, EventInfo, EffectInfo} from './devtools'
import type {StateSnapshot} from './devtools'

/**
 * Redux DevTools extension interface
 */
interface ReduxDevToolsExtension {
  connect(options?: ReduxDevToolsOptions): ReduxDevToolsConnection
}

interface ReduxDevToolsOptions {
  name?: string
  features?: {
    pause?: boolean
    lock?: boolean
    persist?: boolean
    export?: boolean
    import?: boolean
    jump?: boolean
    skip?: boolean
    reorder?: boolean
    dispatch?: boolean
    test?: boolean
  }
  maxAge?: number
  trace?: boolean
  traceLimit?: number
}

interface ReduxDevToolsConnection {
  subscribe(listener: (message: ReduxDevToolsMessage) => void): () => void
  unsubscribe(): void
  send(action: Record<string, unknown>, state: unknown): void
  init(state: unknown): void
  error(message: string): void
}

type ReduxDevToolsMessage =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'DISPATCH'; payload: { type: string; [key: string]: unknown } }
  | { type: 'ACTION'; payload: string }

/**
 * Connect effector devtools to Redux DevTools extension
 */
export function connectReduxDevtools(
  devtools: Devtools,
  options: { name?: string; maxAge?: number } = {}
): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__ as
    | ReduxDevToolsExtension
    | undefined

  if (!extension) {
    console.warn(
      '[effector-devtools] Redux DevTools extension not found. ' +
        'Please install it from https://github.com/reduxjs/redux-devtools'
    )
    return () => {}
  }

  const connection = extension.connect({
    name: options.name || 'Effector',
    features: {
      pause: true,
      lock: true,
      persist: true,
      export: true,
      import: 'custom',
      jump: true,
      skip: true,
      reorder: true,
      dispatch: true,
      test: true,
    },
    maxAge: options.maxAge || 50,
    trace: true,
    traceLimit: 25,
  })

  // Track current state
  let currentState: Record<string, unknown> = {}

  // Subscribe to devtools updates
  const unsubscribeDevtools = devtools.subscribe((update) => {
    if (update.type === 'store') {
      const store = update.data as StoreInfo
      currentState[store.name] = store.value

      connection.send(
        {
          type: `[store] ${store.name}`,
          payload: store.value,
        },
        currentState
      )
    }

    if (update.type === 'event') {
      const event = update.data as EventInfo
      connection.send(
        {
          type: `[event] ${event.name}`,
          payload: event.payload,
        },
        currentState
      )
    }

    if (update.type === 'effect') {
      const effect = update.data as EffectInfo
      const actionType =
        effect.status === 'pending'
          ? `[effect] ${effect.name} called`
          : effect.status === 'done'
          ? `[effect] ${effect.name} done`
          : `[effect] ${effect.name} fail`

      connection.send(
        {
          type: actionType,
          payload: {
            params: effect.params,
            result: effect.result,
            error: effect.error,
            duration: effect.duration,
          },
        },
        currentState
      )
    }
  })

  // Subscribe to Redux DevTools messages
  const unsubscribeRedux = connection.subscribe((message) => {
    switch (message.type) {
      case 'START':
        // Initialize with current stores
        currentState = {}
        devtools.getStores().forEach((store) => {
          currentState[store.name] = store.value
        })
        connection.init(currentState)
        break

      case 'STOP':
        // Clean up if needed
        break

      case 'DISPATCH':
        // Handle time travel and other actions
        handleDispatch(message.payload)
        break

      case 'ACTION':
        // Handle custom actions
        try {
          const action = JSON.parse(message.payload)
          console.log('[effector-devtools] Custom action:', action)
        } catch {
          console.warn(
            '[effector-devtools] Failed to parse action:',
            message.payload
          )
        }
        break
    }
  })

  function handleDispatch(payload: { type: string; [key: string]: unknown }) {
    switch (payload.type) {
      case 'JUMP_TO_STATE':
      case 'JUMP_TO_ACTION':
        // Time travel - restore state
        const state = payload.state
          ? JSON.parse(payload.state as string)
          : null
        if (state) {
          currentState = state
          // Note: Actual state restoration would require fork API integration
          console.log('[effector-devtools] Time travel to state:', state)
        }
        break

      case 'RESET':
        currentState = {}
        connection.init(currentState)
        break

      case 'COMMIT':
        // Save current state as initial
        connection.init(currentState)
        break

      case 'ROLLBACK':
        // Rollback to last committed state
        break

      case 'IMPORT_STATE':
        // Import state from file
        const nextLiftedState = payload.nextLiftedState as {
          computedStates: { state: Record<string, unknown> }[]
        }
        if (nextLiftedState?.computedStates?.length > 0) {
          currentState =
            nextLiftedState.computedStates[
              nextLiftedState.computedStates.length - 1
            ].state
        }
        break
    }
  }

  // Initialize
  connection.init(currentState)

  // Return cleanup function
  return () => {
    unsubscribeDevtools()
    unsubscribeRedux()
    connection.unsubscribe()
  }
}
