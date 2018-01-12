import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Router, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { store, history } from './store'

import {
  Account,
  LandingPage
} from './components'

import {
  Grid
} from 'react-bootstrap'


ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
        <Grid>
          <Account.Auth />
          <Switch>
            <Route exact path={"/"} component={LandingPage.Main}/>
            <Route path={"/account"} component={Account.Main}/>
          </Switch>
        </Grid>
    </Provider>
  </Router>,
  document.getElementById('app')
)
