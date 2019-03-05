//@flow
// export function createFormField<Values: *, Errors>(
//   formApi: FormApi<Values, Errors>
// ) {
//   const {values, handle} = formApi
//   const valuesType = formApi['@@values']
//   class Field<Key: *> extends React.Component<{
//     name: Key,
//     children: (
//       value: $ElementType<typeof valuesType, Key>,
//       onChange: (e: SyntheticEvent<*>) => any
//     ) => React.Node
//   }> {
//     values: Values
//     //$FlowFixMe
//     store = values.map<*>(state => state[this.props.name])
//     onChange = handle[this.props.name]
//     Component = createComponent<{}, _>(this.store, (_, value) => {
//       return this.props.children(value, this.onChange)
//     })
//     render() {
//       const {Component} = this
//       return <Component />
//     }
//   }
//   return Field
// }
