import styles from './success.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import accountsSDK from '../../services/accounts-sdk.js'

class Success extends Component {
  state = {
    user: undefined,
    loading: true,
  }

  async componentWillMount() {
    const user = await accountsSDK.getUser()
    this.setState({
      user,
      loading: false,
    })
  }

  render() {
    const {
      user,
      loading,
    } = this.state

    return <div styleName='container'>
      {
        !loading && <div styleName='profile'>
          Hello {user.email}
        </div>
      }
    </div>
  }
}

export default CSSModules(Success, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
