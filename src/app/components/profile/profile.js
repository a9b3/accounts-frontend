import styles from './profile.scss'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import accountsSDK from '../../services/accounts-sdk.js'
import Banner from '../banner/banner.js'

class Profile extends Component {
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

    const profilePic = `http://vignette3.wikia.nocookie.net/mvl/images/e/e9/Luffy-One-Piece.png/revision/latest?cb=20140221162732`

    return <div styleName='container'>
      {
        !loading && <div styleName='profile'>
          <div styleName='banner'>
            <Banner
              image={profilePic}
            />
          </div>

          <div styleName='info'>
            <div styleName='info-item'>
              <div styleName='type'>
                Username
              </div>
              <div styleName='value'>
                Luffy
              </div>
            </div>
            <div styleName='info-item'>
              <div styleName='type'>
                Email
              </div>
              <div styleName='value'>
                {user.email}
              </div>
            </div>
          </div>

          <div styleName='actions'>
            <div styleName='action' onClick={accountsSDK.logout}>
              Signout
            </div>
          </div>
        </div>
      }
    </div>
  }
}

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
