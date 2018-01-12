import axios from 'axios'

export default function verifyAccount({ username, address, msgParams, sig }) {
  axios({
    url: `${this.accountApiUrl}/verify`,
    method: 'POST',
    data: {
      username,
      address,
      msgParams,
      sig: sig.result
    },
    json: true
  }).then((verified) => {

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'verificationStatus',
      value: verified ? 'verified' : 'unverified'
    }))

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_DETAILS',
      id: 'verified',
      value: verified
    }))

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'activeStep',
      value: 'organization'
    }))

    return null
  }).catch((error) => {
    console.log('error', error)
    return null
  })
}
