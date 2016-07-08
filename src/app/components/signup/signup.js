import styles from './signup.scss'
import { Link } from 'react-router'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import accountsSDK from '../../services/accounts-sdk.js'

class Signup extends Component {
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
      await accountsSDK.signup({ email, password })
      this.refs.email.value = ''
      this.refs.password.value = ''
      this.setState({
        loading: false,
      })
    } catch (err) {
      this.setState({
        error: err.data.message,
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
      <div styleName='signup'>
        {
          error && <div styleName='error'>
            {error}
          </div>
        }

        <div styleName='title'>
          Signup
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
          <input type='password'
            ref='verifyPassword'
            styleName='input'
            placeholder='Verify Password'
          />

          <button disabled={loading}
            styleName='button'
          >
            Submit
          </button>
        </form>

        <div styleName='link'>
          <Link to='signin'>
            Signin
          </Link>
        </div>
      </div>
    </div>
  }
}

export default CSSModules(Signup, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
