import styles from './signin.scss'
import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import axios from 'axios'

class Signin extends Component {
  state = {
    error: undefined,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({
      error: undefined,
    })

    const email = this.refs.email.value
    const password = this.refs.password.value

    try {
      const res = await axios.post(`${CONFIG.accountsBackend}/api/authenticate`, {
        email,
        password,
      })
    } catch (e) {
      this.setState({
        error: e.data.message,
      })
    }
  }

  render() {
    const {
      error,
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

          <button styleName='button'>
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
