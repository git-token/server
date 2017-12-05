import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql'

import {
  handlePingEvent
} from './events/index'

import {
  signContribution,
  parseContribution,
  validateWebHookRequest,
  handleContribution,
  handleEventActions
} from './utils/index'

import GitTokenContracts from './contracts/index'

import {
  query,
  saveContribution,
  saveUserBalance,
  saveTotalSupply,
  getContributions,
  getTokenSupply,
  getUserBalances
} from './mysql/index'

import {
  AuthRouter,
  WebHookRouter,
  ApiRouter
} from './routers/index'

import {
  WebHookMiddleware
} from './middleware/index'

import {
  gitterWebHook,
  gitterLogContributionActivity,
  gitterService
} from './integrations/index'

export default class GitTokenServer extends GitTokenContracts {
  constructor({
    mysqlOpts,
    api: { port, sessionSecret },
    gittokenParams,
    githubCredentials,
    gitterWebHookUrl,
    gitterToken,
    gitterRoomName,
    dirPath,
    address,
    recoveryShare,
    web3Provider
  }) {
    super({ dirPath, address, recoveryShare, web3Provider })
    /* Bind Options*/
    this.port = port
    this.gittokenParams = gittokenParams
    this.githubCredentials = githubCredentials
    this.gitterWebHookUrl = gitterWebHookUrl
    this.gitterToken = gitterToken
    this.gitterRoomName = gitterRoomName
    this.sessionSecret = sessionSecret
    this.web3Provider = web3Provider

    /* Bind Methods */
    this.AuthRouter = AuthRouter.bind(this)
    this.WebHookRouter = WebHookRouter.bind(this)
    this.ApiRouter = ApiRouter.bind(this)
    this.WebHookMiddleware = WebHookMiddleware.bind(this)
    this.parseContribution = parseContribution.bind(this)
    this.validateWebHookRequest = validateWebHookRequest.bind(this)
    this.signContribution = signContribution.bind(this)
    this.query = query.bind(this)
    this.saveContribution = saveContribution.bind(this)
    this.saveUserBalance = saveUserBalance.bind(this)
    this.saveTotalSupply = saveTotalSupply.bind(this)
    this.getContributions = getContributions.bind(this)
    this.getTokenSupply = getTokenSupply.bind(this)
    this.getUserBalances = getUserBalances.bind(this)

    this.handleContribution = handleContribution.bind(this)
    this.handleEventActions = handleEventActions.bind(this)
    this.handlePingEvent = handlePingEvent.bind(this)


    /* Gitter WebHook Integration */
    this.gitterService = gitterService.bind(this)

    this.gitterService()
    this.gitterWebHook = gitterWebHook.bind(this)
    this.gitterLogContributionActivity = gitterLogContributionActivity.bind(this)


    /* MySql Connection */
    this.mysql = mysql.createConnection(mysqlOpts)

    /* Express Application */
    this.app = express()
    this.app.use(cors())
    this.app.use(require('cookie-parser')());
    this.app.use(require('express-session')({
      secret: this.sessionSecret,
      resave: true,
      saveUninitialized: true
    }));
    this.app.use(bodyParser.json()) // handle json data
    this.app.use(bodyParser.urlencoded({ extended: true })) // handle

    this.app.use('/auth/', this.AuthRouter());
    this.app.use('/webhook/', this.WebHookRouter());
    this.app.use('/api/', this.ApiRouter());

    this.app.use('/', (req, res) => {
      res.send(`Hello, GitToken Server!`)
    })

    /* Run GitToken Server */
    this.listen()
  }

  /**
   * [listen description]
   * @return {[type]} [description]
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log(`GitToken Server Listening on Port ${this.port}`)
    })
  }
}
