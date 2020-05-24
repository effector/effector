import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TreeNode from './TreeNode'

import {DEFAULT_ROOT_PATH, hasChildNodes, getExpandedPaths} from './pathUtils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const path = action.path
      const expandedPaths = state.expandedPaths
      const expanded = !!expandedPaths[path]

      return Object.assign({}, state, {
        expandedPaths: Object.assign({}, state.expandedPaths, {
          [path]: !expanded,
        }),
      })
    }
    default:
      return state
  }
}

class ConnectedTreeNode extends Component {
  constructor(props, context) {
    super(props)

    this.state = context.store.storeState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !!nextState.expandedPaths[nextProps.path] !==
        !!this.state.expandedPaths[this.props.path] ||
      nextProps.data !== this.props.data ||
      nextProps.name !== this.props.name
    )
  }

  handleClick(path) {
    this.context.store.storeState = reducer(this.context.store.storeState, {
      type: 'TOGGLE_EXPAND',
      path: path,
    })
    this.setState(this.context.store.storeState)
  }

  renderChildNodes(parentData, parentPath) {
    const {dataIterator} = this.props
    const {depth} = this.props

    const {nodeRenderer} = this.props

    let childNodes = []
    for (let {name, data, ...props} of dataIterator(parentData)) {
      const key = name
      const path = `${parentPath}.${key}`
      childNodes.push(
        <ConnectedTreeNode
          name={name}
          data={data}
          depth={depth + 1}
          path={path}
          key={key}
          dataIterator={dataIterator}
          nodeRenderer={nodeRenderer}
          {...props} // props for nodeRenderer
        />,
      )
    }
    return childNodes
  }

  render() {
    const {data, dataIterator, path, depth} = this.props

    const nodeHasChildNodes = hasChildNodes(data, dataIterator)
    const {expandedPaths} = this.state
    const expanded = !!expandedPaths[path]

    const {nodeRenderer} = this.props

    return (
      <TreeNode
        expanded={expanded}
        onClick={
          nodeHasChildNodes ? this.handleClick.bind(this, path) : () => {}
        }
        // show arrow anyway even if not expanded and not rendering children
        shouldShowArrow={nodeHasChildNodes}
        // show placeholder only for non root nodes
        shouldShowPlaceholder={depth > 0}
        // Render a node from name and data (or possibly other props like isNonenumerable)
        nodeRenderer={nodeRenderer}
        {...this.props}>
        {// only render if the node is expanded
        expanded ? this.renderChildNodes(data, path) : undefined}
      </TreeNode>
    )
  }
}

ConnectedTreeNode.propTypes = {
  name: PropTypes.string,
  data: PropTypes.any,
  dataIterator: PropTypes.func,

  depth: PropTypes.number,
  expanded: PropTypes.bool,

  nodeRenderer: PropTypes.func,
}

ConnectedTreeNode.contextTypes = {
  store: PropTypes.any,
}

class TreeView extends Component {
  static defaultProps = {
    expandLevel: 0,
    expandPaths: [],
  }

  constructor(props) {
    super(props)

    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          props.data,
          props.dataIterator,
          props.expandPaths,
          props.expandLevel,
        ),
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          nextProps.data,
          nextProps.dataIterator,
          nextProps.expandPaths,
          nextProps.expandLevel,
          this.store.storeState.expandedPaths,
        ),
      },
    }
  }

  getChildContext() {
    return {
      store: this.store,
    }
  }

  static childContextTypes = {
    store: PropTypes.any,
  }

  render() {
    const {name, data, dataIterator} = this.props
    const {nodeRenderer} = this.props

    const rootPath = DEFAULT_ROOT_PATH

    return (
      <ConnectedTreeNode
        name={name}
        data={data}
        dataIterator={dataIterator}
        depth={0}
        path={rootPath}
        nodeRenderer={nodeRenderer}
      />
    )
  }
}

TreeView.propTypes = {
  name: PropTypes.string,
  data: PropTypes.any,
  dataIterator: PropTypes.func,

  nodeRenderer: PropTypes.func,
}

TreeView.defaultProps = {
  name: undefined,
}

export default TreeView
