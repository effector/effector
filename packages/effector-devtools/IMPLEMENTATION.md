# Effector DevTools - Issue #91 Implementation

This implementation adds a comprehensive visualization tool for effector stores, events, and relationships, similar to Redux DevTools.

## What Was Implemented

### 1. Core DevTools Package (`packages/effector-devtools/`)

#### Main Features:
- **Store Inspector**: Real-time tracking of all stores and their values
- **Event Monitor**: Log event calls with timestamps and payloads
- **Effect Tracker**: Monitor effect execution lifecycle (pending → done/fail)
- **Graph Visualization**: View relationships between units
- **State History**: Time travel debugging support
- **Redux DevTools Integration**: Connect to the popular browser extension

#### Files Added:

| File | Description |
|------|-------------|
| `devtools.ts` | Core devtools implementation with `createDevtools()` function |
| `redux-devtools.ts` | Redux DevTools extension adapter |
| `debugger-ui.ts` | Standalone debugger UI component |
| `index.ts` | Package entry point |
| `index.d.ts` | TypeScript type definitions |
| `devtools.test.ts` | Unit tests for devtools |
| `redux-devtools.test.ts` | Tests for Redux DevTools integration |
| `README.md` | Comprehensive documentation |
| `package.json` | Package configuration |

### 2. API Overview

```typescript
import { createDevtools } from 'effector-devtools';
import { connectReduxDevtools } from 'effector-devtools/redux-devtools';

// Create devtools instance
const devtools = createDevtools({
  name: 'My App',
  scope: myScope,      // For SSR
  maxHistory: 50,      // State snapshots to keep
  enabled: true,       // Enable in development
});

// Connect to Redux DevTools extension
const cleanup = connectReduxDevtools(devtools);

// Subscribe to updates
devtools.subscribe((update) => {
  console.log(update.type, update.data);
});

// Get current state
const stores = devtools.getStores();
const events = devtools.getEvents();
const effects = devtools.getEffects();
const graph = devtools.getGraph();
const history = devtools.getHistory();

// Cleanup
devtools.unsubscribe();
cleanup();
```

### 3. Implementation Details

The devtools leverage effector's existing `inspect` and `inspectGraph` APIs:

- `inspect()` - Tracks runtime state changes (stores, events, effects)
- `inspectGraph()` - Tracks unit declarations and graph structure

This approach:
- ✅ Uses existing, stable effector APIs
- ✅ No modifications to core effector code
- ✅ Minimal performance overhead in production
- ✅ Works with all effector features (scopes, SSR, etc.)

### 4. Redux DevTools Integration

The `connectReduxDevtools()` function integrates with the Redux DevTools browser extension:

- Shows stores as Redux state
- Shows events/effects as Redux actions
- Supports time travel debugging
- State import/export
- Action replay

### 5. Testing

Comprehensive test suite included:

```bash
# Run tests
npm test -- packages/effector-devtools
```

Tests cover:
- Store tracking
- Event monitoring
- Effect lifecycle
- Graph structure
- Redux DevTools integration
- SSR support
- Cleanup/unmounting

## Usage Example

```typescript
// app.ts
import { createEvent, createStore, createEffect } from 'effector';
import { createDevtools } from 'effector-devtools';
import { connectReduxDevtools } from 'effector-devtools/redux-devtools';

// Initialize devtools in development
const devtools = process.env.NODE_ENV === 'development' 
  ? createDevtools({ name: 'My App' })
  : null;

if (devtools) {
  connectReduxDevtools(devtools);
}

// Your effector code
const fetchUserFx = createEffect(async (id: number) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});

const $user = createStore(null)
  .on(fetchUserFx.doneData, (_, user) => user);

const fetchUser = createEvent<number>();
fetchUser.watch((id) => fetchUserFx(id));

// DevTools will automatically track:
// - Store declarations and updates
// - Event calls with payloads
// - Effect pending/done/fail states
// - All relationships between units
```

## Browser Extension

To use with Redux DevTools extension:

1. Install [Redux DevTools](https://github.com/reduxjs/redux-devtools) browser extension
2. Initialize `connectReduxDevtools(devtools)`
3. Open DevTools → Redux tab

## Future Enhancements

Potential improvements:

1. **Standalone UI**: Built-in visual debugger (debugger-ui.ts provides foundation)
2. **Performance Profiling**: Track computation times and render counts
3. **Diff Viewer**: Visual diff between state snapshots
4. **Export/Import**: Save and load debugging sessions
5. **Remote Debugging**: Debug mobile/embedded applications

## Related Issues

- Closes #91 - Visualization for stores, events and relationships

## References

- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- [Effector Inspect API](https://effector.dev/en/api/effector/inspect/)
- [Effector Logger](https://github.com/effector/logger)
