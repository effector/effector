//@flow

import * as React from 'react'
import {createComponent} from 'effector-react'
import {graphiteCode} from './domain'
import Panel from '../components/CodeMirrorPanel'

const jsonRef = React.createRef()

export const GraphiteView = createComponent<{style?: any, ...}, string>(
  graphiteCode,
  ({style}, graphite) => (
    <Panel
      className="results graphite"
      style={style}
      readOnly={true}
      lint={null}
      passive
      lineWrapping={false}
      ref={jsonRef}
      value={graphite}
      mode="application/json"
    />
  ),
)
