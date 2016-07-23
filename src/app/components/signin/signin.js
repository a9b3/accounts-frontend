import styles from './signin.scss'
import { Link } from 'react-router'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import accountsSDK from '../../services/accounts-sdk.js'

function getErrorMessage(err) {
  if (err.message && typeof err.message === 'string') {
    return err.message
  }
  if (err.data && err.data.message && typeof err.data.message === 'string') {
    return err.data.message
  }
  if (err.status === 0) {
    return 'Connection problem try again later.'
  }
  return 'Error'
}

class Signin extends Component {
  state = {
    error: undefined,
    loading: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({
      error: undefined,
      loading: true,
    })

    const email = this.refs.email.value
    const password = this.refs.password.value

    try {
      await accountsSDK.authenticate({ email, password })
      this.refs.email.value = ''
      this.refs.password.value = ''
      this.setState({
        loading: false,
      })
    } catch (err) {
      this.setState({
        error: getErrorMessage(err),
        loading: false,
      })
    }
  }

  render() {
    const {
      error,
      loading,
    } = this.state

    return <div styleName='container'>
      <div styleName='signin'>
        {
          error && <div styleName='error'>
            {error}
          </div>
        }

        <div styleName='title'>
          Signin
        </div>

        <form
          styleName='form'
          onSubmit={this.onSubmit}
        >
          <input type='text'
            ref='email'
            styleName='input'
            placeholder='Email'
          />
          <input type='password'
            ref='password'
            styleName='input'
            placeholder='Password'
          />

          <button disabled={loading}
            styleName='button'
          >
            Submit
          </button>
        </form>

        <div styleName='link'>
          <Link to='signup'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  }
}

export default CSSModules(Signin, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
