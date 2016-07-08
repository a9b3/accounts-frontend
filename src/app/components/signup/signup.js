import styles from './signup.scss'
import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import axios from 'axios'

class Signup extends Component {
  state = {
    error: undefined,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const email = this.refs.email.value
    const password = this.refs.password.value

    try {
      const res = await axios.post(`${CONFIG.accountsBackend}/api/signup`, {
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

          <button styleName='button'>
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
