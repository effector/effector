import React from 'react'
import {useStore} from 'effector-react'

import {Console, Styles} from '../lib/console'
import {$logs, $autoScrollLog} from '../model'

interface Logs {
  style?: Styles
}

export const LogsPanel: React.FC<Logs> = ({style}) => {
  const logs = useStore($logs)
  const autoScroll = useStore($autoScrollLog)

  return (
    <Console
      className="console"
      style={style}
      logs={logs}
      autoScroll={autoScroll}
    />
  )
}
