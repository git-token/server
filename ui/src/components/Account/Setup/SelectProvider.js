import Promise, { promisifyAll } from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Row,
  Col,
  Breadcrumb,
  Button,
  Jumbotron
} from 'react-bootstrap'

class MainComponent extends Component {
  constructor() {
    super()


  }

  selectProvider({ provider }) {
    const { dispatch, Actions: { account } } = this.props


    switch(provider) {
      case 'metamask':
        location.href = '/setup'
        break;
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Select Ethereum Wallet</h1>
        <br/>
        <Button
          bsSize={'lg'}
          bsStyle={'warning'}
          onClick={this.selectProvider.bind(this, { provider: 'metamask' })}
          block
        >
          MetaMask
        </Button>
        <Button
          bsSize={'lg'}
          bsStyle={'default'}
          onClick={this.selectProvider.bind(this, { provider: 'ledger' })}
          block
          disabled
        >
          Ledger Nano
        </Button>
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

const Main = connect(mapStoreToProps)(MainComponent)

export default Main
