import axios from 'axios'
import Cookies from 'js-cookie'
import invariant from 'invariant'

function getQueries() {
  const tokens = window.location.search.slice(1, window.location.search.length).split(`&`)
  return tokens.reduce((map, token) => {
    const kv = token.split('=')
    map[kv[0]] = decodeURIComponent(kv[1])
    return map
  }, {}) || {}
}

class AccountsSDK {
  configured = false
  // accounts backend host url eg. 'http://accounts.foo.com'
  host = undefined
  // domain authority of jwt eg. '.foo.com'
  domain = undefined
  // url of auth frontend eg. 'http://accountsfe.foo.com'
  authUrl = `http://dev.staging-samlau.us:8080`

  _requireConfigured = () => {
    invariant(this.configured, `Call this.configure() first`)
  }

  configure = ({
    host,
    domain,
    authUrl,
  }) => {
    invariant(host && domain, `'host' 'domain' must be provided`)

    this.host = host
    this.domain = domain
    if (authUrl) this.authUrl = authUrl
    this.configured = true
  }

  getJwt = () => {
    return Cookies.get(`_jwt`)
  }

  setJwt = (jwt, opts) => {
    return Cookies.set(`_jwt`, jwt, Object.assign({}, {
      path: '',
      domain: this.domain,
    }, opts))
  }

  redirectTo = (url) => {
    window.location = url
  }

  onAuthenticated = ({
    token,
    tokenExp,
    redirect,
  }) => {
    // set jwt in domain cookie
    this.setJwt(token, { expires: tokenExp })

    // redirect to origin if specified
    if (redirect) {
      return this.redirectTo(redirect)
    }
    const urlQueries = getQueries()
    if (urlQueries.origin) {
      return this.redirectTo(urlQueries.origin)
    }
    // some default location in accountsfrontend maybe a homepage?
    this.redirectTo(`/success`)
  }

  signup = async ({
    email,
    password,
    redirect,
  }) => {
    this._requireConfigured()
    invariant(email && password, `'email' and 'password' must be provided`)

    const res = await axios.post(`${this.host}/api/signup`, { email, password })

    this.onAuthenticated({
      token: res.data.token.token,
      tokenExp: res.data.token.tokenExp,
      redirect,
    })
  }

  authenticate = async ({
    email,
    password,
    // optional redirect url for routing to on successful authentication
    redirect,
  }) => {
    this._requireConfigured()
    invariant(email && password, `'email' and 'password' must be provided`)

    const res = await axios.post(`${this.host}/api/authenticate`, { email, password })

    this.onAuthenticated({
      token: res.data.token.token,
      tokenExp: res.data.token.tokenExp,
      redirect,
    })
  }

  verify = async (jwt) => {
    this._requireConfigured()
    invariant(jwt, `'jwt' must be provided`)

    const res = await axios.post(`${this.host}/api/verify`, { token: jwt })
  }

  // use with react-router onEnter
  requireAuthentication = async (location, replace) => {
    this._requireConfigured()
    const jwt = this.getJwt()
    if (!jwt) {
      this.redirectTo(`${this.authUrl}?origin=${window.location.href}`)
    }
    try {
      await this.verify(jwt)
    } catch (e) {
      this.redirectTo(`${this.authUrl}?origin=${window.location.href}`)
    }
  }
}

export default new AccountsSDK()
