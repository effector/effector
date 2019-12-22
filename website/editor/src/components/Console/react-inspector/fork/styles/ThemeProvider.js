import {Component} from 'react'
import PropTypes from 'prop-types'

class ThemeProvider extends Component {
  getChildContext() {
    const theme = this.props.theme

    return {
      // createStyles: createStyles
      theme: theme,
    }
  }

  render() {
    return this.props.children
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default ThemeProvider
