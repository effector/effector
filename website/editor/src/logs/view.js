//@flow

import * as React from 'react'
import {logs} from './domain'
import Console from '../components/Console'
import {createComponent} from 'effector-react'

export const LogsView = createComponent(
  logs,
  ({style}: {|style: any|}, logs) => (
    <Console className="console" style={style} logs={logs} />
  ),
)
