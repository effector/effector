## Summary

This PR implements Issue #91 by adding a comprehensive visualization tool for effector stores, events, and relationships, similar to Redux DevTools.

## Features

- 📊 **Store Inspector**: View all stores and their current values in real-time
- 🎯 **Event Monitor**: Track event calls with payloads and timestamps  
- 🔗 **Effect Tracking**: Monitor effect execution (pending, done, fail) with timing
- 🕸️ **Graph Visualization**: Visual representation of relationships between units
- 🔄 **Time Travel**: State history for debugging
- 🔌 **Redux DevTools Integration**: Connect to the popular Redux DevTools browser extension

## Usage

```typescript
import { createDevtools } from 'effector-devtools';
import { connectReduxDevtools } from 'effector-devtools/redux-devtools';

// Initialize devtools
const devtools = createDevtools({
  name: 'My App',
  enabled: process.env.NODE_ENV !== 'production'
});

// Optional: Connect to Redux DevTools extension
connectReduxDevtools(devtools);

// Subscribe to updates
devtools.subscribe((update) => {
  console.log(update.type, update.data);
});
```

## API

### `createDevtools(config?)`

Creates a devtools instance.

**Config options:**
- `name?: string` - Application name
- `scope?: Scope` - Effector scope (for SSR)
- `maxHistory?: number` - Max state snapshots (default: 50)
- `enabled?: boolean` - Enable devtools

**Returns `Devtools` with methods:**
- `subscribe(callback)` - Subscribe to updates
- `unsubscribe()` - Cleanup
- `getStores()` - Get all stores
- `getEvents()` - Get event history
- `getEffects()` - Get effect history
- `getGraph()` - Get unit graph
- `getHistory()` - Get state snapshots

### `connectReduxDevtools(devtools, options?)`

Connects to Redux DevTools browser extension.

## Implementation

The devtools leverage effector's existing `inspect` and `inspectGraph` APIs:

- Uses existing, stable effector APIs
- No modifications to core effector code
- Minimal performance overhead in production
- Works with scopes, SSR, and all effector features

## Testing

Comprehensive test suite included:
- Store tracking
- Event monitoring  
- Effect lifecycle
- Graph structure
- Redux DevTools integration
- SSR support

```bash
npm test -- packages/effector-devtools
```

## Documentation

Full documentation in `packages/effector-devtools/README.md`

## Checklist

- [x] Implementation complete
- [x] Tests added
- [x] Documentation written
- [x] TypeScript types included
- [x] Follows effector coding style
- [x] Works with scopes
- [x] SSR compatible

## Closes

Closes #91
