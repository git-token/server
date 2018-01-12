import Promise, { promisifyAll } from 'bluebird'

export default function metamask() {
  return (dispatch) => {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider)
      this.web3.eth = promisifyAll(this.web3.eth)
      this.web3.version = promisifyAll(this.web3.version)
      this.web3.eth.getAccountsAsync().then((accounts) => {
        dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'metaMaskInstalled', value: true })
        if (!accounts.length) {
          dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'setupStep', value: 'unlockMetamask' })
          dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'metaMaskLocked', value: true })
        } else {
          dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'address', value: accounts[0] })
          dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'metaMaskLocked', value: false })
          return this.web3.version.getNetworkAsync()
        }
      }).then((network) => {
        dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'network', value: network })
      }).catch((error) => {
        console.log('error', error)
      })
    } else {
      dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'setupStep', value: 'installMetamask' })
      dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'metaMaskInstalled', value: false })
      dispatch({ type: 'SET_ACCOUNT_DETAILS', id: 'metaMaskLocked', value: true })
    }
  }
}
