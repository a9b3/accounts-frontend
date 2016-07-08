import axios from 'axios'
import Cookie from 'js-cookie'
import invariant from 'invariant'

class AccountsSDK {
  configured = false
  host = undefined
  domain = undefined

  _requireConfigured() {
    invariant(this.configured, `Call this.configure() first`)
  }

  configure = ({
    host,
    domain,
  }) => {
    invariant(host && domain, `'host' 'domain' must be provided`)

    this.host = host
    this.domain = domain
    this.configured = true
  }

  signup = async ({
    email,
    password,
  }) => {
    this._requireConfigured()
    invariant(email && password, `'email' and 'password' must be provided`)

    const res = await axios.post(`${this.host}/api/signup`, {
      email,
      password,
    })
  }

  authenticate = async ({
    email,
    password,
  }) => {
    this._requireConfigured()
    invariant(email && password, `'email' and 'password' must be provided`)

    const res = await axios.post(`${this.host}/api/authenticate`, {
      email,
      password,
    })

    const jwt = res.data.token.token
    const tokenExp = res.data.token.tokenExp

    // set jwt in domain cookie
    Cookies.set(`_jwt`, jwt, {
      expires: tokenExp,
      path: '',
      domain: this.domain,
    })

    // redirect to origin if specified
    if (res.data.origin) {
      window.location.href = res.data.origin
    }
  }
}

export default new AccountsSDK()
