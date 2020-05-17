import React, {createElement, Component, Children} from 'react'
import PropTypes from 'prop-types'

import createStyles from '../styles/createStyles'

const Arrow = ({expanded, styles}) => (
  <span
    style={{
      ...styles.base,
      ...(expanded ? styles.expanded : styles.collapsed),
    }}>
    ▶
  </span>
)

class TreeNode extends Component {
  render() {
    const {
      expanded,
      onClick,
      children,
      nodeRenderer,
      title,
      shouldShowArrow,
      shouldShowPlaceholder,
    } = this.props

    const {theme} = this.context
    const styles = createStyles('TreeNode', theme)

    const renderedNode = createElement(nodeRenderer, this.props)
    const childNodes = expanded ? children : undefined

    return (
      <li
        aria-expanded={expanded}
        role="treeitem"
        style={styles.treeNodeBase}
        title={title}>
        <div style={styles.treeNodePreviewContainer} onClick={onClick}>
          {shouldShowArrow || Children.count(children) > 0 ? (
            <Arrow expanded={expanded} styles={styles.treeNodeArrow} />
          ) : (
            shouldShowPlaceholder && (
              <span style={styles.treeNodePlaceholder}>&nbsp;</span>
            )
          )}
          {renderedNode}
        </div>

        <ol role="group" style={styles.treeNodeChildNodesContainer}>
          {childNodes}
        </ol>
      </li>
    )
  }
}

TreeNode.propTypes = {
  name: PropTypes.string,
  data: PropTypes.any,

  expanded: PropTypes.bool,
  shouldShowArrow: PropTypes.bool,
  shouldShowPlaceholder: PropTypes.bool,

  nodeRenderer: PropTypes.func,

  onClick: PropTypes.func,
}

TreeNode.defaultProps = {
  name: undefined,
  data: undefined,
  expanded: true,

  nodeRenderer: ({name}) => <span>{name}</span>,

  onClick: () => {},

  shouldShowArrow: false,
  shouldShowPlaceholder: true,
}

TreeNode.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default TreeNode
