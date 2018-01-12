import Promise, { promisifyAll } from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  Row,
  Col,
  Button
} from 'react-bootstrap'

class SetupOrganizationComponent extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { dispatch, Actions: { account } } = this.props
    account.getOrganizations()
  }

  render() {
    const { dispatch, Account: { organizations } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
              <h1>Select Organization</h1>
              {organizations.map((organization, i) => {
                const { login } = organization
                return (
                  <h3 key={i}>{login}</h3>
                )
              })}
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

const SetupOrganization = connect(mapStoreToProps)(SetupOrganizationComponent)

export default SetupOrganization
