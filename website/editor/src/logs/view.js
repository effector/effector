import * as React from 'react'
import {createComponent} from 'effector-react'

import {logs} from './state'
import Console from '../components/Console'
import {autoScrollLog} from '../settings/state'

export const LogsView = createComponent(
  {logs, autoScrollLog},
  ({style}, {logs, autoScrollLog}) => (
    //$todo
    <Console
      className="console"
      style={style}
      logs={logs}
      autoScroll={autoScrollLog}
    />
  ),
)
