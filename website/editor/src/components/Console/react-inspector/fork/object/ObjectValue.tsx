import React from 'react'
import PropTypes from 'prop-types'
import createStyles from '../styles/createStyles'

/**
 * A short description of the object values.
 * Can be used to render tree node in ObjectInspector
 * or render objects in TableInspector.
 */
const ObjectValue = ({object, styles}, {theme}) => {
  const themeStyles = createStyles('ObjectValue', theme)

  const mkStyle = key => ({...themeStyles[key], ...styles})

  switch (typeof object) {
    case 'number':
      return <span style={mkStyle('objectValueNumber')}>{String(object)}</span>
    case 'string':
      return <span style={mkStyle('objectValueString')}>"{object}"</span>
    case 'boolean':
      return <span style={mkStyle('objectValueBoolean')}>{String(object)}</span>
    case 'undefined':
      return <span style={mkStyle('objectValueUndefined')}>undefined</span>
    case 'object':
      if (object === null) {
        return <span style={mkStyle('objectValueNull')}>null</span>
      }
      if (object instanceof Date) {
        return <span>{object.toString()}</span>
      }
      if (object instanceof RegExp) {
        return (
          <span style={mkStyle('objectValueRegExp')}>{object.toString()}</span>
        )
      }
      if (Array.isArray(object)) {
        return <span>{`Array[${object.length}]`}</span>
      }
      if (!object.constructor) {
        return <span>Object</span>
      }
      if (
        typeof object.constructor.isBuffer === 'function' &&
        object.constructor.isBuffer(object)
      ) {
        return <span>{`Buffer[${object.length}]`}</span>
      }

      return <span>{object.constructor.name}</span>
    case 'function':
      return (
        <span>
          <span style={mkStyle('objectValueFunctionKeyword')}>function</span>
          <span style={mkStyle('objectValueFunctionName')}>
            &nbsp;{object.name}()
          </span>
        </span>
      )
    case 'symbol':
      return (
        <span style={mkStyle('objectValueSymbol')}>{object.toString()}</span>
      )
    default:
      return <span />
  }
}

ObjectValue.propTypes = {
  /** the object to describe */
  object: PropTypes.any,
}

ObjectValue.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default ObjectValue
