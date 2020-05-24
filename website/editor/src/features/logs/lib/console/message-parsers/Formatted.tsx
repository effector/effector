import * as React from 'react'
import {Root} from '../react-inspector/elements'

import {formatMessage} from '../devtools-parser'
import {ObjectTree} from './Object'

type Props = {
  data: any[]
}

export class Formatted extends React.PureComponent<Props, any> {
  render() {
    const {html, args} = formatMessage(this.props.data || [])
    return (
      <>
        <Root
          data-type="formatted"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
        <ObjectTree quoted={false} log={{method: 'log', data: args}} />
      </>
    )
  }
}
