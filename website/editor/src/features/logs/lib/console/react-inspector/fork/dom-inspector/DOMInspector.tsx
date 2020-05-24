import React, {Component} from 'react'

import DOMNodePreview from './DOMNodePreview'
import TreeView from '../tree-view/TreeView'

import shouldInline from './shouldInline'
const domIterator = function*(data) {
  if (data && data.childNodes) {
    const textInlined = shouldInline(data)

    if (textInlined) {
      return
    }

    for (let i = 0; i < data.childNodes.length; i++) {
      const node = data.childNodes[i]

      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length === 0
      )
        continue

      yield {
        name: `${node.tagName}[${i}]`,
        data: node,
      }
    }

    // at least 1 child node
    if (data.tagName) {
      yield {
        name: 'CLOSE_TAG',
        data: {
          tagName: data.tagName,
        },
        isCloseTag: true,
      }
    }
  }
}

import ThemeProvider from '../styles/ThemeProvider'

class DOMInspector extends Component {
  static defaultProps = {
    theme: 'chromeLight',
  }

  render() {
    const nodeRenderer = DOMNodePreview

    return (
      <ThemeProvider theme={this.props.theme}>
        <TreeView
          nodeRenderer={nodeRenderer}
          dataIterator={domIterator}
          {...this.props}
        />
      </ThemeProvider>
    )
  }
}

export default DOMInspector
