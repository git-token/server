import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Router, Route } from 'react-router-dom'

import {
  Row,
  Col
} from 'react-bootstrap'

import Header from './Header'
import Welcome from './Welcome'
import * as Setup from './Setup'

class MainComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch, Account: { account } } = this.props

  }

  render() {
    const { Account: { profile } } = this.props

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={"/account"} component={Welcome} />
          <Route path={"/account/setup"} component={Setup.Main}/>
        </Switch>
      </div>
    )
  }
}

const mapStoreToProps = (store, props) => {
  return {
    Account: store.Account,
    Actions: store.Actions
  }
}

const Main = connect(mapStoreToProps)(MainComponent)

export default Main
