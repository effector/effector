import {Store, Domain, Event, Effect} from 'effector'

type SpreadProps<A, B> = A & B
// $Exact<{
//   ...$Call<(empty => {||}) & (<V>(V) => $Exact<V>), A>,
//   ...$Call<(empty => {||}) & (<V>(V) => $Exact<V>), B>,
// }>

export type FormApi<Values, Errors: {[key: string]: any}> = {
  values: Store<Values>,
  errors: Store<Errors>,
  isValid: Store<boolean>,
  submitted: Store<boolean>,
  loading: Store<boolean>,
  handleSubmit: Event<void | {preventDefault(): void}>,
  reset: Event<void>,
  handle: $ObjMap<Values, <V>(V) => Event<{currentTarget: V}>>,
  api: $ObjMap<Values, <V>(V) => Event<V>>,
}

export declare function createFormApi<
  Form: {[key: string]: any},
  External: {[key: string]: any},
  Errors: {[key: string]: any},
  Data,
  Error,
>(config: {
  fields: Form,
  validate?: (
    values: SpreadProps<Form, External>,
    data: {result?: Data, error?: Error},
  ) => Errors,
  external?: Store<External>,
  submitEvent?: Event<SpreadProps<Form, External>>,
  submitEffect?: Effect<SpreadProps<Form, External>, Data, Error>,
  initialValues?: Store<?Form> | Store<Form>,
  domain?: Domain,
  resetOnSubmit?: boolean,
}): FormApi<Form, Errors>
