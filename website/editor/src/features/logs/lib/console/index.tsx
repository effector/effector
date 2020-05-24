import * as React from 'react'

import {Root} from './elements'
import {ConsoleMessage} from './Message'
import {Props} from './index.h'
import {autoScrollDisableClicked, autoScrollEnableClicked} from '../../model'

export {Styles} from './index.h'

const AUTO_SCROLL_MARGIN = 10

class ConsoleRaw extends React.Component<Props, any> {
  // theme = () => ({
  //   variant: this.props.variant || 'light',
  //   styles: {
  //     ...Styles(this.props),
  //     ...this.props.styles,
  //   },
  // })

  scrollToLastMessage = () => {
    const {autoScroll} = this.props
    if (autoScroll) {
      const parent = this.ref.current?.parentElement
      if (parent) parent.scrollTop = parent?.scrollHeight
    }
  }

  ref = React.createRef<HTMLDivElement>()

  componentDidMount() {
    this.scrollToLastMessage()
    this.ref.current?.parentElement?.addEventListener(
      'scroll',
      this.handleScroll,
    )
  }

  componentDidUpdate() {
    this.scrollToLastMessage()
  }

  componentWillUnmount() {
    this.ref.current?.parentElement?.removeEventListener(
      'scroll',
      this.handleScroll,
    )
  }

  handleScroll = (event: Event) => {
    const {autoScroll} = this.props
    const {target} = event
    if (
      // @ts-ignore
      Math.floor(target.scrollHeight - target.scrollTop) <=
      // @ts-ignore
      target.clientHeight + AUTO_SCROLL_MARGIN
    ) {
      !autoScroll && autoScrollEnableClicked()
    } else {
      autoScroll && autoScrollDisableClicked()
    }
  }

  render() {
    const {filter = [], logs = [], ...props} = this.props

    return (
      <Root {...props} ref={this.ref}>
        {logs.map((log, index) => {
          // If the filter is defined and doesn't include the method
          const filtered =
            filter.length !== 0 &&
            log.method &&
            filter.indexOf(log.method) === -1

          return filtered ? null : (
            <ConsoleMessage
              log={log}
              key={`${log.method}-${index}`}
              last={index === logs.length - 1}
            />
          )
        })}
      </Root>
    )
  }
}

export const Console = React.memo(ConsoleRaw)
