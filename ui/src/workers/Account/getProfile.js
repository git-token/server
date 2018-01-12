import Promise, { join } from 'bluebird'
import axios from 'axios'

export default function getProfile() {
  join(
    axios({ method: 'GET', url: `${this.accountApiUrl}/profile` }),
    axios({ method: 'GET', url: `${this.accountApiUrl}/verified` })
  ).then((response) => {

    postMessage(JSON.stringify({
      type: 'SET_PROFILE',
      id: 'profile',
      value: response[0].data
    }))

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_VERIFIED',
      id: 'verified',
      value: response[1].data
    }))

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'activeStep',
      value: 'welcome'
    }))
    
    return null
  }).catch((error) => {
    console.log('error', error)
    const { status } = error.response
    switch(status) {
      case 401:
        console.warn('Unauthorized! Please Register with GitHub')
        return null
      default:
        console.error(error)
    }
  })
}
