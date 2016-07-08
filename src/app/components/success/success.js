import styles from './success.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

class Success extends Component {
  render() {
    return <div styleName="success">
      Hello World!
    </div>
  }
}

export default CSSModules(Success, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
