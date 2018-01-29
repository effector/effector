# Bonfire

Bonfire is an instance of abstract reducer for the concrete place in state, relay. It wrap classic reducer and provide additional metainformation


## API

```typescript
type Bonfire<Field, State> = {
  id: ID,
  seq: number,
  value: Field,
  defaultValue: Field,
  getter: (parent: State) => Field,
  setter: (parent: State, value: Field) => State,
}
```
