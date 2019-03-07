//@flow

import React from 'react'

export default function Errors({
  isError,
  message,
  stack,
}: {|
  isError: boolean,
  message: string,
  stack: any,
|}) {
  if (isError)
    return (
      <pre key="error-window" className="errors has-errors">
        {message}
      </pre>
    )
  return <pre key="error-window" className="errors no-errors" />
}
