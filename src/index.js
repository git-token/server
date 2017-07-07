import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import GitTokenMiddleware from 'gittoken-api-middleware/dist/index'

import gittokenConfig from '../gittoken.config'

const app = express()
const port = 1324

app.use(cors())
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
app.use(express.static(process.cwd()))

let gittoken = new GitTokenMiddleware(gittokenConfig)

app.use('/gittoken', gittoken.routeRequests())

// let faucet = new Faucet({
//   dirPath: `${process.cwd()}/gittoken`,
//   keystoreFileName: `.keystore`,
//   web3Provider: `${protocol}://${host}:${port}`
// })
// app.use('/faucet', faucet.Router())


app.listen(port, () => {
  console.log(`GitToken Server Listening on Port ${port}`)
})
