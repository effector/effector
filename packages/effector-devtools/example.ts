/**
 * Effector DevTools - Usage Example
 * 
 * This example demonstrates how to use effector-devtools
 * to visualize stores, events, and relationships.
 */

import { createEvent, createStore, createEffect, sample, combine } from 'effector';
import { createDevtools, connectReduxDevtools } from 'effector-devtools';

// ============================================
// Initialize DevTools
// ============================================

const devtools = createDevtools({
  name: 'Todo App',
  enabled: process.env.NODE_ENV !== 'production',
});

// Optional: Connect to Redux DevTools browser extension
if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  connectReduxDevtools(devtools, {
    name: 'Todo App',
    maxAge: 50,
  });
}

// ============================================
// Domain Model
// ============================================

// Events
const addTodo = createEvent<string>();
const toggleTodo = createEvent<number>();
const removeTodo = createEvent<number>();
const filterChanged = createEvent<'all' | 'active' | 'completed'>();

// Effects
const fetchTodosFx = createEffect(async () => {
  const response = await fetch('/api/todos');
  return response.json();
});

const saveTodoFx = createEffect(async (text: string) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  return response.json();
});

// Stores
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const $todos = createStore<Todo[]>([]);
const $filter = createStore<'all' | 'active' | 'completed'>('all');

// Derived stores
const $filteredTodos = combine($todos, $filter, (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
});

const $activeCount = $todos.map((todos) => todos.filter((t) => !t.completed).length);
const $completedCount = $todos.map((todos) => todos.filter((t) => t.completed).length);

// ============================================
// Business Logic
// ============================================

let nextId = 1;

$todos
  .on(addTodo, (todos, text) => [
    ...todos,
    { id: nextId++, text, completed: false },
  ])
  .on(toggleTodo, (todos, id) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  )
  .on(removeTodo, (todos, id) => todos.filter((todo) => todo.id !== id))
  .on(fetchTodosFx.doneData, (_, todos) => todos)
  .on(saveTodoFx.doneData, (todos, todo) => [...todos, todo]);

$filter.on(filterChanged, (_, filter) => filter);

// Sample: Save todo when added
sample({
  source: addTodo,
  target: saveTodoFx,
});

// ============================================
// DevTools Subscription Example
// ============================================

// Subscribe to all updates
const unsubscribe = devtools.subscribe((update) => {
  console.group(`[DevTools] ${update.type.toUpperCase()}`);
  console.log('Timestamp:', new Date(update.timestamp).toLocaleTimeString());
  console.log('Data:', update.data);
  console.groupEnd();
});

// ============================================
// Query DevTools State
// ============================================

// Get all stores
console.log('Stores:', devtools.getStores());

// Get all events
console.log('Events:', devtools.getEvents());

// Get all effects
console.log('Effects:', devtools.getEffects());

// Get graph structure
console.log('Graph:', devtools.getGraph());

// Get state history
console.log('History:', devtools.getHistory());

// ============================================
// Example Usage
// ============================================

async function runExample() {
  console.log('=== Todo App Example ===\n');

  // Fetch initial todos
  console.log('Fetching todos...');
  await fetchTodosFx();

  // Add some todos
  console.log('Adding todos...');
  addTodo('Learn Effector');
  addTodo('Build an App');
  addTodo('Deploy to Production');

  // Wait for effects to complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Toggle a todo
  console.log('Toggling todo...');
  toggleTodo(1);

  // Change filter
  console.log('Changing filter...');
  filterChanged('active');

  // Remove a todo
  console.log('Removing todo...');
  removeTodo(2);

  // Query final state
  console.log('\n=== Final State ===');
  console.log('Todos:', $todos.getState());
  console.log('Filter:', $filter.getState());
  console.log('Filtered Todos:', $filteredTodos.getState());
  console.log('Active Count:', $activeCount.getState());
  console.log('Completed Count:', $completedCount.getState());

  // Query devtools state
  console.log('\n=== DevTools State ===');
  console.log('Tracked Stores:', devtools.getStores().length);
  console.log('Tracked Events:', devtools.getEvents().length);
  console.log('Tracked Effects:', devtools.getEffects().length);
  console.log('Graph Nodes:', devtools.getGraph().nodes.length);
  console.log('State History:', devtools.getHistory().length);

  // Cleanup
  unsubscribe();
  devtools.unsubscribe();
}

// Run example if this file is executed directly
if (require.main === module) {
  runExample().catch(console.error);
}

export {
  addTodo,
  toggleTodo,
  removeTodo,
  filterChanged,
  fetchTodosFx,
  saveTodoFx,
  $todos,
  $filter,
  $filteredTodos,
  $activeCount,
  $completedCount,
  devtools,
};
