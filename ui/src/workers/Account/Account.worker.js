import accountVerified from './accountVerified'
import getProfile from './getProfile'
import verifyAccount from './verifyAccount'
import getOrganizations from './getOrganizations'

class GitTokenAccountWorker {
  constructor({ accountApiUrl }) {
    this.accountApiUrl = accountApiUrl

    /* Bind Methods */
    this.getOrganizations = getOrganizations.bind(this)
    this.accountVerified = accountVerified.bind(this)
    this.verifyAccount = verifyAccount.bind(this)
    this.getProfile = getProfile.bind(this)

    this.listen()
  }

  listen() {
    console.log('GitToken Account Web Worker Listening for Events')
    addEventListener('message', (msg) => {
      console.log('msg', msg)
      const { type, value } = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data

      if (type) {
        switch(type) {
          case 'VERIFY_ACCOUNT':
            const { username, address, msgParams, sig } = value
            return this.verifyAccount({ username, address, msgParams, sig })
            break;
          case 'GET_PROFILE':
            return this.getProfile()
            break;
          case 'GET_ORGANIZATIONS':
            return this.getOrganizations()
            break;
            // webpackOk is emitted by dev server?
          case 'webpackOk':
            break;
          default:
            console.error(new Error(`Invalid Type for Web Worker: ${type}`))
        }
      }
    })
  }
}

const worker = new GitTokenAccountWorker({ accountApiUrl: `/api/account` })

export default worker
