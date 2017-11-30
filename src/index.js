import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// import GitTokenKeystoreGenerator from 'gittoken-keystore-generator'
import passport from 'passport'
import mysql from 'mysql'
import { Strategy } from 'passport-github2'

import {
  signContribution,
  parseContribution
} from './utils/index'

import GitTokenContracts from './contracts/index'

import {
  query,
  saveContribution,
  saveUserBalance,
  saveTotalSupply
} from './mysql/index'

import {
  AuthRouter,
  WebHookRouter
} from './routers/index'

import {
  WebHookMiddleware
} from './middleware/index'




export default class GitTokenServer extends GitTokenContracts {
  constructor({
    mysqlOpts,
    api: { port, sessionSecret },
    githubCredentials,
    dirPath,
    address,
    recoveryShare,
    web3Provider
  }) {
    super({ dirPath, address, recoveryShare, web3Provider })
    /* Bind Options*/
    this.port = port
    this.githubCredentials = githubCredentials
    this.sessionSecret = sessionSecret
    this.web3Provider = web3Provider

    /* Bind Methods */
    this.AuthRouter = AuthRouter.bind(this)
    this.WebHookRouter = WebHookRouter.bind(this)
    this.WebHookMiddleware = WebHookMiddleware.bind(this)
    this.parseContribution = parseContribution.bind(this)
    this.signContribution = signContribution.bind(this)
    this.query = query.bind(this)
    this.saveContribution = saveContribution.bind(this)
    this.saveUserBalance = saveUserBalance.bind(this)
    this.saveTotalSupply = saveTotalSupply.bind(this)

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
