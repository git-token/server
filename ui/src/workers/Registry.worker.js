import Promise, { promisifyAll } from 'bluebird'
import Registry from 'gittoken-contracts/build/contracts/Registry.json'
import GitHubAPI from 'github-api'
import request from 'browser-request'

// import Web3 from 'web3'

export default class GitTokenRegistryWorker {
  constructor({ }) {

    this.listen()
  }

  listen() {
    console.log('GitToken Registry Web Worker Listening for Events')
    addEventListener('message', (msg) => {
      const { event, payload } = JSON.parse(msg.data)
      switch(event) {
        case 'verify_organization':
          return this.verifyOrganization(payload)
          break;
        case 'configure':
          return this.setConfig(payload)
          break;
        default:
          this.handleErrorMessage({
            error: `Invalid Event: ${event}`
          })
      }
    })
  }

  setConfig({ registryAPI }) {
    this.registryAPI = this.registryAPI
    postMessage(JSON.stringify({
      event: 'configured',
      payload: { configured: true }
    }))
  }

  validateAdmin({ username, token, organization }) {
    return new Promise((resolve, reject) => {
      // console.log('username, token, organization', username, token, organization)
      const github = new GitHubAPI({ username, token })
      const user = github.getUser()
      const org = github.getOrganization(organization)
      let profile
      Promise.resolve(user.getProfile()).then(({ data }) => {
        profile = data
        return org.listMembers({ role: 'admin' })
      }).then(({ data }) => {
        return data
      }).map((member) => {
        if (member.login == profile.login) {
          resolve(true)
        } else {
          return null
        }
      }).then(() => {
        resolve(false)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  verifyOrganization(details) {
    console.log('verifyOrganization::details', details)
    const { username, token, organization, uri } = details
    this.validateAdmin({ username, token, organization }).then((validated) => {
      console.log('validated', validated)
      return request({
        method: 'POST',
        uri,
        body: details,
        json: true
      }, (error, result) => {
        if (error) { throw error; }
        console.log('result', result)
        postMessage(JSON.stringify({
          event: 'organization_verified',
          payload: result
        }))
      })
    }).catch((error) => {
      console.log('error', error)
    })
  }

  handleErrorMessage({ error }) {
    postMessage(JSON.stringify({
      error: error ? error : 'Unhandled Error'
    }))
  }

}

const worker = new GitTokenRegistryWorker({})
