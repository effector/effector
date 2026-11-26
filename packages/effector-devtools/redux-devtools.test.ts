import {connectReduxDevtools} from './redux-devtools'
import type {Devtools} from './devtools'

describe('connectReduxDevtools', () => {
  const mockConnection = {
    subscribe: jest.fn(() => jest.fn()),
    unsubscribe: jest.fn(),
    send: jest.fn(),
    init: jest.fn(),
    error: jest.fn(),
  }

  const mockExtension = {
    connect: jest.fn(() => mockConnection),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(window as any).__REDUX_DEVTOOLS_EXTENSION__ = mockExtension
  })

  afterEach(() => {
    delete (window as any).__REDUX_DEVTOOLS_EXTENSION__
  })

  test('should connect to Redux DevTools extension', () => {
    const mockDevtools = {
      subscribe: jest.fn(() => jest.fn()),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    const cleanup = connectReduxDevtools(mockDevtools, { name: 'Test App' })

    expect(mockExtension.connect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test App',
        features: expect.any(Object),
      })
    )

    expect(mockConnection.init).toHaveBeenCalled()

    cleanup()
  })

  test('should warn if extension not found', () => {
    delete (window as any).__REDUX_DEVTOOLS_EXTENSION__
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    const mockDevtools = {
      subscribe: jest.fn(() => jest.fn()),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    const cleanup = connectReduxDevtools(mockDevtools)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Redux DevTools extension not found')
    )
    expect(typeof cleanup).toBe('function')

    consoleSpy.mockRestore()
  })

  test('should send store updates to Redux DevTools', () => {
    const subscribers: Array<(update: any) => void> = []
    const mockDevtools = {
      subscribe: jest.fn((cb) => {
        subscribers.push(cb)
        return jest.fn()
      }),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    connectReduxDevtools(mockDevtools)

    // Simulate store update
    const storeUpdate = {
      type: 'store',
      data: {
        id: 'test-id',
        sid: 'test-sid',
        name: '$testStore',
        value: { count: 42 },
        defaultValue: {},
        derived: false,
      },
      timestamp: Date.now(),
    }

    subscribers.forEach((cb) => cb(storeUpdate))

    expect(mockConnection.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[store] $testStore',
        payload: { count: 42 },
      }),
      expect.objectContaining({
        $testStore: { count: 42 },
      })
    )
  })

  test('should send event calls to Redux DevTools', () => {
    const subscribers: Array<(update: any) => void> = []
    const mockDevtools = {
      subscribe: jest.fn((cb) => {
        subscribers.push(cb)
        return jest.fn()
      }),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    connectReduxDevtools(mockDevtools)

    // Simulate event call
    const eventUpdate = {
      type: 'event',
      data: {
        id: 'event-id',
        sid: 'event-sid',
        name: 'testEvent',
        payload: { data: 'test' },
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    }

    subscribers.forEach((cb) => cb(eventUpdate))

    expect(mockConnection.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[event] testEvent',
        payload: { data: 'test' },
      }),
      expect.any(Object)
    )
  })

  test('should send effect updates to Redux DevTools', () => {
    const subscribers: Array<(update: any) => void> = []
    const mockDevtools = {
      subscribe: jest.fn((cb) => {
        subscribers.push(cb)
        return jest.fn()
      }),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    connectReduxDevtools(mockDevtools)

    // Simulate effect pending
    const effectPending = {
      type: 'effect',
      data: {
        id: 'fx-id',
        sid: 'fx-sid',
        name: 'testEffect',
        status: 'pending' as const,
        params: { id: 1 },
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    }

    subscribers.forEach((cb) => cb(effectPending))

    expect(mockConnection.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[effect] testEffect called',
        payload: expect.objectContaining({
          params: { id: 1 },
        }),
      }),
      expect.any(Object)
    )

    // Simulate effect done
    const effectDone = {
      type: 'effect',
      data: {
        id: 'fx-id',
        sid: 'fx-sid',
        name: 'testEffect',
        status: 'done' as const,
        params: { id: 1 },
        result: { success: true },
        duration: 100,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    }

    subscribers.forEach((cb) => cb(effectDone))

    expect(mockConnection.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[effect] testEffect done',
        payload: expect.objectContaining({
          params: { id: 1 },
          result: { success: true },
          duration: 100,
        }),
      }),
      expect.any(Object)
    )
  })

  test('should handle Redux DevTools dispatch messages', () => {
    const reduxSubscribers: Array<(message: any) => void> = []
    const mockConnectionWithDispatch = {
      ...mockConnection,
      subscribe: jest.fn((cb) => {
        reduxSubscribers.push(cb)
        return jest.fn()
      }),
    }
    const mockExtensionWithDispatch = {
      connect: jest.fn(() => mockConnectionWithDispatch),
    }
    ;(window as any).__REDUX_DEVTOOLS_EXTENSION__ = mockExtensionWithDispatch

    const mockDevtools = {
      subscribe: jest.fn(() => jest.fn()),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    connectReduxDevtools(mockDevtools)

    // Simulate START message
    reduxSubscribers.forEach((cb) => cb({ type: 'START' }))

    expect(mockDevtools.getStores).toHaveBeenCalled()

    // Simulate JUMP_TO_STATE message
    reduxSubscribers.forEach((cb) =>
      cb({
        type: 'DISPATCH',
        payload: {
          type: 'JUMP_TO_STATE',
          state: JSON.stringify({ count: 10 }),
        },
      })
    )

    // Verify time travel was triggered
    expect(mockConnection.send).toHaveBeenCalled()
  })

  test('should handle server-side rendering', () => {
    const originalWindow = global.window
    // @ts-ignore
    delete global.window

    const mockDevtools = {
      subscribe: jest.fn(() => jest.fn()),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    const cleanup = connectReduxDevtools(mockDevtools)

    expect(typeof cleanup).toBe('function')
    expect(mockExtension.connect).not.toHaveBeenCalled()

    // Restore window
    global.window = originalWindow
  })

  test('should clean up on unmount', () => {
    const unsubscribeDevtools = jest.fn()
    const unsubscribeRedux = jest.fn()

    const mockDevtools = {
      subscribe: jest.fn(() => unsubscribeDevtools),
      unsubscribe: jest.fn(),
      getGraph: jest.fn(() => ({ nodes: [], edges: [] })),
      getStores: jest.fn(() => []),
      getEvents: jest.fn(() => []),
      getEffects: jest.fn(() => []),
      getHistory: jest.fn(() => []),
      restoreSnapshot: jest.fn(),
    } as unknown as Devtools

    const mockConn = {
      ...mockConnection,
      subscribe: jest.fn(() => unsubscribeRedux),
    }
    const mockExt = {
      connect: jest.fn(() => mockConn),
    }
    ;(window as any).__REDUX_DEVTOOLS_EXTENSION__ = mockExt

    const cleanup = connectReduxDevtools(mockDevtools)

    cleanup()

    expect(unsubscribeDevtools).toHaveBeenCalled()
    expect(mockConn.unsubscribe).toHaveBeenCalled()
  })
})
