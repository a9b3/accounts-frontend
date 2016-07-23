/*
 * Top level container
 * Purpose is to house init logic and top level components (eg. toasts)
 */
import React, { Component, PropTypes } from 'react'
import accountsSDK from '../services/accounts-sdk.js'

function init() {
  return new Promise(async (resolve) => {
    accountsSDK.configure({
      host: 'http://localhost:8081',
      domain: '.staging-samlau.us',
    })
    resolve()
  })
}

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    ready: false,
  }

  async componentDidMount() {
    await this._init()
  }

  async _init() {
    await init()
    this.setState({
      ready: true,
    })
  }

  render() {
    const {
      ready,
    } = this.state

    return !ready
      ?
        <div className='loading'>
          <i className='fa fa-spinner fa-spin'></i>
        </div>
      :
        <div>
          {this.props.children}
        </div>
  }
}
