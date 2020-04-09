//@flow

import React from 'react'
import Header from './Header'
import StackFrame from './StackFrame'
import {styled} from 'linaria/react'

import type {StackFrame as StackFrameType} from '../../evaluator/stackframe/stack-frame'

const StackTrace = styled.div`
  //overflow: auto;
`

const Message = styled.div`
  // overflow: ${props => (props.scroll ? 'auto' : 'none')};
  // margin-bottom: 1.5em;
`

export default function Errors({
  isError,
  error,
  stackFrames,
}: {|
  isError: boolean,
  error: Error,
  stackFrames: StackFrameType[],
|}) {
  if (isError) {
    if (error !== Object(error)) {
      return (
        <pre key="error-window" className="errors has-errors">
          <Header headerText={String(error)} />
        </pre>
      )
    }
    const errorName = error.name
    const message = error.message
    const headerText =
      message.match(/^\w*:/) || !errorName ? message : errorName
    return (
      <pre key="error-window" className="errors has-errors">
        <Header headerText={headerText} />
        {errorName && (
          <Message scroll={stackFrames.length === 0}>{message}</Message>
        )}
        {stackFrames.length > 0 && (
          <StackTrace>
            {stackFrames.map(frame => (
              <StackFrame frame={frame} />
            ))}
          </StackTrace>
        )}
      </pre>
    )
  }
  return <pre key="error-window" className="errors no-errors" />
}
Errors.defaultProps = {
  isError: false,
  error: Error('Unknown error'),
  stackFrames: [],
}
