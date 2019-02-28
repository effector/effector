import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('version')

export const VersionLink = ({version}) => {
  const match = version.match(/^pr-(\d+)$/)
  const isDevelop = version === 'develop'
  let href
  let displayVersion
  if (match) {
    href = `pull/${match[1]}`
  } else if (isDevelop) {
    href = `tree/develop`
  } else {
    href = `releases/tag/${version}`
  }
  if (match) {
    displayVersion = `PR #${match[1]}`
  } else if (isDevelop) {
    displayVersion = 'develop'
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
