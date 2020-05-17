import * as React from 'react'
import {
  DOMInspector,
  Inspector,
  ObjectLabel,
  ObjectName,
  ObjectRootLabel,
} from './fork'
import ObjectPreview from './fork/object-inspector/ObjectPreview'

import {Context} from '../index.h'
import {Methods} from '../methods'
import {Constructor, HTML, Root, Table} from './elements'
import {theme} from '../theme/default'

type Props = {
  method: Methods,
  data: any,
}

class CustomInspector extends React.PureComponent<Props, any> {
  render() {
    const {method, data} = this.props

    const {styles} = theme

    const dom = data instanceof HTMLElement
    const table = method === 'table'

    return (
      <Root data-type={table ? 'table' : dom ? 'html' : 'object'}>
        {table ? (
          <Table>
            <Inspector {...this.props} theme={styles} table />
            <Inspector {...this.props} theme={styles} />
          </Table>
        ) : dom ? (
          <HTML>
            <DOMInspector {...this.props} theme={styles} />
          </HTML>
        ) : (
          <Inspector
            {...this.props}
            theme={styles}
            nodeRenderer={this.nodeRenderer.bind(this)}
          />
        )}
      </Root>
    )
  }

  getCustomNode(data: any) {
    const {styles} = theme
    const constructor = data && data.constructor ? data.constructor.name : null

    if (constructor === 'Function')
      return (
        <span style={{fontStyle: 'italic'}}>
          <ObjectPreview data={data} />
          {` {`}
          <span style={{color: 'rgb(181, 181, 181)'}}>{data.body}</span>
          {`}`}
        </span>
      )

    if (constructor === 'Promise')
      return (
        <span style={{fontStyle: 'italic'}}>
          Promise {`{`}
          <span style={{opacity: 0.6}}>{`<pending>`}</span>
          {`}`}
        </span>
      )

    if (data instanceof HTMLElement)
      return (
        <HTML>
          <DOMInspector data={data} theme={styles} />
        </HTML>
      )
    return null
  }

  nodeRenderer(props: any) {
    const {depth, name, data, isNonenumerable} = props

    // Root
    if (depth === 0) {
      const customNode = this.getCustomNode(data)
      return customNode || <ObjectRootLabel name={name} data={data} />
    }

    if (name === 'constructor')
      return (
        <Constructor>
          <ObjectLabel
            name="<constructor>"
            data={data.name}
            isNonenumerable={isNonenumerable}
          />
        </Constructor>
      )

    const customNode = this.getCustomNode(data)
    return customNode ? (
      <Root>
        <ObjectName name={name} />
        <span>: </span>
        {customNode}
      </Root>
    ) : (
      <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
    )
  }
}

export default CustomInspector
