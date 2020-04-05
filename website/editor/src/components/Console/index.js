//@flow

import React, {memo} from 'react'

import {Root} from './elements'
import Message from './Message'
import type {Props} from './index.h'
import {disableAutoScroll, enableAutoScroll} from '../../settings'

const AUTO_SCROLL_MARGIN = 10

class Console extends React.Component<Props, any> {
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
      const parent = this.ref.current.parentElement
      parent.scrollTop = parent.scrollHeight
    }
  }

  ref = React.createRef()

  componentDidMount() {
    this.scrollToLastMessage()
    this.ref.current.parentElement.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    this.scrollToLastMessage()
  }

  componentWillUnmount() {
    this.ref.current.parentElement.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = e => {
    const {autoScroll} = this.props
    const {target} = e
    if (Math.floor(target.scrollHeight - target.scrollTop) <= target.clientHeight + AUTO_SCROLL_MARGIN) {
      !autoScroll && enableAutoScroll()
    } else {
      autoScroll && disableAutoScroll()
    }
  }

  render() {
    const {filter = [], logs = [], ...props} = this.props

    return (
      <Root {...props} ref={this.ref}>
        {logs.map((log, i) => {
          // If the filter is defined and doesn't include the method
          const filtered =
            filter.length !== 0
            && log.method
            && filter.indexOf(log.method) === -1

          return filtered ? null : (
            <Message
              log={log}
              key={`${log.method}-${i}`}
              last={i === logs.length - 1}
            />
          )
        })}
      </Root>
    )
  }
}

export default memo(Console)
