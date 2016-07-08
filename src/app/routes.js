import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Main from './components/main.js'
import NotFoundContainer from './components/not-found/not-found.js'
import Signin from './components/signin/signin.js'
import Signup from './components/signup/signup.js'

export default (
  <Route
    path='/'
    component={Main}
  >
    <IndexRedirect to='signin' />
    <Route path='signin' component={Signin} />
    <Route path='signup' component={Signup} />
    <Route path='*' component={NotFoundContainer} />
  </Route>
)
