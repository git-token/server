import { Router } from 'express'

export default function WebHookRouter() {
  let router = Router()

  router.post('/', this.WebHookMiddleware, (req, res) => {
    const { contribution, totalSupply, userBalance } = req
    res.status(200).send(JSON.stringify({
      contribution,
      userBalance,
      totalSupply
    }, null, 2))
  })


  return router
}
