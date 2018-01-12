import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Router, Route } from 'react-router-dom'

import {
  Row,
  Col,
  Jumbotron
} from 'react-bootstrap'


class WelcomeComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch, Account: { verified } } = this.props

  }

  render() {
    const { Account: { verified, profile: { displayName } } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <Jumbotron>
              <h1>Welcome back, {displayName}!</h1>
            </Jumbotron>
          </Col>
        </Row>
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

const Welcome = connect(mapStoreToProps)(WelcomeComponent)

export default Welcome
