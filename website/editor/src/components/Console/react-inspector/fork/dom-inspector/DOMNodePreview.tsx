import React from 'react'
import PropTypes from 'prop-types'

import createStyles from '../styles/createStyles'
import shouldInline from './shouldInline'

const OpenTag = ({tagName, attributes, styles}) => {
  return (
    <span style={styles.base}>
      {'<'}
      <span style={styles.tagName}>{tagName}</span>

      {(() => {
        if (attributes) {
          let attributeNodes = []
          for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i]
            attributeNodes.push(
              <span key={i}>
                {' '}
                <span style={styles.htmlAttributeName}>{attribute.name}</span>
                {'="'}
                <span style={styles.htmlAttributeValue}>{attribute.value}</span>
                {'"'}
              </span>,
            )
          }
          return attributeNodes
        }
      })()}

      {'>'}
    </span>
  )
}

// isChildNode style={{ marginLeft: -12 /* hack: offset placeholder */ }}
const CloseTag = ({tagName, isChildNode = false, styles}) => (
  <span
    style={Object.assign({}, styles.base, isChildNode && styles.offsetLeft)}>
    {'</'}
    <span style={styles.tagName}>{tagName}</span>
    {'>'}
  </span>
)

const nameByNodeType = {
  1: 'ELEMENT_NODE',
  3: 'TEXT_NODE',
  7: 'PROCESSING_INSTRUCTION_NODE',
  8: 'COMMENT_NODE',
  9: 'DOCUMENT_NODE',
  10: 'DOCUMENT_TYPE_NODE', // http://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
  11: 'DOCUMENT_FRAGMENT_NODE',
}

const DOMNodePreview = ({isCloseTag, data, expanded}, {theme}) => {
  const styles = createStyles('DOMNodePreview', theme)

  if (isCloseTag) {
    return (
      <CloseTag
        styles={styles.htmlCloseTag}
        isChildNode
        tagName={data.tagName}
      />
    )
  }

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <span>
          <OpenTag
            tagName={data.tagName}
            attributes={data.attributes}
            styles={styles.htmlOpenTag}
          />

          {shouldInline(data) ? data.textContent : !expanded && '…'}

          {!expanded && (
            <CloseTag tagName={data.tagName} styles={styles.htmlCloseTag} />
          )}
        </span>
      )
    case Node.TEXT_NODE:
      return <span>{data.textContent}</span>
    case Node.CDATA_SECTION_NODE:
      return <span>{'<![CDATA[' + data.textContent + ']]>'}</span>
    case Node.COMMENT_NODE:
      return (
        <span style={styles.htmlComment}>
          {'<!--'}
          {data.textContent}
          {'-->'}
        </span>
      )
    case Node.PROCESSING_INSTRUCTION_NODE:
      return <span>{data.nodeName}</span>
    case Node.DOCUMENT_TYPE_NODE:
      return (
        <span style={styles.htmlDoctype}>
          {'<!DOCTYPE '}
          {data.name}
          {data.publicId ? ` PUBLIC "${data.publicId}"` : ''}
          {!data.publicId && data.systemId ? ' SYSTEM' : ''}
          {data.systemId ? ` "${data.systemId}"` : ''}
          {'>'}
        </span>
      )
    case Node.DOCUMENT_NODE:
      return <span>{data.nodeName}</span>
    case Node.DOCUMENT_FRAGMENT_NODE:
      return <span>{data.nodeName}</span>
    default:
      return <span>{nameByNodeType[data.nodeType]}</span>
  }
}

DOMNodePreview.propTypes = {
  /** If true, just render a close tag */
  isCloseTag: PropTypes.bool,
  /**  */
  name: PropTypes.string,
  /** The DOM Node */
  data: PropTypes.object.isRequired,
  /** Whether the DOM node has been expanded. */
  expanded: PropTypes.bool.isRequired,
}

DOMNodePreview.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default DOMNodePreview
