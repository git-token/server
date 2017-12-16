import { Router } from 'express'

export default function WebHookRouter() {
  let router = Router()

  router.post('/', this.WebHookMiddleware, (req, res) => {
    const { contribution, totalSupply, userBalance, receipts } = req
    const details = JSON.stringify({
      contribution,
      userBalance,
      totalSupply,
      receipts
    }, null, 2)
    res.status(200).send(details)
  })
  return router
}
