import * as React from 'react'
import Linkify from 'linkifyjs/react'

import {Theme, Message} from '../index.h'
import {Root} from '../react-inspector/elements'

import {CustomInspector} from '../react-inspector'

import {theme} from '../theme/default'

type Props = {
  log: Message
  quoted: boolean
}

export class ObjectTree extends React.Component<Props, any> {
  render() {
    const {quoted, log} = this.props

    if (!log.data) return null

    return log.data.map<React.ReactNode>((message, i: number) => {
      if (typeof message === 'string') {
        const string =
          !quoted && message.length ? (
            `${message} `
          ) : (
            <span>
              <span>"</span>
              <span
                style={{
                  color: theme.styles.OBJECT_VALUE_STRING_COLOR,
                }}>
                {message}
              </span>
              <span>" </span>
            </span>
          )

        return (
          <Root data-type="string" key={i}>
            <Linkify>{string}</Linkify>
          </Root>
        )
      }

      return <CustomInspector method={log.method} data={message} key={i} />
    })
  }
}
