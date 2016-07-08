import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Main from './components/main.js'
import NotFoundContainer from './components/not-found/not-found.js'
import Signin from './components/signin/signin.js'
import Signup from './components/signup/signup.js'
import Success from './components/success/success.js'
import accountsSDK from './services/accounts-sdk.js'

export default (
  <Route
    path='/'
    component={Main}
  >
    <IndexRedirect to='signin' />
    <Route path='signin' component={Signin} />
    <Route path='signup' component={Signup} />
    <Route path='success' component={Success} onEnter={
      ({location}, replace) => {
        accountsSDK.requireAuthentication(location, replace)
      }
    }/>
    <Route path='*' component={NotFoundContainer} />
  </Route>
)
