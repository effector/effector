export {default as chromeLight} from './styles/themes/chromeLight'
export {default as chromeDark} from './styles/themes/chromeDark'

export {default as ObjectInspector} from './object-inspector/ObjectInspector'
export {default as TableInspector} from './table-inspector/TableInspector'
export {default as DOMInspector} from './dom-inspector/DOMInspector'
export {default as ObjectLabel} from './object-inspector/ObjectLabel'
export {default as ObjectRootLabel} from './object-inspector/ObjectRootLabel'
export {default as ObjectValue} from './object/ObjectValue'
export {default as ObjectName} from './object/ObjectName'

// Wrapping the inspectors
import ObjectInspector from './object-inspector/ObjectInspector'
import TableInspector from './table-inspector/TableInspector'
import DOMInspector from './dom-inspector/DOMInspector'

import React from 'react'
import PropTypes from 'prop-types'
import {isDOM} from './isDom'

const Inspector = ({table = false, data, ...rest}) => {
  if (table) {
    return <TableInspector data={data} {...rest} />
  }

  if (isDOM(data)) return <DOMInspector data={data} {...rest} />

  return <ObjectInspector data={data} {...rest} />
}

Inspector.propTypes = {
  data: PropTypes.any,
  name: PropTypes.string,
  table: PropTypes.bool,
}

export {Inspector}

export default Inspector
