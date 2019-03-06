//@flow

import * as React from 'react'
import type {FormApi} from '../'
import {useStore} from 'effector-react'

export function createFormField<Values: {[key: string]: any}>(
  formApi: FormApi<Values, any>,
): {
  <Key: $Keys<Values>>(props: {|
    name: Key,
    children: (
      value: $ElementType<Values, Key>,
      onChange: (e: any) => any,
    ) => any,
  |}): React.Node,
} {
  const {values, handle} = formApi
  const Field = ({
    name,
    children,
  }: {
    name: any,
    children: (value: any, onChange: (e: any) => any) => React.Node,
  }) => {
    const value = useStore(values.map(state => state[name]))
    return children(value, handle[name])
  }
  return Field
}
