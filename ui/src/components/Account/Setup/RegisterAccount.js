import Promise, { promisifyAll } from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModelViewer from 'metamask-logo'
import {
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap'
import FaCheck from 'react-icons/lib/fa/check'

class RegisterAccountComponent extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'activeStep',
      value: 'register'
    })
  }

  verify() {
    const {
      dispatch,
      Actions: { account },
      AccountSetup: { termsOfService },
      Account: {
        address,
        profile: { username }
      }
    } = this.props

    dispatch(account.verifyAccount({ username, address, termsOfService }))
    dispatch({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'verificationStatus',
      value: 'verifying'
    })
  }

  verificationStatus() {
    const { dispatch, AccountSetup: { verificationStatus }, } = this.props

    switch(verificationStatus) {
      case 'verifying':
        return (<h3>Verifying Account...</h3>)
        break;
      case 'verified':
        return (<h3>Account Verified! <FaCheck style={{ fontSize: '72px', color: '#2AA198' }} /></h3>)
        break;
      default: return null
    }
  }


  render() {
    const { Account: { address, profile } } = this.props
    const { username, _json: { avatar_url } } = profile

    return (
      <div>
        <Row>
          <Col sm={12}>
            <center>
              <h1>Register Account</h1>
            </center>
          </Col>
          <br/>
        </Row>
        <Row>
          <Col sm={4}>
            <center>
              <img width={'100%'} src={avatar_url} />
            </center>
          </Col>
          <Col sm={8}>
            <strong>Ethereum Address</strong>
            <p><small>{address}</small></p>
            <strong>GitHub Username:</strong>
            <p><small>{username}</small></p>
            <strong>Agree to GitToken Terms of Service:</strong>
            <p><FaCheck style={{ fontSize: '36px', color: '#2AA198' }} /></p>
          </Col>
          <br/>
        </Row>
        <Row>
          <center>
            {this.verificationStatus()}
          </center>
          <br/>
        </Row>
        <Row>
          <Col sm={12}>
            <Button
              bsSize={'lg'}
              bsStyle={'primary'}
              onClick={this.verify.bind(this)}
              block>
              Register Account
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStoreToProps = (store, props) => {
  return {
    Account: store.Account,
    Actions: store.Actions,
    AccountSetup: store.AccountSetup
  }
}

const RegisterAccount = connect(mapStoreToProps)(RegisterAccountComponent)

export default RegisterAccount
