import React, { Component } from 'react'
import { connect } from 'react-redux'

class AuthComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch, Actions: { account } } = this.props
    console.log('Retrieve GitToken Profile')
    dispatch(account.worker())
    setTimeout(() => {
      account.getProfile()
    }, 100)

  }

  render() {
    const { Account: { profile } } = this.props

    return null
  }
}

const mapStoreToProps = (store, props) => {
  return {
    Account: store.Account,
    Actions: store.Actions
  }
}

const Auth = connect(mapStoreToProps)(AuthComponent)

export default Auth
