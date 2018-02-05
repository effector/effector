# Carrier

Event wrapper, which deliver events to redux store

```typescript
type Carrier<E> = {
  id: ID,
  type: string,
  payload: E,
  plain(): {type: string, payload: E},
}
```


