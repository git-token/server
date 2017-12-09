export default function WebHookMiddleware(req, res, next) {
  const { headers, body } = req
  this.validateWebHookRequest({ headers, body }).then(() => {
    return this.handleContribution({ headers, body })
  }).then((details) => {
    const { contribution, userBalance, totalSupply } = details
    req.contribution = contribution;
    req.userBalance = userBalance;
    req.totalSupply = totalSupply;
    return this.handleEventActions({ contribution })
  }).then((events) => {
    req.events = events
    next()
  }).catch((error) => {
    console.log('error', error)
    const err = error.message ? error.message : JSON.stringify(error, null, 2)
    res.status(500).send(err)
  })
}
