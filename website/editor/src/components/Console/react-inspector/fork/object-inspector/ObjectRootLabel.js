import React from 'react'
import ObjectName from '../object/ObjectName'
import ObjectPreview from './ObjectPreview'

const ObjectRootLabel = ({name, data}) => {
  if (typeof name === 'string') {
    return (
      <span>
        <ObjectName name={name} />
        <span>: </span>
        <ObjectPreview data={data} />
      </span>
    )
  } else {
    return <ObjectPreview data={data} />
  }
}

export default ObjectRootLabel
