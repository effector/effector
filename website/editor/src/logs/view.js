//@flow

import * as React from 'react'
import {createComponent} from 'effector-react'

import {logs} from './state'
import Console from '../components/Console'

export const LogsView = createComponent<
  {|
    style?: any,
  |},
  Array<{|
    data: Array<any>,
    id: number,
    method: *,
  |}>,
>(logs, ({style}, logs) => (
  //$todo
  <Console className="console" style={style} logs={logs} />
))
