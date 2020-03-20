//@flow

import * as React from 'react'
import type {MessageProps} from './index.h'

import {Message, Icon, Content} from './elements'

import Formatted from './message-parsers/Formatted'
import ObjectTree from './message-parsers/Object'
import ErrorPanel from './message-parsers/Error'

class ConsoleMessage extends React.Component<MessageProps, any> {
  // theme = theme => ({
  //   ...theme,
  //   method: this.props.log.method,
  // })

  render() {
    const {log, last} = this.props
    return (
      <Message data-method={log.method} method={log.method} id={last ? 'last-log-message' : undefined}>
        <Icon method={log.method} />
        <Content>{this.getNode()}</Content>
      </Message>
    )
  }

  getNode() {
    const {log} = this.props

    // Error handling
    const error = this.typeCheck(log)
    if (error) return error
    if (!log.data) return error

    // Chrome formatting
    if (
      log.data.length > 0
      && typeof log.data[0] === 'string'
      && log.data[0].indexOf('%') > -1
    ) {
      return <Formatted data={log.data} />
    }

    // Error panel
    if (
      log.data.every(message => typeof message === 'string')
      && log.method === 'error'
    ) {
      return <ErrorPanel log={log} />
    }

    if (!log.data) return error

    // Normal inspector
    const quoted = typeof log.data[0] !== 'string'
    return <ObjectTree log={log} quoted={quoted} />
  }

  typeCheck(log: any) {
    if (!log) {
      return (
        <Formatted
          data={[
            `%c[console-feed] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
            'color: red',
            'color: orange',
            'color: cyan',
          ]}
        />
      )
    } else if (!(Array.isArray(log.data))) {
      return (
        <Formatted
          data={[
            '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
            'color: red',
            'color: orange',
            'color: cyan',
          ]}
        />
      )
    }
    return false
  }
}

export default ConsoleMessage
