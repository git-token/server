import axios from 'axios'

export default function getOrganizations() {
  axios({
    url: `${this.accountApiUrl}/organizations`,
    method: 'GET',
    json: true
  }).then(({ data }) => {

    postMessage(JSON.stringify({
      type: 'SET_ACCOUNT_DETAILS',
      id: 'organizations',
      value: data
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
