import {Store, Domain, Event, Effect} from 'effector'

type SpreadProps<A, B> = A & B
// $Exact<{
//   ...$Call<(empty => {||}) & (<V>(V) => $Exact<V>), A>,
//   ...$Call<(empty => {||}) & (<V>(V) => $Exact<V>), B>,
// }>

export type FormApi<Values, Errors extends {[key: string]: any}> = {
  values: Store<Values>
  errors: Store<Errors>
  isValid: Store<boolean>
  submitted: Store<boolean>
  loading: Store<boolean>
  handleSubmit: Event<void | {preventDefault(): void}>
  reset: Event<void>
  handle: {[K in keyof Values]: Event<{currentTarget: Values[K]}>}
  api: {[K in keyof Values]: Event<Values[K]>}
}

export function createFormApi<
  Form extends {[key: string]: any},
  External extends {[key: string]: any},
  Errors extends {[key: string]: any},
  Data,
  Error
>(config: {
  fields: Form
  validate?: (
    values: SpreadProps<Form, External>,
    data: {result?: Data; error?: Error},
  ) => Errors
  external?: Store<External>
  submitEvent?: Event<SpreadProps<Form, External>>
  submitEffect?: Effect<SpreadProps<Form, External>, Data, Error>
  initialValues?: Store<Form | null> | Store<Form>
  domain?: Domain
  resetOnSubmit?: boolean
}): FormApi<Form, Errors>
