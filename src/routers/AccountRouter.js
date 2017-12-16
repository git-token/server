import { Router } from 'express'

export default function AccountRouter() {
  let router = Router()

  // Serve static web apps
  router.get('/', (req, res) => {
    res.send(true)
  })

  return router
}
