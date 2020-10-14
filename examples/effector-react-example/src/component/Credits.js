//@flow

import * as React from 'react'

export const Credits = () => (
  <section className="credits">
    <code>— fill form and press enter to add todo</code>
    <code>— click on todo to remove it</code>
    <code>
      — visit <a href="https://github.com/effector/effector">github</a> to see
      more
    </code>
    <code className="version">
      <i>v {version}</i>
    </code>
  </section>
)

const version = require('../../package.json').dependencies.effector
