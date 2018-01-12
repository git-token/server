import Promise, { promisifyAll } from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  Row,
  Col,
  Button
} from 'react-bootstrap'

import ModelViewer from 'metamask-logo'

class MetaMaskComponent extends Component {
  constructor() {
    super()

  }

  componentDidMount() {

    // To render with fixed dimensions:
    this.viewer = ModelViewer({

      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 500,
      height: 400,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: true,

      // head should slowly drift (overrides lookAt)
      slowDrift: false,

    })

    // add viewer to DOM
    this.metaMaskLogo.appendChild(this.viewer.container)

    // look at something on the page
    this.viewer.lookAt({ x: 950, y: 750 })
  }

  unlockMetaMask() {
    const { dispatch, Actions: { account } } = this.props

    return (
      <center>
        <h3>Please Unlock MetaMask & Click 'Refresh MetaMask'</h3>
        <Button
          bsSize={'lg'}
          bsStyle={'primary'}
          onClick={() => { dispatch(account.metamask()) }}
          block
          >
          Refresh MetaMask
        </Button>
      </center>
    )
  }

  installMetaMask() {
    const { dispatch, Account: { refreshMetaMask } } = this.props

    return (<div>
      { !refreshMetaMask ?
        <Button
          bsStyle={'primary'}
          bsSize={'lg'}
          block
          onClick={() => {
            window.open("https://metamask.io")
            dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'refreshMetaMask', value: true })
          }}>
          Install MetaMask
        </Button> :
        <Button
          bsStyle={'primary'}
          bsSize={'lg'}
          block
          onClick={() => {
            dispatch(push("/account/setup/metamask"))
            dispatch({
              type: 'SET_ACCOUNT_DETAILS',
              id: 'refreshMetaMask',
              value: true
            })
          }}>
          Refresh After MetaMask Install
        </Button>
       }
    </div>)
  }

  next() {
    const { dispatch, Account: { metaMaskInstalled, metaMaskLocked, address } } = this.props
    if (metaMaskInstalled && !metaMaskLocked) {
      return (<div>
        <Button
          bsStyle={'primary'}
          bsSize={'lg'}
          block
          onClick={() => {
            dispatch({
              type: 'SET_ACCOUNT_SETUP_DETAILS',
              id: 'activeStep',
              value: 'verify'
            })

            dispatch(push("/account/setup/register"))
          }}>
          Register Account
        </Button>
      </div>)
    } else {
      return null
    }
  }

  render() {
    const { dispatch, Account: { metaMaskInstalled, metaMaskLocked, address } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <center>
              { !metaMaskInstalled ? <h1>Install MetaMask</h1> : null }
              { metaMaskLocked && metaMaskInstalled ? <h1>Unlock MetaMask</h1> : null }
              { metaMaskInstalled && !metaMaskLocked ? <h1>MetaMask Ready!</h1> : null }
              <br/>
              <div id="metamask-logo" key={"metamask-logo"} ref={(node) => { this.metaMaskLogo = node }}></div>
            </center>
          </Col>
          <Col sm={12}>
            { !metaMaskInstalled ? <center>
              <h3>GitToken requires MetaMask to interact with Ethereum.</h3>
              <br/>
              {this.installMetaMask()}
            </center> : null }
            { metaMaskLocked && metaMaskInstalled ? this.unlockMetaMask() : null }
            { metaMaskInstalled && !metaMaskLocked ? this.next() : null }
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

const MetaMask = connect(mapStoreToProps)(MetaMaskComponent)

export default MetaMask
