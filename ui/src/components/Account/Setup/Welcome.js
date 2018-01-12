import Promise, { promisifyAll } from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  Row,
  Col,
  Button
} from 'react-bootstrap'

class WelcomeComponent extends Component {
  constructor() {
    super()


  }

  render() {
    const { dispatch, Actions: { account }, Account: { profile: { username } } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <center>
              <h1>Welcome, {username}!</h1>
              <h3>Thank You for using GitToken!</h3>
              <br/>
              <p>The following guide will help you get started.</p>
              <br/>
            </center>

            <Button
              bsSize={'lg'}
              bsStyle={'primary'}
              block
              onClick={() => {
                dispatch({ type: 'SET_ACCOUNT_SETUP_DETAILS', id: 'activeStep', value: 'terms' })
                dispatch(push('/account/setup/terms'))
              }}>
              Get Started!
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStoreToProps = (store, props) => {
  return {
    Actions: store.Actions,
    Account: store.Account
  }
}

const Welcome = connect(mapStoreToProps)(WelcomeComponent)

export default Welcome
