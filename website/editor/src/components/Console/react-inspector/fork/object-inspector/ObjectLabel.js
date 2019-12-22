import React from 'react'
import PropTypes from 'prop-types'
import ObjectName from '../object/ObjectName'
import ObjectValue from '../object/ObjectValue'

/**
 * if isNonenumerable is specified, render the name dimmed
 */
const ObjectLabel = ({name, data, isNonenumerable}) => {
  const object = data

  return (
    <span>
      <ObjectName name={name} dimmed={isNonenumerable} />
      <span>: </span>
      <ObjectValue object={object} />
    </span>
  )
}

ObjectLabel.propTypes = {
  /** Non enumerable object property will be dimmed */
  isNonenumerable: PropTypes.bool,
}

ObjectLabel.defaultProps = {
  isNonenumerable: false,
}

export default ObjectLabel
