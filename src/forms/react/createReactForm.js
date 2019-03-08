//@flow

import * as React from 'react'
import type {Gate} from 'effector-react'
import {createFormMount} from './createFormMount'
import {createFieldGate} from './createFieldGate'
import type {FormApi} from '../'

//eslint-disable-next-line no-unused-vars
export type ReactForm<Props, Values, Errors> = Class<
  React.Component<Props, {||}>,
> & {
  Mount: Gate<{||}>,
  // Field: React.ComponentType<{
  //   name: string,
  //   children: (
  //     //TODO: untyped field
  //     value: any,
  //     onChange: (e: SyntheticEvent<*>) => any,
  //   ) => React.Node,
  // }>,
  FieldGate: $ObjMap<Values, <V>(V) => Gate<{|value: V|}>>,
}

export function createReactForm<Values: {}, Errors: {}>(
  formApi: FormApi<Values, Errors>,
): ReactForm<
  {|children: React.Node, resetOnUnmount?: boolean|},
  Values,
  Errors,
> {
  const Mount = createFormMount(formApi)
  //const Field = createFormField(formApi)
  const FieldGate = createFieldGate(formApi)

  class Form extends React.Component<{|
    resetOnUnmount: boolean,
    children: React.Node,
  |}> {
    form = React.createRef()
    static Mount = Mount
    //static Field = Field
    static FieldGate = FieldGate
    static defaultProps = {
      resetOnUnmount: true,
    }
    render() {
      return (
        <form ref={this.form} onSubmit={formApi.handleSubmit}>
          {this.props.resetOnUnmount && <Mount />}
          {this.props.children}
        </form>
      )
    }
  }

  //$off
  return Form
}
