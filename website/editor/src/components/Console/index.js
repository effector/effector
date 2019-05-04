//@flow

import * as React from 'react'

import {Root} from './elements'
import Message from './Message'
import type {Props} from './index.h'

class Console extends React.Component<Props, any> {
  // theme = () => ({
  //   variant: this.props.variant || 'light',
  //   styles: {
  //     ...Styles(this.props),
  //     ...this.props.styles,
  //   },
  // })

  render() {
    const {filter = [], logs = [], ...props} = this.props

    return (
      <Root {...props}>
        {logs.map((log, i) => {
          // If the filter is defined and doesn't include the method
          const filtered =
            filter.length !== 0
            && log.method
            && filter.indexOf(log.method) === -1

          return filtered ? null : (
            <Message log={log} key={`${log.method}-${i}`} />
          )
        })}
      </Root>
    )
  }
}

export default Console
