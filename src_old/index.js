import express from 'express'
import http from 'http'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import GitTokenMiddleware from 'gittoken-api-middleware/dist/index'
import passport from 'passport'
import { Strategy } from 'passport-github'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import { sequelize } from './sequelize'

const gittokenConfig = require(process.argv[2] || `${process.cwd()}/gittoken.config.js`)
const { githubCredentials, api: { sessionSecret } } = gittokenConfig

const app = express()
const port = 1324

passport.use(new Strategy(githubCredentials,
  function(accessToken, refreshToken, profile, cb) {
    cb(null, { accessToken, profile });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

app.use(cors())
app.use(require('cookie-parser')());
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

/**
 * Serve static files
 */

// app.use('/',
//   express.static(`${process.cwd()}/node_modules/gittoken-messenger-ui/`))

app.use('/', express.static(`${process.cwd()}/node_modules/gittoken-dashboard/`))

app.use(require('express-session')({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));


/**
 * Setup GitHub OAuth Strategy
 */
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback',
 passport.authenticate('github', { failureRedirect: '/' }),
 (req, res) => { res.redirect('/') })


/**
 * Establish GitToken Middleware Services
 */
let gittoken = new GitTokenMiddleware(gittokenConfig)
app.use('/gittoken', gittoken.routeRequests())


app.listen(port, () => {
  console.log(`GitToken Server Listening on Port ${port}`)
})
