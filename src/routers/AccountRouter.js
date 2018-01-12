import express, { Router } from 'express'

export default function AccountRouter() {
  let router = Router()

  // Serve static web apps
  router.use('/', express.static(`${process.cwd()}/node_modules/gittoken-account-ui/`))

  return router
}
