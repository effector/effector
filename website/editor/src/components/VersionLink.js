//@flow

import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('version')
if (!root) throw Error('no #version node')

export const VersionLink = ({version}: {version: string}) => {
  const match = version.match(/^pr-(\d+)$/)
  const isMaster = version === 'master'
  let href
  let displayVersion
  if (match) {
    href = `pull/${match[1]}`
  } else if (isMaster) {
    href = `tree/master`
  } else {
    href = `releases/tag/${version}`
  }
  if (match) {
    displayVersion = `PR #${match[1]}`
  } else if (isMaster) {
    displayVersion = 'master'
  } else {
    displayVersion = `v${version}`
  }
  return ReactDOM.createPortal(
    <a
      href={`https://github.com/zerobias/effector/${href}`}
      target="_blank"
      rel="noopener noreferrer">
      {displayVersion}
    </a>,
    root,
  )
}
