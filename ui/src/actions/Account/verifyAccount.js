import axios from 'axios'

export default function verifyAccount({ address, username, termsOfService }) {
  return (dispatch) => {
    const msgParams = [{
      type: 'address',
      name: 'address',
      value: address
    }, {
      type: 'string',
      name: 'username',
      value: username
    },{
      type: 'string',
      name: 'eula',
      value: termsOfService
    },{
      type: 'bool',
      name: 'agreement',
      value: 'true'
    }]

    this.web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, address],
      from: address
    }, (error, sig) => {
      if (error) {
        // TODO: Handle Signature Error
        console.error(error)
        console.error(new Error('Signature Error'))
      } else {
        this.worker.postMessage(JSON.stringify({
          type: 'VERIFY_ACCOUNT',
          value: { username, address, msgParams, sig }
        }))
      }
    })
  }
}
