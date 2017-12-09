import { Router } from 'express'

export default function AccountRouter() {
  let router = Router()

  router.get('/', (req, res) => {
    res.send('Hello, World!')
  })

  return router
}
