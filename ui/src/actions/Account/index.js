import Promise, { promisifyAll } from 'bluebird'
import GitHubAPI from 'github-api'

import worker from './worker'
import getProfile from './getProfile'
import handleError from './handleError'
import metamask from './metamask'
import verifyAccount from './verifyAccount'
import setupStep from './setupStep'
import getOrganizations from './getOrganizations'

export default class GitTokenAccountActions {
  constructor({}) {
    this.worker = worker.bind(this)
    this.getProfile = getProfile.bind(this)
    this.handleError = handleError.bind(this)
    this.metamask = metamask.bind(this)
    this.verifyAccount = verifyAccount.bind(this)
    this.setupStep = setupStep.bind(this)
    this.getOrganizations = getOrganizations.bind(this)
  }

}
