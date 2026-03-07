# effector-devtools

Visualization tool for effector stores, events, and relationships. Similar to Redux DevTools.

## Features

- 📊 **Store Inspector**: View all stores and their current values in real-time
- 🎯 **Event Monitor**: Track event calls with payloads
- 🔗 **Effect Tracking**: Monitor effect execution (pending, done, fail)
- 🕸️ **Graph Visualization**: Visual representation of relationships between units
- 🔄 **Time Travel**: State history for debugging
- 📈 **Performance Metrics**: Track effect execution times
- 🔌 **Redux DevTools Integration**: Connect to the popular Redux DevTools browser extension

## Installation

```bash
npm install effector-devtools
```

or with yarn:

```bash
yarn add effector-devtools
```

## Prerequisites

This package requires `effector` to be installed:

```bash
npm install effector
```

## Usage

### Basic Usage

```typescript
import { createDevtools } from 'effector-devtools';

// Initialize devtools
const devtools = createDevtools();

// Your effector code
import { createStore, createEvent } from 'effector';

const $counter = createStore(0);
const increment = createEvent();
const decrement = createEvent();

$counter
  .on(increment, (count) => count + 1)
  .on(decrement, (count) => count - 1);

// Subscribe to updates
devtools.subscribe((update) => {
  console.log('Update:', update.type, update.data);
});

// Get current state
console.log('Stores:', devtools.getStores());
console.log('Events:', devtools.getEvents());
console.log('Effects:', devtools.getEffects());
console.log('Graph:', devtools.getGraph());
```

### With Configuration

```typescript
const devtools = createDevtools({
  name: 'My Application',
  scope: myScope, // For SSR applications
  maxHistory: 100, // Keep 100 state snapshots
  enabled: process.env.NODE_ENV !== 'production',
});
```

### Redux DevTools Integration

Connect to the Redux DevTools browser extension for a rich debugging experience:

```typescript
import { createDevtools } from 'effector-devtools';
import { connectReduxDevtools } from 'effector-devtools/redux-devtools';

const devtools = createDevtools({
  name: 'My Effector App',
});

// Connect to Redux DevTools extension
const cleanup = connectReduxDevtools(devtools, {
  name: 'My Effector App',
  maxAge: 50,
});

// Later, to disconnect:
cleanup();
```

### Cleanup

When your application unmounts or you no longer need the devtools:

```typescript
devtools.unsubscribe();
```

## API Reference

### `createDevtools(config?)`

Creates a devtools instance.

#### Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `string` | `'Effector App'` | Application name shown in devtools |
| `scope` | `Scope` | `undefined` | Effector scope to track (for SSR) |
| `maxHistory` | `number` | `50` | Maximum number of state snapshots to keep |
| `enabled` | `boolean` | `true` in dev, `false` in prod | Enable/disable devtools |

#### Returns

`Devtools` instance with the following methods:

##### `subscribe(callback)`

Subscribe to all state changes.

```typescript
devtools.subscribe((update) => {
  console.log(update.type); // 'store' | 'event' | 'effect' | 'declaration'
  console.log(update.data); // StoreInfo | EventInfo | EffectInfo | Declaration
  console.log(update.timestamp);
});

// Returns unsubscribe function
const unsubscribe = devtools.subscribe(callback);
unsubscribe(); // Stop listening
```

##### `unsubscribe()`

Stop tracking and clean up all resources.

```typescript
devtools.unsubscribe();
```

##### `getGraph()`

Get the current graph structure of all units.

```typescript
const graph = devtools.getGraph();
console.log(graph.nodes); // Array of GraphNode
console.log(graph.edges); // Array of GraphEdge
```

##### `getStores()`

Get all stores and their current values.

```typescript
const stores = devtools.getStores();
// Returns: StoreInfo[]
```

##### `getEvents()`

Get event call history (last 100 events).

```typescript
const events = devtools.getEvents();
// Returns: EventInfo[]
```

##### `getEffects()`

Get effect execution history (last 20 effects).

```typescript
const effects = devtools.getEffects();
// Returns: EffectInfo[]
```

##### `getHistory()`

Get state history for time travel debugging.

```typescript
const history = devtools.getHistory();
// Returns: StateSnapshot[]
```

##### `restoreSnapshot(snapshot)`

⚠️ **Note**: This method requires manual implementation with effector's fork API. It's provided as a placeholder for future time-travel functionality.

```typescript
devtools.restoreSnapshot(snapshot);
```

### `connectReduxDevtools(devtools, options?)`

Connects effector devtools to the Redux DevTools browser extension.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `devtools` | `Devtools` | Devtools instance |
| `options.name` | `string` | Name shown in Redux DevTools |
| `options.maxAge` | `number` | Maximum number of actions to keep |

#### Returns

A cleanup function that disconnects from Redux DevTools.

```typescript
const cleanup = connectReduxDevtools(devtools, {
  name: 'My App',
  maxAge: 50,
});

// Later:
cleanup();
```

## Types

### StoreInfo

```typescript
interface StoreInfo {
  id: string;           // Unique identifier
  sid: string | null;   // Stable identifier
  name: string;         // Store name
  value: unknown;       // Current value
  defaultValue: unknown; // Initial value
  derived: boolean;     // Is derived store
  loc?: {               // Source location (if available)
    file: string;
    line: number;
    column: number;
  };
}
```

### EventInfo

```typescript
interface EventInfo {
  id: string;           // Unique identifier
  sid: string | null;   // Stable identifier
  name: string;         // Event name
  payload: unknown;     // Event payload
  timestamp: number;    // When event was called
  loc?: {               // Source location (if available)
    file: string;
    line: number;
    column: number;
  };
}
```

### EffectInfo

```typescript
interface EffectInfo {
  id: string;           // Unique identifier
  sid: string | null;   // Stable identifier
  name: string;         // Effect name
  status: 'pending' | 'done' | 'fail'; // Execution status
  params: unknown;      // Effect parameters
  result?: unknown;     // Return value (done)
  error?: unknown;      // Error (fail)
  timestamp: number;    // When effect started
  duration?: number;    // Execution time in ms
}
```

### GraphStructure

```typescript
interface GraphStructure {
  nodes: GraphNode[];   // All units (stores, events, effects)
  edges: GraphEdge[];   // Relationships between units
}

interface GraphNode {
  id: string;
  type: 'store' | 'event' | 'effect' | 'domain';
  name: string;
  sid: string | null;
  derived: boolean;
  loc?: { file: string; line: number; column: number };
  meta: Record<string, unknown>;
}

interface GraphEdge {
  source: string;       // Source node ID
  target: string;       // Target node ID
  type: 'on' | 'map' | 'sample' | 'forward' | 'watch' | 'child';
}
```

## Server-Side Rendering (SSR)

For SSR applications, pass the scope to the devtools:

```typescript
import { fork, allSettled } from 'effector';
import { createDevtools } from 'effector-devtools';

const scope = fork();

const devtools = createDevtools({
  scope,
  name: 'SSR App',
});

// Track scoped operations
await allSettled(someEvent, { scope });

// Get stores from scope
const stores = devtools.getStores();
```

## React Integration Example

```typescript
import { useEffect } from 'react';
import { createDevtools, connectReduxDevtools } from 'effector-devtools';
import { useUnit } from 'effector-react';

// Initialize once
const devtools = createDevtools();

function App() {
  useEffect(() => {
    // Connect to Redux DevTools in development
    if (process.env.NODE_ENV === 'development') {
      const cleanup = connectReduxDevtools(devtools, {
        name: 'My React App',
      });

      return () => {
        cleanup();
      };
    }
  }, []);

  // Your app logic...
  return <div>{/* ... */}</div>;
}
```

## Vue Integration Example

```typescript
import { onMounted, onUnmounted } from 'vue';
import { createDevtools, connectReduxDevtools } from 'effector-devtools';

const devtools = createDevtools();

export default {
  setup() {
    onMounted(() => {
      if (process.env.NODE_ENV === 'development') {
        const cleanup = connectReduxDevtools(devtools);
        onUnmounted(cleanup);
      }
    });

    // Your component logic...
  },
};
```

## Browser Support

- Chrome/Edge (with Redux DevTools extension)
- Firefox (with Redux DevTools extension)
- Safari (with Redux DevTools extension)
- Node.js (basic tracking without Redux DevTools)

## License

MIT © Zero Bias

## Contributing

Contributions are welcome! Please read the [Contributing Guide](../../CONTRIBUTING.md) for details.

## Related Packages

- [effector](https://www.npmjs.com/package/effector) - Business logic with ease
- [effector-react](https://www.npmjs.com/package/effector-react) - React bindings
- [effector-vue](https://www.npmjs.com/package/effector-vue) - Vue bindings
- [effector-solid](https://www.npmjs.com/package/effector-solid) - SolidJS bindings
