//@flow

/*
<ShareButton
            className="try-button try-button-share"
            url={this.state.shareableUrl}
            onClick={this.copyShareableUrl}
          />
*/

import * as React from 'react'

export class ShareButton extends React.Component<
  {|
    onClick: () => void,
    url: string,
    className?: string,
  |},
  {|
    showConfirmation: boolean,
  |},
> {
  state = {
    showConfirmation: false,
  }
  onClick = () => {
    this.props.onClick()
    this.setState({showConfirmation: true})
    setTimeout(() => this.setState({showConfirmation: false}), 2000)
  }

  render() {
    const {url} = this.props
    const {showConfirmation} = this.state

    return (
      <div className={this.props.className}>
        <input id="shareableUrl" value={this.props.url} readOnly />
        <div onClick={this.onClick}>Share</div>
        <span className="try-tooltip">
          <span className="arrow" />
          {showConfirmation ? 'Copied' : 'Click to copy to clipboard'}
        </span>
      </div>
    )
  }
}
