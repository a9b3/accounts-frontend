import styles from './banner.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

class Banner extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
  }

  render() {
    const {
      image,
      ...otherProps,
    } = this.props

    delete otherProps.styles
    return <div
      styleName='banner'
      style={{
        backgroundImage: `url(${image})`,
      }}
      {...otherProps}
    />
  }
}

export default CSSModules(Banner, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
